'use server'

import { createAdminClient } from './supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCompanyTierAction(companyId: string, tier: 'free' | 'pro' | 'enterprise') {
  if (!companyId || !tier) {
    return { error: 'Missing companyId or tier value.' }
  }

  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('companies')
    .update({ tier })
    .eq('id', companyId)

  if (error) {
    console.error('Failed to update company tier:', error)
    return { error: error.message || 'Failed to update company tier.' }
  }

  revalidatePath('/super-admin')
  return { success: true }
}
