'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Servizi', href: '/servizi' },
  { label: 'Le nostre sedi', href: '/sedi' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
]

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Top bar — sempre visibile, trasparente, nessuna barra */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" aria-label="WASH HUB" className="pointer-events-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/brand/logo-autolavaggi.png`} alt="WASH HUB"
              className="h-14 md:h-16 w-auto drop-shadow-lg" />
          </Link>
          <Link href="/prenota"
            className="pointer-events-auto hidden md:flex items-center px-5 py-2.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors shadow-lg">
            Prenota ora
          </Link>
          {/* Mobile burger — solo quando non scrollato */}
          {!scrolled && (
            <button onClick={() => setOpen(!open)}
              className="pointer-events-auto md:hidden flex flex-col gap-1.5 p-2 text-white drop-shadow-lg"
              aria-label="Menu">
              <span className={cn('block w-5 h-0.5 bg-current transition-all duration-200', open && 'rotate-45 translate-y-2')} />
              <span className={cn('block w-5 h-0.5 bg-current transition-all duration-200', open && 'opacity-0')} />
              <span className={cn('block w-5 h-0.5 bg-current transition-all duration-200', open && '-rotate-45 -translate-y-2')} />
            </button>
          )}
        </div>
      </div>

      {/* Floating pill — appare allo scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-[#0F0F0F]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Logo mini */}
              <Link href="/" aria-label="WASH HUB" className="mr-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/brand/logo-autolavaggi.png`} alt="WASH HUB"
                  className="h-7 w-auto" />
              </Link>

              {/* Nav links — desktop */}
              <nav className="hidden md:flex items-center">
                {NAV.map(({ label, href }) => (
                  <Link key={href} href={href}
                    className="px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all">
                    {label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <Link href="/prenota"
                className="ml-2 px-4 py-1.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors">
                Prenota
              </Link>

              {/* Mobile burger dentro la pill */}
              <button onClick={() => setOpen(!open)}
                className="md:hidden flex flex-col gap-1 p-1.5 text-white ml-1"
                aria-label="Menu">
                <span className={cn('block w-4 h-0.5 bg-current transition-all duration-200', open && 'rotate-45 translate-y-1.5')} />
                <span className={cn('block w-4 h-0.5 bg-current transition-all duration-200', open && 'opacity-0')} />
                <span className={cn('block w-4 h-0.5 bg-current transition-all duration-200', open && '-rotate-45 -translate-y-1.5')} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0F0F0F]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-2 md:hidden">
            <button onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2">
              ✕
            </button>
            {NAV.map(({ label, href }, i) => (
              <motion.div key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}>
                <Link href={href} onClick={() => setOpen(false)}
                  className="block text-3xl font-black text-white hover:text-[#F5C518] transition-colors py-3 text-center"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Link href="/prenota" onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-center px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-lg">
                Prenota ora →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
