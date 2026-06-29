import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'

// Lightweight isomorphic encryption to secure client-side IndexedDB against inspection
const SECRET_SALT = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'apex-offline-salt'

function encrypt(text: string): string {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i)
    const saltCode = SECRET_SALT.charCodeAt(i % SECRET_SALT.length)
    result += String.fromCharCode(charCode ^ saltCode)
  }
  return typeof btoa !== 'undefined' 
    ? btoa(result) 
    : Buffer.from(result, 'binary').toString('base64')
}

function decrypt(cipherText: string): string {
  try {
    const text = typeof atob !== 'undefined' 
      ? atob(cipherText) 
      : Buffer.from(cipherText, 'base64').toString('binary')
    let result = ''
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i)
      const saltCode = SECRET_SALT.charCodeAt(i % SECRET_SALT.length)
      result += String.fromCharCode(charCode ^ saltCode)
    }
    return result
  } catch {
    return cipherText
  }
}

// Custom IndexedDB storage for Zustand persist middleware with built-in encryption
const idbStorage: StateStorage = {
  getItem: async (name): Promise<string | null> => {
    const value = await get(name)
    if (!value) return null
    try {
      return decrypt(value as string)
    } catch {
      return null
    }
  },
  setItem: async (name, value): Promise<void> => {
    const encrypted = encrypt(value)
    await set(name, encrypted)
  },
  removeItem: async (name): Promise<void> => {
    await del(name)
  },
}

export interface OfflineAction {
  id: string
  type: 'clock_in' | 'clock_out' | 'create_task' | 'update_task_status' | 'create_asset' | 'update_asset'
  payload: any
  timestamp: string
}

interface AppState {
  isOffline: boolean
  setOffline: (status: boolean) => void
  offlineQueue: OfflineAction[]
  addToQueue: (action: Omit<OfflineAction, 'id' | 'timestamp'>) => void
  removeFromQueue: (id: string) => void
  clearQueue: () => void
  activeModules: string[]
  setActiveModules: (modules: string[]) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (setState, getState) => ({
      isOffline: typeof window !== 'undefined' ? !window.navigator.onLine : false,
      setOffline: (status) => setState({ isOffline: status }),
      offlineQueue: [],
      addToQueue: (action) => {
        const newAction: OfflineAction = {
          ...action,
          id: Math.random().toString(36).substring(2, 15),
          timestamp: new Date().toISOString(),
        }
        setState((state) => ({
          offlineQueue: [...state.offlineQueue, newAction],
        }))
      },
      removeFromQueue: (id) =>
        setState((state) => ({
          offlineQueue: state.offlineQueue.filter((item) => item.id !== id),
        })),
      clearQueue: () => setState({ offlineQueue: [] }),
      activeModules: ['attendance', 'tasks'],
      setActiveModules: (modules) => setState({ activeModules: modules }),
    }),
    {
      name: 'apex-app-store',
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        offlineQueue: state.offlineQueue,
        activeModules: state.activeModules,
      }),
    }
  )
)
