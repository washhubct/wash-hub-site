import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConfermaPriority } from '@/components/booking/ConfermaPriority'

export const metadata: Metadata = {
  title: 'Priority confermato',
  robots: { index: false, follow: false },
}

export default function ConfermaPriorityPage() {
  return (
    <div className="pt-20">
      <section className="min-h-[70vh] bg-[#F0F0EC] py-16 md:py-24">
        <div className="max-w-xl mx-auto px-5 md:px-8">
          <p className="text-center text-[#6B6B6B] text-xs font-bold uppercase tracking-[0.25em] mb-6">WASH HUB · Priority</p>
          <Suspense fallback={<div className="rounded-3xl bg-white border border-[#E8E8E4] p-10 text-center text-[#6B6B6B]">Caricamento…</div>}>
            <ConfermaPriority />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
