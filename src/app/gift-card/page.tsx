import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gift Card — WASH HUB Catania',
  description: 'Regala un lavaggio auto professionale. Gift card WASH HUB disponibili in 3 tagli: €20, €50, €100.',
}

const GIFT_CARDS = [
  {
    value: '20',
    label: '1 lavaggio',
    desc: 'Copre 1 lavaggio tradizionale completo (da €18) o 1 esterno con credito residuo.',
    color: 'bg-white border-[#E8E8E4]',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_GIFT_20',
  },
  {
    value: '50',
    label: '2–3 lavaggi',
    desc: 'Circa 2 lavaggi tradizionali completi o 3 lavaggi esterni. Il credito residuo non scade.',
    color: 'bg-[#0F0F0F] border-[#0F0F0F]',
    highlight: true,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_GIFT_50',
  },
  {
    value: '100',
    label: '5–6 lavaggi',
    desc: 'Fino a 5 lavaggi tradizionali, oppure 1 Performance Intenso (€29) + 3 completi e altro.',
    color: 'bg-white border-[#E8E8E4]',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/PLACEHOLDER_GIFT_100',
  },
]

export default function GiftCardPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Il regalo perfetto</p>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Gift Card.
          </h1>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Regala un&rsquo;auto pulita. Acquisti online, usi quando vuoi.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {GIFT_CARDS.map(({ value, label, desc, highlight, stripeLink }, i) => (
              <AnimatedSection key={value} delay={i * 0.1}
                className={`relative rounded-2xl p-8 border-2 ${highlight ? 'bg-[#0F0F0F] border-[#F5C518] shadow-[0_0_40px_rgba(245,197,24,0.2)]' : 'bg-white border-[#E8E8E4]'}`}>
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5C518] text-[#0F0F0F] text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                    Più regalata
                  </div>
                )}
                <p className={`text-5xl font-black mb-1 ${highlight ? 'text-white' : 'text-[#0F0F0F]'}`}>€{value}</p>
                <p className={`text-sm font-semibold mb-4 ${highlight ? 'text-[#F5C518]' : 'text-[#6B6B6B]'}`}>{label}</p>
                <p className={`text-sm leading-relaxed mb-8 ${highlight ? 'text-white/60' : 'text-[#6B6B6B]'}`}>{desc}</p>
                <a href={stripeLink} target="_blank" rel="noopener noreferrer"
                  className={`block text-center py-3.5 rounded-full font-bold text-sm transition-all ${
                    highlight
                      ? 'bg-[#F5C518] text-[#0F0F0F] hover:bg-[#E0B210]'
                      : 'bg-[#0F0F0F] text-white hover:bg-[#1a1a1a]'
                  }`}>
                  Acquista →
                </a>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-6 text-center"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Come funziona
            </h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Acquisti online', desc: 'Pagamento sicuro con Stripe. Ricevi subito la ricevuta via email.' },
                { step: '02', title: 'La regali', desc: 'Mostra la ricevuta email o stampala. Nessun codice da ricordare.' },
                { step: '03', title: 'Si prenota', desc: 'Chi riceve il regalo prenota online o passa direttamente — mostra la ricevuta ai nostri addetti.' },
                { step: '04', title: 'Auto pulita', desc: 'Scala il valore dalla gift card. Il cambio eventuale rimane come credito.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5 p-5 rounded-2xl bg-white border border-[#E8E8E4]">
                  <span className="font-black text-2xl text-[#F5C518] shrink-0 leading-none">{step}</span>
                  <div>
                    <p className="font-bold text-[#0F0F0F] mb-1">{title}</p>
                    <p className="text-[#6B6B6B] text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
