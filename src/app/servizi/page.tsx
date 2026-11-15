import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'
import { JsonLd } from '@/components/seo/JsonLd'
import { briciole, fornitoreLungomare } from '@/lib/schema'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listino lavaggio auto a mano a Catania',
  description: 'Listino lavaggio auto a mano al Lungomare di Catania: esterno da €14, tradizionale da €18, Performance Intenso da €29, moto €12. Interni, tappezzeria, motore.',
}

// prezzoFisso / prezzoMin / prezzoMax: gli stessi prezzi di `price`, in numeri, per i dati strutturati
type Lavaggio = { icon: string; name: string; desc: string; price: string; time: string; prezzoFisso?: number; prezzoMin?: number; prezzoMax?: number }

const LAVAGGI: Lavaggio[] = [
  { icon: '🚿', name: 'Esterno', desc: 'Carrozzeria, vetri, cerchi, passaruota', price: 'da €14', time: '~15 min', prezzoMin: 14 },
  { icon: '🧼', name: 'Lavaggio Tradizionale', desc: 'Lavaggio completo interno ed esterno: carrozzeria, aspirazione e cura abitacolo', price: 'da €18', time: '~30 min', prezzoMin: 18 },
  { icon: '⭐', name: 'Performance Intenso', desc: 'Come il Tradizionale, ma intenso: esterno e interni curati a fondo con trattamento schiumogeno. Utilitaria e berlina €29 · SUV, monovolume e station wagon €35. Auto molto sporca o pelo animale: supplemento valutato in sede.', price: 'da €29', time: 'Varia in base al veicolo', prezzoMin: 29, prezzoMax: 35 },
  { icon: '🏍️', name: 'Moto / Scooter', desc: 'Lavaggio completo con delicatezza', price: '€12', time: '~20 min', prezzoFisso: 12 },
  { icon: '🪡', name: 'Tappezzeria', desc: 'Interni, sedili, pannelli porta: su prenotazione', price: 'Su preventivo', time: 'Varia' },
]

// Servizi senza listino fisso: tempi e costo si chiedono in sede o su WhatsApp (`da` = prezzo di partenza, dove c'è)
const EXTRA: { icon: string; name: string; desc: string; href?: string; da?: number }[] = [
  { icon: '🧽', name: 'Smacchiatura e sanificazione interni', desc: 'Sedili e tessuti smacchiati a fondo, abitacolo sanificato. Il prezzo esatto te lo diciamo prima di iniziare.', href: '/servizi/sanificazione-interni', da: 100 },
  { icon: '🔧', name: 'Lavaggio motore', desc: 'Vano motore pulito con cura.' },
  { icon: '❄️', name: 'Sanificazione impianto clima', desc: 'Bomboletta sanificante, presidio medico-chirurgico, per l\'impianto di climatizzazione.', href: '/servizi/sanificazione-interni' },
]

// Tutti gli 8 servizi nel catalogo: prezzo solo dove c'è un listino, gli altri sono su preventivo
const schemaServizi = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://wash-hub.it/servizi/#service',
      name: 'Lavaggio auto a mano',
      serviceType: 'Autolavaggio a mano',
      url: 'https://wash-hub.it/servizi/',
      provider: fornitoreLungomare,
      areaServed: { '@type': 'City', name: 'Catania' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Listino lavaggi',
        itemListElement: [
          ...LAVAGGI.map(l => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: l.name, description: l.desc },
            ...(l.prezzoFisso
              ? { priceCurrency: 'EUR', price: l.prezzoFisso }
              : l.prezzoMin
                ? { priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR', minPrice: l.prezzoMin, ...(l.prezzoMax ? { maxPrice: l.prezzoMax } : {}) } }
                : {}),
          })),
          ...EXTRA.map(e => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: e.name, description: e.desc, ...(e.href ? { url: `https://wash-hub.it${e.href}/` } : {}) },
            ...(e.da ? { priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: e.da, priceCurrency: 'EUR' } } : {}),
          })),
        ],
      },
    },
    briciole([['Servizi e listino', '/servizi/']]),
  ],
}

export default function ServiziPage() {
  return (
    <div className="pt-20">
      <JsonLd data={schemaServizi} />
      {/* Header */}
      <section className="py-20 md:py-28 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection eager className="px-5">
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-4">I nostri servizi</p>
          <h1 className="font-display text-4xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Listino lavaggio auto a Catania
          </h1>
        </AnimatedSection>
      </section>

      {/* Listino */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Listino lavaggi
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LAVAGGI.map(({ icon, name, desc, price, time }, i) => (
              <AnimatedSection key={name} delay={i * 0.08}
                className="bg-white border border-[#E8E8E4] rounded-2xl p-6 hover:border-[#F5C518]/50 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg font-bold text-[#0F0F0F]"
                    style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                    {name}
                  </h3>
                  <span className="font-black text-[#F5C518] text-lg">{price}</span>
                </div>
                <p className="text-[#6B6B6B] text-sm mb-3">{desc}</p>
                <span className="text-xs text-[#6B6B6B] bg-[#F0F0EC] px-2 py-1 rounded-full">{time}</span>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8 text-center">
            <Link href="/prenota"
              className="inline-flex items-center px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold hover:bg-[#E0B210] transition-colors">
              Prenota ora →
            </Link>
            <p className="mt-5 text-sm text-[#6B6B6B]">
              Prezzi della sede <Link href="/sedi/lungomare" className="underline font-semibold text-[#0F0F0F]">WASH HUB Lungomare</Link>
              {' · '}
              <Link href="/priority" className="underline font-semibold text-[#0F0F0F]">Priority nelle ore di punta</Link>
              {' · '}
              <Link href="/faq" className="underline font-semibold text-[#0F0F0F]">Domande frequenti</Link>
              {' · '}
              <Link href="/flotte" className="underline font-semibold text-[#0F0F0F]">Aziende e flotte</Link>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Interni, motore e clima */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <p className="text-[#C8A84E] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Al Lungomare, su richiesta</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Interni, motore e clima
            </h2>
            <p className="text-[#6B6B6B] mt-3 max-w-2xl">Tempi e costo dipendono dall&rsquo;auto: chiedili in sede o su WhatsApp.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EXTRA.map(({ icon, name, desc, href, da }, i) => (
              <AnimatedSection key={name} delay={i * 0.08}
                className="bg-[#FAFAF7] border border-[#E8E8E4] rounded-2xl p-6">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-lg font-bold text-[#0F0F0F] mb-2"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  {name}
                </h3>
                {da && <p className="font-bold text-[#0F0F0F] mb-2">Da €{da}</p>}
                <p className="text-[#6B6B6B] text-sm">{desc}</p>
                {href && (
                  <Link href={href} className="inline-block mt-3 text-sm font-semibold text-[#0F0F0F] underline">
                    Come funziona →
                  </Link>
                )}
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8 text-center">
            <a href="https://wa.me/390954695153" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-[#0F0F0F] text-white font-bold hover:bg-[#1a1a1a] transition-colors">
              Chiedi tempi e costo su WhatsApp →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Tappezzeria */}
      <section className="py-20 md:py-28 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#C8A84E] text-[#0F0F0F]">
                Solo al Lungomare
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-5"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Tappezzeria.<br />
                <span style={{ color: '#C8A84E' }}>L&rsquo;arte del dettaglio.</span>
              </h2>
              <p className="text-white/60 leading-relaxed text-lg mb-6"
                style={{ fontFamily: 'var(--font-instrument)', fontStyle: 'italic' }}>
                &ldquo;Interventi di precisione su interni: sedili, tetti, cruscotti, pannelli porta. Il servizio che ci ha resi famosi tra gli intenditori.&rdquo;
              </p>
              <div className="space-y-2 text-white/50 text-sm mb-8">
                {['Pulizia e rigenerazione cuoio', 'Smacchiatura profonda tessuti', 'Restauro plastica abitacolo', 'Trattamento tetto anti-aloni'].map(s => (
                  <p key={s}>✓ {s}</p>
                ))}
              </div>
              <Link href="/prenota"
                className="inline-flex items-center px-6 py-3 rounded-full font-bold text-sm transition-all"
                style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                Prenota tappezzeria →
              </Link>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <HiggsfieldImage
                prompt="close up professional car interior detailing, leather seats being cleaned with precision tools, luxury car, dramatic lighting, editorial photography"
                className="rounded-2xl w-full"
                aspectRatio="4/3"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Abbonamenti — Coming Soon */}
      <section className="py-20 md:py-28 bg-[#0F0F0F]">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <AnimatedSection>
            <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-4">In arrivo</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-5"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Abbonamenti lavaggio.
            </h2>
            <p className="text-white/50 text-lg mb-6 max-w-xl mx-auto">
              Stiamo preparando piani su misura per chi lava spesso.
            </p>
            <p className="text-white/50 text-sm mb-10 max-w-xl mx-auto">
              Cerchi l&rsquo;abbonamento mensile per il parcheggio? È già attivo:{' '}
              <Link href="/parcheggio-smart#formule" className="text-[#F5C518] font-semibold hover:underline">le formule del parcheggio al Lungomare →</Link>
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 mb-10">
              <span className="text-2xl">🔔</span>
              <p className="text-white/70 text-sm text-left">
                Vuoi essere avvisato al lancio?<br />
                <a href="https://wa.me/390954695153" target="_blank" rel="noopener noreferrer"
                  className="text-[#F5C518] font-semibold hover:underline">
                  Scrivici su WhatsApp →
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
