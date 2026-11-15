import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { briciole } from '@/lib/schema'
import { FAQ } from '@/data/faq'

export const metadata: Metadata = {
  title: 'Domande frequenti sul lavaggio auto a Catania',
  description: 'Sedi e orari, prezzi, prenotazione e disdetta, cosa include ogni lavaggio, interni, parcheggio e pagamenti: le risposte alle domande più frequenti su WASH HUB Catania.',
}

// La pagina è un componente client: i dati strutturati partono da qui, dalla stessa lista delle domande
const schemaFaq = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': 'https://wash-hub.it/faq/#faq',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    briciole([['Domande frequenti', '/faq/']]),
  ],
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <><JsonLd data={schemaFaq} />{children}</>
}
