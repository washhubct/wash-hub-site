'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'

type Voce = { q: string; a: string; link?: { href: string; label: string } }

const FAQ: Voce[] = [
  {
    q: 'Devo prenotare o posso venire direttamente?',
    a: 'Al Lungomare puoi prenotare online oppure passare direttamente: accogliamo chi arriva senza prenotazione compatibilmente con la disponibilità degli orari. Ai Paesi Etnei il self service non richiede prenotazione: sei sempre libero di venire.',
    link: { href: '/prenota', label: 'Prenota online' },
  },
  {
    q: 'Posso disdire una prenotazione?',
    a: 'Sì. Disdici gratis fino a 2 ore prima dell\'orario prenotato dalla pagina Disdici: ti servono il telefono usato per prenotare, il nome e il giorno. Se mancano meno di 2 ore, scrivici su WhatsApp.',
    link: { href: '/disdici', label: 'Disdici una prenotazione' },
  },
  {
    q: 'Quanto tempo ci vuole per un lavaggio?',
    a: 'Il lavaggio esterno richiede circa 15 minuti. Il Lavaggio Tradizionale (esterno + interni) circa 30 minuti. Il Performance Intenso varia da veicolo a veicolo: dipende da dimensioni e da quanto è sporca l\'auto. Per la tappezzeria i tempi variano in base al servizio richiesto.',
    link: { href: '/servizi', label: 'Vedi il listino' },
  },
  {
    q: 'Cosa include il lavaggio esterno?',
    a: 'Carrozzeria completa, vetri, cerchi e passaruota. Prodotti professionali e risciacquo finale con acqua osmotizzata per evitare aloni.',
  },
  {
    q: 'Cosa include il Lavaggio Tradizionale?',
    a: 'È il lavaggio completo interno ed esterno: tutto il lavaggio esterno più aspirazione abitacolo, pulizia cruscotto e superfici interne, e cura dei vetri interni.',
  },
  {
    q: 'Cosa include il Performance Intenso?',
    a: 'Tutto quello che fa il Lavaggio Tradizionale, fatto in modo intenso: esterno e interni curati a fondo, con trattamento schiumogeno. È pensato per le auto molto sporche o per chi vuole il massimo risultato. Il prezzo dipende dalla taglia dell\'auto e la durata dal veicolo.',
  },
  {
    q: 'Fate smacchiatura e sanificazione degli interni?',
    a: 'Sì, al Lungomare. Smacchiamo a fondo sedili e tessuti e sanifichiamo l\'abitacolo. Per l\'impianto del clima usiamo una bomboletta sanificante, presidio medico-chirurgico. Tempi e costo dipendono dall\'auto e dallo stato degli interni: chiedili in sede o su WhatsApp.',
    link: { href: '/servizi', label: 'Tutti i servizi' },
  },
  {
    q: 'Fate il lavaggio motore?',
    a: 'Sì, al Lungomare, su richiesta. Chiedi in sede o scrivici su WhatsApp prima di venire, così ti diciamo tempi e costo per la tua auto.',
  },
  {
    q: 'Posso lavare la moto?',
    a: 'Sì, al Lungomare laviamo moto e scooter a €12. Ti chiediamo solo di farla raffreddare prima di portarla: il cambio di temperatura repentino non fa bene ai componenti.',
  },
  {
    q: 'Il self service ai Paesi Etnei è sempre aperto?',
    a: 'Sì, il self service è aperto 24 ore su 24, 7 giorni su 7, inclusi domenica e festivi. Gli operatori per il lavaggio manuale sono invece disponibili dal lunedì alla domenica dalle 8:00 alle 19:00.',
    link: { href: '/sedi/paesi-etnei', label: 'La sede POP Paesi Etnei' },
  },
  {
    q: 'Come si paga?',
    a: 'Al Lungomare accettiamo contanti e carte di credito/debito. Al self service dei Paesi Etnei si paga con monete, carta o contactless.',
  },
  {
    q: 'Fate la tappezzeria su tutti i tipi di auto?',
    a: 'Sì, trattiamo qualsiasi tipo di interno: tessuto, pelle, alcantara, similpelle. Per un preventivo accurato ti consigliamo di portare il veicolo o mandarci delle foto via WhatsApp prima.',
  },
  {
    q: 'Il risultato è garantito?',
    a: 'Sì. Se al ritiro non sei soddisfatto del risultato, te lo rifacciamo. Nessuna discussione.',
  },
  {
    q: 'Posso portare un SUV o un furgone?',
    a: 'Sì, laviamo SUV, furgoni leggeri e veicoli commerciali. Il prezzo varia in base alla dimensione: scrivici su WhatsApp per un preventivo rapido.',
  },
]

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
          </h1>
          <p className="text-white/50 mt-4 text-lg">Tutto quello che vuoi sapere prima di venire.</p>
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
