import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { ORG_ID, schemaSedi } from '@/lib/schema'
import { EMAIL, MAPPE, TELEFONO, TELEFONO_HREF } from '@/lib/sedi'

const schemaContatti = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://wash-hub.it/contatti/#webpage',
  url: 'https://wash-hub.it/contatti/',
  name: 'Contatti e sedi: autolavaggio a Catania | WASH HUB',
  inLanguage: 'it-IT',
  isPartOf: { '@id': 'https://wash-hub.it/#website' },
  about: { '@id': ORG_ID },
}

export default function ContattiPage() {
  return (
    <div className="pt-20">
      <JsonLd data={schemaContatti} />
      <JsonLd data={schemaSedi} />
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection eager>
          <h1 className="font-display text-4xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Contatti e sedi a Catania
          </h1>
          <p className="text-white/60 mt-4 text-lg">Siamo qui per risponderti.</p>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto px-5 leading-relaxed">
            Per entrambe le sedi il telefono è <a href={TELEFONO_HREF} className="underline underline-offset-4">{TELEFONO}</a> e
            l&rsquo;email è <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>.
          </p>
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
                  <Link href="/sedi/lungomare" className="hover:underline">WASH HUB Lungomare</Link>
                </h2>
                <p className="text-sm text-[#0F0F0F] leading-relaxed mb-5">
                  WASH HUB Lungomare: Via Anfuso 35, Catania. Autolavaggio a mano con prenotazione online e parcheggio,
                  aperto dal lunedì al sabato 8:00–18:30, domenica chiuso. Telefono {TELEFONO}.
                </p>
                <div className="space-y-3 text-sm text-[#6B6B6B]">
                  <p className="flex gap-3"><span>📍</span><a href={MAPPE.lungomare.scheda} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#0F0F0F]">Via Anfuso 35, Catania</a></p>
                  <p className="flex gap-3"><span>🕗</span><span>Lun–Sab 8:00–18:30 · Dom chiuso</span></p>
                  <p className="flex gap-3"><span>📞</span>
                    <a href={TELEFONO_HREF} className="text-[#0F0F0F] font-medium hover:text-[#C8A84E] transition-colors">
                      095 469 5153
                    </a>
                  </p>
                  <p className="flex gap-3"><span>✉️</span>
                    <a href="mailto:info@washhub.it" className="text-[#0F0F0F] font-medium hover:text-[#C8A84E] transition-colors">
                      info@washhub.it
                    </a>
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={MAPPE.lungomare.indicazioni} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] text-sm font-semibold hover:bg-[#0F0F0F] hover:text-white transition-all">
                    Indicazioni →
                  </a>
                  <Link href="/prenota" prefetch={false}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C8A84E] text-[#0F0F0F] text-sm font-bold hover:opacity-90 transition-all">
                    Prenota →
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Paesi Etnei */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#F5C518]/10 border border-[#F5C518]/40 h-full">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 bg-[#F5C518] text-[#0F0F0F]">Self 24/7</span>
                <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-5"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  <Link href="/sedi/paesi-etnei" className="hover:underline">WASH HUB POP<br />Paesi Etnei</Link>
                </h2>
                <p className="text-sm text-[#0F0F0F] leading-relaxed mb-5">
                  WASH HUB POP Paesi Etnei: Via Galileo Galilei 28, San Gregorio di Catania, presso la stazione LUKoil.
                  Self service aperto 24 ore su 24; lavaggio a mano dal lunedì al sabato 8:00–19:00 e la domenica 8:00–13:30.
                  Non si prenota: passi direttamente. Telefono {TELEFONO}.
                </p>
                <div className="space-y-3 text-sm text-[#6B6B6B]">
                  <p className="flex gap-3"><span>📍</span><a href={MAPPE.pop.scheda} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#0F0F0F]">Via Galileo Galilei 28, San Gregorio di Catania — stazione LUKoil</a></p>
                  <p className="flex gap-3"><span>🧼</span><span>Lavaggio manuale Lun–Sab 8:00–19:00 · Dom 8:00–13:30</span></p>
                  <p className="flex gap-3"><span>⏰</span><span className="text-[#0F0F0F] font-semibold">Self service aperto 24/7</span></p>
                  <p className="flex gap-3">
                    <span>📞</span>
                    <a href={TELEFONO_HREF} className="text-[#0F0F0F] font-medium hover:text-[#C8A84E] transition-colors">
                      095 469 5153
                    </a>
                  </p>
                </div>
                <a href={MAPPE.pop.indicazioni} target="_blank" rel="noopener noreferrer"
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
