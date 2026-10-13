import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConfermaCaparra } from '@/components/booking/ConfermaCaparra'

export const metadata: Metadata = { title: 'Prenotazione confermata', robots: { index: false, follow: false } }

export default function ConfermaCaparraPage() {
  return (
    <div className="pt-20">
      <section className="min-h-[70vh] bg-[#F0F0EC] py-16 md:py-24">
        <div className="max-w-xl mx-auto px-5 md:px-8">
          <Suspense fallback={<div className="rounded-3xl bg-white border border-[#E8E8E4] p-10 text-center text-[#6B6B6B]">Caricamento…</div>}>
            <ConfermaCaparra />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
