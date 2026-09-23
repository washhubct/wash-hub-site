import type { Metadata } from 'next'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ParcheggioSmartForm } from '@/components/parcheggio/ParcheggioSmartForm'
import { INDIRIZZO, MAPS_URL } from '@/lib/parcheggio-smart'

export const metadata: Metadata = {
  title: 'Parcheggio Smart — codice cancello, anche di notte',
  description: 'Parcheggio interno al Lungomare di Catania senza operatore: paghi online, ricevi un codice a 6 cifre e apri il cancello da solo. Da 2 ore, anche di notte. €2/ora, max €15 al giorno.',
  openGraph: {
    title: 'Parcheggio Smart WASH HUB — apri il cancello con un codice',
    description: 'Paghi online, ricevi il codice, parcheggi da solo. Anche di notte. Via Anfuso 35, Catania.',
  },
}

const STEPS = [
  { n: '1', t: 'Paghi online', d: 'Targa, cellulare, quante ore ti servono. Carta o Apple/Google Pay tramite SumUp.' },
  { n: '2', t: 'Ricevi il codice', d: 'Un codice a 6 cifre valido solo nella fascia che hai scelto. Lo trovi subito a schermo e lo salvi su WhatsApp.' },
  { n: '3', t: 'Apri il cancello', d: 'Digiti il codice sul tastierino in entrata e in uscita. Nessuna chiave, nessuno da chiamare.' },
]

const FAQ = [
  { q: 'Funziona anche di notte e nei festivi?', a: 'Sì. Il codice vale nella fascia che scegli tu, a qualsiasi ora, anche quando l’autolavaggio è chiuso.' },
  { q: 'E se resto più a lungo?', a: 'Il codice scade all’orario indicato. Prendi un nuovo codice da qui oppure paga la differenza al banco in orario di apertura.' },
  { q: 'Posso prenotare per dopo?', a: 'Sì, fino a 7 giorni prima: scegli data e ora di inizio. Il codice si attiva 5 minuti prima.' },
  { q: 'Quanto costa?', a: '€2 all’ora con minimo 2 ore. Fino a 6 ore paghi al massimo €8, fino a 24 ore al massimo €15. La stessa tariffa del parcheggio a ore.' },
]

export default function ParcheggioSmartPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F0F0F] text-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden
          style={{ background: 'radial-gradient(60% 50% at 80% 20%, rgba(200,168,78,0.25), transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5" style={{ background: '#C8A84E', color: '#0F0F0F' }}>
              Novità · Lungomare
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] mb-6" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Parcheggia<br />da solo.<br /><span style={{ color: '#C8A84E' }}>Anche di notte.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-lg leading-relaxed">
              Paghi online, ricevi un codice a 6 cifre e apri il cancello del nostro parcheggio interno quando vuoi. Da 2 ore in su, €2 l&rsquo;ora.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Minimo 2 ore', 'Max €15 al giorno', 'Nessun operatore', 'Codice in 10 secondi'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs border border-white/20 text-white/70">{t}</span>
              ))}
            </div>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 mt-8 text-sm text-white/60 hover:text-white transition">
              📍 {INDIRIZZO} <span aria-hidden>↗</span>
            </a>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1} className="lg:justify-self-end w-full max-w-xl">
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
              <h3 className="font-display text-3xl font-black" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>Semplice come il parcheggio a ore.</h3>
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
