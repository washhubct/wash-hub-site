import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WASH HUB Lungomare — Autolavaggio Premium Catania',
  description: 'Lavaggio auto premium con operatori a Catania Lungomare. Tappezzeria, parcheggio, servizio personalizzato. Aperto lun–sab 8:00–20:00.',
}

export default function LungomareePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#0F0F0F]">
        <HiggsfieldImage
          prompt="luxury premium car wash station at golden hour, Catania seafront, professional operators washing luxury cars, warm cinematic light, editorial photography"
          className="absolute inset-0 w-full h-full opacity-50"
          aspectRatio="auto"
        />
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
                  ['🕗 Orari', 'Lunedì–Sabato 8:00–20:00'],
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
                className="inline-flex items-center mt-8 px-8 py-4 rounded-full font-bold text-sm hover:gap-3 transition-all"
                style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                Prenota al Lungomare →
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="space-y-4">
              {[
                { icon: '🧼', title: 'Lavaggio completo', desc: 'Esterno, interno, cerchi, vetri. Risultato impeccabile.' },
                { icon: '🪡', title: 'Tappezzeria premium', desc: 'Sedili, tetti, pannelli porta. Servizio su prenotazione.' },
                { icon: '✨', title: 'Performance Intenso', desc: 'Trattamento profondo con cera e lucidatura.' },
                { icon: '🅿️', title: 'Parcheggio custodito', desc: 'Lascia l\'auto in sicurezza durante il lavaggio.' },
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

      {/* Gallery placeholder */}
      <section className="py-16 bg-[#F0F0EC]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'professional car washing a black luxury SUV, water droplets, cinematic close-up',
              'detail of car wash brush on car surface, soap foam, dramatic light',
              'interior car detailing, leather seats cleaned, professional tools, luxury',
              'car wash exterior building at sunset, Catania, premium brand identity',
              'wheel cleaning with professional equipment, water splash, close-up',
              'smiling professional car wash operator, Catania Italy, premium service',
            ].map((prompt, i) => (
              <HiggsfieldImage key={i} prompt={prompt} className="rounded-xl w-full" aspectRatio="4/3" />
            ))}
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
