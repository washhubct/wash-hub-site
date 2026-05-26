'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { getReferralCode, getReferralStats } from '@/lib/referral'

export default function ReferralPage() {
  const [tel, setTel] = useState('')
  const [code, setCode] = useState('')
  const [stats, setStats] = useState<{ totale: number; inAttesa: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cerca = async () => {
    const t = tel.replace(/\s/g, '').replace(/^(\+39|0039)/, '')
    if (t.length < 9) { setError('Inserisci un numero valido'); return }
    setLoading(true)
    setError('')
    try {
      const c = getReferralCode(t)
      const s = await getReferralStats(c)
      setCode(c)
      setStats(s)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : ''
      if (msg.includes('permission') || msg.includes('Missing or insufficient')) {
        setError('Servizio momentaneamente in manutenzione. Riprova tra poco.')
      } else {
        setError('Errore di connessione. Controlla la rete e riprova.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20">
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <p className="text-[#F5C518] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Porta un amico</p>
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Referral.
          </h1>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Ogni amico che porti vale uno sconto per te. Semplice.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8">

          {/* Come funziona */}
          <AnimatedSection className="mb-16">
            <h2 className="font-display text-2xl font-black text-[#0F0F0F] mb-6 text-center"
              style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
              Come funziona
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: '01', title: 'Trova il tuo codice', desc: 'Inserisci il tuo numero di telefono qui sotto.' },
                { step: '02', title: 'Condividilo', desc: 'Il tuo amico lo inserisce quando prenota online.' },
                { step: '03', title: 'Guadagni', desc: 'Ogni amico che prenota ti vale €5 di sconto sul prossimo lavaggio.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="p-6 rounded-2xl bg-white border border-[#E8E8E4] text-center">
                  <span className="font-black text-3xl text-[#F5C518] block mb-2">{step}</span>
                  <p className="font-bold text-[#0F0F0F] mb-1 text-sm">{title}</p>
                  <p className="text-[#6B6B6B] text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Cerca codice */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white border border-[#E8E8E4] rounded-2xl p-8">
              <h3 className="font-display text-xl font-black text-[#0F0F0F] mb-6"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Trova il tuo codice referral
              </h3>
              <div className="flex gap-3 mb-4">
                <input
                  type="tel"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                  placeholder="333 123 4567"
                  className="flex-1 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#0F0F0F] focus:outline-none focus:border-[#F5C518] text-sm"
                />
                <button onClick={cerca} disabled={loading}
                  className="px-6 py-3 rounded-xl bg-[#F5C518] text-[#0F0F0F] font-bold text-sm hover:bg-[#E0B210] disabled:opacity-60 transition-all">
                  {loading ? '...' : 'Cerca'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {code && stats && (
                <div className="mt-6 p-6 rounded-xl bg-[#0F0F0F] text-white text-center">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Il tuo codice</p>
                  <p className="font-black text-4xl text-[#F5C518] tracking-widest mb-4">{code}</p>
                  <div className="flex justify-center gap-8 text-sm mb-6">
                    <div>
                      <p className="font-black text-2xl text-white">{stats.totale}</p>
                      <p className="text-white/40 text-xs">amici portati</p>
                    </div>
                    <div>
                      <p className="font-black text-2xl text-[#F5C518]">€{stats.totale * 5}</p>
                      <p className="text-white/40 text-xs">sconto guadagnato</p>
                    </div>
                  </div>
                  <button onClick={() => {
                    navigator.share?.({ title: 'WASH HUB', text: `Usa il mio codice ${code} per prenotare su wash-hub.it e ottieni €5 di sconto!`, url: 'https://wash-hub.it/prenota' })
                    ?? navigator.clipboard.writeText(code)
                  }}
                    className="px-6 py-2.5 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-sm">
                    Condividi codice
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
