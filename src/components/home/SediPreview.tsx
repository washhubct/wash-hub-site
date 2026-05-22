import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'

export function SediPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#F0F0EC]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-[#0F0F0F]/50">Le nostre sedi</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F]"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Due sedi, un&rsquo;unica qualità.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LUNGOMARE — Premium */}
          <AnimatedSection direction="left"
            className="group relative rounded-3xl overflow-hidden bg-[#0F0F0F] min-h-[520px] flex flex-col cursor-pointer hover:shadow-2xl transition-shadow duration-500">
            <HiggsfieldImage
              prompt="premium car wash exterior at golden hour, Catania Sicily seafront, luxury atmosphere, professional staff"
              className="absolute inset-0 w-full h-full opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              aspectRatio="auto"
            />
            <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                  Premium
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-black text-white leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  WASH HUB<br />
                  <span style={{ color: '#C8A84E' }}>Lungomare</span>
                </h3>
                <p className="text-white/60 leading-relaxed max-w-xs">
                  Lavaggio completo con operatori esperti. Tappezzeria, parcheggio, servizio personalizzato.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Lavaggio completo', 'Tappezzeria', 'Parcheggio'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs border border-white/20 text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/sedi/lungomare"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:gap-3"
                  style={{ background: '#C8A84E', color: '#0F0F0F' }}>
                  Scopri la sede →
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* PAESI ETNEI — POP 24/7 */}
          <AnimatedSection direction="right"
            className="group relative rounded-3xl overflow-hidden bg-[#F5C518] min-h-[520px] flex flex-col cursor-pointer hover:shadow-2xl transition-shadow duration-500">
            <HiggsfieldImage
              prompt="modern self-service car wash at night, neon lights, futuristic station illuminated, Paesi Etnei Catania, energy and freedom"
              className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              aspectRatio="auto"
            />
            <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#E63946] text-white">
                  SELF 24/7
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F] leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  WASH HUB<br />
                  <span>POP</span>
                </h3>
                <p className="text-[#0F0F0F]/70 leading-relaxed max-w-xs">
                  Aperto 24 ore su 24, 7 giorni su 7. Lava la tua auto quando vuoi, senza attese e senza appuntamento.
                </p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#0F0F0F] mb-4">24 ORE · 7 GIORNI</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Self service', 'Sempre aperto'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs border border-[#0F0F0F]/20 text-[#0F0F0F]/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/sedi/paesi-etnei"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F0F0F] text-white font-semibold text-sm hover:gap-3 transition-all">
                  Scopri la sede →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
