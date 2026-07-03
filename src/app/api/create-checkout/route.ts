import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { orderId, tier: rawTier } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required.' },
        { status: 400 }
      )
    }

    // Order was already created by /api/generate — just look it up
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('id, deceased_name')
      .eq('id', orderId)
      .single()

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://lasting-words-one.vercel.app').replace(/\/$/, '')

    const tier = rawTier === 'priority' ? 'priority' : 'standard'
    const unitAmount = tier === 'priority' ? 5900 : 3900
    const productName = tier === 'priority'
      ? 'LastingWords Priority Memorial Tribute Package'
      : 'LastingWords Memorial Tribute Package'

    let session
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: productName },
            unit_amount: unitAmount,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${appUrl}/success?order_id=${order.id}`,
        cancel_url: `${appUrl}/create`,
        metadata: { orderId: order.id },
      })
    } catch (stripeErr: unknown) {
      const msg = stripeErr instanceof Error ? stripeErr.message : String(stripeErr)
      console.error('Stripe error:', msg)
      return NextResponse.json({ error: `Payment setup error: ${msg}` }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Unexpected checkout error:', err)
    return NextResponse.json(
      { error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    )
  }
}
