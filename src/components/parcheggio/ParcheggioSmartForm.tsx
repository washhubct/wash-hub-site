'use client'

import { useEffect, useMemo, useState } from 'react'
import { creaCheckout, fmtEur, getConfigParcheggio, localNow, prezzoParcheggioOre, type ConfigParcheggio } from '@/lib/parcheggio-smart'

const pad = (n: number) => String(n).padStart(2, '0')
const fmt = (d: Date) => `${d.toLocaleDateString('it-IT', { weekday: 'short' })} ${pad(d.getDate())}/${pad(d.getMonth() + 1)} · ${pad(d.getHours())}:${pad(d.getMinutes())}`

export function ParcheggioSmartForm() {
  const [cfg, setCfg] = useState<ConfigParcheggio>({ attivo: true, minOre: 2, maxOre: 24 })
  const [cfgErr, setCfgErr] = useState(false)
  const [targa, setTarga] = useState('')
  const [telefono, setTelefono] = useState('')
  const [vettura, setVettura] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [marketing, setMarketing] = useState(false)
  const [ore, setOre] = useState(2)
  const [quando, setQuando] = useState<'now' | 'custom'>('now')
  const [inizio, setInizio] = useState(localNow())
  const [privacy, setPrivacy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    getConfigParcheggio()
      .then(c => { setCfg(c); setOre(o => Math.min(Math.max(o, c.minOre), c.maxOre)) })
      .catch(() => setCfgErr(true))
  }, [])

  const prezzo = useMemo(() => prezzoParcheggioOre(ore), [ore])
  const finestra = useMemo(() => {
    const start = quando === 'now' ? new Date() : new Date(inizio)
    if (isNaN(start.getTime())) return null
    return { start, end: new Date(start.getTime() + ore * 3600e3) }
  }, [quando, inizio, ore])

  const targaOk = /^[A-Z0-9]{5,10}$/.test(targa.replace(/[^A-Z0-9]/g, ''))
  const telOk = /^\+?[0-9 ]{8,16}$/.test(telefono.trim())
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  const nomeOk = nome.trim().length >= 2
  const pronto = targaOk && telOk && emailOk && nomeOk && privacy && cfg.attivo && !loading

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!pronto) return
    setErr(''); setLoading(true)
    try {
      const r = await creaCheckout({
        targa: targa.toUpperCase().replace(/[^A-Z0-9]/g, ''),
        telefono: telefono.trim(), vettura: vettura.trim(), nome: nome.trim(), email: email.trim(),
        ore, inizio: quando === 'now' ? 'now' : inizio, consensoMarketing: marketing,
      })
      try { sessionStorage.setItem('ps_last', r.id) } catch { /* private mode */ }
      window.location.href = r.url
    } catch (ex) {
      const m = ex instanceof Error ? ex.message : ''
      setErr(!m || /fetch|network/i.test(m) ? 'Non riesco a contattare il server: controlla la connessione e riprova.' : m)
      setLoading(false)
    }
  }

  const input = 'w-full rounded-xl border border-[#E8E8E4] bg-white px-4 py-3.5 text-[#0F0F0F] placeholder:text-[#6B6B6B]/60 outline-none focus:border-[#C8A84E] focus:ring-4 focus:ring-[#C8A84E]/15 transition'
  const label = 'block text-xs font-bold uppercase tracking-[0.15em] text-[#6B6B6B] mb-2'

  if (!cfg.attivo) {
    return (
      <div className="rounded-3xl bg-white border border-[#E8E8E4] p-8 text-center">
        <p className="text-2xl mb-2">🔧</p>
        <p className="font-bold text-[#0F0F0F]">Vendita online momentaneamente sospesa.</p>
        <p className="text-[#6B6B6B] mt-1">Passa al banco: ti diamo il codice al volo.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white border border-[#E8E8E4] p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(15,15,15,0.25)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="ps-targa">Targa</label>
          <input id="ps-targa" className={`${input} uppercase tracking-[0.2em] font-mono`} placeholder="AB123CD" value={targa}
            onChange={e => setTarga(e.target.value.toUpperCase())} autoComplete="off" inputMode="text" maxLength={10} required />
        </div>
        <div>
          <label className={label} htmlFor="ps-tel">Cellulare</label>
          <input id="ps-tel" className={input} placeholder="333 1234567" value={telefono} type="tel" autoComplete="tel"
            onChange={e => setTelefono(e.target.value)} required />
        </div>
        <div>
          <label className={label} htmlFor="ps-nome">Nome</label>
          <input id="ps-nome" className={input} placeholder="Nome e cognome" value={nome} autoComplete="name" onChange={e => setNome(e.target.value)} required />
        </div>
        <div>
          <label className={label} htmlFor="ps-email">Email</label>
          <input id="ps-email" className={input} placeholder="nome@email.it" value={email} type="email" autoComplete="email" onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ps-vettura">Auto <span className="normal-case font-medium tracking-normal">(facoltativo)</span></label>
          <input id="ps-vettura" className={input} placeholder="Es. Fiat 500" value={vettura} onChange={e => setVettura(e.target.value)} />
        </div>
      </div>
      <p className="mt-3 text-xs text-[#6B6B6B]">Il codice lo vedi subito a schermo e te lo inviamo anche via email.</p>

      {/* Quando */}
      <div className="mt-6">
        <span className={label}>Inizio sosta</span>
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#F0F0EC]">
          {([['now', 'Adesso'], ['custom', 'Scegli orario']] as const).map(([v, l]) => (
            <button key={v} type="button" onClick={() => setQuando(v)}
              className={`py-2.5 rounded-lg text-sm font-bold transition ${quando === v ? 'bg-[#0F0F0F] text-white shadow' : 'text-[#6B6B6B] hover:text-[#0F0F0F]'}`}>
              {l}
            </button>
          ))}
        </div>
        {quando === 'custom' && (
          <input type="datetime-local" className={`${input} mt-3`} value={inizio} min={localNow()} onChange={e => setInizio(e.target.value)} />
        )}
      </div>

      {/* Durata */}
      <div className="mt-6">
        <div className="flex items-end justify-between mb-2">
          <span className={label + ' mb-0'}>Durata</span>
          <span className="font-black text-2xl text-[#0F0F0F] leading-none" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            {ore}<span className="text-base font-bold text-[#6B6B6B]"> ore</span>
          </span>
        </div>
        <input type="range" min={cfg.minOre} max={cfg.maxOre} step={1} value={ore} onChange={e => setOre(+e.target.value)}
          className="w-full accent-[#C8A84E] cursor-pointer" aria-label="Durata in ore" />
        <div className="flex justify-between text-[11px] text-[#6B6B6B] mt-1">
          <span>min {cfg.minOre}h</span><span>6h = €8</span><span>24h = €15</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {[2, 3, 4, 6, 12, 24].filter(h => h >= cfg.minOre && h <= cfg.maxOre).map(h => (
            <button key={h} type="button" onClick={() => setOre(h)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${ore === h ? 'bg-[#C8A84E] border-[#C8A84E] text-[#0F0F0F]' : 'border-[#E8E8E4] text-[#6B6B6B] hover:border-[#C8A84E]'}`}>
              {h}h
            </button>
          ))}
        </div>
      </div>

      {/* Riepilogo */}
      <div className="mt-6 rounded-2xl bg-[#0F0F0F] text-white p-5 flex items-center justify-between gap-4">
        <div className="text-sm text-white/60 leading-relaxed">
          {finestra ? (<>
            <div>Dal <span className="text-white font-semibold">{fmt(finestra.start)}</span></div>
            <div>alle <span className="text-white font-semibold">{fmt(finestra.end)}</span></div>
          </>) : 'Scegli un orario valido'}
        </div>
        <div className="text-right shrink-0">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#C8A84E] font-bold">Totale</div>
          <div className="font-black text-4xl leading-none" style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>{fmtEur(prezzo)}</div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-3 text-sm text-[#6B6B6B] cursor-pointer">
          <input type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)} className="mt-1 accent-[#C8A84E]" required />
          <span>Ho letto la <a href="/privacy" className="underline hover:text-[#0F0F0F]">privacy policy</a> e accetto le <a href="/termini" className="underline hover:text-[#0F0F0F]">condizioni</a>. Il codice vale solo nella fascia scelta: oltre l&rsquo;orario si paga la differenza al banco.</span>
        </label>
        <label className="flex items-start gap-3 text-sm cursor-pointer rounded-xl border border-[#C8A84E]/40 bg-[#C8A84E]/10 px-4 py-3">
          <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} className="mt-1 accent-[#C8A84E]" />
          <span className="text-[#0F0F0F]"><b>Sì, tienimi aggiornato.</b> <span className="text-[#6B6B6B]">Accetto di ricevere via email e SMS novità, promozioni e servizi WASH HUB. Posso disiscrivermi quando voglio.</span></span>
        </label>
      </div>

      {err && <p className="mt-4 text-sm font-semibold text-[#E63946]">{err}</p>}
      {cfgErr && <p className="mt-4 text-xs text-[#6B6B6B]">Connessione lenta: se il pagamento non si apre, riprova tra qualche secondo.</p>}

      <button type="submit" disabled={!pronto}
        className="mt-5 w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#C8A84E] text-[#0F0F0F] text-lg font-bold hover:bg-[#B8963E] transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
        {loading ? 'Apro il pagamento…' : `Paga ${fmtEur(prezzo)} e ricevi il codice →`}
      </button>
      <p className="mt-3 text-center text-xs text-[#6B6B6B]">Pagamento sicuro con carta tramite SumUp. Il codice compare subito dopo.</p>
    </form>
  )
}
