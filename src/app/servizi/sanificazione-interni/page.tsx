import Link from 'next/link'
import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { briciole, fornitoreLungomare } from '@/lib/schema'
import { MAPPE, TELEFONO, TELEFONO_HREF } from '@/lib/sedi'

export const metadata: Metadata = {
  title: 'Sanificazione interni auto a Catania',
  description: 'Smacchiatura e sanificazione degli interni auto al Lungomare di Catania: sedili e tessuti smacchiati a fondo, abitacolo e impianto clima sanificati.',
}

const WHATSAPP = 'https://wa.me/390954695153?text=Ciao%20WASH%20HUB%2C%20vorrei%20tempi%20e%20costo%20per%20smacchiatura%20e%20sanificazione%20degli%20interni.'

// Solo quello che facciamo davvero: niente prezzi né durate, dipendono dall'auto (si chiedono in sede o su WhatsApp)
const LAVORI = [
  { icon: '🧽', t: 'Smacchiatura di sedili e tessuti', d: 'Sedili e tessuti smacchiati a fondo, non solo aspirati.' },
  { icon: '🫧', t: 'Sanificazione dell’abitacolo', d: 'L’abitacolo viene sanificato dopo la pulizia.' },
  { icon: '❄️', t: 'Sanificazione dell’impianto clima', d: 'Per l’impianto di climatizzazione usiamo una bomboletta sanificante, presidio medico-chirurgico.' },
]

const PASSI = [
  { n: '1', t: 'Ci scrivi o passi in sede', d: 'Ci dici che auto hai e come sono messi gli interni. Su WhatsApp puoi mandarci anche le foto.' },
  { n: '2', t: 'Ti diciamo tempi e costo', d: 'Dipendono dall’auto e dallo stato degli interni: te li diciamo prima di iniziare.' },
  { n: '3', t: 'Porti l’auto al Lungomare', d: 'Via Anfuso 35, Catania. Siamo aperti dal lunedì al sabato, 8:00–18:30.' },
]

const DOMANDE = [
  { q: 'Quanto costa la sanificazione degli interni?', a: 'Il costo della sanificazione dipende dall’auto e dallo stato degli interni, per questo non c’è un prezzo fisso a listino. Chiedilo in sede o su WhatsApp, anche mandando le foto.' },
  { q: 'Dove fate smacchiatura e sanificazione?', a: 'Smacchiatura e sanificazione si fanno solo a WASH HUB Lungomare, in Via Anfuso 35 a Catania. Al POP Paesi Etnei non sono disponibili.' },
  { q: 'Che differenza c’è con il Lavaggio Tradizionale?', a: 'Il Lavaggio Tradizionale comprende aspirazione dell’abitacolo, pulizia di cruscotto e superfici interne e cura dei vetri interni. Smacchiatura e sanificazione sono un lavoro in più: si interviene a fondo su sedili e tessuti e si sanifica l’abitacolo.' },
  { q: 'Su quali interni lavorate?', a: 'Lavoriamo su qualsiasi tipo di interno: tessuto, pelle, alcantara, similpelle.' },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://wash-hub.it/servizi/sanificazione-interni/#service',
      name: 'Smacchiatura e sanificazione interni auto',
      serviceType: 'Sanificazione interni auto',
      description: 'Smacchiatura a fondo di sedili e tessuti, sanificazione dell’abitacolo e dell’impianto clima con bomboletta sanificante, presidio medico-chirurgico. Su richiesta alla sede Lungomare.',
      url: 'https://wash-hub.it/servizi/sanificazione-interni/',
      provider: fornitoreLungomare,
      areaServed: { '@type': 'City', name: 'Catania' },
    },
    briciole([['Servizi e listino', '/servizi/'], ['Sanificazione interni', '/servizi/sanificazione-interni/']]),
  ],
}

export default function SanificazioneInterniPage() {
  return (
    <div className="pt-20">
      <JsonLd data={schema} />
      {/* Hero */}
      <section className="py-20 md:py-28 bg-[#0F0F0F] text-white">
        <AnimatedSection eager className="max-w-4xl mx-auto px-5 md:px-8">
          <nav aria-label="Percorso" className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden> / </span>
            <Link href="/servizi" className="hover:text-white">Servizi</Link>
            <span aria-hidden> / </span>
            <span className="text-white/90">Sanificazione interni</span>
          </nav>
          <p className="text-[#C8A84E] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Solo al Lungomare · su richiesta</p>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.02]"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Sanificazione e smacchiatura interni auto a Catania
          </h1>
          <p className="mt-6 text-white/80 text-lg leading-relaxed max-w-2xl">
            A WASH HUB Lungomare, in{' '}
            <a href={MAPPE.lungomare.scheda} target="_blank" rel="noopener noreferrer" className="underline text-white">Via Anfuso 35 a Catania</a>,
            smacchiamo a fondo sedili e tessuti e sanifichiamo l&rsquo;abitacolo. Per l&rsquo;impianto del clima usiamo una bomboletta sanificante,
            presidio medico-chirurgico. È un servizio su richiesta: tempi e costo dipendono dall&rsquo;auto e dallo stato degli interni,
            te li diciamo in sede, su WhatsApp o al telefono <a href={TELEFONO_HREF} className="underline text-white whitespace-nowrap">{TELEFONO}</a>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold hover:bg-[#E0B210] transition-colors">
              Chiedi tempi e costo su WhatsApp →
            </a>
            <a href={TELEFONO_HREF}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-colors">
              📞 Chiama
            </a>
            <a href={MAPPE.lungomare.indicazioni} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-colors">
              📍 Indicazioni
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Cosa facciamo */}
      <section className="py-20 md:py-24 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Cosa facciamo
            </h2>
            <p className="text-[#6B6B6B] mt-3 text-lg leading-relaxed">
              Tre lavori che puoi chiedere insieme o uno per volta, sulla stessa auto.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LAVORI.map(({ icon, t, d }, i) => (
              <AnimatedSection key={t} delay={i * 0.08} className="bg-white border border-[#E8E8E4] rounded-2xl p-6">
                <div className="text-3xl mb-4" aria-hidden>{icon}</div>
                <h3 className="font-display text-lg font-bold text-[#0F0F0F] mb-2" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{t}</h3>
                <p className="text-[#6B6B6B] leading-relaxed">{d}</p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8">
            <p className="text-[#6B6B6B] leading-relaxed max-w-3xl">
              Lavoriamo su qualsiasi tipo di interno: tessuto, pelle, alcantara, similpelle. Per lavori di rigenerazione su sedili, tetti e pannelli porta
              c&rsquo;è la <Link href="/servizi" className="underline font-semibold text-[#0F0F0F]">tappezzeria, su preventivo</Link>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Quando serve */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F] mb-5"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Quando ha senso farla
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-relaxed mb-4">
              Il lavaggio completo tiene in ordine l&rsquo;abitacolo: aspirazione, cruscotto, superfici e vetri interni. Smacchiatura e sanificazione
              servono quando l&rsquo;aspirapolvere non basta più.
            </p>
            <ul className="space-y-2 text-[#0F0F0F] text-lg">
              {[
                'Macchie su sedili e tessuti che con il lavaggio normale non vanno via.',
                'Odori che restano in abitacolo anche dopo aver arieggiato.',
                'Aria del clima che sa di chiuso quando accendi l’impianto.',
                'Auto usata appena presa, o auto dove salgono spesso bambini e animali.',
              ].map(v => (
                <li key={v} className="flex gap-3"><span className="text-[#C8A84E] font-black" aria-hidden>✓</span><span>{v}</span></li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Come si richiede */}
      <section className="py-20 md:py-24 bg-[#F0F0EC]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Come si richiede
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PASSI.map(({ n, t, d }, i) => (
              <AnimatedSection key={n} delay={i * 0.1} className="bg-white border border-[#E8E8E4] rounded-2xl p-7">
                <div className="font-black text-4xl text-[#C8A84E] mb-4" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{n}</div>
                <h3 className="font-bold text-lg text-[#0F0F0F] mb-2">{t}</h3>
                <p className="text-[#6B6B6B] leading-relaxed">{d}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Domande */}
      <section className="py-20 md:py-24 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Domande veloci
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {DOMANDE.map(({ q, a }) => (
              <AnimatedSection key={q}>
                <h3 className="font-bold text-lg text-[#0F0F0F] mb-1">{q}</h3>
                <p className="text-[#6B6B6B] leading-relaxed">{a}</p>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-10">
            <p className="text-sm text-[#6B6B6B]">
              <Link href="/servizi" className="underline font-semibold text-[#0F0F0F]">Listino lavaggi</Link>
              {' · '}
              <Link href="/sedi/lungomare" className="underline font-semibold text-[#0F0F0F]">Sede WASH HUB Lungomare</Link>
              {' · '}
              <Link href="/faq" className="underline font-semibold text-[#0F0F0F]">Tutte le domande frequenti</Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5C518] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-5xl font-black text-[#0F0F0F] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Dicci che auto hai. Al resto pensiamo noi.
            </h2>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-9 py-4 rounded-full bg-[#0F0F0F] text-white font-bold hover:bg-[#1a1a1a] transition-colors">
              Scrivici su WhatsApp →
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
