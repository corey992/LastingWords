import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.deceasedName || !body.personalDetails) {
      return NextResponse.json(
        { error: 'Please provide the required details about your loved one.' },
        { status: 400 }
      )
    }

    // Save form data first, generate tribute AFTER payment in webhook
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        deceased_name: body.deceasedName,
        input_data: body,
        generated_content: '',
        status: 'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://lasting-words-one.vercel.app').replace(/\/$/, '')

    let session
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
        mode: 'payment',
        success_url: `${appUrl}/success?order_id=${data.id}`,
        cancel_url: `${appUrl}/create`,
        metadata: { orderId: data.id },
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
