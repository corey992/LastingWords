import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('id')

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('id, deceased_name, generated_content, status, revision_used, revision_notes, input_data')
    .eq('id', orderId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
