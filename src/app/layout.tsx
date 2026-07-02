import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const APP_URL = 'https://www.lastingwords.ai'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'LastingWords — AI Obituary & Eulogy Writer | Memorial Tribute Package',
    template: '%s | LastingWords',
  },
  description:
    'Write a beautiful obituary, eulogy, and memorial tribute in minutes. LastingWords uses AI to create personalized, dignified tributes for your loved one. Complete package for $39.',
  keywords: [
    'obituary writer',
    'how to write an obituary',
    'eulogy writer',
    'how to write a eulogy',
    'memorial tribute',
    'funeral program writing',
    'AI obituary',
    'obituary help',
    'eulogy help',
    'write obituary online',
    'personalized obituary',
    'memorial speech',
    'tribute writing service',
    'funeral writing',
    'death announcement',
  ],
  authors: [{ name: 'LastingWords', url: APP_URL }],
  creator: 'LastingWords',
  publisher: 'LastingWords',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'LastingWords',
    title: 'LastingWords — Beautiful Obituaries & Eulogies Written by AI',
    description:
      'When words feel impossible to find, LastingWords helps you create a personalized obituary, eulogy, and memorial tribute package in minutes. Compassionate. Dignified. $39.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LastingWords — Memorial Tribute Writing Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LastingWords — AI Obituary & Eulogy Writer',
    description:
      'Create a beautiful, personalized obituary and eulogy for your loved one in minutes. Complete tribute package for $39.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: APP_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'LastingWords',
              url: APP_URL,
              description:
                'AI-powered memorial tribute writing service. Creates personalized obituaries, eulogies, and memorial programs for grieving families.',
              provider: {
                '@type': 'Organization',
                name: 'LastingWords',
                url: APP_URL,
              },
              serviceType: 'Memorial Writing Service',
              offers: {
                '@type': 'Offer',
                price: '39.00',
                priceCurrency: 'USD',
                description:
                  'Complete memorial tribute package including obituary, eulogy, memorial program copy, social media announcement, and thank you card message.',
              },
              areaServed: 'Worldwide',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-stone-50 text-stone-900 antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
