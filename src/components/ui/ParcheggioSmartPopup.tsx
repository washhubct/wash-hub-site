'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Popup novità Parcheggio Smart: visibile per 15 giorni dal lancio (28/09 → 13/10/2026),
// una volta per sessione, SOLO in home page (quando si atterra sul sito).
const FINE = '2026-10-13'
const STORAGE_KEY = 'parcheggio-smart-novita-vista'

export function ParcheggioSmartPopup() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return
    const oggi = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]
    if (oggi > FINE) return
    try { if (sessionStorage.getItem(STORAGE_KEY)) return } catch { /* private mode */ }
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [pathname])

  const close = () => {
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* private mode */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-5 bg-black/70 backdrop-blur-sm"
      onClick={close} role="dialog" aria-modal="true" aria-label="Novità: Parcheggio Smart">
      <div className="relative max-w-sm w-full rounded-3xl bg-[#0F0F0F] text-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={close} aria-label="Chiudi"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-lg transition-colors">
          ✕
        </button>
        <div className="p-7 pt-9">
          <div className="text-[11px] font-bold tracking-[0.3em] text-[#C8A84E] mb-3">NOVITÀ · LUNGOMARE</div>
          <div className="text-3xl font-black leading-tight mb-3">Parcheggio Smart</div>
          <p className="text-white/80 leading-relaxed mb-5">
            Paghi online, ricevi un codice e parcheggi da solo in Via Anfuso 35, anche di sera e nei festivi.
            Digiti il codice sul tastierino e il cancello si apre, in entrata e in uscita.
          </p>
          <ul className="text-sm text-white/70 space-y-1.5 mb-6">
            <li>⏱ Minimo 2 ore, poi a ore · <b className="text-white">€2/ora</b>, max €8 fino a 6h, max €15 fino a 24h</li>
            <li>📩 Codice subito a schermo e via email</li>
            <li>📅 Prenotabile fino a 7 giorni prima</li>
          </ul>
          <Link href="/parcheggio-smart/" onClick={close}
            className="block w-full text-center rounded-full bg-[#C8A84E] text-[#0F0F0F] font-bold py-3.5 hover:brightness-110 transition">
            Prendi il tuo codice →
          </Link>
          <button onClick={close} className="block w-full text-center text-sm text-white/50 mt-3 hover:text-white/80">Più tardi</button>
        </div>
      </div>
    </div>
  )
}
