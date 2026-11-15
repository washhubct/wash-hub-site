'use client'

import reviewsData from '@/data/reviews.json'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MAPPE } from '@/lib/sedi'

// Solo recensioni vere da Google (npm run fetch-reviews). Se non ce ne sono, la sezione non esce: mai testi inventati.
const reviews = reviewsData.reviews.filter(r => r.text && r.text.trim().length > 0)
const rating = reviewsData.rating
const totalRatings = reviewsData.totalRatings

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < n ? 'text-[#F5C518]' : 'text-white/20'}>★</span>
    ))}
  </div>
)

export function Reviews() {
  if (reviews.length === 0) return null

  return (
    <section id="recensioni" className="bg-[#0F0F0F] py-20 md:py-28 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Recensioni Google</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Cosa dicono<br />i nostri clienti.
            </h2>
          </div>
          <div className="flex items-center gap-3 md:pb-2">
            <span className="text-5xl font-black text-[#F5C518]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              {rating.toFixed(1).replace('.', ',')}
            </span>
            <div>
              <Stars n={5} />
              <p className="text-white/40 text-xs mt-1">
                {totalRatings > 0 ? `${totalRatings} recensioni su Google` : 'su Google Maps'}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 6).map((r, i) => (
            <AnimatedSection key={i} delay={i * 0.08}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <Stars n={Number(r.rating)} />
              <p className="text-white/80 text-sm leading-relaxed mt-4 mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  {r.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={r.avatar} alt="" width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F5C518]/20 flex items-center justify-center text-[#F5C518] text-xs font-bold">
                      {r.name[0]}
                    </div>
                  )}
                  <span className="text-white text-sm font-semibold">{r.name}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection direction="none" className="text-center mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={MAPPE.lungomare.recensioni}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
            >
              Leggi tutte le recensioni →
            </a>
            <span className="text-white/20 hidden sm:block">·</span>
            <a
              href="https://www.google.com/search?hl=it-IT&gl=it&q=Wash+Hub+-+Lungomare,+Via+Anfuso,+35,+95126+Catania+CT&ludocid=12256856388391979926&lsig=AB86z5VUoEv75haHahvi-hFB0yXK#lrd=0xa919f2711b993b13,1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all"
            >
              ⭐ Lascia la tua recensione
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
