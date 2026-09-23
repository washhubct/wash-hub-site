'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { fmtEur, fmtLocal, getStatoCodice, INDIRIZZO, MAPS_URL, type StatoCodice } from '@/lib/parcheggio-smart'

const POLL_MS = 3000
const MAX_WAIT_MS = 3 * 60 * 1000

export function ConfermaCodice() {
  const params = useSearchParams()
  const id = params.get('id') || ''
  const [dati, setDati] = useState<StatoCodice | null>(null)
  const [err, setErr] = useState('')
  const [timeout_, setTimeout_] = useState(false)
  const [copiato, setCopiato] = useState(false)
  const t0 = useRef(Date.now())

  useEffect(() => {
    if (!id) { setErr('Link non valido: manca il riferimento del pagamento.'); return }
    let stop = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const tick = async () => {
      try {
        const s = await getStatoCodice(id)
        if (stop) return
        setDati(s)
        if (s.stato === 'attivo' || s.stato === 'fallito' || s.stato === 'revocato') return
      } catch (e) {
        if (stop) return
        const m = e instanceof Error ? e.message : ''
        setErr(!m || /fetch|network/i.test(m) ? 'Non riesco a contattare il server. Ricarica la pagina tra qualche secondo: il codice non va perso.' : m)
        return
      }
      if (Date.now() - t0.current > MAX_WAIT_MS) { setTimeout_(true); return }
      timer = setTimeout(tick, POLL_MS)
    }
    tick()
    return () => { stop = true; if (timer) clearTimeout(timer) }
  }, [id])

  const box = 'rounded-3xl bg-white border border-[#E8E8E4] p-8 md:p-10 text-center shadow-[0_20px_60px_-30px_rgba(15,15,15,0.25)]'

  if (err) return <div className={box}><p className="text-3xl mb-3">😕</p><p className="font-bold text-[#0F0F0F]">{err}</p><Ritorna /></div>

  if (!dati || dati.stato === 'in_pagamento') {
    return (
      <div className={box}>
        {timeout_ ? (<>
          <p className="text-3xl mb-3">⏳</p>
          <p className="font-bold text-[#0F0F0F]">Il pagamento risulta ancora in elaborazione.</p>
          <p className="text-[#6B6B6B] mt-2 text-sm">Se hai completato il pagamento, ricarica questa pagina tra un minuto oppure scrivici su WhatsApp con la targa.</p>
          <button onClick={() => window.location.reload()} className="mt-6 px-7 py-3 rounded-full bg-[#0F0F0F] text-white font-bold text-sm">Ricarica</button>
        </>) : (<>
          <div className="mx-auto w-12 h-12 rounded-full border-4 border-[#F0F0EC] border-t-[#C8A84E] animate-spin mb-5" />
          <p className="font-bold text-[#0F0F0F]">Sto confermando il pagamento…</p>
          <p className="text-[#6B6B6B] mt-1 text-sm">Pochi secondi, non chiudere la pagina.</p>
        </>)}
      </div>
    )
  }

  if (dati.stato !== 'attivo' || !dati.codice) {
    return (
      <div className={box}>
        <p className="text-3xl mb-3">❌</p>
        <p className="font-bold text-[#0F0F0F]">{dati.stato === 'fallito' ? 'Pagamento non riuscito.' : 'Questo codice non è più valido.'}</p>
        <p className="text-[#6B6B6B] mt-2 text-sm">Nessun addebito è stato effettuato se il pagamento è fallito. Puoi riprovare.</p>
        <Ritorna />
      </div>
    )
  }

  const copia = () => navigator.clipboard?.writeText(dati.codice!).then(() => { setCopiato(true); setTimeout(() => setCopiato(false), 2000) })

  return (
    <div className={box}>
      <p className="text-[#C8A84E] text-xs font-bold uppercase tracking-[0.25em] mb-3">Pagamento confermato</p>
      <h2 className="font-display text-2xl md:text-3xl font-black text-[#0F0F0F] mb-6" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
        Il tuo codice cancello
      </h2>

      <button onClick={copia} title="Copia" className="group mx-auto block rounded-2xl bg-[#0F0F0F] px-8 py-6 md:px-12 md:py-8 transition hover:scale-[1.02] active:scale-100">
        <span className="font-mono text-5xl md:text-7xl font-black tracking-[0.3em] text-[#C8A84E] select-all">{dati.codice}</span>
        <span className="block mt-3 text-[11px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80">{copiato ? 'Copiato ✓' : 'Tocca per copiare'}</span>
      </button>

      <div className="mt-8 grid grid-cols-2 gap-3 text-left">
        <Info k="Targa" v={dati.targa} mono />
        <Info k="Durata" v={`${dati.ore} ore · ${fmtEur(dati.prezzo)}`} />
        <Info k="Dal" v={fmtLocal(dati.inizio)} />
        <Info k="Alle" v={fmtLocal(dati.fine)} />
      </div>

      <ol className="mt-8 text-left space-y-3 text-sm text-[#6B6B6B]">
        <li className="flex gap-3"><b className="text-[#C8A84E] font-black">1</b> Arriva al cancello di <b className="text-[#0F0F0F]">{INDIRIZZO}</b>.</li>
        <li className="flex gap-3"><b className="text-[#C8A84E] font-black">2</b> Digita il codice sul tastierino: il cancello si apre da solo.</li>
        <li className="flex gap-3"><b className="text-[#C8A84E] font-black">3</b> All&rsquo;uscita ripeti il codice sul tastierino interno. Vale fino all&rsquo;orario indicato.</li>
      </ol>

      {dati.email && (
        <p className="mt-6 text-sm text-[#0F0F0F] rounded-xl bg-[#C8A84E]/10 border border-[#C8A84E]/40 px-4 py-3">
          ✉️ {dati.emailInviata ? 'Ti abbiamo inviato il codice anche a' : 'Ti stiamo inviando il codice anche a'} <b>{dati.email}</b>. Controlla anche lo spam.
        </p>
      )}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button onClick={copia}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#0F0F0F] text-white font-bold hover:bg-[#1a1a1a] transition">
          {copiato ? '✓ Copiato' : '📋 Copia il codice'}
        </button>
        <a href={MAPS_URL} target="_blank" rel="noopener"
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#F0F0EC] text-[#0F0F0F] font-bold hover:bg-[#E8E8E4] transition">
          📍 Portami al parcheggio
        </a>
      </div>
      <p className="mt-6 text-xs text-[#6B6B6B]">Tieni questa pagina: il codice resta visibile ricaricandola. Hai bisogno di più tempo? Passa al banco o prendi un nuovo codice.</p>
    </div>
  )
}

function Info({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-xl bg-[#FAFAF7] border border-[#E8E8E4] px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B] font-bold">{k}</div>
      <div className={`text-[#0F0F0F] font-semibold mt-0.5 ${mono ? 'font-mono tracking-widest' : ''}`}>{v}</div>
    </div>
  )
}

function Ritorna() {
  return <Link href="/parcheggio-smart" className="inline-flex mt-6 px-7 py-3 rounded-full bg-[#0F0F0F] text-white font-bold text-sm">← Torna al Parcheggio Smart</Link>
}
