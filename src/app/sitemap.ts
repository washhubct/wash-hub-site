import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wash-hub.it'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servizi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/sedi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/sedi/lungomare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sedi/paesi-etnei`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/prenota`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/chi-siamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contatti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
