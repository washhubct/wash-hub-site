import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { schemaPaginaSede, sedePop } from '@/lib/schema'
import { MAPPE, TELEFONO, TELEFONO_HREF } from '@/lib/sedi'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Autolavaggio self service 24/7 a San Gregorio di Catania' },
  description: 'Autolavaggio self service aperto 24 ore su 24 a San Gregorio di Catania, Via Galileo Galilei 28. Senza prenotazione. Lavaggio a mano lun–sab 8:00–19:00, domenica 8:00–13:30.',
}

export default function PaesiEtneiPage() {
  return (
    <div className="pt-20">
      <JsonLd data={schemaPaginaSede(sedePop)} />
      {/* Hero giallo */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#F5C518]">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 w-full">
          <AnimatedSection eager>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-4 bg-[#E63946] text-white">
              WASH HUB POP · Paesi Etnei
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-[#0F0F0F] leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Autolavaggio self service 24/7<br />
              a San Gregorio di Catania
            </h1>
            <p className="text-[#0F0F0F]/70 text-xl mt-4 max-w-lg font-medium">
              Sempre aperto. Nessuna attesa. La tua auto pulita quando vuoi tu.
            </p>
            {/* Fatti chiave in una frase: cos'è POP, dove, quando, e che qui non si prenota */}
            <p className="text-[#0F0F0F]/85 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
              WASH HUB POP è la sede self service di WASH HUB: si trova in{' '}
              <a href={MAPPE.pop.scheda} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 font-semibold">Via Galileo Galilei 28 a San Gregorio di Catania</a>,
              presso la stazione LUKoil. Il self service è aperto 24 ore su 24, tutti i giorni; il lavaggio a mano con operatori
              dal lunedì al sabato 8:00–19:00 e la domenica 8:00–13:30. Qui non si prenota: passi direttamente.
              Telefono <a href={TELEFONO_HREF} className="underline underline-offset-4 font-semibold">{TELEFONO}</a>.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={MAPPE.pop.indicazioni} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#0F0F0F] text-white hover:bg-[#1a1a1a] transition-all">
                📍 Come arrivare
              </a>
              <a href={TELEFONO_HREF}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white transition-all">
                📞 Chiama
              </a>
            </div>
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
                {([
                  ['📍 Indirizzo', 'Via Galileo Galilei 28, San Gregorio di Catania, presso stazione LUKoil', MAPPE.pop.scheda],
                  ['🧼 Servizio manuale', 'Lun–Sab 8:00–19:00 · Dom 8:00–13:30'],
                  ['⏰ Self service', 'Aperto 24/7 — auto, interni, camion'],
                  ['📅 Prenotazione', 'Non serve: qui non si prenota, passi direttamente'],
                  ['🪙 Pagamento', 'Monete · Carta · Contactless'],
                  ['📞 Telefono', TELEFONO, TELEFONO_HREF],
                ] as [string, string, string?][]).map(([label, val, href]) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <span className="text-[#6B6B6B] text-sm w-36 shrink-0">{label}</span>
                    {href
                      ? <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="font-medium text-[#0F0F0F] underline decoration-[#F5C518] decoration-2 underline-offset-4">{val}</a>
                      : <span className="font-medium text-[#0F0F0F]">{val}</span>}
                  </div>
                ))}
              </div>
              <a href={MAPPE.pop.indicazioni} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] font-semibold text-sm hover:bg-[#0F0F0F] hover:text-white transition-all">
                Come arrivare →
              </a>
              <p className="mt-6 text-sm text-[#6B6B6B]">
                <Link href="/servizi" className="underline font-semibold text-[#0F0F0F]">Cosa include ogni lavaggio a mano</Link>
                {' · '}
                <Link href="/faq" className="underline font-semibold text-[#0F0F0F]">Domande frequenti</Link>
                {' · '}
                <Link href="/sedi/lungomare" className="underline font-semibold text-[#0F0F0F]">Vuoi prenotare? Sede Lungomare</Link>
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="space-y-8">
              {/* Self service */}
              <div>
                <span className="inline-block mb-2 px-2 py-0.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-xs font-black uppercase tracking-wider">Self 24/7</span>
                <h2 className="font-display text-xl font-bold text-[#0F0F0F] mb-4"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  Come funziona il self service
                </h2>
                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Arrivi quando vuoi', desc: 'La stazione è sempre aperta, giorno e notte, 365 giorni l\'anno.' },
                    { step: '02', title: 'Scegli il programma', desc: 'Dal lavaggio base all\'intensivo con cera. Prezzi chiari sul display.' },
                    { step: '03', title: 'Paghi come preferisci', desc: 'Monete, carta o contactless.' },
                    { step: '04', title: 'Via in pochi minuti', desc: 'Alta pressione, risultato professionale.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E8E8E4]">
                      <span className="font-display text-xl font-black text-[#F5C518] shrink-0 leading-none"
                        style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{step}</span>
                      <div>
                        <h3 className="font-bold text-[#0F0F0F] mb-0.5 text-sm">{title}</h3>
                        <p className="text-[#6B6B6B] text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lavaggio manuale */}
              <div>
                <span className="inline-block mb-2 px-2 py-0.5 rounded-full bg-[#0F0F0F] text-white text-xs font-black uppercase tracking-wider">Manuale Lun–Dom</span>
                <h2 className="font-display text-xl font-bold text-[#0F0F0F] mb-4"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  Come funziona il lavaggio a mano
                </h2>
                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Arrivi in orario', desc: 'I nostri operatori ci sono tutti i giorni: lunedì–sabato 8:00–19:00, domenica 8:00–13:30.' },
                    { step: '02', title: 'Trovi i nostri operatori', desc: 'Nessuna prenotazione necessaria: passi direttamente, ti accogliamo all\'arrivo.' },
                    { step: '03', title: 'Scegli il servizio', desc: 'Esterno, tradizionale o Performance Intenso. Ti consigliamo noi.' },
                    { step: '04', title: 'Ritiri l\'auto pulita', desc: 'Lavoro fatto a mano, con cura. Come piace a noi.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E8E8E4]">
                      <span className="font-display text-xl font-black text-[#0F0F0F] shrink-0 leading-none"
                        style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{step}</span>
                      <div>
                        <h3 className="font-bold text-[#0F0F0F] mb-0.5 text-sm">{title}</h3>
                        <p className="text-[#6B6B6B] text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#0F0F0F] font-medium">Qui non si prenota: passi direttamente negli orari degli operatori. La prenotazione online riguarda solo la <Link href="/sedi/lungomare" className="underline">sede Lungomare</Link>.</p>
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
          <a href={MAPPE.pop.indicazioni} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F0F0F] text-white font-bold text-base hover:bg-[#1a1a1a] transition-all hover:scale-105">
            Indicazioni stradali →
          </a>
        </AnimatedSection>
      </section>
    </div>
  )
}
