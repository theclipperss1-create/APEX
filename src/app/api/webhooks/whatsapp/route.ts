import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-apex-signature')

    // Simple webhook signature verification (MVP)
    // If webhook secret is set in env, verify it
    const secret = process.env.WHATSAPP_WEBHOOK_SECRET
    if (!secret || signature !== secret) {
      return NextResponse.json({ error: 'Autentikasi webhook gagal. Tanda tangan tidak valid.' }, { status: 401 })
    }

    const body = await request.json()
    const { company_id, new_tier } = body

    if (!company_id || !new_tier) {
      return NextResponse.json({ error: 'Parameter company_id dan new_tier wajib disertakan.' }, { status: 400 })
    }

    if (!['free', 'pro', 'enterprise', 'suspended'].includes(new_tier)) {
      return NextResponse.json({ error: 'Tier tidak valid.' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Update company tier bypassing RLS
    const { error } = await adminClient
      .from('companies')
      .update({ tier: new_tier, updated_at: new Date().toISOString() })
      .eq('id', company_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: `Tier perusahaan berhasil diperbarui ke ${new_tier}.` })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
