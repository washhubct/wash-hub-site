'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  // Primo blocco della pagina: resta sempre fermo e visibile, senza animazione d'ingresso
  eager?: boolean
}

// Nell'HTML servito il contenuto è sempre visibile (niente opacity:0): chi non esegue il JS,
// i crawler e le anteprime leggono tutto. Solo dopo l'avvio, i blocchi che stanno sotto lo
// schermo vengono nascosti e poi rivelati quando entrano in vista.
export function AnimatedSection({ children, className, delay = 0, direction = 'up', eager = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const [nascosto, setNascosto] = useState(false)
  const [laterale, setLaterale] = useState(false)

  useEffect(() => {
    if (eager || !ref.current) return
    setLaterale(window.innerWidth >= 768)
    // Quello che è già a schermo al caricamento non si tocca: niente lampeggio
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setNascosto(true)
  }, [eager])

  const fuori = nascosto && !isInView
  const partenza = { opacity: 0, y: direction === 'up' || (!laterale && direction !== 'none') ? 40 : 0, x: laterale ? (direction === 'left' ? -40 : direction === 'right' ? 40 : 0) : 0 }
  return (
    <motion.div ref={ref} className={cn(className)} initial={false}
      animate={fuori ? partenza : { opacity: 1, y: 0, x: 0 }}
      transition={fuori ? { duration: 0 } : { type: 'spring', damping: 22, stiffness: 90, delay }}>
      {children}
    </motion.div>
  )
}
