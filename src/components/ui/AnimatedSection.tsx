'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function AnimatedSection({ children, className, delay = 0, direction = 'up' }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  // Su mobile niente spostamento laterale: l'elemento sporgerebbe oltre il bordo dello schermo finché non entra
  // in vista, e iOS Safari rende la pagina scorrevole a destra/sinistra (visto 28/09/2026 su home e parcheggio-smart).
  const laterale = typeof window !== 'undefined' && window.innerWidth >= 768
  const initial = {
    opacity: 0,
    y: direction === 'up' || (!laterale && direction !== 'none') ? 40 : 0,
    x: laterale ? (direction === 'left' ? -40 : direction === 'right' ? 40 : 0) : 0,
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ type: 'spring', damping: 22, stiffness: 90, delay }}
    >
      {children}
    </motion.div>
  )
}
