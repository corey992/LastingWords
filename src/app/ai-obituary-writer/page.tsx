/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Obituary Writer — Complete Tribute Package in Minutes',
  description:
    'Write a personalized obituary with AI in under 10 minutes. LastingWords creates a complete tribute package — obituary, eulogy, memorial program, and more — for $39.',
  alternates: { canonical: 'https://www.lastingwords.ai/ai-obituary-writer' },
}

const SAMPLE_OBITUARY = `Margaret Anne Williams, 78, of Nashville, Tennessee, passed away peacefully on June 28, 2026, surrounded by her loving family. Born on March 14, 1948, in Louisville, Kentucky, Margaret spent her life as a devoted mother, gifted gardener, and the kind of neighbor who always had a fresh pie cooling on the windowsill.

Margaret was a woman of deep faith and quiet strength. She worked as a schoolteacher for 32 years at Lincoln Elementary, where generations of students remembered her for her patience, her warmth, and her unfailing belief that every child had something remarkable inside them. After retiring, she poured her energy into her garden — a half-acre of roses, herbs, and heirloom tomatoes that became something of a local landmark on Maple Street.

She is survived by her husband of 54 years, Robert; her children, David (Sarah), Jennifer (Mark), and Thomas; seven grandchildren; and her beloved cat, Biscuit. She was preceded in death by her parents, Harold and Edna Campbell, and her sister, Patricia.

A memorial service will be held Saturday, July 5, at 2:00 PM at First Presbyterian Church of Nashville. In lieu of flowers, the family requests donations to the Nashville Public Library Foundation, an institution Margaret visited nearly every week for six decades.`

export default function AIObituaryWriterPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full px-6 py-20 md:py-28 text-center bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-4">AI Obituary Writer</p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-6">
            A Personalized Obituary in Minutes — Written by AI, Guided by You
          </h1>
          <p className="text-lg text-stone-600 mb-4 leading-relaxed">
            LastingWords is the most complete AI obituary writer available. Share your loved one's story,
            and we return a full tribute package — obituary, eulogy, memorial program, social announcement,
            and thank you card — ready to use immediately.
          </p>
          <p className="text-stone-500 mb-10 text-sm">
            No templates. No generic language. Every tribute is written uniquely for the person you're honoring.
          </p>
          <Link
            href="/create"
            className="inline-block bg-stone-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors"
          >
            Write the Obituary Now — $39
          </Link>
          <p className="mt-3 text-stone-400 text-sm">Ready in under 10 minutes · One free revision · Secure payment</p>
        </div>
      </section>

      {/* Sample Output */}
      <section className="w-full px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-2 text-center">See a Real Sample</h2>
        <p className="text-stone-600 text-center mb-10">This is actual output from LastingWords — written from a short description, not a template.</p>
        <div className="bg-white rounded-xl border border-stone-200 p-8">
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-4">Sample Obituary</p>
          {SAMPLE_OBITUARY.split('\n\n').map((para, i) => (
            <p key={i} className="text-stone-700 leading-relaxed mb-4 text-sm">{para}</p>
          ))}
          <p className="text-xs text-stone-400 mt-4 pt-4 border-t border-stone-100">
            Name, dates, and details changed for privacy. Formatted for newspaper submission.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4 text-center">One Order, Five Documents</h2>
          <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
            Most AI obituary writers give you one document. LastingWords gives you everything you need for the service.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Full Obituary', desc: 'Publication-ready for newspapers, funeral home sites, and Legacy.com. Includes complete life summary, survivors, and service details.' },
              { title: 'Eulogy / Tribute Speech', desc: 'A heartfelt 3–5 minute speech written to be delivered aloud at the service. Personal and warm, never generic.' },
              { title: 'Memorial Program Copy', desc: 'Opening, life summary, and closing text for printed programs — formatted and ready to hand to your designer or printer.' },
              { title: 'Social Media Announcement', desc: 'A dignified post for Facebook or Instagram to share news of the passing with your wider community.' },
              { title: 'Thank You Card Message', desc: 'A heartfelt message to send to those who attended or offered condolences.' },
              { title: 'One Free Revision', desc: 'Not quite right? We\'ll rewrite the entire package based on your feedback — no extra charge.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-stone-100 bg-stone-50">
                <h3 className="font-medium text-stone-800 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="w-full px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif text-stone-800 text-center mb-10">$39 vs. the Alternative</h2>
        <div className="overflow-hidden rounded-xl border border-stone-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left p-4 font-medium text-stone-700"></th>
                <th className="text-center p-4 font-medium text-stone-700">Human Writer</th>
                <th className="text-center p-4 font-medium text-stone-800 bg-stone-800 text-white rounded-t-none">LastingWords</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ['Cost', '$200–$500', '$39'],
                ['Turnaround', '2–3 days', 'Under 10 minutes'],
                ['Documents', '1', '5'],
                ['Available 24/7', '✗', '✓'],
                ['Free revision', 'Extra charge', 'Included'],
              ].map(([label, human, lw]) => (
                <tr key={label}>
                  <td className="p-4 text-stone-600">{label}</td>
                  <td className="p-4 text-center text-stone-500">{human}</td>
                  <td className="p-4 text-center font-medium text-stone-800 bg-stone-50">{lw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif text-stone-800 text-center mb-10">Common Questions</h2>
          <div className="space-y-8">
            {[
              { q: 'How does the AI obituary writer work?', a: 'You fill out a form with details about your loved one — their name, dates, personality, career, family, and any memories you want included. Our AI uses those details to write a complete, personalized tribute package. Nothing is copied from a template.' },
              { q: 'How long does it take?', a: 'The entire process — filling out the form, payment, and receiving your tribute — takes under 10 minutes. The AI generates your package in about 30 seconds.' },
              { q: 'Is the obituary ready to submit to a newspaper?', a: 'Yes. The obituary is formatted for newspaper submission and online memorial sites. Most families submit it as-is or with minor personal edits.' },
              { q: 'What if I don\'t have many details?', a: 'Share whatever you\'re comfortable with. Even a few sentences about who they were is enough to create something meaningful and dignified.' },
              { q: 'Can I get a revision?', a: 'Every order includes one free revision. Tell us what you\'d like changed and we\'ll rewrite the full package.' },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="font-medium text-stone-800 mb-2">{faq.q}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 py-20 text-center bg-stone-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4">Ready when you need it most</h2>
          <p className="text-stone-600 mb-8">
            Funerals move quickly. LastingWords delivers a complete, personalized tribute in minutes — not days.
          </p>
          <Link href="/create" className="inline-block bg-stone-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors">
            Begin Your Tribute — $39
          </Link>
          <p className="mt-3 text-stone-500 text-xs">Secure payment via Stripe · Complete 5-document package · One free revision</p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Write an Obituary with AI',
            description: 'Use LastingWords to create a complete, personalized obituary and tribute package in minutes.',
            step: [
              { '@type': 'HowToStep', name: 'Share your loved one\'s story', text: 'Fill out a form with their name, dates, personality, career, family, and memories.' },
              { '@type': 'HowToStep', name: 'AI writes the tribute package', text: 'LastingWords generates a complete package including obituary, eulogy, memorial program, and more in about 30 seconds.' },
              { '@type': 'HowToStep', name: 'Download and use immediately', text: 'Your tribute is ready to submit to newspapers, share online, and deliver at the service.' },
            ],
            totalTime: 'PT10M',
            estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '39' },
          }),
        }}
      />

      <footer className="w-full px-6 py-10 text-center text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LastingWords. <Link href="/" className="hover:underline">Home</Link> · <Link href="/create" className="hover:underline">Begin Tribute</Link></p>
      </footer>
    </div>
  )
}
