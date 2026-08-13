'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { SLOTS, isGiornoChiuso, getBookedSlots, saveBooking, validaCodiceAmico, type EsitoCodiceAmico } from '@/lib/firebase-booking'
import { getReferralCode, getVouchersAttivi, type VoucherAttivo } from '@/lib/referral'

const SERVICES = [
  { id: 'Esterno', icon: '🚿', name: 'Esterno', price: 'da €14', time: '~15 min', prezzoFisso: '' },
  { id: 'Lavaggio Tradizionale', icon: '🧼', name: 'Lavaggio Tradizionale', price: 'da €18', time: '~30 min', prezzoFisso: '' },
  { id: 'Performance Intenso', icon: '⭐', name: 'Performance Intenso', price: '€29', time: '~60 min', prezzoFisso: '29' },
  { id: 'Moto / Scooter', icon: '🏍️', name: 'Moto / Scooter', price: '€12', time: '~20 min', prezzoFisso: '12' },
  { id: 'Tappezzeria', icon: '🪡', name: 'Tappezzeria', price: 'Su preventivo', time: 'Varia', prezzoFisso: '' },
]

function getLocalToday() {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]
}

function getDates(count = 14) {
  const dates: { iso: string; day: string; num: string; month: string }[] = []
  const today = new Date()
  for (let i = 0; i < count + 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]
    if (!isGiornoChiuso(iso)) {
      dates.push({
        iso,
        day: d.toLocaleDateString('it-IT', { weekday: 'short' }),
        num: String(d.getDate()),
        month: d.toLocaleDateString('it-IT', { month: 'short' }),
      })
      if (dates.length === count) break
    }
  }
  return dates
}

const STEPS = ['Servizio', 'Data', 'Orario', 'Dati']

const slide: Variants = {
  initial: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  animate: { x: 0, opacity: 1, transition: { type: 'spring', damping: 22, stiffness: 300 } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.15 } }),
}

type Step = 'servizio' | 'moto-avviso' | 'data' | 'orario' | 'dati' | 'done'
const STEP_ORDER: Step[] = ['servizio', 'data', 'orario', 'dati']

export function BookingFlow() {
  const [step, setStep] = useState<Step>('servizio')
  const [dir, setDir] = useState(1)
  const [servizio, setServizio] = useState('')
  const [data, setData] = useState('')
  const [orario, setOrario] = useState('')
  const [nome, setNome] = useState('')
  const [tel, setTel] = useState('')
  const [vettura, setVettura] = useState('')
  const [targa, setTarga] = useState('')
  const [referral, setReferral] = useState('')
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set())
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Validazione live del codice amico (esistenza + anti self-referral)
  const [referralEsito, setReferralEsito] = useState<EsitoCodiceAmico | 'idle' | 'checking'>('idle')

  // Voucher: dopo che il cliente digita il proprio telefono, lookup voucher attivi
  const [voucherDisponibili, setVoucherDisponibili] = useState<VoucherAttivo[]>([])
  const [voucherSel, setVoucherSel] = useState<string>('') // codice voucher applicato

  const dates = getDates()

  const goTo = (s: Step) => {
    const curr = STEP_ORDER.indexOf(step as Step)
    const next = STEP_ORDER.indexOf(s as Step)
    setDir(next > curr ? 1 : -1)
    setStep(s)
  }

  const selectServizio = (id: string) => {
    setServizio(id)
    if (id === 'Moto / Scooter') {
      setDir(1)
      setStep('moto-avviso')
    } else {
      goTo('data')
    }
  }

  useEffect(() => {
    if (!data) return
    setLoadingSlots(true)
    setOrario('')
    getBookedSlots(data)
      .then(s => setBookedSlots(s))
      .catch(() => setBookedSlots(new Set()))
      .finally(() => setLoadingSlots(false))
  }, [data])

  // Lookup voucher attivi appena il telefono è "abbastanza completo" (>= 9 cifre).
  // Debounce 600ms per non spammare Firestore mentre l'utente digita.
  useEffect(() => {
    const clean = tel.replace(/\D/g, '')
    const t = setTimeout(() => {
      if (clean.length < 9) {
        setVoucherDisponibili([])
        setVoucherSel('')
        return
      }
      getVouchersAttivi(tel)
        .then(v => setVoucherDisponibili(v))
        .catch(() => setVoucherDisponibili([]))
    }, 600)
    return () => clearTimeout(t)
  }, [tel])

  // Validazione live codice amico: parte quando codice (6 char) e telefono sono completi.
  // Debounce 600ms come il lookup voucher.
  useEffect(() => {
    const code = referral.trim().toUpperCase()
    const telOk = tel.replace(/\D/g, '').length >= 9
    if (!code) {
      setReferralEsito('idle')
      return
    }
    if (code.length < 6 || !telOk) {
      setReferralEsito('idle')
      return
    }
    setReferralEsito('checking')
    const t = setTimeout(() => {
      validaCodiceAmico(code, tel)
        .then(e => setReferralEsito(e))
        .catch(() => setReferralEsito('idle'))
    }, 600)
    return () => clearTimeout(t)
  }, [referral, tel])

  const localToday = getLocalToday()

  const isSlotDisabled = (slot: string) => {
    if (bookedSlots.has(slot)) return true
    if (data === localToday) {
      const now = new Date()
      const [h, m] = slot.split(':').map(Number)
      if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) return true
    }
    return false
  }

  const submit = async () => {
    if (!nome.trim() || !tel.trim() || !vettura.trim()) {
      setError('Compila tutti i campi obbligatori.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const prezzoFisso = SERVICES.find(s => s.id === servizio)?.prezzoFisso ?? ''
      await saveBooking({
        servizio, dataPren: data, orario, cliente: nome, vettura, telefono: tel, targa,
        ...(prezzoFisso && { prezzo: prezzoFisso }),
        ...(referral.trim() && { referral: referral.trim() }),
        ...(voucherSel && { voucher: voucherSel }),
      })
      setDir(1)
      setStep('done')
    } catch (e) {
      setError(e instanceof Error && e.message.startsWith('Siamo chiusi')
        ? e.message
        : 'Errore di connessione. Riprova tra qualche secondo.')
      setSaving(false)
    }
  }

  const stepIdx = STEP_ORDER.indexOf(step)

  if (step === 'done') {
    const codiceCliente = tel ? getReferralCode(tel) : ''
    const shareText = `Usa il mio codice ${codiceCliente} per prenotare su wash-hub.it e ottieni €5 di sconto sul tuo lavaggio!`
    const condividi = async () => {
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({ title: 'WASH HUB — Porta un amico', text: shareText, url: 'https://wash-hub.it/prenota' })
          return
        } catch { /* utente ha annullato */ }
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(`${shareText} https://wash-hub.it/prenota`)
          alert('Codice copiato negli appunti!')
        } catch { /* clipboard non disponibile */ }
      }
    }
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16 px-6">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="font-display text-3xl font-black text-[#0F0F0F] mb-3"
          style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
          Prenotazione confermata!
        </h2>
        <p className="text-[#6B6B6B] text-lg mb-2">
          {servizio} · {new Date(data + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })} · ore {orario}
        </p>
        <p className="text-[#6B6B6B]">Ti aspettiamo in Via Anfuso 35, Catania.</p>

        {codiceCliente && (
          <div className="mt-8 mx-auto max-w-md p-6 rounded-2xl bg-[#0F0F0F] text-white text-left">
            <p className="text-[#F5C518] text-xs font-semibold uppercase tracking-[0.18em] mb-2">Porta un amico, guadagni €5</p>
            <p className="text-white/70 text-sm mb-4">
              Condividi il tuo codice. Per ogni amico che prenota, ti regaliamo <strong className="text-white">€5 di sconto</strong> sul prossimo lavaggio.
            </p>
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
              <span className="text-[10px] uppercase tracking-wider text-white/40">Il tuo codice</span>
              <code className="font-black text-2xl text-[#F5C518] tracking-widest">{codiceCliente}</code>
            </div>
            <button onClick={condividi}
              className="w-full px-6 py-3 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-sm hover:bg-[#E0B210] transition-all">
              Condividi codice
            </button>
          </div>
        )}

        <button onClick={() => { setStep('servizio'); setServizio(''); setData(''); setOrario(''); setNome(''); setTel(''); setVettura(''); setTarga(''); setReferral('') }}
          className="mt-8 px-6 py-3 rounded-full border-2 border-[#0F0F0F] text-[#0F0F0F] font-semibold text-sm hover:bg-[#0F0F0F] hover:text-white transition-all">
          Nuova prenotazione
        </button>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
              i < stepIdx ? 'bg-[#F5C518] text-[#0F0F0F]' :
              i === stepIdx ? 'bg-[#0F0F0F] text-white' :
              'bg-[#E8E8E4] text-[#6B6B6B]'
            }`}>
              {i < stepIdx ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:block transition-colors ${i === stepIdx ? 'text-[#0F0F0F]' : 'text-[#6B6B6B]'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`w-8 h-px transition-colors ${i < stepIdx ? 'bg-[#F5C518]' : 'bg-[#E8E8E4]'}`} />}
          </div>
        ))}
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          {/* STEP 1 — Servizio */}
          {step === 'servizio' && (
            <motion.div key="servizio" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit">
              <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-6"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Che servizio ti serve?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => selectServizio(s.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:border-[#F5C518] hover:shadow-md active:scale-[0.98] border-[#E8E8E4] bg-white">
                    <span className="text-3xl">{s.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-[#0F0F0F] text-sm">{s.name}</p>
                      <p className="text-[#6B6B6B] text-xs">{s.time}</p>
                    </div>
                    <p className="font-black text-[#F5C518] text-sm">{s.price}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP MOTO — Promemoria raffreddamento */}
          {step === 'moto-avviso' && (
            <motion.div key="moto-avviso" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit"
              className="text-center py-6">
              <div className="text-6xl mb-5">🏍️❄️</div>
              <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-3"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Piccolo promemoria!
              </h2>
              <p className="text-[#6B6B6B] text-lg leading-relaxed max-w-sm mx-auto mb-6">
                Siamo un po' fissati con la qualità — lo sappiamo — ma moto calda + acqua fredda non è un bel matrimonio.
              </p>
              <p className="text-[#0F0F0F] font-semibold mb-10">
                Ricordati di farla raffreddare prima di venire da noi. Grazie! 🙏
              </p>
              <button onClick={() => goTo('data')}
                className="px-8 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold hover:bg-[#E0B210] transition-all">
                Ho capito, prenoto →
              </button>
            </motion.div>
          )}

          {/* STEP 2 — Data */}
          {step === 'data' && (
            <motion.div key="data" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => goTo('servizio')} className="text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors text-sm">← indietro</button>
                <h2 className="font-display text-2xl font-black text-[#0F0F0F]"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  Quando vieni?
                </h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 snap-x snap-mandatory">
                {dates.map(d => (
                  <button key={d.iso} onClick={() => { setData(d.iso); goTo('orario') }}
                    className={`snap-start shrink-0 flex flex-col items-center py-4 px-3 rounded-2xl border-2 min-w-[72px] transition-all active:scale-[0.96] ${
                      data === d.iso
                        ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white'
                        : 'bg-white border-[#E8E8E4] hover:border-[#F5C518]'
                    }`}>
                    <span className={`text-xs font-semibold uppercase ${data === d.iso ? 'text-[#F5C518]' : 'text-[#6B6B6B]'}`}>{d.day}</span>
                    <span className="text-2xl font-black my-1">{d.num}</span>
                    <span className={`text-xs ${data === d.iso ? 'text-white/60' : 'text-[#6B6B6B]'}`}>{d.month}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Orario */}
          {step === 'orario' && (
            <motion.div key="orario" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => goTo('data')} className="text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors text-sm">← indietro</button>
                <h2 className="font-display text-2xl font-black text-[#0F0F0F]"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  Scegli l&apos;orario
                </h2>
              </div>
              {loadingSlots ? (
                <div className="text-center py-12 text-[#6B6B6B]">
                  <div className="inline-block w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-sm">Verifico disponibilità...</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {SLOTS.map(slot => {
                    const disabled = isSlotDisabled(slot)
                    return (
                      <button key={slot} disabled={disabled}
                        onClick={() => { setOrario(slot); goTo('dati') }}
                        className={`py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.96] ${
                          disabled
                            ? 'bg-[#F0F0EC] text-[#C0C0BC] cursor-not-allowed line-through'
                            : orario === slot
                              ? 'bg-[#0F0F0F] text-white'
                              : 'bg-white border-2 border-[#E8E8E4] text-[#0F0F0F] hover:border-[#F5C518]'
                        }`}>
                        {slot}
                      </button>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4 — Dati */}
          {step === 'dati' && (
            <motion.div key="dati" custom={dir} variants={slide} initial="initial" animate="animate" exit="exit">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => goTo('orario')} className="text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors text-sm">← indietro</button>
                <h2 className="font-display text-2xl font-black text-[#0F0F0F]"
                  style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                  I tuoi dati
                </h2>
              </div>
              <div className="bg-[#F5C518]/10 border border-[#F5C518]/30 rounded-2xl p-4 mb-6 text-sm">
                <p className="font-semibold text-[#0F0F0F]">{servizio}</p>
                <p className="text-[#6B6B6B]">
                  {new Date(data + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })} · ore {orario}
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Nome e cognome *', value: nome, set: setNome, type: 'text', placeholder: 'Mario Rossi' },
                  { label: 'Telefono *', value: tel, set: setTel, type: 'tel', placeholder: '333 123 4567' },
                  { label: 'Tipo vettura *', value: vettura, set: setVettura, type: 'text', placeholder: 'BMW Serie 3' },
                  { label: 'Targa (opzionale)', value: targa, set: setTarga, type: 'text', placeholder: 'AB123CD' },
                  { label: 'Codice amico (opzionale)', value: referral, set: setReferral, type: 'text', placeholder: 'WHXXXX' },
                ].map(({ label, value, set, type, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">{label}</label>
                    <input type={type} value={value} placeholder={placeholder}
                      onChange={e => set(e.target.value)}
                      className="w-full border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#0F0F0F] bg-white focus:outline-none focus:border-[#F5C518] transition-colors text-sm placeholder:text-[#C0C0BC]" />
                    {label.startsWith('Codice amico') && referralEsito !== 'idle' && (
                      <p className={`text-xs mt-1.5 ${
                        referralEsito === 'ok' ? 'text-[#2E7D32]' : referralEsito === 'checking' ? 'text-[#6B6B6B]' : 'text-[#E63946]'
                      }`}>
                        {referralEsito === 'checking' && 'Verifica codice...'}
                        {referralEsito === 'ok' && '✓ Codice valido — €5 di sconto sul tuo lavaggio'}
                        {referralEsito === 'self' && 'Non puoi usare il tuo stesso codice 😉'}
                        {referralEsito === 'non-trovato' && 'Codice non trovato. Chiedi al tuo amico di aprire wash-hub.it/referral per attivarlo.'}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Voucher attivi del cliente — proposti automaticamente al digitare il telefono */}
              {voucherDisponibili.length > 0 && (
                <div className="mt-5 p-4 rounded-2xl bg-[#F5C518]/10 border-2 border-[#F5C518]/40">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] mb-3">
                    🎁 Hai {voucherDisponibili.length === 1 ? 'un voucher' : `${voucherDisponibili.length} voucher`} disponibile{voucherDisponibili.length > 1 ? 'i' : ''}
                  </p>
                  <div className="space-y-2">
                    {voucherDisponibili.map(v => {
                      const sel = voucherSel === v.codice
                      const scad = v.dataScadenza ? new Date(v.dataScadenza).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: '2-digit' }) : ''
                      return (
                        <button key={v.codice} type="button"
                          onClick={() => setVoucherSel(sel ? '' : v.codice)}
                          className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                            sel ? 'bg-[#0F0F0F] border-[#0F0F0F] text-white' : 'bg-white border-[#E8E8E4] hover:border-[#F5C518]'
                          }`}>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold tracking-widest ${sel ? 'text-[#F5C518]' : 'text-[#0F0F0F]'}`}>
                              {v.codice}
                            </div>
                            {scad && (
                              <div className={`text-[10px] ${sel ? 'text-white/50' : 'text-[#6B6B6B]'}`}>scade {scad}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-black ${sel ? 'text-[#F5C518]' : 'text-[#0F0F0F]'}`}>−€{v.valore}</span>
                            <span className={`text-xs font-semibold ${sel ? 'text-white' : 'text-[#6B6B6B]'}`}>
                              {sel ? 'APPLICATO ✓' : 'APPLICA'}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {voucherSel && (
                    <p className="text-[11px] text-[#6B6B6B] mt-3">
                      Lo sconto verrà applicato in cassa quando saldi il lavaggio.
                    </p>
                  )}
                </div>
              )}

              {error && <p className="text-[#E63946] text-sm mt-4">{error}</p>}
              <button onClick={submit} disabled={saving}
                className="w-full mt-6 py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-black text-base hover:bg-[#E0B210] disabled:opacity-60 transition-all active:scale-[0.98]">
                {saving ? 'Invio in corso...' : 'Conferma prenotazione →'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
