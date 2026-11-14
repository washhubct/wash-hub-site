import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// URL con slash finale (trailingSlash: true), altrimenti ogni voce fa 301.
// Niente lastModified (la data di build non dice quando è cambiata la pagina),
// niente changeFrequency/priority: Google li ignora.
const PAGINE = [
  '/',
  '/servizi/',
  '/sedi/',
  '/parcheggio-smart/',
  '/sedi/lungomare/',
  '/sedi/paesi-etnei/',
  '/prenota/',
  '/priority/',
  '/flotte/',
  '/faq/',
  '/referral/',
  '/chi-siamo/',
  '/contatti/',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wash-hub.it'
  return PAGINE.map(path => ({ url: `${base}${path}` }))
}
