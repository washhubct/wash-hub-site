import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

// Parcheggio in tre scelte chiare, ancorato all'hero (#parcheggio). Niente prezzi qui: stanno nelle pagine dedicate.
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Wash+Hub+Lungomare+Via+Anfuso+35+Catania'
const OPZIONI = [
  { icona: '🔐', titolo: 'Parcheggio Smart', testo: 'Paghi online, entri col codice.', cta: 'Ottieni il codice', href: '/parcheggio-smart', evidenza: true },
  { icona: '⏱️', titolo: 'A ore', testo: 'Paghi all’uscita.', cta: 'Come arrivare', href: MAPS, evidenza: false },
  { icona: '📅', titolo: 'Abbonamento', testo: 'Il tuo posto, ogni mese.', cta: 'Chiedi disponibilità', href: '/contatti', evidenza: false },
]

export function ParcheggioScelta() {
  return (
    <section id="parcheggio" className="py-16 md:py-24 bg-[#FAFAF7] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <AnimatedSection className="mb-8 md:mb-10">
          <p className="text-[#0F0F0F]/50 text-xs font-bold uppercase tracking-[0.2em] mb-2">🅿️ Parcheggio · Lungomare</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F] leading-[0.95]"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Lasci l&apos;auto. Al resto pensiamo noi.
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OPZIONI.map((o, i) => (
            <AnimatedSection key={o.titolo} delay={i * 0.08}>
              <Link href={o.href} {...(o.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group h-full flex flex-col rounded-3xl p-6 transition-all hover:-translate-y-1 ${o.evidenza ? 'bg-[#0F0F0F] text-white' : 'bg-white text-[#0F0F0F] border border-[#0F0F0F]/10'}`}
                style={o.evidenza ? { boxShadow: '6px 6px 0 #F5C518' } : undefined}>
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${o.evidenza ? 'bg-[#F5C518]' : 'bg-[#F0F0EC]'}`}>{o.icona}</span>
                <span className="mt-5 font-black text-2xl" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{o.titolo}</span>
                <span className={`mt-2 text-sm leading-relaxed flex-1 ${o.evidenza ? 'text-white/65' : 'text-[#0F0F0F]/60'}`}>{o.testo}</span>
                <span className={`mt-5 font-bold text-sm ${o.evidenza ? 'text-[#F5C518]' : 'text-[#0F0F0F]'} group-hover:translate-x-1 transition-transform`}>{o.cta} →</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
