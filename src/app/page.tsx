import { HeroV2 } from '@/components/home/HeroV2'
import { SocialProof } from '@/components/home/SocialProof'
import { InBreve } from '@/components/home/InBreve'
import { ParcheggioScelta } from '@/components/home/ParcheggioScelta'
import { PrimaDopo } from '@/components/home/PrimaDopo'
import { ComeLaviamo } from '@/components/home/ComeLaviamo'
import { Garanzia } from '@/components/home/Garanzia'
import { Reviews } from '@/components/home/Reviews'
import { ReferralBanner } from '@/components/home/ReferralBanner'
import { SediPreview } from '@/components/home/SediPreview'
import { HomeCTA } from '@/components/home/HomeCTA'
import { JsonLd } from '@/components/seo/JsonLd'
import { schemaSedi } from '@/lib/schema'
import reviewsData from '@/data/reviews.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WASH HUB — Autolavaggio a mano e parcheggio a Catania',
  description: 'Lavaggio auto a mano, interni e parcheggio sul lungomare di Catania (Via Anfuso 35). Self service 24/7 ai Paesi Etnei. Prenota online in un minuto.',
}

// Redesign 2026 (ramo redesign-2026): due scelte in cima (lavaggio / parcheggio), meteo del giorno,
// prima/dopo interattivo, lavaggio raccontato in 4 passaggi. Niente orari liberi in vista (decisione Guido).
export default function HomePage() {
  return (
    <>
      <JsonLd data={schemaSedi} />
      <HeroV2 voto={reviewsData.rating} recensioni={reviewsData.totalRatings} />
      <SocialProof />
      <ParcheggioScelta />
      <PrimaDopo />
      <ComeLaviamo />
      <Garanzia />
      <SediPreview />
      <Reviews />
      <ReferralBanner />
      <HomeCTA />
      {/* Fatti chiave in prosa in fondo: la home resta leggera, il testo resta visibile (Guido 16/11/2026) */}
      <InBreve />
    </>
  )
}
