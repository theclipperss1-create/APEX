import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Authorization check for Vercel Cron
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const adminClient = createAdminClient()

    // Calculate cutoff date (60 days ago)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 60)
    const cutoffIso = cutoffDate.toISOString()

    // Delete suspended companies (cascade will delete rows in other tables)
    const { data, error } = await adminClient
      .from('companies')
      .delete()
      .eq('tier', 'suspended')
      .lt('updated_at', cutoffIso)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Suspended companies clean up run successfully.',
      purged_companies: data,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
