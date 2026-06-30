'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Order {
  id: string
  deceased_name: string
  generated_content: string
  status: string
  revision_used: boolean
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState<Order | null>(null)
  const [polling, setPolling] = useState(true)

  useEffect(() => {
    if (!orderId) return

    let attempts = 0
    const maxAttempts = 30 // poll for up to 60 seconds

    const poll = async () => {
      attempts++
      try {
        const res = await fetch(`/api/order?id=${orderId}`)
        const data = await res.json()

        if (data.status === 'paid' && data.generated_content) {
          setOrder(data)
          setPolling(false)
          return
        }
      } catch {
        // continue polling
      }

      if (attempts < maxAttempts) {
        setTimeout(poll, 2000)
      } else {
        setPolling(false)
      }
    }

    poll()
  }, [orderId])

  const handleCopy = () => {
    if (order?.generated_content) {
      navigator.clipboard.writeText(order.generated_content)
      alert('Tribute copied to clipboard.')
    }
  }

  if (polling) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-12 h-12 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-serif text-stone-800 mb-3">Creating Your Tribute</h2>
        <p className="text-stone-600">
          Thank you for your payment. We&apos;re carefully crafting your tribute package —
          this usually takes about 20 seconds.
        </p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-serif text-stone-800 mb-3">Almost Ready</h2>
        <p className="text-stone-600 mb-6">
          Your tribute is still being prepared. Please check your email — we&apos;ll send
          a link as soon as it&apos;s ready, usually within a minute.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-stone-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
        >
          Check Again
        </button>
      </div>
    )
  }

  const sections = order.generated_content.split(/## /g).filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">
          Your Tribute for {order.deceased_name}
        </h1>
        <p className="text-stone-600">
          Your complete tribute package is ready. Copy, print, or save any section below.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-8 mb-8">
        {sections.map((section, i) => (
          <div key={i} className="mb-8 last:mb-0 pb-8 last:pb-0 border-b last:border-0 border-stone-100">
            <h2 className="text-xl font-serif text-stone-800 mb-3">
              {section.split('\n')[0]}
            </h2>
            <div className="text-stone-700 whitespace-pre-wrap leading-relaxed">
              {section.split('\n').slice(1).join('\n').trim()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleCopy}
          className="flex-1 bg-stone-800 text-white py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
        >
          Copy All to Clipboard
        </button>
        {!order.revision_used && (
          <Link
            href={`/revision?order_id=${orderId}`}
            className="flex-1 text-center border border-stone-300 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Request Free Revision
          </Link>
        )}
      </div>

      {order.revision_used && (
        <p className="text-center text-stone-500 text-sm">
          Your complimentary revision has been used.
        </p>
      )}
    </div>
  )
}
