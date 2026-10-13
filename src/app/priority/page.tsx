import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Priority — salti la coda | WASH HUB Catania',
  description: 'Nelle ore di punta prenoti con Priority: passi davanti alla coda al lavaggio WASH HUB Lungomare.',
}

// Pagina breve (Guido: poche scritte). Il prodotto vive dentro /prenota: gli orari ⚡ compaiono solo nelle ore calde.
export default function PriorityPage() {
  const punti = [
    { i: '🔥', t: 'Ore di punta', d: 'Quando c’è coda, nella prenotazione compaiono gli orari ⚡.' },
    { i: '⚡', t: 'Passi davanti', d: 'Arrivi all’orario scelto ed entri in lavaggio entro 10 minuti.' },
    { i: '🤝', t: 'Garantito', d: 'Se aspetti di più, ti restituiamo i €5.' },
  ]
  return (
    <div className="pt-20">
      <section className="py-16 md:py-24 bg-[#0F0F0F] text-white">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <p className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.25em] mb-4">WASH HUB Lungomare</p>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            ⚡ Priority.<br /><span className="text-[#F5C518]">Salti la coda.</span>
          </h1>
          <p className="mt-5 text-white/70 text-lg">+€5 sul lavaggio, nelle ore di punta.</p>
          <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left">
            {punti.map(p => (
              <div key={p.t} className="rounded-3xl p-5 bg-white/5 border border-white/10">
                <div className="text-2xl">{p.i}</div>
                <div className="mt-3 font-black text-lg" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{p.t}</div>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <Link href="/prenota" className="mt-10 inline-flex px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black text-lg hover:scale-105 transition-transform">
            Prenota →
          </Link>
        </div>
      </section>
    </div>
  )
}
