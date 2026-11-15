'use client'

import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import reviewsData from '@/data/reviews.json'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const STATS = [
  { value: 4, suffix: '+', label: 'Anni di attività' },
  { value: 58300, suffix: '+', label: 'Auto lavate' },
  // Rating reale da Google Places (npm run fetch-reviews), mai scritto a mano
  { value: reviewsData.rating, suffix: '★', label: 'Rating Google', decimali: 1 },
  { value: 2, suffix: '', label: 'Sedi attive' },
]

function CountUp({ target, suffix, active, duration = 1800, decimali }: { target: number, suffix: string, active: boolean, duration?: number, decimali?: number }) {
  // Parte dal valore vero: nell'HTML statico (Google, AI, chi non ha JS) c'è il numero, non 0.
  // Il conteggio riparte da zero solo quando il blocco entra in vista.
  const [count, setCount] = useState(target)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!active) return
    const steps = 60
    const increment = target / steps
    let current = 0
    timer.current = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); if (timer.current) clearInterval(timer.current) }
      else setCount(Math.floor(current * 10) / 10)
    }, duration / steps)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [active, target, duration])

  return <>{target < 100 ? count.toFixed(decimali ?? (target % 1 !== 0 ? 1 : 0)).replace('.', ',') : count.toLocaleString('it-IT')}{suffix}</>
}

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="bg-[#0F0F0F] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map(({ value, suffix, label, decimali }, i) => (
            <AnimatedSection key={label} delay={i * 0.1} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-black text-[#F5C518] mb-2"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                <CountUp target={value} suffix={suffix} active={isInView} decimali={decimali} />
              </div>
              <p className="text-white/60 text-sm uppercase tracking-wider">{label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
