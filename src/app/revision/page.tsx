'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function RevisionPage() {
  return <Suspense><RevisionContent /></Suspense>
}

function RevisionContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!notes.trim()) return
    setLoading(true)

    try {
      const res = await fetch('/api/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, revisionNotes: notes }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      router.push(`/success?order_id=${orderId}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-stone-800 mb-2">Request a Revision</h1>
      <p className="text-stone-600 mb-8">
        Let us know what you&apos;d like changed. Your one complimentary revision will
        update the entire tribute package based on your feedback.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            What would you like changed?
          </label>
          <textarea
            required
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none resize-y"
            placeholder="e.g., Please make the eulogy slightly shorter, add mention of her garden club involvement, and change the tone to be a bit more celebratory..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-800 text-white py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Revising your tribute...' : 'Submit Revision Request'}
        </button>

        {loading && (
          <p className="text-center text-stone-500 text-sm">
            We&apos;re carefully incorporating your feedback. This may take a moment.
          </p>
        )}
      </form>
    </div>
  )
}
