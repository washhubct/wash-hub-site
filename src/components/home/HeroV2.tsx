'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MeteoOggi } from './MeteoOggi'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Hero: due scelte grandi e chiare (lavaggio / parcheggio) sopra la piega, anche su telefono.
export function HeroV2() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
    const riprendi = () => { if (!document.hidden && v.paused) v.play().catch(() => {}) }
    document.addEventListener('visibilitychange', riprendi)
    window.addEventListener('pageshow', riprendi)
    return () => { document.removeEventListener('visibilitychange', riprendi); window.removeEventListener('pageshow', riprendi) }
  }, [])

  const scelte = [
    { href: '/prenota', icona: '🧽', titolo: 'Lavaggio', testo: 'Scegli servizio e orario, conferma in un minuto', cta: 'Prenota', giallo: true },
    { href: '#parcheggio', icona: '🅿️', titolo: 'Parcheggio', testo: 'A ore, di notte col codice o in abbonamento', cta: 'Scopri', giallo: false },
  ]

  return (
    <section className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden bg-[#0F0F0F]">
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={`${BASE}/brand/hero-bg.mp4`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/85" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-10 md:py-32 text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 22, stiffness: 80, delay: 0.1 }}>
          <MeteoOggi />
          <h1 className="mt-5 font-display text-[2.6rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Il tuo pit-stop<br />
            <span className="text-[#F5C518]">a Catania.</span>
          </h1>
          <p className="mt-5 text-base md:text-xl text-white/75 max-w-xl leading-relaxed">
            Lavaggio a mano e parcheggio al <b className="text-white">Lungomare</b>, self service 24/7 a <b className="text-white">Paesi Etnei</b>.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-3xl">
          {scelte.map((s, i) => (
            <motion.div key={s.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.35 + i * 0.12 }}>
              <Link href={s.href}
                className={`group flex items-center gap-4 rounded-3xl p-4 md:p-5 transition-all hover:-translate-y-0.5 active:translate-y-0 ${s.giallo
                  ? 'bg-[#F5C518] text-[#0F0F0F]'
                  : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15'}`}
                style={s.giallo ? { border: '3px solid #0F0F0F', boxShadow: '5px 5px 0 #0F0F0F' } : undefined}>
                <span className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl ${s.giallo ? 'bg-[#0F0F0F]' : 'bg-white/10'}`}>{s.icona}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-xl md:text-2xl leading-none" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{s.titolo}</span>
                  <span className={`block text-sm mt-1 leading-snug ${s.giallo ? 'text-[#0F0F0F]/70' : 'text-white/65'}`}>{s.testo}</span>
                </span>
                <span className={`shrink-0 font-bold text-sm px-3 py-2 rounded-full ${s.giallo ? 'bg-[#0F0F0F] text-[#F5C518]' : 'bg-white text-[#0F0F0F]'} group-hover:translate-x-0.5 transition-transform`}>{s.cta} →</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/sedi/paesi-etnei" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-xs">🚿</span>
            Self service 24/7 · Wash Hub POP Paesi Etnei →
          </Link>
          <Link href="/referral" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <span className="w-6 h-6 rounded-full bg-[#F5C518] text-[#0F0F0F] flex items-center justify-center text-xs">🎁</span>
            Porta un amico: ogni amico vale <b className="text-[#F5C518]">€5</b> →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
