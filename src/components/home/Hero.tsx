'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

const splashes = [
  { size: 420, x: '-12%', y: '-15%', rotate: -20, delay: 0 },
  { size: 360, x: '75%', y: '-10%', rotate: 15, delay: 0.15 },
  { size: 280, x: '-6%', y: '60%', rotate: 30, delay: 0.3 },
  { size: 380, x: '78%', y: '55%', rotate: -10, delay: 0.1 },
  { size: 180, x: '45%', y: '-5%', rotate: 45, delay: 0.2 },
]

function Splash({ size, x, y, rotate, delay }: typeof splashes[0]) {
  return (
    <motion.svg
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 80, delay }}
      width={size} height={size} viewBox="0 0 100 100"
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, rotate: `${rotate}deg` }}
    >
      <path
        d="M50 5 C55 18,70 15,75 28 C85 25,92 35,85 45 C95 50,92 65,80 65 C85 78,75 88,62 83 C60 95,45 95,42 83 C30 90,18 82,22 70 C8 68,5 52,15 45 C5 38,10 22,22 22 C20 10,35 5,50 5Z"
        fill="#F5C518"
        opacity="0.35"
        stroke="#F5C518"
        strokeWidth="3"
        strokeOpacity="0.7"
      />
    </motion.svg>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={`${BASE}/brand/hero-bg.mp4`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Halftone texture */}
      <div className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle, #F5C518 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />

      {/* Cartoon splashes */}
      {splashes.map((s, i) => <Splash key={i} {...s} />)}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-32 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 70, delay: 0.2 }}
        >
          <p className="text-[#F5C518] text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-6">
            Catania · dal 2022
          </p>
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
            style={{
              fontFamily: 'var(--font-bricolage), system-ui',
              textShadow: '4px 4px 0px #000, 6px 6px 0px rgba(0,0,0,0.3)',
            }}>
            I N°1 a Catania
            <br />
            <span style={{
              color: '#F5C518',
              WebkitTextStroke: '2px #000',
              textShadow: '5px 5px 0px #000, 7px 7px 0px rgba(0,0,0,0.3)',
            }}>
              per il lavaggio auto.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
            Artigiani del lavaggio dal 2022. Due sedi, un&rsquo;unica ossessione: la perfezione.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 70, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/prenota"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black text-base md:text-lg hover:bg-[#E0B210] transition-all hover:scale-105 active:scale-100"
            style={{ border: '3px solid #0F0F0F', boxShadow: '4px 4px 0px #0F0F0F' }}>
            Prenota ora →
          </Link>
          <Link href="/sedi"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/50 text-white font-semibold text-base md:text-lg hover:border-white hover:bg-white/10 transition-all">
            Scopri le sedi
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scorri</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
