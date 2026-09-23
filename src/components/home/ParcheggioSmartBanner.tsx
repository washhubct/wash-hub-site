import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

// Banner home "Parcheggio Smart": link diretto alla landing /parcheggio-smart
// (stessa pagina da condividere sui social).
export function ParcheggioSmartBanner() {
  return (
    <section className="py-16 md:py-20 bg-[#0F0F0F] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden
        style={{ background: 'radial-gradient(50% 80% at 90% 50%, rgba(200,168,78,0.22), transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="hidden sm:flex shrink-0 w-24 h-24 rounded-2xl bg-[#C8A84E] flex-col items-center justify-center text-[#0F0F0F] shadow-[0_0_40px_rgba(200,168,78,0.35)]" aria-hidden>
              <span className="text-4xl leading-none">🔐</span>
              <span className="font-mono font-black text-[11px] tracking-[0.3em] mt-2">PIN</span>
            </div>
            <div>
              <p className="text-[#C8A84E] text-sm font-semibold uppercase tracking-[0.2em] mb-2">Nuovo · Parcheggio Smart</p>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Parcheggia da solo,<br className="hidden md:block" /> anche di notte.
              </h2>
              <p className="text-white/50 mt-3 max-w-lg mx-auto md:mx-0">
                Paghi online, ricevi un codice a 6 cifre e apri il cancello del parcheggio Lungomare quando vuoi. Da 2 ore, €2 l&rsquo;ora.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-3">
            <Link href="/parcheggio-smart"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#C8A84E] text-[#0F0F0F] font-bold text-base md:text-lg hover:bg-[#B8963E] transition-all hover:scale-105 active:scale-100 shadow-[0_10px_30px_-10px_rgba(200,168,78,0.6)]">
              🔐 Prendi il codice →
            </Link>
            <span className="text-white/40 text-xs">Via Anfuso 35 · Catania</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
