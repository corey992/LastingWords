/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What to Include in a Memorial Service Program',
  description:
    'A complete guide to memorial service programs — what to include, how to structure it, and how to write the words that honor your loved one at the service.',
  alternates: { canonical: 'https://www.lastingwords.ai/blog/memorial-service-program' },
}

export default function MemorialServiceProgram() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-4">
        <Link href="/" className="hover:underline">LastingWords</Link> · Guide
      </p>
      <h1 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4 leading-snug">
        What to Include in a Memorial Service Program
      </h1>
      <p className="text-stone-500 text-sm mb-10">5 min read · LastingWords Editorial</p>

      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-6">
        <p>
          A memorial service program is the printed document guests receive when they arrive for a funeral or celebration of life. It serves as a guide to the service and — more importantly — a keepsake that families hold onto long after the day itself.
        </p>
        <p>
          Getting the written content right matters. Here's what to include and how to write it.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">The Front Cover</h2>
        <p>The front cover typically includes:</p>
        <ul className="list-disc pl-6 space-y-2 text-stone-700">
          <li>A photo of your loved one</li>
          <li>Their full name</li>
          <li>Their birth and death dates (e.g., &quot;March 14, 1948 – June 28, 2026&quot;)</li>
          <li>Optionally: a brief quote, scripture, or phrase that captured their spirit</li>
        </ul>
        <p>Keep the cover uncluttered. One good photo and clean typography is better than a busy layout.</p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">The Order of Service</h2>
        <p>
          The inside of the program usually begins with the order of service — the sequence of the event so guests know what to expect. This might include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-stone-700">
          <li>Welcome / Processional</li>
          <li>Opening prayer or moment of silence</li>
          <li>Musical selection (list the song title and performer)</li>
          <li>Scripture reading or poem</li>
          <li>Eulogy / tribute remarks (with the speaker&apos;s name and relationship)</li>
          <li>Additional musical selection</li>
          <li>Committal or closing words</li>
          <li>Recessional</li>
        </ul>
        <p>Adjust for your service type. A celebration of life may have a more informal structure; a traditional religious service will follow liturgical order.</p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">The Life Tribute</h2>
        <p>
          This is the written text that captures who they were — typically 150 to 300 words printed inside the program. It's different from the full obituary. Think of it as the heart of the person, distilled.
        </p>
        <p>A memorial program life tribute should:</p>
        <ul className="list-disc pl-6 space-y-2 text-stone-700">
          <li>Open with something that immediately captures their character or spirit</li>
          <li>Touch on their life&apos;s defining chapters (not a complete biography)</li>
          <li>Include at least one specific memory or characteristic that made them unique</li>
          <li>Close with something that honors their legacy or the love they leave behind</li>
        </ul>
        <div className="bg-stone-50 rounded-xl p-6 text-sm italic text-stone-600 leading-relaxed">
          <p className="not-italic font-medium text-stone-500 text-xs uppercase tracking-wide mb-3">Sample Life Tribute (program format)</p>
          <p>
            "Margaret Williams spent her life in the service of others — 32 years teaching second grade, countless hours in her garden, and always, always with a pot of coffee on and time to listen. She believed that showing up was the most important thing a person could do, and she showed up for everyone. She is remembered not for grand gestures but for her steady, tireless love — the kind that outlasts everything."
          </p>
        </div>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">Survivors Listing</h2>
        <p>
          Most programs include a brief listing of surviving family members. Follow traditional order: spouse, children (and their spouses), grandchildren, siblings. If the list is long, it's acceptable to list family units rather than every individual name.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">A Closing Quote, Poem, or Scripture</h2>
        <p>
          The back cover typically includes a closing thought — a scripture verse, a poem, a saying they lived by, or a few words from the family. Choose something that meant something to them specifically, if possible.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">Memorial and Donation Information</h2>
        <p>
          If the family is requesting memorial donations to a specific organization rather than flowers, include the charity name and how to donate. Keep it simple — organization name, website, and a brief note is all you need.
        </p>

        <h2 className="text-xl font-serif text-stone-800 mt-10 mb-3">Getting the Words Written</h2>
        <p>
          The hardest part of a memorial program isn't the layout — it's the writing. Finding the right words for the life tribute and closing copy while you're in the middle of grief is genuinely difficult.
        </p>
        <p>
          LastingWords writes the program text for you as part of a complete tribute package. You share the details, we write the life tribute, and you have polished, personalized copy ready to hand to your printer or designer — in minutes.
        </p>
      </div>

      <div className="mt-12 p-6 bg-stone-50 rounded-xl border border-stone-200">
        <h3 className="font-serif text-stone-800 text-lg mb-2">Get your memorial program copy written for you</h3>
        <p className="text-stone-600 text-sm mb-4">
          LastingWords includes memorial program copy as part of every tribute package — along with an obituary, eulogy, social announcement, and thank you card. $39, ready in minutes.
        </p>
        <Link href="/create" className="inline-block bg-stone-800 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors">
          Begin Your Tribute — $39
        </Link>
      </div>

      <footer className="mt-16 pt-8 border-t border-stone-200 text-sm text-stone-400 text-center">
        <Link href="/" className="hover:underline">← Back to LastingWords</Link>
      </footer>
    </article>
  )
}
