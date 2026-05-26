import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Le nostre sedi',
  description: 'WASH HUB Lungomare (operatori, premium) e WASH HUB POP Paesi Etnei (self service 24/7). Trova la sede più vicina a te.',
}

export default function SediPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 md:py-28 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection className="max-w-3xl mx-auto px-5 md:px-8">
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Due sedi</p>
          <h1 className="font-display text-5xl md:text-6xl font-black leading-tight"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Siamo dove sei tu.
          </h1>
          <p className="text-white/60 text-xl mt-5 max-w-xl mx-auto">
            Lungomare per un&rsquo;esperienza premium con operatori. Paesi Etnei per la libertà del self service 24/7.
          </p>
        </AnimatedSection>
      </section>

      {/* Due card */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LUNGOMARE */}
            <AnimatedSection direction="left" className="group rounded-3xl overflow-hidden bg-[#0F0F0F] flex flex-col">
              <div className="relative">
                <HiggsfieldImage
                  prompt="premium car wash exterior at golden hour Catania seafront, professional luxury service, warm light"
                  className="w-full h-72"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C8A84E] text-[#0F0F0F]">
                  Premium
                </span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="font-display text-3xl font-black text-white mb-1"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  WASH HUB Lungomare
                </h2>
                <p className="text-[#C8A84E] text-sm mb-5">Via del Lungomare, Catania</p>
                <div className="space-y-2 text-white/60 text-sm mb-6 flex-1">
                  <p>🕗 Lun–Sab 8:00–18:30 · Domenica chiuso</p>
                  <p>👨‍🔧 Operatori esperti inclusi</p>
                  <p>🪡 Servizio tappezzeria disponibile</p>
                  <p>🅿️ Parcheggio interno</p>
                </div>
                <Link href="/sedi/lungomare"
                  className="flex items-center justify-center py-3 px-6 rounded-full font-bold text-sm transition-all hover:gap-3"
                  style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                  Scopri la sede →
                </Link>
              </div>
            </AnimatedSection>

            {/* PAESI ETNEI */}
            <AnimatedSection direction="right" delay={0.1} className="group rounded-3xl overflow-hidden bg-[#F5C518] flex flex-col">
              <div className="relative">
                <HiggsfieldImage
                  prompt="modern self-service car wash at night, neon illuminated station, futuristic, Paesi Etnei Catania Sicily, 24/7 availability"
                  className="w-full h-72"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#E63946] text-white">
                  SELF 24/7
                </span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="font-display text-3xl font-black text-[#0F0F0F] mb-1"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  WASH HUB POP
                </h2>
                <p className="text-[#0F0F0F]/60 text-sm mb-5">Paesi Etnei, Catania</p>
                <div className="space-y-2 text-[#0F0F0F]/70 text-sm mb-6 flex-1">
                  <p className="font-bold text-[#0F0F0F]">⏰ Aperto 24 ore · 7 giorni su 7</p>
                  <p>🧼 Lavaggio manuale Lun–Dom 8:00–19:00</p>
                  <p>🪙 Self service a gettoni</p>
                  <p>🚗 Nessuna prenotazione necessaria</p>
                  <p>⚡ Pronto in pochi minuti</p>
                </div>
                <Link href="/sedi/paesi-etnei"
                  className="flex items-center justify-center py-3 px-6 rounded-full bg-[#0F0F0F] text-white font-bold text-sm hover:bg-[#1a1a1a] transition-colors">
                  Scopri la sede →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
