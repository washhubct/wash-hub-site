import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

// "Porta un amico": programma loyalty permanente (non una promo). Stava in fondo alla home,
// nero su nero: su mobile nessuno ci arrivava. Ora è un biglietto giallo in alto nella pagina.
const PASSI = [
  { n: '1', t: 'Trova il tuo codice', d: 'Basta il tuo numero di telefono.' },
  { n: '2', t: 'Passalo a un amico', d: 'WhatsApp, a voce, come vuoi.' },
  { n: '3', t: 'Lui prenota, tu risparmi', d: '€5 sul tuo prossimo lavaggio. Ogni volta.' },
]

export function ReferralBanner() {
  return (
    <section className="py-16 md:py-24 bg-[#0F0F0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection>
          <div className="relative rounded-[28px] bg-[#F5C518] text-[#0F0F0F] p-6 sm:p-8 md:p-12 overflow-hidden"
            style={{ border: '3px solid #0F0F0F', boxShadow: '8px 8px 0px #0F0F0F' }}>

            {/* Tacche laterali da biglietto */}
            <div aria-hidden className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0F0F0F]" />
            <div aria-hidden className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0F0F0F]" />

            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
              {/* Testo */}
              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3 text-[#0F0F0F]/70">
                  🎁 Porta un amico
                </p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  Ogni amico<br className="hidden sm:block" /> vale €5.
                </h2>
                <p className="text-[#0F0F0F]/75 text-base md:text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                  Hai già un codice personale. Ogni amico che prenota con il tuo codice
                  ti regala €5 sul prossimo lavaggio. Senza limiti, per sempre.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Link href="/referral"
                    className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-[#0F0F0F] text-[#F5C518] font-black text-base hover:bg-black transition-all hover:scale-105 active:scale-100">
                    Trova il tuo codice →
                  </Link>
                  <Link href="/referral#come-funziona"
                    className="inline-flex items-center justify-center px-7 py-4 rounded-full border-2 border-[#0F0F0F]/30 text-[#0F0F0F] font-semibold text-base hover:border-[#0F0F0F] transition-all">
                    Come funziona
                  </Link>
                </div>
              </div>

              {/* Biglietto col codice */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-full max-w-[320px] -rotate-2 md:-rotate-3 bg-[#0F0F0F] text-white rounded-2xl p-5 sm:p-6"
                  style={{ boxShadow: '6px 6px 0px rgba(15,15,15,.25)' }}>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50">
                    <span>Wash Hub</span>
                    <span>Codice amico</span>
                  </div>
                  <div className="my-4 border-t-2 border-dashed border-white/20" />
                  <div className="font-display text-4xl sm:text-5xl font-black tracking-widest text-[#F5C518] text-center"
                    style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                    WH·<span className="text-white/30">····</span>
                  </div>
                  <p className="text-center text-xs text-white/50 mt-2">il tuo è legato al tuo numero</p>
                  <div className="my-4 border-t-2 border-dashed border-white/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Per ogni amico che prenota</span>
                    <span className="font-black text-2xl text-[#F5C518]">−€5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 passi */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {PASSI.map(p => (
                <div key={p.n} className="flex sm:flex-col items-center sm:items-start gap-3 bg-[#0F0F0F]/[0.06] rounded-2xl px-4 py-3 sm:p-5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[#0F0F0F] text-[#F5C518] font-black flex items-center justify-center">{p.n}</span>
                  <div className="text-left">
                    <div className="font-bold leading-tight">{p.t}</div>
                    <div className="text-sm text-[#0F0F0F]/65 leading-snug">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
