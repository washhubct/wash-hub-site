import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pacchetti Flotte e Aziende — WASH HUB Catania',
  description: 'Soluzioni personalizzate per concessionarie, autonoleggi, taxi e flotte aziendali. Prezzi dedicati, fatturazione, slot riservati.',
}

const BENEFITS = [
  { icon: '💰', title: 'Prezzi dedicati', body: 'Tariffe scontate in base ai volumi mensili. Più auto lavi, più risparmi.' },
  { icon: '🧾', title: 'Fatturazione semplice', body: 'Fattura mensile riepilogativa. Zero contanti, tutto tracciato per la contabilità.' },
  { icon: '📅', title: 'Slot prioritari', body: 'Orari dedicati per evitare attese. Le tue auto pronte quando servono.' },
  { icon: '🚗', title: 'Qualsiasi veicolo', body: 'Berline, SUV, furgoni, veicoli commerciali. Gestiamo qualsiasi flotta.' },
]

const CLIENTI = [
  'Concessionarie auto',
  'Autonoleggi e car sharing',
  'Taxi e NCC',
  'Agenzie di rappresentanza',
  'Società con flotta aziendale',
  'Scuole guida',
]

export default function FlottePage() {
  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-[#0F0F0F] text-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <AnimatedSection>
            <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Per le aziende</p>
            <h1 className="font-display text-5xl md:text-6xl font-black leading-tight mb-6"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Pacchetti flotte<br />
              <span className="text-[#F5C518]">e aziende.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Gestiamo la pulizia della tua flotta con tariffe dedicate, fatturazione mensile e slot prioritari. Tu pensi al business, noi alle auto.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {BENEFITS.map(({ icon, title, body }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}
                className="p-8 rounded-2xl bg-white border border-[#E8E8E4] hover:border-[#F5C518]/50 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-[#0F0F0F] text-lg mb-2"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  {title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{body}</p>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F] mb-6"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Chi lavora già con noi
              </h2>
              <div className="space-y-3">
                {CLIENTI.map(c => (
                  <div key={c} className="flex items-center gap-3 text-[#6B6B6B]">
                    <span className="text-[#F5C518] font-black">✓</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}
              className="bg-[#0F0F0F] rounded-2xl p-10 text-white text-center">
              <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Inizia oggi</p>
              <h3 className="font-display text-3xl font-black mb-4"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Richiedi un preventivo
              </h3>
              <p className="text-white/60 mb-8 text-sm">
                Scrivici su WhatsApp con il numero di veicoli e la frequenza di lavaggio. Ti risponderemo entro 2 ore con una proposta su misura.
              </p>
              <a href="https://wa.me/390954695153?text=Ciao%20WASH%20HUB!%20Sono%20interessato%20a%20un%20accordo%20per%20la%20pulizia%20della%20mia%20flotta%20aziendale.%20Possiamo%20sentirci%3F"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold hover:bg-[#E0B210] transition-all">
                Parla con noi →
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
