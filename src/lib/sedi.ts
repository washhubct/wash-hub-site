// Contatti, link mappa e dati societari scritti una volta sola e riusati da pagine, header e footer.
// I link mappa usano il Place ID della scheda Google: aprono la scheda vera (con recensioni e orari)
// e, da telefono, l'app di mappe con la destinazione già impostata.

export const TELEFONO = '095 469 5153'
export const TELEFONO_HREF = 'tel:+390954695153'
export const EMAIL = 'info@washhub.it'

const PLACE_LUNGOMARE = 'ChIJE7A-YnH9ExMRlssUFfIZGao'
const PLACE_POP = 'ChIJl8vN4hv9ExMRb8TAC25OCQk'

export const MAPPE = {
  lungomare: {
    scheda: `https://www.google.com/maps/search/?api=1&query=Wash+Hub+-+Lungomare&query_place_id=${PLACE_LUNGOMARE}`,
    indicazioni: `https://www.google.com/maps/dir/?api=1&destination=Wash+Hub+-+Lungomare&destination_place_id=${PLACE_LUNGOMARE}`,
    recensioni: `https://search.google.com/local/reviews?placeid=${PLACE_LUNGOMARE}`,
  },
  pop: {
    scheda: `https://www.google.com/maps/search/?api=1&query=Wash+Hub+Pop&query_place_id=${PLACE_POP}`,
    indicazioni: `https://www.google.com/maps/dir/?api=1&destination=Wash+Hub+Pop&destination_place_id=${PLACE_POP}`,
  },
}

// Società titolare del marchio WASH HUB
export const SOCIETA = {
  ragioneSociale: 'LAST MILE SRL',
  partitaIva: '06183200879',
  rea: 'CT-475508',
  sedeLegale: 'Via Duca degli Abruzzi 180, 95126 Catania (CT)',
}
