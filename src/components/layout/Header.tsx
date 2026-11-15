'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MAPPE } from '@/lib/sedi'

const NAV = [
  { label: 'Servizi', href: '/servizi' },
  { label: 'Le nostre sedi', href: '/sedi' },
  { label: 'Parcheggio Smart', href: '/parcheggio-smart' },
  { label: 'Flotte', href: '/flotte' },
  { label: 'Porta un amico', href: '/referral', badge: '€5' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contatti', href: '/contatti' },
]

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Voci di menu per schermi larghi: stesse voci nella barra in alto e nella pill
function VociMenu({ pathname }: { pathname: string }) {
  return (
    <>
      {NAV.map(({ label, href, badge }) => {
        const attiva = pathname.startsWith(href)
        return (
          <Link key={href} href={href} aria-current={attiva ? 'page' : undefined}
            className={cn('px-3 py-1.5 text-sm font-medium rounded-full hover:text-white hover:bg-white/5 transition-all inline-flex items-center gap-1.5 whitespace-nowrap',
              attiva ? 'text-white' : 'text-white/70')}>
            {label}
            {badge && <span className="px-1.5 py-0.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-[10px] font-black leading-none">{badge}</span>}
          </Link>
        )
      })}
    </>
  )
}

// Pulsante giallo: prenotazione ovunque, tranne sulla sede POP dove non si prenota e servono le indicazioni
function Azione({ pop, corto, className, onClick }: { pop: boolean, corto?: boolean, className: string, onClick?: () => void }) {
  if (pop) {
    return (
      <a href={MAPPE.pop.indicazioni} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {corto ? 'Indicazioni' : 'Come arrivare'}
      </a>
    )
  }
  return (
    <Link href="/prenota" prefetch={false} className={className} onClick={onClick}>
      {corto ? 'Prenota' : 'Prenota ora'}
    </Link>
  )
}

export function Header() {
  const pathname = usePathname() || '/'
  const pop = pathname.startsWith('/sedi/paesi-etnei')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const chiudi = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Menu aperto: il bottone WhatsApp non deve coprire le voci (vedi .wa-fab in globals.css), Esc chiude
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    chiudi.current?.focus()
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.classList.remove('menu-open')
    }
  }, [open])

  return (
    <header>
      {/* Top bar — visibile solo prima dello scroll; quando appare la pill, sparisce */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
              <Link href="/" aria-label="WASH HUB" className="pointer-events-auto shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/brand/logo-autolavaggi.webp`} alt="WASH HUB" width={96} height={96}
                  className="h-20 md:h-24 w-auto drop-shadow-lg" />
              </Link>
              {/* Menu a inizio pagina, solo dove ci sta (da lg): fondo scuro perché la barra è trasparente */}
              <nav aria-label="Principale"
                className="pointer-events-auto hidden lg:flex items-center px-2 py-1.5 rounded-full bg-[#0F0F0F]/80 backdrop-blur-xl border border-white/10 shadow-lg">
                <VociMenu pathname={pathname} />
              </nav>
              <div className="pointer-events-auto flex items-center gap-2 shrink-0">
                <Azione pop={pop}
                  className="flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors shadow-lg" />
                {/* Burger (telefono e tablet) — fondo scuro: la barra è trasparente e le pagine interne hanno sfondo chiaro */}
                <button onClick={() => setOpen(true)}
                  className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-full bg-[#0F0F0F]/80 backdrop-blur text-white shadow-lg"
                  aria-label="Apri menu" aria-expanded={open}>
                  <span className="block w-5 h-0.5 bg-current" />
                  <span className="block w-5 h-0.5 bg-current" />
                  <span className="block w-5 h-0.5 bg-current" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pill — appare allo scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-full bg-[#0F0F0F]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Logo mini */}
              <Link href="/" aria-label="WASH HUB" className="mr-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/brand/logo-autolavaggi.webp`} alt="WASH HUB" width={28} height={28}
                  className="h-7 w-auto" />
              </Link>

              {/* Voci — solo da lg: a 768px sette voci non entrano nella pill */}
              <nav aria-label="Principale" className="hidden lg:flex items-center">
                <VociMenu pathname={pathname} />
              </nav>

              <Azione pop={pop} corto
                className="ml-2 px-4 py-1.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors" />

              {/* Burger dentro la pill (telefono e tablet) */}
              <button onClick={() => setOpen(true)}
                className="lg:hidden flex flex-col gap-1 p-1.5 text-white ml-1"
                aria-label="Apri menu" aria-expanded={open}>
                <span className="block w-4 h-0.5 bg-current" />
                <span className="block w-4 h-0.5 bg-current" />
                <span className="block w-4 h-0.5 bg-current" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu a tutto schermo (telefono e tablet) — sopra la barra, così la ✕ resta sempre cliccabile */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0F0F0F] flex flex-col items-center justify-center gap-2 overflow-y-auto lg:hidden">
            <button ref={chiudi} onClick={() => setOpen(false)}
              aria-label="Chiudi menu"
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full text-xl text-white/70 hover:text-white hover:bg-white/10">
              ✕
            </button>
            <nav aria-label="Menu" className="flex flex-col items-center gap-2">
              {NAV.map(({ label, href, badge }, i) => (
                <motion.div key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}>
                  <Link href={href} onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 text-3xl font-black text-white hover:text-[#F5C518] transition-colors py-3 text-center"
                    style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                    {label}
                    {badge && <span className="px-2 py-1 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-black leading-none">{badge}</span>}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Azione pop={pop} onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-center px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
