import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateTributePackage, TributeInput } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const body: TributeInput = await req.json()

    if (!body.deceasedName || !body.personalDetails) {
      return NextResponse.json(
        { error: 'Please provide the required details about your loved one.' },
        { status: 400 }
      )
    }

    const content = await generateTributePackage(body)

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        deceased_name: body.deceasedName,
        input_data: body,
        generated_content: content,
        status: 'generated',
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ orderId: data.id, preview: content })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json(
      { error: 'We encountered an issue creating your tribute. Please try again.' },
      { status: 500 }
    )
  }
}
