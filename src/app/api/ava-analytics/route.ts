import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const expectedKey = `Bearer ${process.env.AVA_ANALYTICS_KEY}`

  if (!authHeader || authHeader !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: totalOrders } = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })

  const { data: paidOrders } = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'paid')

  const { data: revisionsUsed } = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('revision_used', true)

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const { data: recentOrders } = await supabaseAdmin
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString())

  return NextResponse.json({
    total_orders: totalOrders,
    paid_orders: paidOrders,
    revisions_used: revisionsUsed,
    orders_last_30_days: recentOrders,
    generated_at: now.toISOString(),
  })
}
