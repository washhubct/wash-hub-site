'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export default function ContattiPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [form, setForm] = useState({ nome: '', email: '', tel: '', msg: '' })

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-[#0F0F0F] text-white text-center">
        <AnimatedSection>
          <h1 className="font-display text-5xl md:text-6xl font-black"
            style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
            Contattaci.
          </h1>
          <p className="text-white/60 mt-4 text-lg">Siamo qui per risponderti.</p>
        </AnimatedSection>
      </section>

      <section className="py-20 md:py-28 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection direction="left">
              <h2 className="font-display text-2xl font-bold text-[#0F0F0F] mb-7"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Scrivici un messaggio
              </h2>
              {status === 'ok' ? (
                <div className="p-8 rounded-2xl bg-[#F5C518]/20 border border-[#F5C518] text-center">
                  <p className="text-2xl mb-2">✅</p>
                  <p className="font-bold text-[#0F0F0F]">Messaggio inviato!</p>
                  <p className="text-[#6B6B6B] text-sm mt-1">Ti risponderemo il prima possibile.</p>
                </div>
              ) : (
                <form onSubmit={send} className="space-y-4">
                  {[
                    { field: 'nome', label: 'Nome e cognome', type: 'text', req: true },
                    { field: 'email', label: 'Email', type: 'email', req: true },
                    { field: 'tel', label: 'Telefono', type: 'tel', req: false },
                  ].map(({ field, label, type, req }) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">{label}</label>
                      <input type={type} required={req} value={form[field as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        className="w-full border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#0F0F0F] bg-white focus:outline-none focus:border-[#F5C518] transition-colors text-sm" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2">Messaggio</label>
                    <textarea required rows={5} value={form.msg}
                      onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                      className="w-full border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#0F0F0F] bg-white focus:outline-none focus:border-[#F5C518] transition-colors text-sm resize-none" />
                  </div>
                  {status === 'err' && <p className="text-[#E63946] text-sm">Errore nell&rsquo;invio. Riprova o scrivici direttamente.</p>}
                  <button type="submit" disabled={status === 'sending'}
                    className="w-full py-4 rounded-full bg-[#F5C518] text-[#0F0F0F] font-bold text-sm hover:bg-[#E0B210] disabled:opacity-60 transition-colors">
                    {status === 'sending' ? 'Invio in corso...' : 'Invia messaggio →'}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection direction="right" delay={0.1} className="space-y-8">
              <h2 className="font-display text-2xl font-bold text-[#0F0F0F]"
                style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
                Trovaci
              </h2>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white border border-[#E8E8E4]">
                  <p className="font-bold text-[#0F0F0F] mb-1">WASH HUB Lungomare</p>
                  <p className="text-[#6B6B6B] text-sm">Via del Lungomare, Catania</p>
                  <p className="text-[#6B6B6B] text-sm">Lun–Sab 8:00–20:00</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#1A6B9A] hover:underline">
                    Indicazioni →
                  </a>
                </div>
                <div className="p-5 rounded-2xl bg-[#F5C518]/10 border border-[#F5C518]/30">
                  <p className="font-bold text-[#0F0F0F] mb-1">WASH HUB POP · Paesi Etnei</p>
                  <p className="text-[#6B6B6B] text-sm">Paesi Etnei, Catania</p>
                  <p className="text-[#F5C518] font-bold text-sm">Aperto 24/7</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#1A6B9A] hover:underline">
                    Indicazioni →
                  </a>
                </div>
                <div className="space-y-2">
                  <a href="mailto:info@parkinglungomare.it" className="flex items-center gap-3 text-[#0F0F0F] hover:text-[#1A6B9A] transition-colors">
                    <span className="text-lg">✉️</span>
                    <span className="text-sm font-medium">info@parkinglungomare.it</span>
                  </a>
                  <a href="tel:+39000000000" className="flex items-center gap-3 text-[#0F0F0F] hover:text-[#1A6B9A] transition-colors">
                    <span className="text-lg">📞</span>
                    <span className="text-sm font-medium">+39 000 000 0000</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
