import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConfermaCodice } from '@/components/parcheggio/ConfermaCodice'

export const metadata: Metadata = {
  title: 'Il tuo codice parcheggio',
  description: 'Conferma del pagamento e codice di accesso al parcheggio WASH HUB Lungomare.',
  robots: { index: false, follow: false },
}

export default function ConfermaPage() {
  return (
    <div className="pt-20">
      <section className="min-h-[70vh] bg-[#F0F0EC] py-16 md:py-24">
        <div className="max-w-xl mx-auto px-5 md:px-8">
          <p className="text-center text-[#6B6B6B] text-xs font-bold uppercase tracking-[0.25em] mb-6">WASH HUB · Parcheggio Smart</p>
          <Suspense fallback={<div className="rounded-3xl bg-white border border-[#E8E8E4] p-10 text-center text-[#6B6B6B]">Caricamento…</div>}>
            <ConfermaCodice />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
