import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateRevision } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const { orderId, revisionNotes } = await req.json()

    if (!orderId || !revisionNotes) {
      return NextResponse.json(
        { error: 'Please provide your revision details.' },
        { status: 400 }
      )
    }

    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    if (order.status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment required before revisions.' },
        { status: 403 }
      )
    }

    if (order.revision_used) {
      return NextResponse.json(
        { error: 'Your complimentary revision has already been used.' },
        { status: 403 }
      )
    }

    const revisedContent = await generateRevision(
      order.generated_content,
      revisionNotes
    )

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        generated_content: revisedContent,
        revision_used: true,
        revision_notes: revisionNotes,
      })
      .eq('id', orderId)

    if (updateError) throw updateError

    return NextResponse.json({ content: revisedContent })
  } catch (err) {
    console.error('Revision error:', err)
    return NextResponse.json(
      { error: 'We encountered an issue with your revision. Please try again.' },
      { status: 500 }
    )
  }
}
