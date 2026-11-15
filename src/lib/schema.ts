// Dati strutturati (schema.org) scritti una volta sola e riusati dalle pagine.
// Regola: solo dati visibili sul sito. Niente telefono/prezzi POP finché Guido non li conferma.
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

const INDIRIZZO_POP = { '@type': 'PostalAddress', streetAddress: 'Via Galileo Galilei 28', addressLocality: 'San Gregorio di Catania', addressRegion: 'CT', postalCode: '95027', addressCountry: 'IT' }

export const sedePop = {
  '@type': 'AutoWash',
  '@id': POP_ID,
  name: 'WASH HUB POP Paesi Etnei',
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
  // Il self service è sempre aperto; gli operatori del lavaggio a mano hanno orari propri
  department: {
    '@type': 'AutoWash',
    name: 'WASH HUB POP — Lavaggio a mano',
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
