'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Prima/dopo da trascinare con il dito. Coppia generata con Higgsfield Nano Banana Pro (08/10/2026):
// dopo.jpg = scatto pulito, prima.jpg = stesso scatto sporcato (cenere, salsedine, fango), allineati al pixel.
export function PrimaDopo() {
  const box = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(55)
  const [toccato, setToccato] = useState(false)
  const muovi = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)))
    setToccato(true)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-[#0F0F0F] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-[1fr_1.3fr] gap-10 items-center">
        <AnimatedSection>
          <p className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-3">Cenere dell&apos;Etna, salsedine, pioggia</p>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-[0.95]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Trascina.<br /><span className="text-[#F5C518]">Guarda la differenza.</span>
          </h2>
          <Link href="/prenota" className="mt-7 inline-flex items-center px-7 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black hover:scale-105 transition-transform">
            Prenota il lavaggio →
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div ref={box}
            className="relative aspect-[4/3] rounded-[28px] overflow-hidden select-none touch-none cursor-ew-resize"
            style={{ border: '3px solid #F5C518' }}
            onPointerDown={e => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); muovi(e.clientX) }}
            onPointerMove={e => { if (e.buttons || e.pointerType === 'touch') muovi(e.clientX) }}>
            <img src={`${BASE}/brand/dopo.jpg`} alt="Auto dopo il lavaggio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img src={`${BASE}/brand/prima.jpg`} alt="Auto prima del lavaggio" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
            </div>
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-xs font-bold">PRIMA</span>
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F5C518] text-[#0F0F0F] text-xs font-bold">DOPO</span>
            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 w-1 bg-[#F5C518]" />
              <div className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#F5C518] text-[#0F0F0F] flex items-center justify-center font-black text-lg shadow-xl ${toccato ? '' : 'animate-pulse'}`}>⟷</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
