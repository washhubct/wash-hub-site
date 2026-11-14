import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domande frequenti su lavaggio e prenotazione',
  description: 'Prenotazione e disdetta, tempi, cosa include ogni lavaggio, interni, moto e pagamenti: le risposte alle domande più frequenti su WASH HUB Catania.',
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
