'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { createClient } from '@/lib/supabase/client'

export default function OfflineSyncProvider({ children }: { children: React.ReactNode }) {
  const { isOffline, setOffline, offlineQueue, removeFromQueue } = useAppStore()
  const supabase = createClient()
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<string | null>(null)

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false)
      triggerSync()
    }
    const handleOffline = () => {
      setOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if (typeof window !== 'undefined' && window.navigator.onLine) {
      triggerSync()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [offlineQueue])

  const triggerSync = async () => {
    if (offlineQueue.length === 0 || syncing) return
    setSyncing(true)
    setSyncStatus('Synchronizing offline queue...')

    try {
      for (const action of offlineQueue) {
        let success = false

        if (action.type === 'clock_in' || action.type === 'clock_out') {
          const { error } = await supabase
            .from('attendance_logs')
            .upsert(action.payload)
          if (!error) success = true
        } else if (action.type === 'create_task') {
          const { error } = await supabase
            .from('tasks')
            .insert(action.payload)
          if (!error) success = true
        } else if (action.type === 'update_task_status') {
          const { error } = await supabase
            .from('tasks')
            .update({ status: action.payload.status, updated_at: new Date().toISOString() })
            .eq('id', action.payload.id)
          if (!error) success = true
        } else if (action.type === 'create_asset') {
          const { error } = await supabase
            .from('inventory_assets')
            .insert(action.payload)
          if (!error) success = true
        } else if (action.type === 'update_asset') {
          const { error } = await supabase
            .from('inventory_assets')
            .update({
              quantity: action.payload.quantity,
              condition: action.payload.condition,
              last_checked_by: action.payload.last_checked_by,
              updated_at: new Date().toISOString(),
            })
            .eq('id', action.payload.id)
          if (!error) success = true
        }

        if (success) {
          removeFromQueue(action.id)
        }
      }
      setSyncStatus('Synchronization completed successfully')
      setTimeout(() => setSyncStatus(null), 3000)
    } catch (err) {
      console.error('Failed to sync offline data:', err)
      setSyncStatus('Synchronization failed, please try again later.')
      setTimeout(() => setSyncStatus(null), 3000)
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {isOffline && (
        <div className="bg-orange-50 border-b border-orange-200 py-1.5 px-4 text-center text-xs font-mono text-primary flex items-center justify-center gap-2 select-none">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
          CONNECTION DISRUPTED // OFFLINE MODE ACTIVE (DATA QUEUED)
        </div>
      )}
      {syncStatus && (
        <div className="bg-blue-50 border-b border-blue-200 py-1.5 px-4 text-center text-xs font-mono text-blue-600 flex items-center justify-center gap-2 select-none">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          {syncStatus}
        </div>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
