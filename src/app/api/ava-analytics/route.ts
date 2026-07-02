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
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    { count: totalOrders },
    { count: paidOrders },
    { count: revisionsUsed },
    { count: ordersLast30Days },
    { count: ordersLast7Days },
    { count: ordersThisMonth },
    { count: paidThisMonth },
    { data: recentOrdersList },
  ] = await Promise.all([
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid'),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('revision_used', true),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo.toISOString()),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', firstOfMonth.toISOString()),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid').gte('paid_at', firstOfMonth.toISOString()),
    supabaseAdmin.from('orders').select('id, deceased_name, customer_email, status, created_at, paid_at, revision_used').order('created_at', { ascending: false }).limit(10),
  ])

  const PRICE = 39
  const totalRevenue = (paidOrders ?? 0) * PRICE
  const revenueThisMonth = (paidThisMonth ?? 0) * PRICE
  const conversionRate = totalOrders ? Math.round(((paidOrders ?? 0) / totalOrders) * 100) : 0

  return NextResponse.json({
    total_orders: totalOrders ?? 0,
    paid_orders: paidOrders ?? 0,
    total_revenue: totalRevenue,
    total_revenue_formatted: `$${totalRevenue.toLocaleString()}`,
    conversion_rate_pct: conversionRate,
    revisions_used: revisionsUsed ?? 0,
    revision_rate_pct: paidOrders ? Math.round(((revisionsUsed ?? 0) / (paidOrders ?? 1)) * 100) : 0,
    orders_last_7_days: ordersLast7Days ?? 0,
    orders_last_30_days: ordersLast30Days ?? 0,
    orders_this_month: ordersThisMonth ?? 0,
    revenue_this_month: revenueThisMonth,
    revenue_this_month_formatted: `$${revenueThisMonth.toLocaleString()}`,
    recent_orders: recentOrdersList ?? [],
    generated_at: now.toISOString(),
  })
}
