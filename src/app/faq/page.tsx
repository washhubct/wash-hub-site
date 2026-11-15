'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import { FAQ, type Voce } from '@/data/faq'

function FAQItem({ q, a, link, index }: Voce & { index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`
  return (
    <AnimatedSection eager={index < 5} delay={index * 0.05}
      className="rounded-2xl bg-white border border-[#E8E8E4] hover:border-[#F5C518]/50 transition-all">
      <h2>
        <button
          id={`${id}-q`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          className="w-full text-left p-6 flex items-start justify-between gap-4"
        >
          <span className="font-bold text-[#0F0F0F] text-base leading-snug">{q}</span>
          <span aria-hidden="true" className={`text-[#F5C518] text-xl font-black shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
        </button>
      </h2>
      {/* La risposta resta sempre nell'HTML (Google e AI la leggono), si apre solo l'altezza */}
      <motion.div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        {/* inert: da chiusa il link interno non prende il focus da tastiera */}
        <div inert={!open} className="px-6 pb-6">
          <p className="text-[#6B6B6B] text-sm leading-relaxed">{a}</p>
          {link && (
            <Link href={link.href} className="inline-block mt-3 text-sm font-semibold text-[#0F0F0F] underline">
              {link.label} →
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection eager>
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Hai domande?</p>
          <h1 className="font-display text-5xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Domande frequenti
            <span className="block mt-3 text-2xl md:text-3xl font-bold text-white/80">sul lavaggio auto a Catania</span>
          </h1>
          <p className="text-white/70 mt-4 text-lg">Tutto quello che vuoi sapere prima di venire.</p>
        </AnimatedSection>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8 space-y-3">
          {FAQ.map((voce, i) => (
            <FAQItem key={voce.q} {...voce} index={i} />
          ))}
        </div>
        <AnimatedSection className="text-center mt-16">
          <p className="text-[#6B6B6B] mb-4">Non hai trovato risposta?</p>
          <a href="https://wa.me/390954695153" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F0F0F] text-white font-bold hover:bg-[#1a1a1a] transition-all">
            Scrivici su WhatsApp →
          </a>
        </AnimatedSection>
      </section>
    </div>
  )
}
