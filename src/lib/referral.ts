import { collection, query, where, getDocs, getDoc, doc, setDoc, increment, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase-booking'

export function getReferralCode(telefono: string): string {
  const clean = telefono.replace(/\D/g, '').slice(-9)
  let hash = 0
  for (let i = 0; i < clean.length; i++) {
    hash = ((hash << 5) - hash) + clean.charCodeAt(i)
    hash |= 0
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'WH'
  let n = Math.abs(hash)
  for (let i = 0; i < 4; i++) {
    code += chars[n % chars.length]
    n = Math.floor(n / chars.length)
  }
  return code
}

export async function getReferralStats(
  code: string,
  telefono?: string
): Promise<{ totale: number; inAttesa: number; confermati: number }> {
  const ref = doc(db, 'referral', code)
  const snap = await getDoc(ref)

  // Salva il telefono al primo lookup (serve al gestionale per emettere voucher)
  if (telefono) {
    const cleanTel = telefono.replace(/\D/g, '').slice(-9)
    const existing = snap.exists() ? snap.data() : null
    if (!existing?.telefono && cleanTel.length >= 9) {
      try {
        await setDoc(ref, { telefono: cleanTel, codice: code, primoLookup: serverTimestamp() }, { merge: true })
      } catch {
        // best effort — non bloccare la UI se le rules cambiano
      }
    }
  }

  if (!snap.exists()) return { totale: 0, inAttesa: 0, confermati: 0 }
  const data = snap.data()
  return {
    totale: data.totale ?? 0,
    inAttesa: data.inAttesa ?? 0,
    confermati: data.confermati ?? 0,
  }
}

export async function registraReferral(codiceAmico: string, telefonoNuovoCliente: string): Promise<void> {
  if (!codiceAmico || codiceAmico.length < 4) return
  const ref = doc(db, 'referral', codiceAmico.toUpperCase())
  await setDoc(ref, {
    totale: increment(1),
    inAttesa: increment(1),
    ultimoAggiornamento: serverTimestamp(),
  }, { merge: true })

  // Salva anche il singolo evento
  await setDoc(doc(collection(db, 'referral', codiceAmico.toUpperCase(), 'eventi'), telefonoNuovoCliente), {
    telefono: telefonoNuovoCliente,
    data: serverTimestamp(),
    stato: 'in_attesa',
  })
}
