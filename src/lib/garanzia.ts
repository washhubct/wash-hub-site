// 🛡️ Carta a garanzia (Stripe): il cliente salva la carta, non paga niente; penale solo se non si presenta.
// Logica nella Cloud Function `prenotaGaranzia` del gestionale.
export const GARANZIA_API =
  process.env.NEXT_PUBLIC_GARANZIA_API ||
  'https://europe-west1-dashboard-washhub.cloudfunctions.net/prenotaGaranzia'

export async function startGaranzia(payload: {
  dataPren: string; orario: string; cliente: string; telefono: string; vettura: string; servizio: string
  targa?: string; prezzo?: string; referral?: string; voucher?: string; consenso: true
}): Promise<{ id: string; url: string }> {
  const r = await fetch(`${GARANZIA_API}/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const d = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(d.error || 'Errore di connessione. Riprova tra qualche secondo.')
  return d
}

export async function getGaranziaStato(id: string): Promise<{ stato: string; dataPren: string; orario: string; servizio: string; importo: number; oreDisdetta: number }> {
  const r = await fetch(`${GARANZIA_API}/stato?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
  if (!r.ok) throw new Error('non trovato')
  return r.json()
}
