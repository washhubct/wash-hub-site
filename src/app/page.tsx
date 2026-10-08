import { HeroV2 } from '@/components/home/HeroV2'
import { SocialProof } from '@/components/home/SocialProof'
import { ParcheggioScelta } from '@/components/home/ParcheggioScelta'
import { PrimaDopo } from '@/components/home/PrimaDopo'
import { ComeLaviamo } from '@/components/home/ComeLaviamo'
import { Garanzia } from '@/components/home/Garanzia'
import { Differentiators } from '@/components/home/Differentiators'
import { ParcheggioSmartBanner } from '@/components/home/ParcheggioSmartBanner'
import { Reviews } from '@/components/home/Reviews'
import { SediPreview } from '@/components/home/SediPreview'
import { HomeCTA } from '@/components/home/HomeCTA'
import { ReferralBanner } from '@/components/home/ReferralBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WASH HUB — Lavaggio a mano e parcheggio a Catania',
  description: 'Lavaggio auto a mano, interni e parcheggio sul lungomare di Catania (Via Anfuso 35). Self service 24/7 ai Paesi Etnei. Prenota online in un minuto.',
}

// Redesign 2026 (ramo redesign-2026): due scelte in cima (lavaggio / parcheggio), meteo del giorno,
// prima/dopo interattivo, lavaggio raccontato in 4 passaggi. Niente orari liberi in vista (decisione Guido).
export default function HomePage() {
  return (
    <>
      <HeroV2 />
      <SocialProof />
      <ParcheggioScelta />
      <PrimaDopo />
      <ComeLaviamo />
      <Differentiators />
      <Garanzia />
      <ReferralBanner />
      <SediPreview />
      <ParcheggioSmartBanner />
      <Reviews />
      <HomeCTA />
    </>
  )
}
