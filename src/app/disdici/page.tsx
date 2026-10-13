import type { Metadata } from 'next'
import { Disdici } from '@/components/booking/Disdici'

export const metadata: Metadata = { title: 'Disdici la prenotazione — WASH HUB', description: 'Disdici gratis la tua prenotazione WASH HUB fino a 2 ore prima.' }

export default function DisdiciPage() {
  return (
    <div className="pt-20">
      <section className="min-h-[70vh] bg-[#F0F0EC] py-16 md:py-24">
        <div className="max-w-md mx-auto px-5 md:px-8">
          <h1 className="font-display text-4xl font-black text-[#0F0F0F] text-center mb-8" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>Disdici la prenotazione</h1>
          <Disdici />
        </div>
      </section>
    </div>
  )
}
