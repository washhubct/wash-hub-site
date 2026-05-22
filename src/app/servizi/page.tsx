import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servizi — Lavaggi, Tappezzeria, Abbonamenti',
  description: 'Listino completo: lavaggio esterno, interno+esterno, Performance Intenso, moto, tappezzeria, sanificazione vapore. Abbonamenti mensili disponibili.',
}

const LAVAGGI = [
  { icon: '🚿', name: 'Esterno Base', desc: 'Carrozzeria, vetri, cerchi, passaruota', price: 'da €8', time: '~15 min' },
  { icon: '🧼', name: 'Interno + Esterno', desc: 'Completo con aspirazione abitacolo', price: 'da €14', time: '~30 min' },
  { icon: '⭐', name: 'Performance Intenso', desc: 'Trattamento profondo, cera, finiture premium', price: '€29', time: '~60 min' },
  { icon: '🏍️', name: 'Moto / Scooter', desc: 'Lavaggio completo con delicatezza', price: '€12', time: '~20 min' },
  { icon: '💨', name: 'Sanificazione Vapore', desc: 'Smacchiatura e igienizzazione completa', price: 'da €40', time: '~90 min' },
]

const ABBONAMENTI = [
  {
    tier: 'Starter',
    price: 'XXX',
    features: ['4 lavaggi esterno/mese', 'Priorità prenotazione', 'Sconto 10% su extra'],
    highlight: false,
  },
  {
    tier: 'Pro',
    price: 'XXX',
    features: ['Lavaggi esterno illimitati', '2 lavaggi completi/mese', 'Sconto 20% su extra', 'Reminder automatici'],
    highlight: true,
  },
  {
    tier: 'VIP',
    price: 'XXX',
    features: ['Tutto illimitato', '1 tappezzeria/mese inclusa', 'Corsia preferenziale', 'Assistenza dedicata'],
    highlight: false,
  },
]

export default function ServiziPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 md:py-28 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Cosa offriamo</p>
          <h1 className="font-display text-5xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            I nostri servizi.
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
                &ldquo;Interventi di precisione su interni: sedili, tetti, cruscotti, door panel. Il servizio che ci ha resi famosi tra gli intenditori.&rdquo;
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

      {/* Abbonamenti */}
      <section className="py-20 md:py-28 bg-[#F5C518]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[#0F0F0F]/50 text-sm font-semibold uppercase tracking-[0.2em] mb-3">Risparmia ogni mese</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Abbonamenti mensili.
            </h2>
            <p className="text-[#0F0F0F]/60 text-lg mt-3">Prezzi da aggiornare — contattaci per un preventivo.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABBONAMENTI.map(({ tier, price, features, highlight }, i) => (
              <AnimatedSection key={tier} delay={i * 0.1}
                className={`rounded-2xl p-7 ${highlight ? 'bg-[#0F0F0F] text-white scale-105 shadow-2xl' : 'bg-white text-[#0F0F0F]'}`}>
                <h3 className="font-display text-2xl font-black mb-1"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  {tier}
                </h3>
                <p className={`text-3xl font-black mb-5 ${highlight ? 'text-[#F5C518]' : 'text-[#0F0F0F]'}`}>
                  €{price}<span className="text-base font-normal opacity-50">/mese</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {features.map(f => (
                    <li key={f} className={`text-sm flex gap-2 ${highlight ? 'text-white/70' : 'text-[#6B6B6B]'}`}>
                      <span className="text-[#F5C518]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contatti"
                  className={`block text-center py-3 px-5 rounded-full font-bold text-sm transition-all ${
                    highlight ? 'bg-[#F5C518] text-[#0F0F0F]' : 'border-2 border-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white'
                  }`}>
                  Inizia ora
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
