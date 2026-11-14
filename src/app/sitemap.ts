import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// URL con slash finale (trailingSlash: true), altrimenti ogni voce fa 301.
// Niente lastModified: la data di build non dice quando è cambiata la pagina.
const PAGINE: [string, MetadataRoute.Sitemap[number]['changeFrequency'], number][] = [
  ['/', 'weekly', 1],
  ['/servizi/', 'monthly', 0.9],
  ['/sedi/', 'monthly', 0.9],
  ['/parcheggio-smart/', 'weekly', 0.9],
  ['/sedi/lungomare/', 'monthly', 0.8],
  ['/sedi/paesi-etnei/', 'monthly', 0.8],
  ['/prenota/', 'weekly', 0.8],
  ['/priority/', 'monthly', 0.7],
  ['/flotte/', 'monthly', 0.7],
  ['/faq/', 'monthly', 0.7],
  ['/referral/', 'monthly', 0.6],
  ['/chi-siamo/', 'monthly', 0.6],
  ['/contatti/', 'monthly', 0.6],
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wash-hub.it'
  return PAGINE.map(([path, changeFrequency, priority]) => ({ url: `${base}${path}`, changeFrequency, priority }))
}
