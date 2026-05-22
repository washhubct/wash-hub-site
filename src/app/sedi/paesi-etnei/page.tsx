import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WASH HUB POP Paesi Etnei — Autolavaggio Self Service 24/7',
  description: 'Autolavaggio self service aperto 24 ore su 24, 7 giorni su 7 ai Paesi Etnei, Catania. Nessuna prenotazione, sempre disponibile.',
}

export default function PaesiEtneiPage() {
  return (
    <div className="pt-20">
      {/* Hero giallo */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#F5C518]">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4 bg-[#E63946] text-white">
              SELF 24/7
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-black text-[#0F0F0F] leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              WASH HUB POP<br />
              Paesi Etnei
            </h1>
            <p className="text-[#0F0F0F]/60 text-xl mt-4 max-w-lg font-medium">
              Sempre aperto. Nessuna attesa. La tua auto pulita quando vuoi tu.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 24/7 */}
      <section className="bg-[#0F0F0F] py-16 md:py-20 text-center">
        <AnimatedSection>
          <p className="font-display text-6xl md:text-9xl font-black text-[#F5C518] leading-none"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            24/7
          </p>
          <p className="text-white/60 text-xl mt-4">365 giorni all&rsquo;anno. Nessuna eccezione.</p>
        </AnimatedSection>
      </section>

      {/* Info + Come funziona */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F] mb-6"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Libertà totale.<br />Sempre aperto.
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed text-lg mb-8"
                style={{ fontFamily: 'var(--font-instrument)', fontStyle: 'italic' }}>
                &ldquo;Nessun appuntamento, nessun orario da rispettare. Passi quando vuoi, la stazione è sempre operativa e sempre pulita.&rdquo;
              </p>
              <div className="space-y-4 mb-8">
                {[
                  ['📍 Indirizzo', 'Via Galileo Galilei 28, San Gregorio di Catania\npresso stazione LUKoil'],
                  ['🧼 Servizio manuale', 'Lun–Sab 8:00–18:30'],
                  ['⏰ Self service', 'Aperto 24/7 — auto, interni, camion'],
                  ['🪙 Pagamento', 'Monete · Carta · Contactless'],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <span className="text-[#6B6B6B] text-sm w-36 shrink-0">{label}</span>
                    <span className="font-medium text-[#0F0F0F]">{val}</span>
                  </div>
                ))}
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Via+Galileo+Galilei+28+San+Gregorio+di+Catania" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] font-semibold text-sm hover:bg-[#0F0F0F] hover:text-white transition-all">
                Come arrivare →
              </a>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="space-y-8">
              {/* Self service */}
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F0F0F] mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  <span className="px-2 py-0.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-xs font-black uppercase tracking-wider">Self 24/7</span>
                  Come funziona
                </h3>
                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Arrivi quando vuoi', desc: 'La stazione è sempre aperta, giorno e notte, 365 giorni l\'anno.' },
                    { step: '02', title: 'Scegli il programma', desc: 'Dal lavaggio base all\'intensivo con cera. Prezzi chiari sul display.' },
                    { step: '03', title: 'Inserisci le monete', desc: 'Accettiamo monete e pagamenti contactless.' },
                    { step: '04', title: 'Via in pochi minuti', desc: 'Alta pressione, risultato professionale.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E8E8E4]">
                      <span className="font-display text-xl font-black text-[#F5C518] shrink-0 leading-none"
                        style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{step}</span>
                      <div>
                        <h4 className="font-bold text-[#0F0F0F] mb-0.5 text-sm">{title}</h4>
                        <p className="text-[#6B6B6B] text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lavaggio manuale */}
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F0F0F] mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  <span className="px-2 py-0.5 rounded-full bg-[#0F0F0F] text-white text-xs font-black uppercase tracking-wider">Manuale Lun–Sab</span>
                  Come funziona
                </h3>
                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Arrivi in orario', desc: 'I nostri operatori sono disponibili dal lunedì al sabato, 8:00–18:30.' },
                    { step: '02', title: 'Trovi i nostri operatori', desc: 'Nessuna prenotazione necessaria — pass direct, ti accogliamo all\'arrivo.' },
                    { step: '03', title: 'Scegli il servizio', desc: 'Esterno, tradizionale o Performance Intenso. Ti consigliamo noi.' },
                    { step: '04', title: 'Ritiri l\'auto pulita', desc: 'Lavoro fatto a mano, con cura. Come piace a noi.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E8E8E4]">
                      <span className="font-display text-xl font-black text-[#0F0F0F] shrink-0 leading-none"
                        style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{step}</span>
                      <div>
                        <h4 className="font-bold text-[#0F0F0F] mb-0.5 text-sm">{title}</h4>
                        <p className="text-[#6B6B6B] text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#6B6B6B] italic">* Prenotazione online non disponibile per questa sede al momento.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5C518] py-20 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F] mb-4"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Sempre aperto per te.
          </h2>
          <p className="text-[#0F0F0F]/60 text-lg mb-8">Passa quando vuoi, nessuna prenotazione necessaria.</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Via+Galileo+Galilei+28+San+Gregorio+di+Catania" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F0F0F] text-white font-bold text-base hover:bg-[#1a1a1a] transition-all hover:scale-105">
            Indicazioni stradali →
          </a>
        </AnimatedSection>
      </section>
    </div>
  )
}
