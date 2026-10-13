'use client'

import { useState } from 'react'
import { disdici } from '@/lib/prenota-online'

// Disdetta online: telefono + nome + giorno. Gratis fino a 2 ore prima (caparra/Priority rimborsati in automatico).
export function Disdici() {
  const [tel, setTel] = useState(''), [nome, setNome] = useState(''), [data, setData] = useState('')
  const [stato, setStato] = useState<'idle' | 'invio' | 'ok' | 'err'>('idle')
  const [msg, setMsg] = useState('')
  const invia = async () => {
    if (tel.replace(/\D/g, '').length < 9 || nome.trim().length < 3 || !data) { setStato('err'); setMsg('Inserisci telefono, nome (almeno 3 lettere) e giorno.'); return }
    setStato('invio'); setMsg('')
    try {
      const r = await disdici({ telefono: tel, nome: nome.trim(), dataPren: data })
      const parti: string[] = []
      if (r.disdette.length) parti.push(`Disdetta fatta per le ore ${r.disdette.join(', ')}.`)
      const rimb = r.rimborsi.filter(x => x.ok).reduce((t, x) => t + x.importo, 0)
      if (rimb > 0) parti.push(`Ti restituiamo €${rimb} sulla carta (di solito in 3-5 giorni lavorativi).`)
      if (r.rimborsi.some(x => !x.ok)) parti.push('Il rimborso lo facciamo a mano entro oggi: non devi fare niente.')
      if (r.troppoTardi.length) parti.push(`Per le ore ${r.troppoTardi.join(', ')} mancano meno di ${r.oreDisdetta} ore: non è più disdicibile online. Scrivici su WhatsApp.`)
      setStato(r.disdette.length ? 'ok' : 'err'); setMsg(parti.join(' '))
    } catch (e) { setStato('err'); setMsg(e instanceof Error ? e.message : 'Errore, riprova.') }
  }
  const input = 'w-full border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#0F0F0F] bg-white focus:outline-none focus:border-[#F5C518] text-sm'
  return (
    <div className="rounded-3xl bg-white border border-[#E8E8E4] p-6 md:p-8">
      {stato === 'ok' ? (
        <div className="text-center"><div className="text-5xl mb-3">👍</div><p className="font-black text-2xl text-[#0F0F0F]">Fatto</p><p className="mt-3 text-[#6B6B6B] text-sm leading-relaxed">{msg}</p></div>
      ) : (
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">Telefono usato per prenotare</label><input className={input} type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="333 123 4567" /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">Nome o cognome</label><input className={input} value={nome} onChange={e => setNome(e.target.value)} placeholder="Rossi" /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">Giorno della prenotazione</label><input className={input} type="date" value={data} onChange={e => setData(e.target.value)} /></div>
          {msg && <p className="text-sm text-[#E63946]">{msg}</p>}
          <button onClick={invia} disabled={stato === 'invio'} className="w-full py-4 rounded-full bg-[#0F0F0F] text-white font-black disabled:opacity-60">{stato === 'invio' ? 'Un attimo…' : 'Disdici la prenotazione'}</button>
          <p className="text-xs text-[#6B6B6B] text-center">Gratis fino a 2 ore prima. Se avevi pagato caparra o Priority, te li restituiamo.</p>
        </div>
      )}
    </div>
  )
}
