import { AnimatedSection } from '@/components/ui/AnimatedSection'

const ITEMS = [
  {
    icon: '🏆',
    title: 'Qualità professionale',
    body: 'Prodotti premium, macchine di ultima generazione. Ogni lavaggio eseguito con cura artigianale da operatori formati.',
  },
  {
    icon: '🤝',
    title: 'Attenzione al dettaglio',
    body: 'Ogni centimetro trattato come se fosse la nostra auto. Nessuna fretta, nessun compromesso.',
  },
  {
    icon: '⚡',
    title: 'Sempre disponibili',
    body: 'Con operatori al Lungomare e il self service 24/7 ai Paesi Etnei, siamo lì quando ne hai bisogno.',
  },
]

export function Differentiators() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Il nostro approccio</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F] leading-tight"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Cosa ci rende diversi
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ITEMS.map(({ icon, title, body }, i) => (
            <AnimatedSection key={title} delay={i * 0.12}
              className="group p-8 rounded-2xl bg-white border border-[#E8E8E4] hover:border-[#F5C518]/50 hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-5">{icon}</div>
              <h3 className="font-display text-xl font-bold text-[#0F0F0F] mb-3"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                {title}
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed">{body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
