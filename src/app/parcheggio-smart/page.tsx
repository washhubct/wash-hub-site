import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ParcheggioSmartForm } from '@/components/parcheggio/ParcheggioSmartForm'
import { INDIRIZZO, MAPS_URL } from '@/lib/parcheggio-smart'
import { JsonLd } from '@/components/seo/JsonLd'
import { briciole, fornitoreLungomare, parcheggioLungomare, PARCHEGGIO_ID } from '@/lib/schema'
import { MAPPE } from '@/lib/sedi'

const schemaParcheggio = {
  '@context': 'https://schema.org',
  '@graph': [
    parcheggioLungomare,
    {
      '@type': 'Service',
      '@id': 'https://wash-hub.it/parcheggio-smart/#service',
      name: 'Parcheggio Smart',
      serviceType: 'Parcheggio a ore con accesso a codice',
      description: 'Parcheggio al Lungomare di Catania senza operatore: paghi online, ricevi un codice e apri il cancello da solo, anche di notte.',
      url: 'https://wash-hub.it/parcheggio-smart/',
      provider: fornitoreLungomare,
      availableAtOrFrom: { '@id': PARCHEGGIO_ID },
      areaServed: { '@type': 'City', name: 'Catania' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: 2, priceCurrency: 'EUR', unitCode: 'HUR', unitText: 'ora' },
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 2, unitCode: 'HUR' },
      },
    },
    briciole([['Parcheggio Lungomare', '/parcheggio-smart/']]),
  ],
}

const WHATSAPP_ABBONAMENTO = 'https://wa.me/390954695153?text=Ciao%20WASH%20HUB%2C%20vorrei%20informazioni%20sull%27abbonamento%20mensile%20al%20parcheggio.'

// Le tre formule del parcheggio: stessi prezzi della pagina sede Lungomare
const FORMULE = [
  {
    icona: '🔐', titolo: 'Parcheggio Smart, con il codice', prezzo: '€2', unita: '/ ora',
    testo: 'Paghi online e apri il cancello con un codice a 6 cifre, a qualsiasi ora, anche quando l’autolavaggio è chiuso. Minimo 2 ore; fino a 6 ore paghi al massimo €8, fino a 24 ore al massimo €15.',
    cta: 'Prendi il codice', href: '#prendi-codice', evidenza: true,
  },
  {
    icona: '⏱️', titolo: 'A ore, paghi all’uscita', prezzo: '€2', unita: '/ ora',
    testo: 'Entri, parcheggi e paghi quando esci. Minimo 2 ore, poi paghi il tempo che usi. L’operatore è presente dalle 7:30 alle 18:30.',
    cta: 'Come arrivare', href: MAPPE.lungomare.indicazioni, evidenza: false,
  },
  {
    icona: '📅', titolo: 'Abbonamento mensile', prezzo: 'da €100', unita: '/ mese',
    testo: 'Posto auto riservato tutto il mese: scoperto €100 al mese, coperto €140 al mese.',
    cta: 'Chiedi disponibilità su WhatsApp', href: WHATSAPP_ABBONAMENTO, evidenza: false,
  },
]

export const metadata: Metadata = {
  title: 'Parcheggio Lungomare Catania, aperto 24 ore su 24',
  description: 'Parcheggio in Via Anfuso 35 sul Lungomare di Catania, accessibile 24 ore su 24: a ore da €2 (minimo 2 ore), con codice anche di notte, abbonamento mensile da €100.',
  openGraph: {
    title: 'Parcheggio sul Lungomare di Catania — WASH HUB',
    description: 'Accessibile 24 ore su 24: a ore, con codice anche di notte o in abbonamento mensile. Via Anfuso 35, Catania.',
    // openGraph di pagina sostituisce quello del layout: i campi comuni vanno ripetuti
    type: 'website',
    locale: 'it_IT',
    url: './',
    siteName: 'WASH HUB',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { n: '1', t: 'Paghi online', d: 'Targa, cellulare, email e quante ore ti servono. Carta o Apple/Google Pay tramite SumUp.' },
  { n: '2', t: 'Ricevi il codice', d: 'Un codice a 6 cifre valido solo nella fascia che hai scelto. Lo vedi subito a schermo e lo ricevi via email.' },
  { n: '3', t: 'Apri il cancello', d: 'Digiti il codice sul tastierino in entrata e in uscita. Nessuna chiave, nessuno da chiamare.' },
]

const FAQ = [
  { q: 'Che orari ha il parcheggio?', a: 'Il parcheggio è accessibile 24 ore su 24. L’operatore è presente dalle 7:30 alle 18:30; negli altri orari entri ed esci con il codice di Parcheggio Smart.' },
  { q: 'Funziona anche di notte e nei festivi?', a: 'Sì. Il codice vale nella fascia che scegli tu, a qualsiasi ora, anche quando l’autolavaggio è chiuso.' },
  { q: 'E se resto più a lungo?', a: 'Il codice scade all’orario indicato. Prendi un nuovo codice da qui oppure paga la differenza all’operatore, presente dalle 7:30 alle 18:30.' },
  { q: 'Posso prenotare per dopo?', a: 'Sì, fino a 7 giorni prima: scegli data e ora di inizio. Il codice si attiva 5 minuti prima.' },
  { q: 'Quanto costa?', a: '€2 all’ora con minimo 2 ore. Fino a 6 ore paghi al massimo €8, fino a 24 ore al massimo €15. La stessa tariffa del parcheggio a ore.' },
  { q: 'C’è un minimo di ore?', a: 'Sì, 2 ore. Con il parcheggio a ore poi paghi il tempo che usi, a €2 l’ora; con Parcheggio Smart scegli tu le ore quando prendi il codice.' },
  { q: 'Dove si trova il parcheggio?', a: 'Dentro WASH HUB Lungomare, in Via Anfuso 35 a Catania: è il parcheggio interno della sede.' },
  { q: 'C’è l’abbonamento mensile?', a: 'Sì, con posto riservato: scoperto €100 al mese, coperto €140 al mese. Per la disponibilità scrivici su WhatsApp.' },
]

export default function ParcheggioSmartPage() {
  return (
    <div className="pt-20">
      <JsonLd data={schemaParcheggio} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F0F0F] text-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden
          style={{ background: 'radial-gradient(60% 50% at 80% 20%, rgba(200,168,78,0.25), transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection eager>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5" style={{ background: '#C8A84E', color: '#0F0F0F' }}>
              Novità · Lungomare
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-black leading-[0.95] mb-4" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Parcheggio sul Lungomare di Catania
            </h1>
            <p className="font-display text-2xl md:text-3xl font-black leading-tight mb-6" style={{ fontFamily: 'var(--font-bricolage), system-ui', color: '#C8A84E' }}>
              Parcheggia da solo. Anche di notte.
            </p>
            <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed">
              Il parcheggio interno di WASH HUB è in Via Anfuso 35 a Catania. Con Parcheggio Smart paghi online, ricevi un codice a 6 cifre
              e apri il cancello quando vuoi: €2 l&rsquo;ora, minimo 2 ore. In alternativa parcheggi a ore e paghi all&rsquo;uscita,
              oppure scegli l&rsquo;<a href="#formule" className="underline text-white">abbonamento mensile</a>.
              Il parcheggio è accessibile 24 ore su 24; l&rsquo;operatore è presente dalle 7:30 alle 18:30.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Aperto 24 ore su 24', 'Operatore 7:30–18:30', 'Minimo 2 ore', 'Max €15 al giorno', 'Codice in 10 secondi'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs border border-white/20 text-white/70">{t}</span>
              ))}
            </div>
            {/* Su telefono il modulo sta sotto: scorciatoia per arrivarci subito */}
            <div className="mt-8 lg:hidden">
              <a href="#prendi-codice"
                className="inline-flex items-center px-7 py-3.5 rounded-full font-bold text-sm" style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                Prendi il codice ↓
              </a>
            </div>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 mt-8 text-sm text-white/60 hover:text-white transition">
              📍 {INDIRIZZO} <span aria-hidden>↗</span>
            </a>
          </AnimatedSection>

          <AnimatedSection eager className="lg:justify-self-end w-full max-w-xl">
            <div id="prendi-codice" className="scroll-mt-28">
              <ParcheggioSmartForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Come funziona */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#C8A84E] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Come funziona</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Tre passaggi. Zero attese.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.12}>
                <div className="h-full p-7 rounded-2xl bg-white border border-[#E8E8E4] hover:border-[#C8A84E]/60 hover:shadow-xl transition-all duration-300">
                  <div className="font-black text-4xl text-[#C8A84E] mb-4" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{s.n}</div>
                  <h3 className="font-bold text-lg text-[#0F0F0F] mb-2">{s.t}</h3>
                  <p className="text-[#6B6B6B] leading-relaxed">{s.d}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffa */}
      <section className="py-16 bg-[#F0F0EC]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <AnimatedSection className="rounded-3xl bg-[#0F0F0F] text-white p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <p className="text-[#C8A84E] text-sm font-semibold uppercase tracking-[0.2em] mb-2">Tariffa</p>
              <h2 className="font-display text-3xl font-black" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>Semplice come il parcheggio a ore.</h2>
            </div>
            <div className="md:col-span-2 grid grid-cols-3 gap-4">
              {[['€2', 'all’ora', 'minimo 2 ore'], ['€8', 'massimo', 'fino a 6 ore'], ['€15', 'massimo', 'fino a 24 ore']].map(([a, b, c]) => (
                <div key={c} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                  <div className="font-black text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{a}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-1">{b}</div>
                  <div className="text-white/80 text-sm mt-2">{c}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Le tre formule */}
      <section id="formule" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10 max-w-2xl">
            <p className="text-[#8a7230] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Via Anfuso 35, Catania</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Tre modi di parcheggiare
            </h2>
            <p className="text-[#6B6B6B] mt-4 text-lg leading-relaxed">
              Stesso parcheggio, tre formule: con il codice quando vuoi tu, a ore pagando all&rsquo;uscita, o con il posto riservato tutto il mese.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FORMULE.map((f, i) => (
              <AnimatedSection key={f.titolo} delay={i * 0.08}>
                <div className={`h-full flex flex-col p-7 rounded-2xl border ${f.evidenza ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white' : 'bg-[#FAFAF7] border-[#E8E8E4] text-[#0F0F0F]'}`}>
                  <span className="text-3xl" aria-hidden>{f.icona}</span>
                  <h3 className="font-bold text-xl mt-4 mb-1">{f.titolo}</h3>
                  <div className={f.evidenza ? 'text-[#C8A84E]' : 'text-[#8a7230]'}>
                    <span className="font-display text-3xl font-black" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{f.prezzo}</span>
                    <span className="text-sm font-medium opacity-80"> {f.unita}</span>
                  </div>
                  <p className={`mt-3 leading-relaxed flex-1 ${f.evidenza ? 'text-white/70' : 'text-[#6B6B6B]'}`}>{f.testo}</p>
                  <a href={f.href} {...(f.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`mt-6 inline-flex self-start items-center px-5 py-3 rounded-full font-bold text-sm transition-colors ${f.evidenza ? 'bg-[#C8A84E] text-[#0F0F0F] hover:bg-[#d9bb66]' : 'bg-[#0F0F0F] text-white hover:bg-[#1a1a1a]'}`}>
                    {f.cta} →
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8">
            <p className="text-[#6B6B6B] leading-relaxed max-w-3xl">
              Il parcheggio è accessibile 24 ore su 24 e l&rsquo;operatore è presente dalle 7:30 alle 18:30: fuori da quell&rsquo;orario entri con Parcheggio Smart.
              Parcheggi qui tutti i giorni? Con l&rsquo;abbonamento il posto è tuo.
              Il parcheggio è nella sede <Link href="/sedi/lungomare" className="underline font-semibold text-[#0F0F0F]">WASH HUB Lungomare</Link>:
              mentre l&rsquo;auto è ferma puoi anche <Link href="/prenota" className="underline font-semibold text-[#0F0F0F]">prenotare un lavaggio</Link>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-4xl font-black text-[#0F0F0F]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>Domande veloci</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <AnimatedSection key={f.q} delay={i * 0.06}>
                <details className="group rounded-2xl bg-white border border-[#E8E8E4] p-5 open:border-[#C8A84E]/60">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-[#0F0F0F]">
                    {f.q}<span className="text-[#C8A84E] transition group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-[#6B6B6B] leading-relaxed">{f.a}</p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-[#C8A84E] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-6xl font-black text-[#0F0F0F] leading-tight mb-6" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Il posto c&rsquo;è.<br />Il codice pure.
            </h2>
            <Link href="#prendi-codice"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#0F0F0F] text-white text-lg font-bold hover:bg-[#1a1a1a] transition-all hover:scale-105 active:scale-100">
              Prendi il tuo codice →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
