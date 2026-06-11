import { AnimatedSection } from '@/components/ui/AnimatedSection'

export default function ContattiPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <h1 className="font-display text-5xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Contattaci.
          </h1>
          <p className="text-white/60 mt-4 text-lg">Siamo qui per risponderti.</p>
        </AnimatedSection>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lungomare */}
            <AnimatedSection direction="left">
              <div className="p-8 rounded-2xl bg-white border border-[#E8E8E4] h-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#C8A84E] text-[#0F0F0F]">Premium</span>
                <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-5"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  WASH HUB Lungomare
                </h2>
                <div className="space-y-3 text-sm text-[#6B6B6B]">
                  <p className="flex gap-3"><span>📍</span><span>Via Anfuso 35, Catania</span></p>
                  <p className="flex gap-3"><span>🕗</span><span>Lun–Sab 7:30–18:30</span></p>
                  <p className="flex gap-3"><span>📞</span>
                    <a href="tel:+390954695153" className="text-[#0F0F0F] font-medium hover:text-[#C8A84E] transition-colors">
                      095 469 5153
                    </a>
                  </p>
                  <p className="flex gap-3"><span>✉️</span>
                    <a href="mailto:info@parkinglungomare.it" className="text-[#0F0F0F] font-medium hover:text-[#C8A84E] transition-colors">
                      info@parkinglungomare.it
                    </a>
                  </p>
                </div>
                <a href="https://maps.google.com/?q=Via+Anfuso+35+Catania" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] text-sm font-semibold hover:bg-[#0F0F0F] hover:text-white transition-all">
                  Indicazioni →
                </a>
              </div>
            </AnimatedSection>

            {/* Paesi Etnei */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#F5C518]/10 border border-[#F5C518]/40 h-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#F5C518] text-[#0F0F0F]">Self 24/7</span>
                <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-5"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  WASH HUB POP<br />Paesi Etnei
                </h2>
                <div className="space-y-3 text-sm text-[#6B6B6B]">
                  <p className="flex gap-3"><span>📍</span><span>Via Galileo Galilei 28, San Gregorio di Catania — stazione LUKoil</span></p>
                  <p className="flex gap-3"><span>🧼</span><span>Lavaggio manuale Lun–Dom 8:00–19:00</span></p>
                  <p className="flex gap-3"><span>⏰</span><span className="text-[#0F0F0F] font-semibold">Self service aperto 24/7</span></p>
                </div>
                <a href="https://maps.google.com/?q=Via+Galileo+Galilei+28+Paesi+Etnei+Catania" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] text-sm font-semibold hover:bg-[#0F0F0F] hover:text-white transition-all">
                  Indicazioni →
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
