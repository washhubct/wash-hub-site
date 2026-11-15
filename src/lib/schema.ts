// Dati strutturati (schema.org) scritti una volta sola e riusati dalle pagine.
// Regola: solo dati visibili sul sito. Niente prezzi POP finché Guido non li conferma.
import { SOCIETA } from './sedi'

const SITO = 'https://wash-hub.it'

export const ORG_ID = `${SITO}/#organization`
export const LUNGOMARE_ID = `${SITO}/#lungomare`
export const POP_ID = `${SITO}/#paesi-etnei`

export const schemaSito = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'WASH HUB',
      legalName: SOCIETA.ragioneSociale,
      vatID: `IT${SOCIETA.partitaIva}`,
      taxID: SOCIETA.partitaIva,
      // Sede legale della società; gli indirizzi delle sedi operative stanno nelle due AutoWash
      address: { '@type': 'PostalAddress', streetAddress: 'Via Duca degli Abruzzi 180', addressLocality: 'Catania', addressRegion: 'CT', postalCode: '95126', addressCountry: 'IT' },
      foundingDate: '2022',
      url: `${SITO}/`,
      logo: `${SITO}/brand/logo-autolavaggi.webp`,
      email: 'info@washhub.it',
      telephone: '+390954695153',
      sameAs: [
        'https://www.instagram.com/washhubcatania',
        'https://www.facebook.com/120281217832639',
        'https://www.tiktok.com/@washhublungomare',
      ],
      subOrganization: [{ '@id': LUNGOMARE_ID }, { '@id': POP_ID }],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITO}/#website`,
      url: `${SITO}/`,
      name: 'WASH HUB',
      inLanguage: 'it-IT',
      publisher: { '@id': ORG_ID },
    },
  ],
}

export const sedeLungomare = {
  '@type': 'AutoWash',
  '@id': LUNGOMARE_ID,
  name: 'WASH HUB Lungomare',
  // Nome della scheda Google, per legare sito e scheda
  alternateName: 'Wash Hub - Lungomare',
  description: 'Autolavaggio a mano con operatori, tappezzeria e parcheggio a Catania Lungomare.',
  url: `${SITO}/sedi/lungomare/`,
  image: `${SITO}/og-default.jpg`,
  telephone: '+390954695153',
  email: 'info@washhub.it',
  address: { '@type': 'PostalAddress', streetAddress: 'Via Anfuso 35', addressLocality: 'Catania', addressRegion: 'CT', postalCode: '95126', addressCountry: 'IT' },
  geo: { '@type': 'GeoCoordinates', latitude: 37.527482, longitude: 15.1145333 },
  hasMap: 'https://www.google.com/maps?cid=12256856388391979926',
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '18:30' }],
  priceRange: '€12–€35',
  parentOrganization: { '@id': ORG_ID },
  areaServed: { '@type': 'City', name: 'Catania' },
}

// Sede Lungomare in forma breve, come fornitore nelle schede Service (stesso @id, con indirizzo e telefono)
export const fornitoreLungomare = {
  '@type': 'AutoWash',
  '@id': LUNGOMARE_ID,
  name: sedeLungomare.name,
  url: sedeLungomare.url,
  image: sedeLungomare.image,
  telephone: sedeLungomare.telephone,
  address: sedeLungomare.address,
  priceRange: sedeLungomare.priceRange,
}

export const PARCHEGGIO_ID = `${SITO}/#parcheggio-lungomare`

// Parcheggio interno del Lungomare con le tre formule. Accessibile 24 ore su 24; operatore presente 7:30–18:30 (Guido 15/11/2026).
export const parcheggioLungomare = {
  '@type': 'ParkingFacility',
  '@id': PARCHEGGIO_ID,
  name: 'Parcheggio WASH HUB Lungomare',
  description: 'Parcheggio interno in Via Anfuso 35 a Catania, accessibile 24 ore su 24: a ore (operatore presente dalle 7:30 alle 18:30), con codice anche di notte (Parcheggio Smart) o in abbonamento mensile con posto riservato, coperto o scoperto.',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  url: `${SITO}/parcheggio-smart/`,
  image: sedeLungomare.image,
  telephone: sedeLungomare.telephone,
  address: sedeLungomare.address,
  geo: sedeLungomare.geo,
  containedInPlace: { '@id': LUNGOMARE_ID },
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Parcheggio a ore',
      description: 'Minimo 2 ore, poi paghi il tempo che usi.',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: 2, priceCurrency: 'EUR', unitCode: 'HUR', unitText: 'ora' },
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 2, unitCode: 'HUR' },
    },
    {
      '@type': 'Offer',
      name: 'Abbonamento mensile, posto scoperto',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: 100, priceCurrency: 'EUR', unitCode: 'MON', unitText: 'mese' },
    },
    {
      '@type': 'Offer',
      name: 'Abbonamento mensile, posto coperto',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: 140, priceCurrency: 'EUR', unitCode: 'MON', unitText: 'mese' },
    },
  ],
}

const INDIRIZZO_POP = { '@type': 'PostalAddress', streetAddress: 'Via Galileo Galilei 28', addressLocality: 'San Gregorio di Catania', addressRegion: 'CT', postalCode: '95027', addressCountry: 'IT' }

export const sedePop = {
  '@type': 'AutoWash',
  '@id': POP_ID,
  name: 'WASH HUB POP Paesi Etnei',
  alternateName: 'Wash Hub Pop',
  description: 'Autolavaggio self service aperto 24 ore su 24 presso la stazione LUKoil di San Gregorio di Catania. Lavaggio manuale con operatori.',
  url: `${SITO}/sedi/paesi-etnei/`,
  image: `${SITO}/og-default.jpg`,
  telephone: '+390954695153',
  address: INDIRIZZO_POP,
  geo: { '@type': 'GeoCoordinates', latitude: 37.5670384, longitude: 15.0997132 },
  hasMap: 'https://www.google.com/maps?cid=651137855682298991',
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
  paymentAccepted: 'Monete, carta, contactless',
  priceRange: '€',
  parentOrganization: { '@id': ORG_ID },
  areaServed: { '@type': 'City', name: 'San Gregorio di Catania' },
  // Il self service è sempre aperto; gli operatori del lavaggio a mano hanno orari propri
  department: {
    '@type': 'AutoWash',
    '@id': `${SITO}/#paesi-etnei-manuale`,
    name: 'WASH HUB POP — Lavaggio a mano',
    url: `${SITO}/sedi/paesi-etnei/`,
    telephone: '+390954695153',
    address: INDIRIZZO_POP,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '08:00', closes: '13:30' },
    ],
  },
}

// Home, /sedi/ e /contatti/: tutte e due le sedi alla pari
export const schemaSedi = { '@context': 'https://schema.org', '@graph': [sedeLungomare, sedePop] }

// Briciole di pane per le pagine interne: [nome, percorso] dopo la Home
export function briciole(voci: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'], ...voci].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITO}${path}` })),
  }
}

// Pagina della singola sede: la sede è il soggetto della pagina + briciole di pane
export function schemaPaginaSede(sede: typeof sedeLungomare | typeof sedePop) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...sede, mainEntityOfPage: sede.url },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITO}/` },
          { '@type': 'ListItem', position: 2, name: 'Le nostre sedi', item: `${SITO}/sedi/` },
          { '@type': 'ListItem', position: 3, name: sede.name, item: sede.url },
        ],
      },
    ],
  }
}
