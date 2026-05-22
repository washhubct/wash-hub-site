import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function HomeCTA() {
  return (
    <section className="bg-[#F5C518] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-6xl font-black text-[#0F0F0F] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Prenota il tuo lavaggio<br />in 2 minuti.
          </h2>
          <p className="text-[#0F0F0F]/60 text-lg mb-10 max-w-xl mx-auto">
            Scegli la data, l&rsquo;orario e il servizio. Ti aspettiamo.
          </p>
          <Link href="/prenota"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#0F0F0F] text-white text-lg font-bold hover:bg-[#1a1a1a] transition-all hover:scale-105 active:scale-100">
            Prenota ora →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
