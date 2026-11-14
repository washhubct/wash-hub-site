'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  // Primo blocco della pagina: esce già visibile nell'HTML (niente opacity:0 sul titolo, che ritardava l'LCP)
  eager?: boolean
}

export function AnimatedSection({ children, className, delay = 0, direction = 'up', eager = false }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const laterale = typeof window !== 'undefined' && window.innerWidth >= 768
  const initial = { opacity: 0, y: direction === 'up' || (!laterale && direction !== 'none') ? 40 : 0, x: laterale ? (direction === 'left' ? -40 : direction === 'right' ? 40 : 0) : 0 }
  return (
    <motion.div ref={ref} className={cn(className)} initial={eager ? false : initial}
      animate={eager || isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ type: 'spring', damping: 22, stiffness: 90, delay }}>
      {children}
    </motion.div>
  )
}
