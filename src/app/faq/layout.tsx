import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Domande frequenti',
  description: 'Prenotazione, tempi, cosa include ogni lavaggio, moto, pagamenti e disdetta: le risposte alle domande più frequenti su WASH HUB Catania.',
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
