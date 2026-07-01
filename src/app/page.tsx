import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Obituary & Eulogy Writer — Beautiful Memorial Tributes in Minutes',
  description:
    'LastingWords writes personalized obituaries, eulogies, memorial programs, and tribute speeches for your loved one. AI-powered, compassionate, and ready in minutes. Complete package for $39.',
  alternates: {
    canonical: 'https://lastingwords.ai',
  },
}

const faqs = [
  {
    q: 'How does LastingWords write the tribute?',
    a: 'You share details about your loved one — their life, personality, and memories — and our AI creates a complete, personalized tribute package including an obituary, eulogy, memorial program copy, and more. Every tribute is unique to the person being honored.',
  },
  {
    q: 'How long does it take?',
    a: 'Your complete tribute package is ready within about 30 seconds of payment. You can download and use it immediately.',
  },
  {
    q: 'Can I make changes after I receive it?',
    a: 'Yes. Every order includes one free revision. Simply tell us what you\'d like changed and we\'ll rewrite the entire package to reflect your feedback.',
  },
  {
    q: 'Is the obituary ready to submit to a newspaper?',
    a: 'Yes. The obituary is formatted for newspaper submission and online memorial sites. You can use it as-is or make minor edits to personalize it further.',
  },
  {
    q: 'What if I don\'t have many details to share?',
    a: 'Share whatever you\'re comfortable with. Even a few sentences about who they were is enough for us to create something meaningful and beautiful.',
  },
  {
    q: 'Is this appropriate for all ages?',
    a: 'Yes. LastingWords writes tributes for loved ones of all ages — from infants and children to adults and elders — with sensitivity appropriate to each.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">

      {/* Hero */}
      <section className="w-full px-6 py-20 md:py-32 text-center bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-6">
            Obituaries & Eulogies Written with Care — in Minutes
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
            When words feel impossible to find, LastingWords helps you honor your loved one
            with a beautiful, personalized tribute package — obituary, eulogy, memorial program,
            and more. Ready instantly. Written just for them.
          </p>
          <Link
            href="/create"
            className="inline-block bg-stone-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors"
          >
            Begin Your Tribute
          </Link>
          <p className="mt-4 text-stone-500 text-sm">
            Complete tribute package — $39 · One free revision included · Ready in minutes
          </p>
        </div>
      </section>

      {/* What You Receive */}
      <section className="w-full px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-4">
          Everything You Need to Honor Their Life
        </h2>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          One package covers every written tribute you need — from the newspaper obituary
          to the words spoken at the service.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Full Obituary',
              desc: 'A complete, publication-ready obituary for newspapers, funeral home websites, and online memorial sites like Legacy.com.',
            },
            {
              title: 'Eulogy / Tribute Speech',
              desc: 'A heartfelt 3–5 minute eulogy written for you to deliver at the service. Personal, warm, and ready to read aloud.',
            },
            {
              title: 'Memorial Program Copy',
              desc: 'Beautifully written text for printed funeral or memorial programs — an opening, life summary, and closing.',
            },
            {
              title: 'Social Media Announcement',
              desc: 'A dignified announcement for Facebook or Instagram to share with your wider community.',
            },
            {
              title: 'Thank You Card Message',
              desc: 'A heartfelt message to send to those who attended the service or offered their condolences.',
            },
            {
              title: 'One Free Revision',
              desc: 'Not quite right? Tell us what to change and we\'ll rewrite the entire package to reflect your feedback.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-medium text-stone-800 mb-2">{item.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4">
            How It Works
          </h2>
          <p className="text-stone-600 mb-12">
            Three simple steps. No writing experience needed.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Share Their Story',
                desc: 'Tell us about your loved one in your own words — their life, personality, and the memories you cherish.',
              },
              {
                step: '2',
                title: 'We Write the Tribute',
                desc: 'Our AI crafts a complete, personalized tribute package in seconds — obituary, eulogy, program copy, and more.',
              },
              {
                step: '3',
                title: 'Use It Immediately',
                desc: 'Download, copy, or share your tribute package the moment it\'s ready. No waiting, no back-and-forth.',
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center mx-auto mb-4 text-sm font-medium">
                  {item.step}
                </div>
                <h3 className="font-medium text-stone-800 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LastingWords */}
      <section className="w-full px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
          Why Families Choose LastingWords
        </h2>
        <div className="space-y-6">
          {[
            {
              title: 'Written for your loved one — not a template',
              desc: 'Every word is generated specifically from the details you share. No fill-in-the-blank forms, no generic language.',
            },
            {
              title: 'Ready when you need it most',
              desc: 'Funerals move quickly. Your complete tribute package is ready within minutes, not days.',
            },
            {
              title: 'Compassionate and dignified',
              desc: 'Our AI is trained specifically for memorial writing. The tone is always warm, respectful, and appropriate — never robotic.',
            },
            {
              title: 'Works for all ages and all faiths',
              desc: 'Whether honoring an infant, a child, or an elder — and regardless of religious background — LastingWords writes with sensitivity and care.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-stone-400 mt-2 shrink-0" />
              <div>
                <h3 className="font-medium text-stone-800 mb-1">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — rich keyword content for SEO */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-medium text-stone-800 mb-2">{faq.q}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full px-6 py-20 text-center bg-stone-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4">
            Give them the tribute they deserve
          </h2>
          <p className="text-stone-600 mb-8">
            Beautiful, personalized, and ready in minutes. Let us help you find the words.
          </p>
          <Link
            href="/create"
            className="inline-block bg-stone-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors"
          >
            Begin Your Tribute — $39
          </Link>
          <p className="mt-4 text-stone-500 text-xs">
            Secure payment · Complete package · One free revision included
          </p>
        </div>
      </section>

      {/* Schema FAQ markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Footer */}
      <footer className="w-full px-6 py-10 text-center text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LastingWords. Created with compassion.</p>
        <p className="mt-1 text-xs text-stone-400">
          Obituary writer · Eulogy writer · Memorial tribute service
        </p>
      </footer>
    </div>
  )
}
