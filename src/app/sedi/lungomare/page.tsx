import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { schemaPaginaSede, sedeLungomare } from '@/lib/schema'
import { EMAIL, MAPPE, TELEFONO, TELEFONO_HREF } from '@/lib/sedi'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Autolavaggio a mano sul Lungomare di Catania | WASH HUB' },
  description: 'Lavaggio auto a mano con operatori sul Lungomare di Catania, Via Anfuso 35. Interni, tappezzeria, sanificazione e parcheggio. Aperto lun–sab 8:00–18:30.',
}

export default function LungomareePage() {
  return (
    <div className="pt-20">
      <JsonLd data={schemaPaginaSede(sedeLungomare)} />
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#0F0F0F]">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24 w-full">
          <AnimatedSection eager>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#C8A84E] text-[#0F0F0F]">
              WASH HUB Lungomare
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Autolavaggio<br className="sm:hidden" /> a mano<br />
              <span style={{ color: '#C8A84E' }}>sul Lungomare<br className="sm:hidden" /> di Catania</span>
            </h1>
            <p className="text-white/60 text-xl mt-4 max-w-lg">
              La sede storica. Dove ogni lavaggio è un&rsquo;esperienza.
            </p>
            {/* Fatti chiave in una frase: indirizzo, orari, telefono e prezzi si leggono senza scorrere */}
            <p className="text-white/85 text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
              WASH HUB Lungomare è in{' '}
              <a href={MAPPE.lungomare.scheda} target="_blank" rel="noopener noreferrer" className="underline decoration-[#C8A84E] underline-offset-4 hover:text-white">Via Anfuso 35 a Catania</a>.
              Siamo aperti dal lunedì al sabato dalle 8:00 alle 18:30, domenica chiuso.
              Telefono <a href={TELEFONO_HREF} className="underline decoration-[#C8A84E] underline-offset-4 hover:text-white">{TELEFONO}</a>.
              Lavaggio esterno da €14, lavaggio completo interno ed esterno da €18, parcheggio interno a €2 l&rsquo;ora.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/prenota" prefetch={false}
                className="inline-flex items-center px-6 py-3 rounded-full font-bold text-sm bg-[#C8A84E] text-[#0F0F0F] hover:opacity-90 transition-all">
                Prenota online →
              </Link>
              <a href={TELEFONO_HREF}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
                📞 Chiama
              </a>
              <a href={MAPPE.lungomare.indicazioni} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border border-white/30 text-white hover:bg-white/10 transition-all">
                📍 Indicazioni
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Info + Servizi */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F] mb-6"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Servizio con operatori.<br />Nessun compromesso.
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed text-lg mb-8"
                style={{ fontFamily: 'var(--font-instrument)', fontStyle: 'italic' }}>
                &ldquo;Al Lungomare ogni auto viene trattata con la stessa cura che riserviamo alla nostra. Prodotti professionali, mani esperte, risultato garantito.&rdquo;
              </p>
              <div className="space-y-4">
                {([
                  ['📍 Indirizzo', 'Via Anfuso 35, Catania', MAPPE.lungomare.scheda],
                  ['🕗 Orari', 'Lunedì–Sabato 8:00–18:30 · Domenica chiuso'],
                  ['📞 Telefono', TELEFONO, TELEFONO_HREF],
                  ['✉️ Email', EMAIL, `mailto:${EMAIL}`],
                ] as [string, string, string?][]).map(([label, val, href]) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <span className="text-[#6B6B6B] text-sm w-32 shrink-0">{label}</span>
                    {href
                      ? <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="font-medium text-[#0F0F0F] underline decoration-[#C8A84E] underline-offset-4 hover:text-[#8a7230]">{val}</a>
                      : <span className="font-medium text-[#0F0F0F]">{val}</span>}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/prenota" prefetch={false}
                  className="inline-flex items-center px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                  Prenota online →
                </Link>
                <a href={MAPPE.lungomare.indicazioni} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 rounded-full font-bold text-sm border-2 border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white transition-all">
                  Indicazioni stradali →
                </a>
              </div>
              <p className="mt-5 text-sm text-[#6B6B6B]">
                <Link href="/servizi" className="underline font-semibold text-[#0F0F0F]">Listino completo</Link>
                {' · '}
                <Link href="/priority" className="underline font-semibold text-[#0F0F0F]">Priority nelle ore di punta</Link>
                {' · '}
                <Link href="/faq" className="underline font-semibold text-[#0F0F0F]">Domande frequenti</Link>
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="space-y-4">
              {([
                { icon: '🧼', title: 'Lavaggio completo interno ed esterno', desc: 'Carrozzeria, cerchi, vetri e abitacolo. Risultato impeccabile.' },
                { icon: '✨', title: 'Performance Intenso', desc: 'Il Tradizionale spinto al massimo, con trattamento schiumogeno.' },
                { icon: '🧽', title: 'Smacchiatura e sanificazione interni', desc: 'Sedili e tessuti smacchiati a fondo, abitacolo sanificato.', href: '/servizi/sanificazione-interni' },
                { icon: '❄️', title: 'Sanificazione impianto clima', desc: 'Bomboletta sanificante, presidio medico-chirurgico.', href: '/servizi/sanificazione-interni' },
                { icon: '🔧', title: 'Lavaggio motore', desc: 'Vano motore pulito con cura, su richiesta.' },
                { icon: '🪡', title: 'Tappezzeria premium', desc: 'Sedili, tetti, pannelli porta. Servizio su prenotazione.' },
                { icon: '🅿️', title: 'Parcheggio', desc: 'Ad ore o abbonamento mensile — posti coperti e scoperti.', href: '/parcheggio-smart' },
              ] as { icon: string, title: string, desc: string, href?: string }[]).map(({ icon, title, desc, href }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-white border border-[#E8E8E4]">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0F0F0F] mb-1">
                      {href ? <Link href={href} className="underline decoration-[#C8A84E] underline-offset-4 hover:text-[#8a7230]">{title}</Link> : title}
                    </h3>
                    <p className="text-[#6B6B6B] text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Parcheggio */}
      <section className="py-20 md:py-28 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#C8A84E] text-[#0F0F0F]">
              Novità
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Parcheggio Lungomare
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mb-12">
              Non solo lavaggio: al Lungomare trovi anche il parcheggio. A ore con Parcheggio Smart: paghi online
              e apri il cancello con un codice, minimo 2 ore. Oppure in abbonamento mensile con posto riservato — coperto o scoperto.
              È accessibile 24 ore su 24; l&rsquo;operatore è presente dal lunedì al sabato, dalle 7:30 alle 18:30.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '⏱️', title: 'Parcheggio ad ore', price: '€2', unit: '/ ora', desc: 'Minimo 2 ore. Paghi online ed entri con il codice.', highlight: false },
              { icon: '🅿️', title: 'Abbonamento — Posto scoperto', price: '€100', unit: '/ mese', desc: 'Posto auto riservato tutto il mese, all’aperto. Comodità e tariffa contenuta.', highlight: false },
              { icon: '🏠', title: 'Abbonamento — Posto coperto', price: '€140', unit: '/ mese', desc: 'Posto al coperto: la tua auto protetta da sole, pioggia e intemperie tutto il mese.', highlight: true },
            ].map(({ icon, title, price, unit, desc, highlight }) => (
              <div key={title}
                className={`p-6 rounded-2xl border ${highlight ? 'bg-[#C8A84E] border-[#C8A84E]' : 'bg-white/[0.04] border-white/10'}`}>
                <span className="text-3xl">{icon}</span>
                <h3 className={`font-bold mt-4 mb-1 text-lg ${highlight ? 'text-[#0F0F0F]' : 'text-white'}`}>{title}</h3>
                <div className={`mb-2 ${highlight ? 'text-[#0F0F0F]' : 'text-[#C8A84E]'}`}>
                  <span className="font-display text-3xl font-black" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{price}</span>
                  <span className="text-sm font-medium opacity-70"> {unit}</span>
                </div>
                <p className={`text-sm leading-relaxed ${highlight ? 'text-[#0F0F0F]/70' : 'text-white/55'}`}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="https://wa.me/390954695153?text=Ciao!%20Vorrei%20informazioni%20sul%20parcheggio%20al%20Lungomare%20(tariffe%20e%20disponibilit%C3%A0)."
              target="_blank" rel="noopener"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{ background: '#C8A84E', color: '#0F0F0F' }}>
              💬 Tariffe e disponibilità su WhatsApp →
            </a>
            <Link href="/parcheggio-smart"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm border border-white/25 text-white hover:bg-white/10 transition-all">
              Tutte le formule e Parcheggio Smart →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
