'use client'

import { useState } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 120 }, (_, i) => currentYear - i)

function DateSelect({
  label,
  onChange,
}: {
  label: string
  onChange: (val: string) => void
}) {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')

  const update = (m: string, d: string, y: string) => {
    if (m && d && y) {
      const mm = String(MONTHS.indexOf(m) + 1).padStart(2, '0')
      const dd = String(d).padStart(2, '0')
      onChange(`${y}-${mm}-${dd}`)
    } else {
      onChange('')
    }
  }

  const selectClass =
    'flex-1 px-3 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none bg-white text-stone-800'

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <select
          required
          value={month}
          onChange={(e) => { setMonth(e.target.value); update(e.target.value, day, year) }}
          className={selectClass}
        >
          <option value="">Month</option>
          {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          required
          value={day}
          onChange={(e) => { setDay(e.target.value); update(month, e.target.value, year) }}
          className="w-20 px-3 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none bg-white text-stone-800"
        >
          <option value="">Day</option>
          {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          required
          value={year}
          onChange={(e) => { setYear(e.target.value); update(month, day, e.target.value) }}
          className="w-28 px-3 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none bg-white text-stone-800"
        >
          <option value="">Year</option>
          {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    </div>
  )
}

export default function CreatePage() {
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('Preparing your order...')
  const [form, setForm] = useState({
    customerEmail: '',
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
    setLoadingMsg('Creating your tribute...')

    try {
      // Step 1: generate tribute and create order (captures email immediately)
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const genData = await genRes.json()
      if (!genRes.ok) throw new Error(genData.error)

      // Step 2: create Stripe checkout session for the order
      setLoadingMsg('Redirecting to payment...')
      const checkoutRes = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: genData.orderId }),
      })
      const checkoutData = await checkoutRes.json()
      if (!checkoutRes.ok) throw new Error(checkoutData.error)

      window.location.href = checkoutData.url
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err))
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

      {/* Sample Preview */}
      <div className="mb-10 rounded-xl border border-stone-200 bg-white overflow-hidden">
        <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
          <p className="text-xs font-medium text-stone-500 uppercase tracking-widest">Sample — What You'll Receive</p>
          <p className="text-xs text-stone-400">5 documents · Ready in under 10 minutes</p>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Obituary excerpt</p>
            <p className="text-sm text-stone-700 leading-relaxed italic">
              "Margaret Anne Williams, 78, of Nashville, Tennessee, passed away peacefully on June 28, 2026, surrounded by her family. Born on March 14, 1948, in Louisville, Kentucky, Margaret spent her life as a devoted mother, gifted gardener, and the kind of neighbor who always had a fresh pie cooling on the windowsill...
            </p>
            <p className="text-xs text-stone-400 mt-2">Full obituary includes: complete life summary, survivors, service details, and newspaper-ready formatting.</p>
          </div>
          <div className="border-t border-stone-100 pt-5">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">Eulogy excerpt</p>
            <p className="text-sm text-stone-700 leading-relaxed italic">
              "My mother had a saying she used whenever one of us was going through something hard: 'This too shall pass, but love doesn't.' I used to think it was just something mothers say. Standing here today, I understand it completely..."
            </p>
            <p className="text-xs text-stone-400 mt-2">Full eulogy is 3–5 minutes, written to be delivered aloud at the service.</p>
          </div>
          <div className="border-t border-stone-100 pt-4 flex flex-wrap gap-3">
            {['Full Obituary', 'Eulogy / Speech', 'Memorial Program', 'Social Announcement', 'Thank You Card'].map((doc) => (
              <span key={doc} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">{doc}</span>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Your Email Address
          </label>
          <input
            type="email"
            required
            value={form.customerEmail}
            onChange={(e) => update('customerEmail', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 outline-none"
            placeholder="you@example.com"
          />
          <p className="text-xs text-stone-500 mt-1">
            We&apos;ll send your completed tribute package here.
          </p>
        </div>

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

        <DateSelect
          label="Date of Birth"
          onChange={(val) => update('dateOfBirth', val)}
        />

        <DateSelect
          label="Date of Passing"
          onChange={(val) => update('dateOfPassing', val)}
        />

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
          {loading ? loadingMsg : 'Continue to Payment — $39'}
        </button>

        <p className="text-center text-stone-500 text-xs">
          Secure payment via Stripe · Your tribute is generated immediately after payment · One free revision included
        </p>
      </form>
    </div>
  )
}
