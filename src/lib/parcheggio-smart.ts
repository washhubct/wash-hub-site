// Parcheggio Smart — client della Cloud Function `parcheggioSmart` (dashdebug/functions)
// Il sito non tocca Firestore per questa feature: prezzi, checkout SumUp e
// lettura del codice passano tutti dalla Function.

export const PARCHEGGIO_API =
  process.env.NEXT_PUBLIC_PARCHEGGIO_API ||
  'https://europe-west1-dashboard-washhub.cloudfunctions.net/parcheggioSmart'

export const INDIRIZZO = 'Via Anfuso 35, Catania'
export const MAPS_URL = 'https://maps.google.com/?q=Wash+Hub+Lungomare+Via+Anfuso+35+Catania'

export interface ConfigParcheggio {
  attivo: boolean
  minOre: number
  maxOre: number
}

export interface StatoCodice {
  stato: 'in_pagamento' | 'attivo' | 'fallito' | 'revocato' | 'scaduto'
  codice: string | null
  targa: string
  ore: number
  prezzo: number
  inizio: string   // YYYY-MM-DDTHH:mm ora italiana
  fine: string
  inizioTs: number
  fineTs: number
  email: string | null      // mascherata
  emailInviata: boolean
}

// Stessa tariffa del gestionale: €2/h max €8 fino a 6h, max €15 fino a 24h. Minimo 2h.
export function prezzoParcheggioOre(ore: number): number {
  ore = Math.max(0, Math.ceil(Number(ore) || 0))
  if (ore <= 0) return 0
  if (ore <= 6) return Math.min(ore * 2, 8)
  if (ore <= 24) return Math.min(8 + (ore - 6) * 2, 15)
  const extra = ore - 24
  return 15 + Math.floor(extra / 24) * 12 + (extra % 24) * 2
}

export const fmtEur = (n: number) => '€' + n.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 2 })

const pad = (n: number) => String(n).padStart(2, '0')
export function localNow(): string {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
export function fmtLocal(iso: string): string {
  // 'YYYY-MM-DDTHH:mm' → 'gio 24/09 alle 09:00'
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso)
  if (!m) return iso
  const d = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5])
  const giorno = d.toLocaleDateString('it-IT', { weekday: 'short' })
  return `${giorno} ${m[3]}/${m[2]} alle ${m[4]}:${m[5]}`
}

export async function getConfigParcheggio(): Promise<ConfigParcheggio> {
  const r = await fetch(`${PARCHEGGIO_API}/config`, { cache: 'no-store' })
  if (!r.ok) throw new Error('config non disponibile')
  return r.json()
}

export async function creaCheckout(payload: {
  targa: string; telefono: string; vettura?: string; nome: string; email: string; ore: number; inizio: string; consensoMarketing: boolean
}): Promise<{ id: string; url: string; prezzo: number }> {
  const r = await fetch(`${PARCHEGGIO_API}/checkout`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.error || 'Errore durante la creazione del pagamento')
  return data
}

export async function getStatoCodice(id: string): Promise<StatoCodice> {
  const r = await fetch(`${PARCHEGGIO_API}/stato?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.error || 'Codice non trovato')
  return data
}
