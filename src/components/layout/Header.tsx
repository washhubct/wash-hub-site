'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Servizi', href: '/servizi' },
  { label: 'Le nostre sedi', href: '/sedi' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#0F0F0F]/95 backdrop-blur-md shadow-lg'
        : 'bg-[#0F0F0F]/60 backdrop-blur-sm'
    )}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="WASH HUB — Home" className="flex items-center">
          <Image
            src="/wash-hub-site/brand/logo.png"
            alt="WASH HUB"
            width={80}
            height={80}
            className="h-12 md:h-14 w-auto"
            style={{ mixBlendMode: 'screen' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + Burger */}
        <div className="flex items-center gap-3">
          <Link href="/prenota"
            className="hidden md:flex items-center px-5 py-2.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors">
            Prenota ora
          </Link>
          <button onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 text-white"
            aria-label="Menu">
            <span className={cn('block w-5 h-0.5 bg-current transition-all duration-200', open && 'rotate-45 translate-y-2')} />
            <span className={cn('block w-5 h-0.5 bg-current transition-all duration-200', open && 'opacity-0')} />
            <span className={cn('block w-5 h-0.5 bg-current transition-all duration-200', open && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F0F0F] border-t border-white/10 overflow-hidden">
            <nav className="flex flex-col px-5 py-4 gap-1">
              {NAV.map(({ label, href }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="py-3 text-white/80 font-medium border-b border-white/10 last:border-0">
                  {label}
                </Link>
              ))}
              <Link href="/prenota" onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center px-5 py-3 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold">
                Prenota ora →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
