import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Write an Obituary: A Complete Guide for Grieving Families',
  description:
    'Learn how to write a meaningful obituary step by step — what to include, how to structure it, and how to honor your loved one with the right words.',
  alternates: { canonical: 'https://www.lastingwords.ai/blog/how-to-write-an-obituary' },
}

export default function HowToWriteObituary() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-4">
        <Link href="/" className="hover:underline">LastingWords</Link> · Guide
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4 leading-snug">
        How to Write an Obituary: A Complete Guide for Grieving Families
      </h1>
      <p className="text-stone-500 text-sm mb-10">7 min read · LastingWords Editorial</p>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-6">
        <p>
          Writing an obituary for someone you love is one of the hardest writing tasks there is. You're being asked to condense an entire life — a person's personality, relationships, accomplishments, and essence — into a few paragraphs, often within 24 to 48 hours of their death.
        </p>
        <p>
          This guide will walk you through exactly what to include, how to structure it, and how to make sure the final result truly honors the person you've lost.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">What Is an Obituary?</h2>
        <p>
          An obituary is a written notice of someone's death, typically published in a newspaper or on a funeral home website. It serves two purposes: it informs the community of the death and service details, and it honors the person's life with a brief biography.
        </p>
        <p>
          Most obituaries are 200 to 500 words, though longer tributes are common for prominent community members or at the family's preference.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">What to Include in an Obituary</h2>
        <p>A complete obituary typically contains the following elements:</p>
        <ul className="list-disc pl-6 space-y-2 text-stone-700">
          <li><strong>Full name</strong> — include maiden name, nicknames, or the name they were known by</li>
          <li><strong>Age and dates</strong> — date of birth and date of passing</li>
          <li><strong>Place of residence</strong> — city and state where they lived</li>
          <li><strong>Brief life story</strong> — where they were born and raised, education, career, and defining life chapters</li>
          <li><strong>Personality and passions</strong> — what made them who they were: hobbies, values, faith, humor, contributions</li>
          <li><strong>Survivors</strong> — who they leave behind (spouse, children, grandchildren, siblings) with proper phrasing</li>
          <li><strong>Those who preceded them in death</strong> — parents, siblings, spouses if applicable</li>
          <li><strong>Service details</strong> — date, time, and location of visitation, funeral, or memorial service</li>
          <li><strong>Memorial wishes</strong> — preferred charity for donations, or other memorial requests</li>
        </ul>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">How to Structure an Obituary</h2>
        <p>A classic obituary follows a simple, three-part structure:</p>

        <h3 className="text-lg font-medium text-stone-800 mt-6 mb-2">1. The Opening</h3>
        <p>
          Start with the person's full name, age, where they lived, when they passed, and the manner of passing (peacefully, suddenly, after a brief illness, etc.). Keep it dignified and simple.
        </p>
        <p className="bg-stone-50 rounded-lg p-4 text-sm italic text-stone-600">
          Example: "Robert James Callahan, 82, of Portland, Oregon, passed away peacefully at home on July 1, 2026, surrounded by his family."
        </p>

        <h3 className="text-lg font-medium text-stone-800 mt-6 mb-2">2. The Life Story</h3>
        <p>
          This is the heart of the obituary. Cover their birth, where they grew up, their education, career, marriage, and the things that defined their life. Focus on what made them unique — not just what they did, but who they were.
        </p>
        <p>
          Don't try to include everything. Choose the details that best capture the person. A few specific memories or character traits are far more powerful than a comprehensive list.
        </p>

        <h3 className="text-lg font-medium text-stone-800 mt-6 mb-2">3. Survivors and Service Details</h3>
        <p>
          List surviving family members in traditional order: spouse, children (with spouses), grandchildren, siblings. Then note service details and any memorial donation preferences.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">Tips for Writing a Meaningful Obituary</h2>
        <ul className="list-disc pl-6 space-y-3 text-stone-700">
          <li><strong>Write how they spoke.</strong> If they were funny, a touch of warmth and wit is appropriate. If they were deeply spiritual, let that come through.</li>
          <li><strong>Use specific details.</strong> "She made the best peach pie in Shelby County" is more powerful than "she enjoyed baking."</li>
          <li><strong>Don't over-sanitize.</strong> Honoring a full life means acknowledging its texture — challenges overcome, roads traveled, lessons passed on.</li>
          <li><strong>Read it aloud.</strong> If it sounds stiff or formal when spoken, revise it. An obituary should feel human.</li>
          <li><strong>Check newspaper requirements.</strong> Many publications have word limits and formatting requirements. Confirm these before submitting.</li>
        </ul>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">What If You Can't Find the Words?</h2>
        <p>
          It's entirely normal to sit down to write an obituary and feel completely stuck. You're grieving. The task feels impossibly weighty. You want to get it right, and the pressure of that makes it harder.
        </p>
        <p>
          This is exactly why we built LastingWords. You share the details about your loved one — in your own words, however much or little you have — and our AI writes a complete, personalized tribute package, including the obituary, eulogy, memorial program, and more. Ready in minutes.
        </p>
        <p>
          It's not a template. It's written specifically for them, from what you share.
        </p>
      </div>

      <div className="mt-12 p-6 bg-stone-50 rounded-xl border border-stone-200">
        <h3 className="font-serif text-stone-800 text-lg mb-2">Need help writing the obituary?</h3>
        <p className="text-stone-600 text-sm mb-4">
          LastingWords creates a complete tribute package — obituary, eulogy, memorial program, and more — in under 10 minutes. Share what you know about your loved one and let us handle the words.
        </p>
        <Link
          href="/create"
          className="inline-block bg-stone-800 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Begin Your Tribute — $39
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Write an Obituary: A Complete Guide for Grieving Families',
            author: { '@type': 'Organization', name: 'LastingWords' },
            publisher: { '@type': 'Organization', name: 'LastingWords', url: 'https://www.lastingwords.ai' },
            url: 'https://www.lastingwords.ai/blog/how-to-write-an-obituary',
          }),
        }}
      />

      <footer className="mt-16 pt-8 border-t border-stone-200 text-sm text-stone-400 text-center">
        <Link href="/" className="hover:underline">← Back to LastingWords</Link>
      </footer>
    </article>
  )
}
