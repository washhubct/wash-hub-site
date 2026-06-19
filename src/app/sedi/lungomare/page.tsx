import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WASH HUB Lungomare — Autolavaggio Premium Catania',
  description: 'Lavaggio auto premium con operatori a Catania Lungomare. Tappezzeria, parcheggio, servizio personalizzato. Aperto lun–sab 7:30–18:30.',
}

export default function LungomareePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#0F0F0F]">
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-16 md:pb-24 w-full">
          <AnimatedSection>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#C8A84E] text-[#0F0F0F]">
              Premium
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              WASH HUB<br />
              <span style={{ color: '#C8A84E' }}>Lungomare</span>
            </h1>
            <p className="text-white/60 text-xl mt-4 max-w-lg">
              La sede storica. Dove ogni lavaggio è un&rsquo;esperienza.
            </p>
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
                {[
                  ['📍 Indirizzo', 'Via Anfuso 35, Catania'],
                  ['🕗 Orari', 'Lunedì–Sabato 7:30–18:30'],
                  ['📞 Telefono', '095 469 5153'],
                  ['✉️ Email', 'info@parkinglungomare.it'],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <span className="text-[#6B6B6B] text-sm w-32 shrink-0">{label}</span>
                    <span className="font-medium text-[#0F0F0F]">{val}</span>
                  </div>
                ))}
              </div>
              <Link href="/prenota"
                className="inline-flex items-center mt-8 px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90"
                style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                Prenota online →
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="space-y-4">
              {[
                { icon: '🧼', title: 'Lavaggio completo', desc: 'Esterno, interno, cerchi, vetri. Risultato impeccabile.' },
                { icon: '🪡', title: 'Tappezzeria premium', desc: 'Sedili, tetti, pannelli porta. Servizio su prenotazione.' },
                { icon: '✨', title: 'Performance Intenso', desc: 'Trattamento profondo con cera e lucidatura.' },
                { icon: '🅿️', title: 'Parcheggio', desc: 'Ad ore o abbonamento mensile — posti coperti e scoperti.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl bg-white border border-[#E8E8E4]">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0F0F0F] mb-1">{title}</h3>
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
              Non solo lavaggio: al Lungomare trovi anche il parcheggio. A ore per le soste brevi,
              oppure in abbonamento mensile con posto riservato — coperto o scoperto.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '⏱️', title: 'Parcheggio ad ore', price: '€2', unit: '/ ora', desc: 'Paghi solo il tempo che usi. Ideale per soste brevi mentre sei in zona.', highlight: false },
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
          </div>
        </div>
      </section>
    </div>
  )
}
