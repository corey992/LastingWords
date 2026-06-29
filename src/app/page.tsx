import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full px-6 py-20 md:py-32 text-center bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-6">
            Honor Their Memory with Words That Last
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
            When words feel impossible to find, we help you create a beautiful,
            personalized tribute package for your loved one — in minutes, not days.
          </p>
          <Link
            href="/create"
            className="inline-block bg-stone-800 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-stone-700 transition-colors"
          >
            Begin Your Tribute
          </Link>
          <p className="mt-4 text-stone-500 text-sm">
            Complete tribute package — $39 · One free revision included
          </p>
        </div>
      </section>

      {/* What You Receive */}
      <section className="w-full px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
          Your Complete Tribute Package
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Full Obituary',
              desc: 'Ready for newspaper publication and online memorial sites.',
            },
            {
              title: 'Memorial Program Copy',
              desc: 'Beautiful text for printed funeral or memorial programs.',
            },
            {
              title: 'Personal Eulogy',
              desc: 'A heartfelt 3-5 minute speech you can deliver with confidence.',
            },
            {
              title: 'Social Media Announcement',
              desc: 'A dignified announcement to share with your wider community.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-medium text-stone-800 mb-2">{item.title}</h3>
              <p className="text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-12">
            Simple and Gentle Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Share Memories', desc: 'Tell us about your loved one in your own words.' },
              { step: '2', title: 'Review Your Tribute', desc: 'Preview your personalized tribute package.' },
              { step: '3', title: 'Download & Use', desc: 'Receive your complete package instantly after payment.' },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center mx-auto mb-4 text-sm font-medium">
                  {item.step}
                </div>
                <h3 className="font-medium text-stone-800 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 py-10 text-center text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LastingWords. Created with compassion.</p>
      </footer>
    </div>
  )
}
