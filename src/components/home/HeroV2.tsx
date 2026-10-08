'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AutoVideo } from '@/components/ui/AutoVideo'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Hero: poche parole, due scelte grandi (lavaggio / parcheggio) e Porta un amico ben in vista.
export function HeroV2() {
  const scelte = [
    { href: '/prenota', icona: '🧽', titolo: 'Lavaggio', cta: 'Prenota', giallo: true },
    { href: '#parcheggio', icona: '🅿️', titolo: 'Parcheggio', cta: 'Scopri', giallo: false },
  ]

  return (
    <section className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden bg-[#0F0F0F]">
      <AutoVideo src={`${BASE}/brand/hero-bg.mp4`} poster={`${BASE}/brand/hero-poster.jpg`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/85" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-10 md:py-32 text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 22, stiffness: 80, delay: 0.1 }}>
          <h1 className="font-display text-[2.8rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Il tuo pit-stop<br />
            <span className="text-[#F5C518]">a Catania.</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/75">
            Lungomare · Paesi Etnei
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 max-w-2xl">
          {scelte.map((s, i) => (
            <motion.div key={s.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.3 + i * 0.1 }}>
              <Link href={s.href}
                className={`group h-full flex flex-col items-start gap-4 rounded-3xl p-5 transition-all hover:-translate-y-0.5 active:translate-y-0 ${s.giallo
                  ? 'bg-[#F5C518] text-[#0F0F0F]'
                  : 'bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/15'}`}
                style={s.giallo ? { border: '3px solid #0F0F0F', boxShadow: '5px 5px 0 #0F0F0F' } : undefined}>
                <span className="text-3xl md:text-4xl">{s.icona}</span>
                <span className="font-black text-2xl md:text-3xl leading-none" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{s.titolo}</span>
                <span className={`font-bold text-sm px-3 py-1.5 rounded-full ${s.giallo ? 'bg-[#0F0F0F] text-[#F5C518]' : 'bg-white text-[#0F0F0F]'}`}>{s.cta} →</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-4 max-w-2xl">
          <Link href="/referral"
            className="flex items-center gap-4 rounded-3xl px-5 py-4 bg-[#0F0F0F]/70 backdrop-blur-md text-white hover:bg-[#0F0F0F]/85 transition-colors"
            style={{ border: '2px dashed #F5C518' }}>
            <span className="shrink-0 w-12 h-12 rounded-2xl bg-[#F5C518] flex items-center justify-center text-2xl">🎁</span>
            <span className="flex-1 font-black text-lg md:text-xl leading-tight" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Porta un amico, <span className="text-[#F5C518]">ricevi €5</span>
            </span>
            <span className="hidden sm:block shrink-0 text-[#F5C518] font-black text-xl">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
