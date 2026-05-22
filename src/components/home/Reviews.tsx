'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import reviewsData from '@/data/reviews.json'

const FALLBACK_REVIEWS = [
  { name: 'Marco T.', rating: 5, text: 'Finalmente un autolavaggio serio a Catania. Auto impeccabile, staff professionale e veloce. Il Performance Intenso vale ogni euro.', date: 'un mese fa', avatar: '' },
  { name: 'Alessia R.', rating: 5, text: 'La tappezzeria era piena di macchie ostinate. L\'hanno restituita come nuova. Servizio top, consiglio a tutti.', date: '2 mesi fa', avatar: '' },
  { name: 'Salvatore L.', rating: 5, text: 'Ho prenotato online in 2 minuti, arrivato e in mezzora la mia Audi A6 sembrava uscita dal concessionario. Tornerò sicuramente.', date: '2 mesi fa', avatar: '' },
  { name: 'Valentina C.', rating: 5, text: 'Ho portato la moto — gentilissimi, molto attenti. Si capisce subito che ci tengono davvero alla qualità del lavoro.', date: '3 mesi fa', avatar: '' },
  { name: 'Francesca P.', rating: 5, text: 'Il self service ai Paesi Etnei è sempre pulito e funzionante. Averlo 24/7 è una comodità enorme. Bravi!', date: '4 mesi fa', avatar: '' },
  { name: 'Giuseppe M.', rating: 5, text: 'Staff cordiale e competente. Hanno trattato la mia macchina con una cura che non avevo mai visto in altri autolavaggi.', date: '4 mesi fa', avatar: '' },
]

const reviews = reviewsData.reviews.length > 0 ? reviewsData.reviews : FALLBACK_REVIEWS
const rating = reviewsData.rating || 4.9
const totalRatings = reviewsData.totalRatings

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < n ? 'text-[#F5C518]' : 'text-white/20'}>★</span>
    ))}
  </div>
)

export function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-[#0F0F0F] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 20 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Recensioni Google</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Cosa dicono<br />i nostri clienti.
            </h2>
          </div>
          <div className="flex items-center gap-3 md:pb-2">
            <span className="text-5xl font-black text-[#F5C518]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              {rating.toFixed(1)}
            </span>
            <div>
              <Stars n={5} />
              <p className="text-white/40 text-xs mt-1">
                {totalRatings > 0 ? `${totalRatings} recensioni su Google` : 'su Google Maps'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 6).map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', damping: 20, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <Stars n={r.rating} />
              <p className="text-white/80 text-sm leading-relaxed mt-4 mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {r.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F5C518]/20 flex items-center justify-center text-[#F5C518] text-xs font-bold">
                      {r.name[0]}
                    </div>
                  )}
                  <span className="text-white text-sm font-semibold">{r.name}</span>
                </div>
                <span className="text-white/30 text-xs">{r.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJ..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            Leggi tutte le recensioni su Google →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
