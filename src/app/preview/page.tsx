'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PreviewPage() {
  return <Suspense><PreviewContent /></Suspense>
}

function PreviewContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [content, setContent] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)

  useEffect(() => {
    if (!orderId) return
    async function fetchOrder() {
      const { data } = await supabase
        .from('orders')
        .select('generated_content, deceased_name')
        .eq('id', orderId)
        .single()
      if (data) {
        setContent(data.generated_content)
        setName(data.deceased_name)
      }
      setLoading(false)
    }
    fetchOrder()
  }, [orderId])

  const handleCheckout = async () => {
    setCheckingOut(true)
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Unable to start checkout. Please try again.')
      setCheckingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-stone-600">Loading your tribute preview...</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-stone-600">Tribute not found. Please try creating a new one.</p>
      </div>
    )
  }

  const previewSections = content.split(/## /g).filter(Boolean).slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-stone-800 mb-2">
        Your Tribute for {name}
      </h1>
      <p className="text-stone-600 mb-8">
        Here&apos;s a preview of your tribute package. The full package will be available after payment.
      </p>

      <div className="bg-white rounded-xl border border-stone-200 p-8 mb-8">
        <div className="prose prose-stone max-w-none">
          {previewSections.map((section, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-xl font-serif text-stone-800 mb-3">
                {section.split('\n')[0]}
              </h2>
              <div className="text-stone-700 whitespace-pre-wrap leading-relaxed">
                {section.split('\n').slice(1).join('\n').trim()}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-stone-500 italic text-sm">
          Additional sections included after payment: Eulogy, Social Media Announcement, Thank You Card
        </div>
      </div>

      <div className="bg-stone-100 rounded-xl p-6 text-center">
        <p className="text-stone-700 mb-4">
          Complete tribute package — <span className="font-semibold">$39</span>
        </p>
        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          className="bg-stone-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {checkingOut ? 'Redirecting to payment...' : 'Unlock Full Package'}
        </button>
        <p className="mt-3 text-stone-500 text-xs">
          Secure payment via Stripe · One free revision included
        </p>
      </div>
    </div>
  )
}
