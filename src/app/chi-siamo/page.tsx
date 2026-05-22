import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { HiggsfieldImage } from '@/components/ui/HiggsfieldImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi siamo — La storia di WASH HUB',
  description: 'WASH HUB nasce nel 2022 a Catania dalla passione per il lavaggio auto professionale. La nostra storia, il nostro team, i nostri valori.',
}

export default function ChiSiamoPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-[#0F0F0F]">
        <HiggsfieldImage
          prompt="professional car wash team portrait smiling, Italian setting, Catania Sicily, warm afternoon light, authentic editorial photography"
          className="absolute inset-0 w-full h-full opacity-30"
          aspectRatio="auto"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center text-white">
          <AnimatedSection>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              La nostra storia.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Storia */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="space-y-8 text-xl leading-relaxed text-[#0F0F0F]"
            style={{ fontFamily: 'var(--font-instrument)' }}>
            <p className="italic text-2xl text-[#6B6B6B]">
              &ldquo;WASH HUB nasce nel 2022 da una semplice convinzione: a Catania mancava un autolavaggio che trattasse ogni auto come se fosse la propria.&rdquo;
            </p>
            <p>
              Oggi siamo due sedi, un team affiatato, e migliaia di clienti che tornano ogni settimana. Non perché sia comodo, ma perché sanno che qui la macchina esce davvero pulita.
            </p>
            <p>
              Siamo siciliani nell&rsquo;anima e professionisti nella pratica. Ogni giorno portiamo in pista la stessa cura, la stessa attenzione, lo stesso rispetto per il lavoro ben fatto.
            </p>
            <p>
              Dal Lungomare di Catania, dove abbiamo iniziato con un piccolo box e tanta voglia di fare le cose per bene, ai Paesi Etnei con il nostro self service aperto 24 ore. Sempre con un obiettivo: farti sentire fiero della tua auto.
            </p>
          </div>
        </div>
      </section>

      {/* I valori */}
      <section className="py-20 bg-[#F0F0EC]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              I nostri valori
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🛠️', title: 'Artigianalità', desc: 'Ogni lavaggio è eseguito a mano con cura. Nessun processo automatizzato che sostituisce l\'occhio umano.' },
              { icon: '🌿', title: 'Rispetto', desc: 'Rispettiamo l\'auto del cliente come se fosse nostra. Rispettiamo l\'ambiente scegliendo prodotti eco-compatibili.' },
              { icon: '📈', title: 'Miglioramento continuo', desc: 'Aggiorniamo prodotti, formazione e attrezzature ogni anno. Non ci accontentiamo di ieri.' },
              { icon: '🤝', title: 'Onestà', desc: 'Prezzi chiari, tempi rispettati, nessuna sorpresa. Ti diciamo sempre cosa facciamo e perché.' },
            ].map(({ icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}
                className="flex gap-5 p-6 rounded-2xl bg-white border border-[#E8E8E4]">
                <span className="text-3xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0F0F0F] mb-2"
                    style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                    {title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed text-sm">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-4xl font-black text-[#0F0F0F]"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Il team
            </h2>
            <p className="text-[#6B6B6B] mt-3">Le persone che rendono tutto questo possibile ogni giorno.</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Guido', role: 'Founder & CEO', prompt: 'portrait of a confident Italian entrepreneur, car wash business owner, Catania Sicily, warm natural light' },
              { name: 'Sebastiano', role: 'Head of Operations', prompt: 'portrait of a professional Italian car wash operator, friendly smile, work uniform, Catania' },
              { name: 'Team Member', role: 'Car Wash Specialist', prompt: 'portrait of a car wash specialist at work, professional, Catania Sicily' },
              { name: 'Team Member', role: 'Customer Care', prompt: 'portrait of a friendly customer service professional, car wash, Italian, warm smile' },
            ].map(({ name, role, prompt }) => (
              <AnimatedSection key={name + role} className="text-center">
                <HiggsfieldImage prompt={prompt} className="rounded-2xl w-full mb-4" aspectRatio="3/4" />
                <p className="font-bold text-[#0F0F0F]">{name}</p>
                <p className="text-[#6B6B6B] text-sm">{role}</p>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-center text-[#6B6B6B] text-xs mt-6">
            Le foto del team saranno aggiornate con scatti reali. Contattaci per collaborazioni.
          </p>
        </div>
      </section>
    </div>
  )
}
