'use client'

import { useEffect, useState } from 'react'

// Popup chiusura estiva 14–22 agosto 2026.
// Si mostra una volta per sessione, solo finché la chiusura è rilevante.
const FINE_CHIUSURA = '2026-08-22'
const STORAGE_KEY = 'chiusura-estiva-2026-vista'

export function ChiusuraEstivaPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const oggi = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString().split('T')[0]
    if (oggi > FINE_CHIUSURA) return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    setVisible(true)
  }, [])

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-sm"
      onClick={close} role="dialog" aria-modal="true" aria-label="Chiusura estiva 14-22 agosto">
      <div className="relative max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <button onClick={close} aria-label="Chiudi"
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white text-[#0F0F0F] font-black text-lg shadow-lg hover:scale-110 transition-transform">
          ✕
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/chiusura-estiva-2026.jpg" alt="Wash Hub — chiusura estiva dal 14 al 22 agosto, riapriamo il 24 agosto"
          className="w-full h-auto rounded-2xl shadow-2xl" />
      </div>
    </div>
  )
}
