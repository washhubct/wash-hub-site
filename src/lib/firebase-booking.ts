import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where, doc, setDoc, increment, serverTimestamp } from 'firebase/firestore'
import { getReferralCode } from './referral-code'

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

const GIORNI_CHIUSI = ['2026-06-02', '2026-08-15', '2026-12-25', '2026-12-26', '2026-01-01']

export function isGiornoChiuso(dateStr: string) {
  if (GIORNI_CHIUSI.includes(dateStr)) return true
  const d = new Date(dateStr + 'T00:00:00')
  return d.getDay() === 0
}

export async function getBookedSlots(date: string): Promise<Set<string>> {
  const q = query(collection(db, 'prenotazioni'), where('dataPren', '==', date))
  const snap = await getDocs(q)
  const booked = new Set<string>()
  snap.forEach(doc => {
    const d = doc.data()
    if (d.orario) booked.add(d.orario)
  })
  return booked
}

export type EsitoCodiceAmico = 'ok' | 'self' | 'non-trovato'

/**
 * Valida un codice amico rispetto al telefono del cliente che prenota.
 * - 'self': il codice è il proprio (calcolato dal telefono) o appartiene al proprio numero
 * - 'non-trovato': il codice non esiste o il titolare non l'ha ancora attivato
 *   (il doc referral nasce al primo lookup del titolare su /referral — senza
 *   telefono del titolare il gestionale non potrebbe comunque emettere il voucher)
 */
export async function validaCodiceAmico(codice: string, telefonoCliente: string): Promise<EsitoCodiceAmico> {
  const clean = codice.trim().toUpperCase()
  const telClean = telefonoCliente.replace(/\D/g, '').slice(-9)
  if (getReferralCode(telefonoCliente) === clean) return 'self'
  const snap = await getDoc(doc(db, 'referral', clean))
  const d = snap.exists() ? snap.data() : null
  if (!d?.telefono) return 'non-trovato'
  if (d.telefono === telClean) return 'self'
  return 'ok'
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
}) {
  // Il codice amico conta solo se valido: esistente, attivato dal titolare, non self-referral.
  let referralValido = ''
  if (data.referral) {
    try {
      const esito = await validaCodiceAmico(data.referral, data.telefono)
      if (esito === 'ok') referralValido = data.referral.trim().toUpperCase()
    } catch {
      // rete/rules: meglio perdere il referral che bloccare la prenotazione
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
