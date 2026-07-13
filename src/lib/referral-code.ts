// Codice referral deterministico dal telefono: WH + 4 char base32 (no caratteri ambigui).
// Modulo puro senza dipendenze Firebase: importabile ovunque senza cicli.
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
