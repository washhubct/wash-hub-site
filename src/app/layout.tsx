import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Serif, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wash-hub.it'),
  title: { template: '%s | WASH HUB', default: 'WASH HUB — Autolavaggio Premium Catania' },
  description: 'Autolavaggio professionale a Catania. Due sedi: Lungomare con operatori e Paesi Etnei self service 24/7. Prenota online in 2 minuti.',
  keywords: ['autolavaggio Catania', 'lavaggio auto Catania', 'autolavaggio 24h Catania', 'lavaggio auto Paesi Etnei', 'tappezzeria auto Catania', 'WASH HUB'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://wash-hub.it',
    siteName: 'WASH HUB',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://wash-hub.it/#lungomare',
      name: 'WASH HUB Lungomare',
      description: 'Autolavaggio premium con operatori a Catania Lungomare',
      url: 'https://wash-hub.it/sedi/lungomare',
      telephone: '+39-095-469-5153',
      email: 'info@parkinglungomare.it',
      address: { '@type': 'PostalAddress', streetAddress: 'Via Anfuso 35', addressLocality: 'Catania', addressRegion: 'CT', postalCode: '95126', addressCountry: 'IT' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '18:30' }],
      priceRange: '€€',
      image: 'https://wash-hub.it/og-default.jpg',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://wash-hub.it/#paesi-etnei',
      name: 'WASH HUB POP Paesi Etnei',
      description: 'Autolavaggio self service 24/7 ai Paesi Etnei, Catania',
      url: 'https://wash-hub.it/sedi/paesi-etnei',
      address: { '@type': 'PostalAddress', streetAddress: 'Via Galileo Galilei 28', addressLocality: 'San Gregorio di Catania', addressRegion: 'CT', postalCode: '95027', addressCountry: 'IT' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' }],
      priceRange: '€',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${bricolage.variable} ${instrument.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
