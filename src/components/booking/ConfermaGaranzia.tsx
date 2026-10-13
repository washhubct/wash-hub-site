'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getGaranziaStato } from '@/lib/garanzia'

// Ritorno da Stripe: la function verifica che la carta sia salvata e crea la prenotazione.
export function ConfermaGaranzia() {
  const id = useSearchParams().get('id') || ''
  const [s, setS] = useState<Awaited<ReturnType<typeof getGaranziaStato>> | null>(null)
  const [err, setErr] = useState(false)
  useEffect(() => {
    if (!id) { setErr(true); return }
    let n = 0, stop = false
    const giro = () => getGaranziaStato(id).then(r => {
      if (stop) return
      setS(r)
      if (r.stato === 'in_attesa' && n++ < 20) setTimeout(giro, 3000)
    }).catch(() => setErr(true))
    giro()
    return () => { stop = true }
  }, [id])
  const box = 'rounded-3xl bg-white border border-[#E8E8E4] p-8 md:p-10 text-center'
  if (err) return <div className={box}><p className="font-bold text-[#0F0F0F]">Prenotazione non trovata.</p><p className="text-sm text-[#6B6B6B] mt-2">Scrivici su WhatsApp e controlliamo subito.</p></div>
  if (!s || s.stato === 'in_attesa') return <div className={box}><div className="inline-block w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-3" /><p className="text-[#6B6B6B]">Verifico la carta…</p></div>
  if (s.stato !== 'salvata') return (
    <div className={box}>
      <p className="text-3xl mb-2">😕</p>
      <p className="font-black text-xl text-[#0F0F0F]">Carta non salvata</p>
      <p className="text-sm text-[#6B6B6B] mt-2">Nessuna prenotazione registrata e nessun addebito. Puoi riprovare quando vuoi.</p>
      <Link href="/prenota" className="mt-6 inline-flex px-6 py-3 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black">Riprova →</Link>
    </div>
  )
  const giorno = new Date(s.dataPren + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <div className={box}>
      <div className="text-5xl mb-4">✅</div>
      <p className="font-black text-3xl text-[#0F0F0F]" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>Prenotazione confermata</p>
      <p className="mt-4 font-bold text-lg capitalize text-[#0F0F0F]">{giorno} · ore {s.orario}</p>
      <p className="text-[#6B6B6B] text-sm mt-1">{s.servizio}</p>
      <p className="mt-5 text-sm text-[#6B6B6B] leading-relaxed max-w-sm mx-auto">Carta salvata a garanzia: non ti abbiamo addebitato niente, il lavaggio lo paghi in sede. Imprevisto? Disdici gratis fino a {s.oreDisdetta} ore prima su <a href="/disdici" className="underline font-semibold text-[#0F0F0F]">wash-hub.it/disdici</a>. Se non ti presenti, penale di €{s.importo}.</p>
    </div>
  )
}
