import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta WASH HUB Catania. Due sedi: Lungomare e Paesi Etnei.',
}

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
