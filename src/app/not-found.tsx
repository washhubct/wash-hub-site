import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina non trovata',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <div className="pt-20">
      <section className="py-28 md:py-36 bg-[#0F0F0F] text-white text-center">
        <div className="max-w-xl mx-auto px-5">
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Errore 404</p>
          <h1 className="font-display text-4xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Questa pagina non c&rsquo;è.
          </h1>
          <p className="text-white/60 mt-4 text-lg">L&rsquo;indirizzo è cambiato o non è mai esistito. Riparti da qui:</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/prenota" prefetch={false}
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-sm hover:bg-[#E0B210] transition-colors">
              Prenota un lavaggio →
            </Link>
            {[['Listino', '/servizi'], ['Le sedi', '/sedi'], ['Home', '/']].map(([l, h]) => (
              <Link key={h} href={h}
                className="inline-flex items-center px-6 py-3 rounded-full border border-white/25 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
