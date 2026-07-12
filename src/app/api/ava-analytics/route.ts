import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const expectedKey = `Bearer ${process.env.AVA_ANALYTICS_KEY}`

  if (!authHeader || authHeader !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [totalRes, paidRes, revRes, thirtyRes, sevenRes, recentOrdersRes] = await Promise.allSettled([
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'paid'),
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }).eq('revision_used', true),
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo.toISOString()),
    supabaseAdmin.from('orders').select('id, status, amount, created_at, deceased_name').order('created_at', { ascending: false }).limit(10),
  ])

  const total_orders = totalRes.status === 'fulfilled' ? (totalRes.value.count ?? 0) : 0
  const paid_orders = paidRes.status === 'fulfilled' ? (paidRes.value.count ?? 0) : 0
  const revisions_used = revRes.status === 'fulfilled' ? (revRes.value.count ?? 0) : 0
  const orders_last_30_days = thirtyRes.status === 'fulfilled' ? (thirtyRes.value.count ?? 0) : 0
  const orders_last_7_days = sevenRes.status === 'fulfilled' ? (sevenRes.value.count ?? 0) : 0
  const recent_orders = recentOrdersRes.status === 'fulfilled' ? (recentOrdersRes.value.data ?? []) : []

  const revenue = paid_orders * 39
  const conversion_rate = total_orders > 0 ? Math.round((paid_orders / total_orders) * 100) : 0
  const revision_rate = paid_orders > 0 ? Math.round((revisions_used / paid_orders) * 100) : 0

  return NextResponse.json({
    total_orders,
    paid_orders,
    revisions_used,
    orders_last_30_days,
    orders_last_7_days,
    recent_orders,
    revenue_total: revenue,
    revenue_formatted: `$${revenue.toLocaleString()}`,
    conversion_rate,
    revision_rate,
    generated_at: now.toISOString(),
  })
}