import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Garanzia() {
  return (
    <section className="py-16 bg-[#F5C518]">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <AnimatedSection className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="shrink-0 w-24 h-24 rounded-full bg-[#0F0F0F] flex items-center justify-center text-4xl">
            🛡️
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-[#0F0F0F] mb-2"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Garanzia soddisfatti o rifacciamo.
            </h2>
            <p className="text-[#0F0F0F]/70 text-base">
              Se al ritiro non sei soddisfatto del risultato, te lo rifacciamo immediatamente — senza discussioni e senza costi aggiuntivi. La qualità non è negoziabile.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
