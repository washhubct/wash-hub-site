'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiggsfieldVideo } from '@/components/ui/HiggsfieldVideo'

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background video/placeholder */}
      <HiggsfieldVideo
        prompt="cinematic aerial shot of a luxury car being washed in a premium car wash, water splashing in slow motion, golden hour light, Catania Sicily, photorealistic 4K"
        className="absolute inset-0 w-full h-full"
        overlayOpacity={0.6}
      />

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
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            I N°1 a Catania
            <br />
            <span className="text-[#F5C518]">per il lavaggio auto.</span>
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
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-base md:text-lg hover:bg-[#E0B210] transition-all hover:scale-105 active:scale-100">
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
