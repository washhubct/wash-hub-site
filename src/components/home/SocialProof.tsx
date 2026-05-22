'use client'

import { useInView, motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const STATS = [
  { value: 4, suffix: '+', label: 'Anni di attività' },
  { value: 58300, suffix: '+', label: 'Auto lavate' },
  { value: 4.9, suffix: '★', label: 'Rating Google' },
  { value: 2, suffix: '', label: 'Sedi attive' },
]

function CountUp({ target, suffix, active, duration = 1800 }: { target: number, suffix: string, active: boolean, duration?: number }) {
  const [count, setCount] = useState(0)
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

  return <>{target < 100 ? count.toFixed(target % 1 !== 0 ? 1 : 0) : count.toLocaleString('it-IT')}{suffix}</>
}

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="bg-[#0F0F0F] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', damping: 20, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-black text-[#F5C518] mb-2"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                <CountUp target={value} suffix={suffix} active={isInView} />
              </div>
              <p className="text-white/60 text-sm uppercase tracking-wider">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
