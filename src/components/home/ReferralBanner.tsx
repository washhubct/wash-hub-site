import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function ReferralBanner() {
  return (
    <section className="py-16 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-2">Porta un amico</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Ogni amico vale €5.
            </h2>
            <p className="text-white/50 mt-2 max-w-md mx-auto md:mx-0">
              Condividi il tuo codice personale. Ogni amico che prenota ti regala €5 di sconto sul prossimo lavaggio.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/referral"
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-sm hover:bg-[#E0B210] transition-all hover:scale-105 active:scale-100">
              Trova il tuo codice →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
