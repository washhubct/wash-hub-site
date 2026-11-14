import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Porta un amico',
  description: 'Porta un amico in WASH HUB: lui prenota online con il tuo codice, €5 a lui e €5 a te sul prossimo lavaggio. Trova il tuo codice dal numero di telefono.',
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
