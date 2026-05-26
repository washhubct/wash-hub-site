'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ = [
  {
    q: 'Devo prenotare o posso venire direttamente?',
    a: 'Al Lungomare puoi prenotare online oppure passare direttamente — accogliamo i clienti walk-in compatibilmente con la disponibilità degli slot. Ai Paesi Etnei il self service non richiede prenotazione: sei sempre libero di venire.',
  },
  {
    q: 'Quanto tempo ci vuole per un lavaggio?',
    a: 'Il lavaggio esterno richiede circa 15 minuti. Il Lavaggio Tradizionale (esterno + interni) circa 30 minuti. Il Performance Intenso fino a 60 minuti. Per la tappezzeria i tempi variano in base al servizio richiesto.',
  },
  {
    q: 'Cosa include il lavaggio esterno?',
    a: 'Carrozzeria completa, vetri, cerchi e passaruota. Prodotti professionali e risciacquo finale con acqua osmotizzata per evitare aloni.',
  },
  {
    q: 'Cosa include il Lavaggio Tradizionale?',
    a: 'Tutto il lavaggio esterno più aspirazione abitacolo, pulizia cruscotto e superfici interne, e cura dei vetri interni. Il risultato completo dentro e fuori.',
  },
  {
    q: 'Posso lavare la moto?',
    a: 'Sì, al Lungomare laviamo moto e scooter a €12. Ti chiediamo solo di farla raffreddare prima di portarla — il cambio di temperatura repentino non fa bene ai componenti.',
  },
  {
    q: 'Il self service ai Paesi Etnei è sempre aperto?',
    a: 'Sì, il self service è aperto 24 ore su 24, 7 giorni su 7, inclusi domenica e festivi. Gli operatori per il lavaggio manuale sono invece disponibili dal lunedì alla domenica dalle 8:00 alle 19:00.',
  },
  {
    q: 'Come si paga?',
    a: 'Al Lungomare accettiamo contanti e carte di credito/debito. Al self service dei Paesi Etnei si paga con monete o contactless.',
  },
  {
    q: 'Fate la tappezzeria su tutti i tipi di auto?',
    a: 'Sì, trattiamo qualsiasi tipo di interno — tessuto, pelle, alcantara, similpelle. Per un preventivo accurato ti consigliamo di portare il veicolo o mandarci delle foto via WhatsApp prima.',
  },
  {
    q: 'Siete soddisfatti della qualità garantita?',
    a: 'Assolutamente. Se al ritiro non sei soddisfatto del risultato, te lo rifacciamo. Nessuna discussione.',
  },
  {
    q: 'Posso portare un SUV o un furgone?',
    a: 'Sì, laviamo SUV, furgoni leggeri e veicoli commerciali. Il prezzo varia in base alla dimensione — scrivici su WhatsApp per un preventivo rapido.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <AnimatedSection delay={index * 0.05}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 rounded-2xl bg-white border border-[#E8E8E4] hover:border-[#F5C518]/50 transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-bold text-[#0F0F0F] text-base leading-snug">{q}</span>
          <span className={`text-[#F5C518] text-xl font-black shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
        </div>
        <AnimatePresence>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[#6B6B6B] text-sm leading-relaxed mt-4 overflow-hidden"
            >
              {a}
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </AnimatedSection>
  )
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Hai domande?</p>
          <h1 className="font-display text-5xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            FAQ
          </h1>
          <p className="text-white/50 mt-4 text-lg">Tutto quello che vuoi sapere prima di venire.</p>
        </AnimatedSection>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8 space-y-3">
          {FAQ.map(({ q, a }, i) => (
            <FAQItem key={q} q={q} a={a} index={i} />
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
