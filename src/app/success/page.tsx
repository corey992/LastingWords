'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [content, setContent] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [revisionUsed, setRevisionUsed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return
    async function fetchOrder() {
      const { data } = await supabase
        .from('orders')
        .select('generated_content, deceased_name, revision_used')
        .eq('id', orderId)
        .single()
      if (data) {
        setContent(data.generated_content)
        setName(data.deceased_name)
        setRevisionUsed(data.revision_used)
      }
      setLoading(false)
    }
    fetchOrder()
  }, [orderId])

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content)
      alert('Tribute copied to clipboard.')
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-stone-600">Loading your tribute...</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-stone-600">Order not found.</p>
      </div>
    )
  }

  const sections = content.split(/## /g).filter(Boolean)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">
          Your Tribute for {name}
        </h1>
        <p className="text-stone-600">
          Your complete tribute package is ready. You may copy, download, or print any section below.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-8 mb-8">
        {sections.map((section, i) => (
          <div key={i} className="mb-8 last:mb-0">
            <h2 className="text-xl font-serif text-stone-800 mb-3">
              {section.split('\n')[0]}
            </h2>
            <div className="text-stone-700 whitespace-pre-wrap leading-relaxed">
              {section.split('\n').slice(1).join('\n').trim()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleCopy}
          className="flex-1 bg-stone-800 text-white py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
        >
          Copy All to Clipboard
        </button>
        {!revisionUsed && (
          <Link
            href={`/revision?order_id=${orderId}`}
            className="flex-1 text-center border border-stone-300 text-stone-700 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Request Free Revision
          </Link>
        )}
      </div>

      {revisionUsed && (
        <p className="text-center text-stone-500 text-sm">
          Your complimentary revision has been used.
        </p>
      )}
    </div>
  )
}
