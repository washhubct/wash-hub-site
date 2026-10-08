import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldVideo } from '@/components/ui/HiggsfieldVideo'

// Il lavaggio in 4 passaggi. Le clip sono segnaposto HIGGSFIELD_STUB (una per passaggio, 4-6 s, verticali-friendly):
// si generano dopo l'ok di Guido sulla struttura, una alla volta (budget Silvio).
const PASSI = [
  { n: '01', titolo: 'Prelavaggio', testo: 'Sciogliamo sale e polvere prima di toccare la carrozzeria: niente graffi.',
    prompt: 'macro slow motion, pre-wash foam cannon spraying thick white foam on a dark car door, water droplets catching golden late-afternoon light, Catania seafront car wash, cinematic, shallow depth of field' },
  { n: '02', titolo: 'Lavaggio a mano', testo: 'Guanto, due secchi, un pannello alla volta. Come faresti tu, ma meglio.',
    prompt: 'close-up of a gloved hand washing a black car hood with a blue microfiber mitt, rich suds, slow motion, warm sunset reflections, professional hand car wash, cinematic' },
  { n: '03', titolo: 'Asciugatura', testo: 'Panni in microfibra e aria: zero aloni, zero gocce sui cristalli.',
    prompt: 'slow motion microfiber towel drying a glossy car roof, water beading and disappearing, sunlight sparkle, clean minimal frame, cinematic detail shot' },
  { n: '04', titolo: 'Interni', testo: 'Aspirazione, plastiche, vetri. E se serve, la tappezzeria.',
    prompt: 'interior car detailing, vacuum nozzle cleaning seats, soft light through windshield, dust particles in light beam, calm cinematic close-up' },
]

export function ComeLaviamo() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <AnimatedSection className="mb-8 md:mb-12 max-w-2xl">
          <p className="text-[#0F0F0F]/50 text-xs font-bold uppercase tracking-[0.2em] mb-2">Come laviamo</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0F0F0F] leading-[0.95]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Quattro passaggi. Tutti a mano.
          </h2>
        </AnimatedSection>
        <div className="-mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none]">
          {PASSI.map((p, i) => (
            <AnimatedSection key={p.n} delay={i * 0.08} className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-auto">
              <div className="h-full rounded-3xl overflow-hidden bg-white border border-[#0F0F0F]/10">
                <div className="relative aspect-[4/5]">
                  <HiggsfieldVideo prompt={p.prompt} className="absolute inset-0" overlayOpacity={0.15} />
                  <span className="absolute top-4 left-4 font-black text-5xl text-[#F5C518]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{p.n}</span>
                </div>
                <div className="p-5">
                  <div className="font-black text-xl text-[#0F0F0F]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{p.titolo}</div>
                  <p className="mt-2 text-sm text-[#0F0F0F]/60 leading-relaxed">{p.testo}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
