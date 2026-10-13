// ⚡ Priority: posto "salta la coda" a +€ nelle ore calde, pagato subito online (SumUp).
// La logica (ore calde, posti, prezzo) sta nella Cloud Function `priority` del gestionale:
// qui solo le chiamate. Nessun conteggio esposto: arrivano solo gli orari Priority.
export const PRIORITY_API =
  process.env.NEXT_PUBLIC_PRIORITY_API ||
  'https://europe-west1-dashboard-washhub.cloudfunctions.net/priority'

export type PriorityGiorno = { attivo: boolean; supplemento: number; priority: string[]; bloccati: string[] }

export async function getPriority(data: string): Promise<PriorityGiorno> {
  const r = await fetch(`${PRIORITY_API}/disponibilita?data=${encodeURIComponent(data)}`, { cache: 'no-store' })
  if (!r.ok) throw new Error('priority non disponibile')
  return r.json()
}

export async function startPriorityCheckout(payload: {
  dataPren: string; orario: string; cliente: string; telefono: string; vettura: string; servizio: string
  targa?: string; prezzo?: string; referral?: string; voucher?: string
}): Promise<{ id: string; url: string; supplemento: number }> {
  const r = await fetch(`${PRIORITY_API}/checkout`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  })
  const d = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(d.error || 'Errore di connessione. Riprova tra qualche secondo.')
  return d
}

export async function getPriorityStato(id: string): Promise<{ stato: string; dataPren: string; orario: string; servizio: string; supplemento: number }> {
  const r = await fetch(`${PRIORITY_API}/stato?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
  if (!r.ok) throw new Error('non trovato')
  return r.json()
}
