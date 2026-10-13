// Caparra anti no-show + disdetta online: logica nella Cloud Function `prenotaOnline` del gestionale.
// La caparra la chiede solo a chi ha già saltato una prenotazione senza avvisare (decisione Guido 13/10/2026).
export const PRENOTA_API =
  process.env.NEXT_PUBLIC_PRENOTA_API ||
  'https://europe-west1-dashboard-washhub.cloudfunctions.net/prenotaOnline'

const post = async (path: string, body: unknown) => {
  const r = await fetch(`${PRENOTA_API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const d = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(d.error || 'Errore di connessione. Riprova tra qualche secondo.')
  return d
}

export const verificaCaparra = (telefono: string): Promise<{ caparra: number; oreDisdetta: number; perTutti?: boolean }> => post('/verifica', { telefono })

export const startCaparraCheckout = (payload: {
  dataPren: string; orario: string; cliente: string; telefono: string; vettura: string; servizio: string
  targa?: string; prezzo?: string; referral?: string; voucher?: string; consenso: true
}): Promise<{ id: string; url: string; importo: number }> => post('/caparra/checkout', payload)

export async function getCaparraStato(id: string): Promise<{ stato: string; dataPren: string; orario: string; servizio: string; importo: number; oreDisdetta: number }> {
  const r = await fetch(`${PRENOTA_API}/caparra/stato?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
  if (!r.ok) throw new Error('non trovato')
  return r.json()
}

export const disdici = (payload: { telefono: string; nome: string; dataPren: string }):
  Promise<{ disdette: string[]; troppoTardi: string[]; rimborsi: { tipo: string; importo: number; ok: boolean }[]; oreDisdetta: number }> =>
  post('/disdici', payload)
