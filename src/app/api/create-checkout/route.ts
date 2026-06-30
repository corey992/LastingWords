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

    if (error) throw error

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?order_id=${data.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/create`,
      metadata: { orderId: data.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: 'Unable to start checkout. Please try again.' },
      { status: 500 }
    )
  }
}
