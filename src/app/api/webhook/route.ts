import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { generateTributePackage } from '@/lib/anthropic'
import { sendOrderConfirmation } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId

    if (orderId) {
      const customerEmail = session.customer_details?.email

      // Fetch the saved form data
      const { data: order } = await supabaseAdmin
        .from('orders')
        .select('input_data, deceased_name')
        .eq('id', orderId)
        .single()

      if (order) {
        // Generate the tribute now that payment is confirmed
        const generatedContent = await generateTributePackage(order.input_data)

        await supabaseAdmin
          .from('orders')
          .update({
            status: 'paid',
            stripe_session_id: session.id,
            paid_at: new Date().toISOString(),
            customer_email: customerEmail,
            generated_content: generatedContent,
          })
          .eq('id', orderId)

        if (customerEmail) {
          await sendOrderConfirmation(customerEmail, order.deceased_name, orderId)
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
