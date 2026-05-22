import { BookingFlow } from '@/components/booking/BookingFlow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prenota — WASH HUB Catania',
  description: 'Prenota il tuo lavaggio auto online. Scegli servizio, data e orario. Conferma in 2 minuti.',
}

export default function PrenotaPage() {
  return (
    <div className="pt-20">
      <section className="py-12 md:py-16 bg-[#0F0F0F] text-white text-center">
        <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Online · WASH HUB Lungomare</p>
        <h1 className="font-display text-5xl md:text-6xl font-black"
          style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
          Prenota il tuo lavaggio.
        </h1>
        <p className="text-white/60 mt-4 text-lg">Scegli data e orario. Conferma in 2 minuti.</p>
      </section>

      <section className="py-12 md:py-20 bg-[#FAFAF7]">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <BookingFlow />
        </div>
      </section>
    </div>
  )
}
