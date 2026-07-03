'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Order {
  id: string
  deceased_name: string
  generated_content: string
  status: string
  revision_used: boolean
  revision_notes: string | null
  input_data: { tier?: string } | null
}

function splitVersions(content: string): { versionA: string; versionB: string } {
  const vBIndex = content.indexOf('# VERSION B')
  if (vBIndex === -1) return { versionA: content, versionB: '' }
  return {
    versionA: content.slice(0, vBIndex).replace(/^#\s*VERSION A[^\n]*\n/m, '').trim(),
    versionB: content.slice(vBIndex).replace(/^#\s*VERSION B[^\n]*\n/m, '').trim(),
  }
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState<Order | null>(null)
  const [polling, setPolling] = useState(true)
  const [activeVersion, setActiveVersion] = useState<'A' | 'B'>('A')

  useEffect(() => {
    if (!orderId) return

    let attempts = 0
    const maxAttempts = 30

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
      const { versionA, versionB } = splitVersions(order.generated_content)
      const text = activeVersion === 'A' ? versionA : versionB
      navigator.clipboard.writeText(text)
      alert('Tribute copied to clipboard.')
    }
  }

  const handlePrint = () => {
    window.print()
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

  const { versionA, versionB } = splitVersions(order.generated_content)
  const activeContent = activeVersion === 'A' ? versionA : versionB
  const hasVersionB = versionB.length > 0

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 print:px-0 print:py-0">
      <div className="text-center mb-8 print:hidden">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">
          Your Tribute for {order.deceased_name}
        </h1>
        <p className="text-stone-600">
          Your complete tribute package is ready. Copy, print, or save any section below.
        </p>
      </div>

      {hasVersionB && (
        <div className="flex mb-6 rounded-lg border border-stone-200 overflow-hidden print:hidden">
          <button
            onClick={() => setActiveVersion('A')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeVersion === 'A'
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            Version A — Your Selected Tone
          </button>
          <button
            onClick={() => setActiveVersion('B')}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-l border-stone-200 ${
              activeVersion === 'B'
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            Version B — Alternative Style
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-stone-200 p-8 mb-8 prose prose-stone prose-headings:font-serif prose-headings:font-normal prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-hr:border-stone-200 prose-strong:text-stone-800 prose-em:text-stone-600 max-w-none print:border-none print:shadow-none print:p-0">
        <ReactMarkdown>{activeContent}</ReactMarkdown>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 print:hidden">
        <button
          onClick={handleCopy}
          className="flex-1 bg-stone-800 text-white py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 border border-stone-300 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
        >
          Save as PDF / Print
        </button>
        {!order.revision_used && (
          <Link
            href={`/revision?order_id=${orderId}`}
            className="flex-1 text-center border border-stone-300 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Request Revision
          </Link>
        )}
      </div>

      {(() => {
        const isPriority = order.input_data?.tier === 'priority'
        const revisionsAllowed = isPriority ? 2 : 1
        const revisionsUsed = order.revision_used
          ? revisionsAllowed
          : order.revision_notes ? 1 : 0
        const remaining = revisionsAllowed - revisionsUsed
        if (remaining <= 0) {
          return (
            <p className="text-center text-stone-500 text-sm print:hidden">
              Your revision allowance has been fully used.
            </p>
          )
        }
        return (
          <p className="text-center text-stone-500 text-sm print:hidden">
            {remaining} complimentary revision{remaining > 1 ? 's' : ''} remaining.
          </p>
        )
      })()}
    </div>
  )
}
