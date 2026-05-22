import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'
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
        <HiggsfieldImage
          prompt="modern self-service car wash station at night, neon lights illuminating the structure, futuristic industrial design, Paesi Etnei Catania, energetic atmosphere, wide angle"
          className="absolute inset-0 w-full h-full opacity-25"
          aspectRatio="auto"
        />
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

      {/* Il messaggio 24/7 in grande */}
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
                  ['📍 Indirizzo', 'Via Galileo Galilei 28, Paesi Etnei (CT)\npresso stazione LUKoil'],
                  ['⏰ Self service', 'Aperto 24 ore · 7 giorni su 7'],
                  ['🧼 Lavaggio manuale', 'Lun–Sab 8:00–18:30'],
                  ['🪙 Pagamento', 'Gettoni · Carta · Contactless'],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <span className="text-[#6B6B6B] text-sm w-32 shrink-0">{label}</span>
                    <span className="font-medium text-[#0F0F0F]">{val}</span>
                  </div>
                ))}
              </div>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] font-semibold text-sm hover:bg-[#0F0F0F] hover:text-white transition-all">
                Come arrivare →
              </a>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <h3 className="font-display text-2xl font-bold text-[#0F0F0F] mb-6"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Come funziona
              </h3>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Arrivi quando vuoi', desc: 'La stazione è sempre aperta e sempre disponibile, giorno e notte.' },
                  { step: '02', title: 'Scegli il programma', desc: 'Dal lavaggio base all\'intensivo con cera. Prezzi chiari sul display.' },
                  { step: '03', title: 'Inserisci i gettoni', desc: 'Accettiamo monete, banconote e pagamenti contactless.' },
                  { step: '04', title: 'Via in pochi minuti', desc: 'Programma rapido, alta pressione, risultato professionale.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4 p-5 rounded-2xl bg-white border border-[#E8E8E4]">
                    <span className="font-display text-2xl font-black text-[#F5C518] shrink-0 leading-none"
                      style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                      {step}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#0F0F0F] mb-1">{title}</h4>
                      <p className="text-[#6B6B6B] text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA giallo */}
      <section className="bg-[#F5C518] py-20 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F] mb-4"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Sempre aperto per te.
          </h2>
          <p className="text-[#0F0F0F]/60 text-lg mb-8">Passa quando vuoi, nessuna prenotazione necessaria.</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F0F0F] text-white font-bold text-base hover:bg-[#1a1a1a] transition-all hover:scale-105">
            Indicazioni stradali →
          </a>
        </AnimatedSection>
      </section>
    </div>
  )
}
