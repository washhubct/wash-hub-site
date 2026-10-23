import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where, doc, setDoc, increment, serverTimestamp } from 'firebase/firestore'
import { getReferralCode } from './referral-code'
import { PRENOTA_API } from './prenota-online'

const firebaseConfig = {
  apiKey: 'AIzaSyCj0IlKMARo0IxnqaHoN-rSd0HINuwf6Po',
  authDomain: 'dashboard-washhub.firebaseapp.com',
  projectId: 'dashboard-washhub',
  storageBucket: 'dashboard-washhub.firebasestorage.app',
  messagingSenderId: '698841097292',
  appId: '1:698841097292:web:6f362dc4e4dbf5909d00e9',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const SLOTS = [
  '08:00','08:30','09:00','09:30','10:00','10:30',
  '11:00','11:30','12:00','12:30','13:00',
  '14:30','15:00','15:30','16:00','16:30',
  '17:00','17:30','18:00',
]

const GIORNI_CHIUSI = ['2026-06-02', '2026-08-15', '2026-09-26', '2026-10-10' /* maltempo */, '2026-12-25', '2026-12-26', '2026-01-01']

// Periodi di chiusura continuativa (estremi inclusi, date ISO)
export const CHIUSURE: { from: string; to: string; label: string }[] = [
  { from: '2026-08-14', to: '2026-08-22', label: 'Chiusura estiva — riapriamo il 24 agosto' },
]

export function isGiornoChiuso(dateStr: string) {
  if (GIORNI_CHIUSI.includes(dateStr)) return true
  if (CHIUSURE.some(c => dateStr >= c.from && dateStr <= c.to)) return true
  const d = new Date(dateStr + 'T00:00:00')
  return d.getDay() === 0
}

// Orari già presi: dal server (Cloud Function), senza nomi né telefoni.
// La lettura pubblica di `prenotazioni` è chiusa nelle rules dal 14/10/2026 (privacy).
const OCCUPATI_API = 'https://europe-west1-dashboard-washhub.cloudfunctions.net/priority/occupati'
export async function getBookedSlots(date: string): Promise<Set<string>> {
  const r = await fetch(`${OCCUPATI_API}?data=${encodeURIComponent(date)}`, { cache: 'no-store' })
  if (!r.ok) throw new Error('orari non disponibili')
  const d = await r.json()
  return new Set<string>(Array.isArray(d.occupati) ? d.occupati : [])
}

export type EsitoCodiceAmico = 'ok' | 'self' | 'non-trovato' | 'gia-cliente' | 'errore'

/**
 * Valida un codice amico rispetto al telefono del cliente che prenota.
 * - 'self': il codice è il proprio (calcolato dal telefono) o appartiene al proprio numero
 * - 'non-trovato': il codice non esiste o il titolare non l'ha ancora attivato
 * - 'gia-cliente': chi prenota ha già lavato da noi → il codice amico non vale (Guido 22/10/2026:
 *   il referral premia solo i clienti NUOVI). Lo decide la Cloud Function, perché il sito
 *   non può leggere prenotazioni e clienti.
 * - 'gia-cliente' vale anche se nome e cognome sono già in anagrafica con un altro numero
 * - 'errore': verifica non riuscita (rete/function): il codice NON viene salvato.
 */
export async function validaCodiceAmico(codice: string, telefonoCliente: string, nome = '', email = ''): Promise<EsitoCodiceAmico> {
  const clean = codice.trim().toUpperCase()
  if (getReferralCode(telefonoCliente) === clean) return 'self'
  try {
    const r = await fetch(`${PRENOTA_API}/referral/valida`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codice: clean, telefono: telefonoCliente, nome, email }),
    })
    if (!r.ok) return 'errore'
    const d = await r.json()
    const e = String(d?.esito || '')
    return (['ok', 'self', 'non-trovato', 'gia-cliente'] as const).includes(e as never) ? (e as EsitoCodiceAmico) : 'errore'
  } catch {
    return 'errore'
  }
}

export async function saveBooking(data: {
  servizio: string
  dataPren: string
  orario: string
  cliente: string
  vettura: string
  telefono: string
  targa?: string
  prezzo?: string
  referral?: string
  voucher?: string
  email?: string
  consensoMarketing?: boolean
}) {
  // Difesa in profondità: mai salvare prenotazioni in giorni chiusi
  // (il calendario li nasconde già, ma protegge da URL manipolati o tab vecchie)
  if (isGiornoChiuso(data.dataPren)) {
    throw new Error('Siamo chiusi in questa data. Scegli un altro giorno.')
  }

  // Il codice amico conta solo se valido: esistente, attivato dal titolare, non self-referral.
  let referralValido = ''
  if (data.referral) {
    try {
      const esito = await validaCodiceAmico(data.referral, data.telefono, data.cliente, data.email || '')
      if (esito === 'ok') referralValido = data.referral.trim().toUpperCase()
    } catch {
      // verifica non riuscita: meglio perdere il referral che bloccare la prenotazione
    }
  }

  const noteExtra = [
    data.targa ? `Targa: ${data.targa}` : '',
    referralValido ? `Referral: ${referralValido}` : '',
    data.voucher ? `Voucher: ${data.voucher.toUpperCase()}` : '',
  ].filter(Boolean).join(' | ')
  const note = `[WEB] Servizio: ${data.servizio} | Tel: ${data.telefono}${noteExtra ? ' | ' + noteExtra : ''}`

  await addDoc(collection(db, 'prenotazioni'), {
    dataPren: data.dataPren,
    orario: data.orario,
    cliente: data.cliente.toUpperCase(),
    vettura: data.vettura.toUpperCase(),
    telefono: data.telefono,
    prezzo: data.prezzo ?? '',
    note,
    saldo: '',
    saldato: '',
    sedeId: 'lungomare',
    ...(referralValido && { referral: referralValido }),
    ...(referralValido && data.email && { email: data.email, consensoMarketing: data.consensoMarketing === true,
      ...(data.consensoMarketing === true && { consensoMarketingTs: Date.now() }) }),
    ...(data.voucher && { voucherCodice: data.voucher.toUpperCase() }),
  })

  if (referralValido) {
    const ref = doc(db, 'referral', referralValido)
    const telClean = data.telefono.replace(/\D/g, '').slice(-9)
    try {
      await setDoc(ref, { totale: increment(1), inAttesa: increment(1), ultimoAggiornamento: serverTimestamp() }, { merge: true })
      // Evento di audit per il gestionale (chi ha usato il codice e quando)
      await setDoc(doc(db, 'referral', referralValido, 'eventi', telClean), {
        telefono: telClean,
        data: serverTimestamp(),
        stato: 'in_attesa',
      }, { merge: true })
    } catch {
      // best effort — la prenotazione è già salvata
    }
  }
}
