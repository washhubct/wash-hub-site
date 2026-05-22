'use client'

import { useEffect, useRef } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export default function PrenotaPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (data?.height && iframeRef.current) {
          iframeRef.current.style.height = `${data.height + 40}px`
        }
      } catch {}
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <div className="pt-20">
      <section className="py-12 md:py-16 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Online</p>
          <h1 className="font-display text-5xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Prenota il tuo lavaggio.
          </h1>
          <p className="text-white/60 mt-4 text-lg">Scegli data e orario. Conferma in 2 minuti.</p>
        </AnimatedSection>
      </section>

      <section className="py-12 bg-[#FAFAF7]">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <iframe
            ref={iframeRef}
            src="https://dashboard.washhub.it/prenota.html"
            width="100%"
            style={{ height: '800px', border: 'none', borderRadius: '16px', minHeight: '700px' }}
            title="Prenota il tuo lavaggio WASH HUB"
          />
        </div>
      </section>
    </div>
  )
}
