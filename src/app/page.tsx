import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { Differentiators } from '@/components/home/Differentiators'
import { Garanzia } from '@/components/home/Garanzia'
import { Reviews } from '@/components/home/Reviews'
import { SediPreview } from '@/components/home/SediPreview'
import { HomeCTA } from '@/components/home/HomeCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WASH HUB — Autolavaggio Premium Catania',
  description: 'Il miglior autolavaggio a Catania. Operatori esperti al Lungomare, self service 24/7 ai Paesi Etnei. Prenota online.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Garanzia />
      <Differentiators />
      <SediPreview />
      <Reviews />
      <HomeCTA />
    </>
  )
}
