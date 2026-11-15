'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AutoVideo } from '@/components/ui/AutoVideo'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Hero: poche parole, il voto Google (dato reale da reviews.json, passato dalla pagina), due scelte grandi
// (lavaggio / parcheggio) e sotto la pillola Priority. Porta un amico sta più giù nella home (ReferralBanner).
export function HeroV2({ voto, recensioni }: { voto: number; recensioni: number }) {
  const scelte = [
    { href: '/prenota', icona: '🧽', titolo: 'Lavaggio', cta: 'Prenota', giallo: true },
    { href: '#parcheggio', icona: '🅿️', titolo: 'Parcheggio', cta: 'Scopri', giallo: false },
  ]

  return (
    <section className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden bg-[#0F0F0F]">
      <AutoVideo eager src={`${BASE}/brand/hero-bg-720.mp4`} poster={`${BASE}/brand/hero-poster.jpg`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/85" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-10 md:py-32 text-white">
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 22, stiffness: 80, delay: 0.1 }}>
          <h1 className="font-display text-[2.8rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Autolavaggio<br className="sm:hidden" /> a mano<br />
            <span className="text-[#F5C518]">a Catania.</span>
          </h1>
          <p className="mt-4 text-[15px] md:text-lg leading-snug text-white/90">
            <span className="font-semibold text-white">Lungomare</span> · Via Anfuso 35 · lun–sab 8:00–18:30<br />
            <span className="font-semibold text-white">Paesi Etnei</span> · self service 24 ore su 24
          </p>
          {voto > 0 && recensioni > 0 && (
            <a href="#recensioni" className="mt-4 inline-flex items-center gap-2 text-[15px] md:text-lg font-semibold text-white hover:text-[#F5C518] transition-colors">
              <span aria-hidden className="text-[#F5C518] tracking-tight">★★★★★</span>
              <span>{voto.toFixed(1).replace('.', ',')} su Google</span>
              <span className="font-normal text-white/80">· {recensioni} recensioni</span>
            </a>
          )}
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 max-w-2xl">
          {scelte.map((s, i) => (
            <motion.div key={s.href} initial={false} animate={{ opacity: 1, y: 0 }}
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

        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-5">
          <Link href="/priority" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-sm font-semibold text-white hover:bg-black/55 transition-colors" style={{ border: '1.5px solid #F5C518' }}>
            <span className="text-[#F5C518]">⚡ Priority</span><span className="text-white/80">· salti la coda nelle ore di punta</span><span className="text-[#F5C518]">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
