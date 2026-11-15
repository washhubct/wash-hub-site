import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Serif, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ParcheggioSmartPopup } from '@/components/ui/ParcheggioSmartPopup'
import { JsonLd } from '@/components/seo/JsonLd'
import { schemaSito } from '@/lib/schema'
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
  // Usato solo in qualche citazione sotto la piega: niente preload, non ruba banda al titolo
  preload: false,
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wash-hub.it'),
  title: { template: '%s | WASH HUB', default: 'WASH HUB — Autolavaggio a mano a Catania' },
  description: 'Autolavaggio professionale a Catania. Due sedi: Lungomare con operatori e Paesi Etnei self service 24/7. Prenota online in 2 minuti.',
  // './' si risolve sul percorso della pagina: canonical e og:url diversi per ogni pagina
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: './',
    siteName: 'WASH HUB',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${bricolage.variable} ${instrument.variable} ${inter.variable}`}>
      <head>
        {/* Globale solo azienda + sito: le schede sede stanno nelle pagine che ne parlano */}
        <JsonLd data={schemaSito} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAF7]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ParcheggioSmartPopup />
      </body>
    </html>
  )
}
