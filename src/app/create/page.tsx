'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    deceasedName: '',
    dateOfBirth: '',
    dateOfPassing: '',
    relationship: '',
    personalDetails: '',
    tone: 'warm',
    specialRequests: '',
    includeSocialMedia: true,
    includeThankYou: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      router.push(`/preview?order_id=${data.orderId}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-stone-800 mb-2">Tell Us About Your Loved One</h1>
      <p className="text-stone-600 mb-8">
        Share as much or as little as you feel comfortable with. Every detail helps us
        create a tribute that truly honors their life.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Their Full Name
          </label>
          <input
            type="text"
            required
            value={form.deceasedName}
            onChange={(e) => update('deceasedName', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none"
            placeholder="e.g., Margaret Anne Williams"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              required
              value={form.dateOfBirth}
              onChange={(e) => update('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Date of Passing
            </label>
            <input
              type="date"
              required
              value={form.dateOfPassing}
              onChange={(e) => update('dateOfPassing', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Your Relationship to Them
          </label>
          <input
            type="text"
            required
            value={form.relationship}
            onChange={(e) => update('relationship', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none"
            placeholder="e.g., daughter, husband, close friend"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Memories, Qualities, and Life Details
          </label>
          <p className="text-xs text-stone-500 mb-2">
            Share their personality, accomplishments, hobbies, family details, favorite
            sayings, or any memories you&apos;d like included.
          </p>
          <textarea
            required
            rows={8}
            value={form.personalDetails}
            onChange={(e) => update('personalDetails', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none resize-y"
            placeholder="Tell us about them in your own words..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Desired Tone
          </label>
          <select
            value={form.tone}
            onChange={(e) => update('tone', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none"
          >
            <option value="warm">Warm and Loving</option>
            <option value="celebratory">Celebratory of Life</option>
            <option value="reflective">Quiet and Reflective</option>
            <option value="faith-based">Faith-Based and Hopeful</option>
            <option value="humorous">Warm with Gentle Humor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Special Requests (Optional)
          </label>
          <textarea
            rows={3}
            value={form.specialRequests}
            onChange={(e) => update('specialRequests', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none resize-y"
            placeholder="Any specific phrases, quotes, or elements you'd like included..."
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.includeSocialMedia}
              onChange={(e) => update('includeSocialMedia', e.target.checked)}
              className="w-4 h-4 rounded border-stone-300"
            />
            <span className="text-sm text-stone-700">Include a social media announcement</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.includeThankYou}
              onChange={(e) => update('includeThankYou', e.target.checked)}
              className="w-4 h-4 rounded border-stone-300"
            />
            <span className="text-sm text-stone-700">Include a thank you card message</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-800 text-white py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating your tribute...' : 'Create My Tribute'}
        </button>

        {loading && (
          <p className="text-center text-stone-500 text-sm">
            This may take a moment. We&apos;re carefully crafting each piece of your tribute.
          </p>
        )}
      </form>
    </div>
  )
}
