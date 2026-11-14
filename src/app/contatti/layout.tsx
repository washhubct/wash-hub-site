import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatti WASH HUB: Lungomare (Via Anfuso 35, Catania, tel. 095 469 5153) e POP Paesi Etnei (Via Galileo Galilei 28, San Gregorio di Catania).',
}

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
