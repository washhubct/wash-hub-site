'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Marco T.',
    date: 'aprile 2025',
    rating: 5,
    text: 'Finalmente un autolavaggio serio a Catania. Auto impeccabile, staff professionale e veloce. Il Performance Intenso vale ogni euro.',
  },
  {
    name: 'Alessia R.',
    date: 'marzo 2025',
    rating: 5,
    text: 'La tappezzeria era piena di macchie ostinate, sembrava impossibile. L\'hanno restituita come nuova. Servizio top, consiglio a tutti.',
  },
  {
    name: 'Salvatore L.',
    date: 'febbraio 2025',
    rating: 5,
    text: 'Ho prenotato online in 2 minuti, arrivato e in mezzora la mia Audi A6 sembrava uscita dal concessionario. Tornerò sicuramente.',
  },
  {
    name: 'Valentina C.',
    date: 'gennaio 2025',
    rating: 5,
    text: 'Ho portato la moto — gentilissimi, molto attenti. Si capisce subito che ci tengono davvero alla qualità del lavoro.',
  },
  {
    name: 'Francesca P.',
    date: 'dicembre 2024',
    rating: 5,
    text: 'Il self service ai Paesi Etnei è sempre pulito e funzionante. Averlo 24/7 è una comodità enorme. Bravi!',
  },
  {
    name: 'Giuseppe M.',
    date: 'novembre 2024',
    rating: 5,
    text: 'Staff cordiale e competente. Hanno trattato la mia macchina con una cura che non avevo mai visto in altri autolavaggi.',
  },
]

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
        {/* Header */}
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
            <span className="text-5xl font-black text-[#F5C518]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>4.9</span>
            <div>
              <Stars n={5} />
              <p className="text-white/40 text-xs mt-1">su Google Maps</p>
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map(({ name, date, rating, text }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', damping: 20, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <Stars n={rating} />
              <p className="text-white/80 text-sm leading-relaxed mt-4 mb-5">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F5C518]/20 flex items-center justify-center text-[#F5C518] text-xs font-bold">
                    {name[0]}
                  </div>
                  <span className="text-white text-sm font-semibold">{name}</span>
                </div>
                <span className="text-white/30 text-xs">{date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Google */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://g.page/r/wash-hub-catania/review"
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
