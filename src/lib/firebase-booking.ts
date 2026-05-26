import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc } from 'firebase/firestore'

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
}) {
  const noteExtra = [
    data.targa ? `Targa: ${data.targa}` : '',
    data.referral ? `Referral: ${data.referral.toUpperCase()}` : '',
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
    ...(data.referral && { referral: data.referral.toUpperCase() }),
  })

  // Registra il referral se presente
  if (data.referral) {
    const clean = data.referral.toUpperCase()
    const ref = doc(db, 'referral', clean)
    await setDoc(ref, { totale: 0, inAttesa: 0 }, { merge: true })
    const { increment, serverTimestamp } = await import('firebase/firestore')
    await setDoc(ref, { totale: increment(1), inAttesa: increment(1), ultimoAggiornamento: serverTimestamp() }, { merge: true })
  }
}
