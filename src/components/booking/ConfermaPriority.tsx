'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getPriorityStato } from '@/lib/priority'

// Ritorno da SumUp: verifica il pagamento (la function ricontrolla su SumUp) e conferma la prenotazione Priority.
export function ConfermaPriority() {
  const id = useSearchParams().get('id') || ''
  const [s, setS] = useState<Awaited<ReturnType<typeof getPriorityStato>> | null>(null)
  const [err, setErr] = useState(false)
  useEffect(() => {
    if (!id) { setErr(true); return }
    let n = 0, stop = false
    const giro = () => getPriorityStato(id).then(r => {
      if (stop) return
      setS(r)
      if (r.stato === 'in_pagamento' && n++ < 20) setTimeout(giro, 3000)
    }).catch(() => setErr(true))
    giro()
    return () => { stop = true }
  }, [id])

  const box = 'rounded-3xl bg-white border border-[#E8E8E4] p-8 md:p-10 text-center'
  if (err) return <div className={box}><p className="text-[#0F0F0F] font-bold">Prenotazione non trovata.</p><p className="text-sm text-[#6B6B6B] mt-2">Scrivici su WhatsApp e controlliamo subito.</p></div>
  if (!s || s.stato === 'in_pagamento') return <div className={box}><div className="inline-block w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-3" /><p className="text-[#6B6B6B]">Verifico il pagamento…</p></div>
  if (s.stato !== 'pagato') return (
    <div className={box}>
      <p className="text-3xl mb-2">😕</p>
      <p className="font-black text-xl text-[#0F0F0F]">Pagamento non riuscito</p>
      <p className="text-sm text-[#6B6B6B] mt-2">Nessun addebito. Puoi riprovare quando vuoi.</p>
      <Link href="/prenota" className="mt-6 inline-flex px-6 py-3 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black">Riprova →</Link>
    </div>
  )
  const giorno = new Date(s.dataPren + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <div className="rounded-3xl bg-[#0F0F0F] text-white p-8 md:p-10 text-center" style={{ border: '3px solid #F5C518' }}>
      <p className="text-4xl mb-3">⚡</p>
      <p className="font-black text-3xl" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>Priority confermato</p>
      <p className="mt-4 text-[#F5C518] font-bold text-lg capitalize">{giorno} · ore {s.orario}</p>
      <p className="text-white/70 text-sm mt-1">{s.servizio}</p>
      <p className="mt-6 text-white/75 text-sm leading-relaxed max-w-sm mx-auto">Arriva all&apos;orario scelto e dillo all&apos;ingresso: passi davanti alla coda. Il lavaggio lo paghi in sede come sempre.</p>
      <a href="https://www.google.com/maps/search/?api=1&query=Wash+Hub+Lungomare+Via+Anfuso+35+Catania" target="_blank" rel="noopener noreferrer"
        className="mt-7 inline-flex px-6 py-3 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black">📍 Via Anfuso 35 · Come arrivare</a>
    </div>
  )
}
