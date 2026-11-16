// Domande frequenti: una sola lista per la pagina /faq/ e per i dati strutturati FAQPage.
// Ogni risposta ripete il soggetto nella prima frase, così regge anche letta da sola.
// Prezzi e orari qui devono restare uguali a servizi/page.tsx, BookingFlow.tsx e pagine sede.
export type Voce = { q: string; a: string; link?: { href: string; label: string } }

export const FAQ: Voce[] = [
  {
    q: 'Dove si trova WASH HUB?',
    a: 'WASH HUB ha due sedi: WASH HUB Lungomare in Via Anfuso 35 a Catania e WASH HUB POP Paesi Etnei in Via Galileo Galilei 28 a San Gregorio di Catania, presso la stazione LUKoil.',
    link: { href: '/sedi', label: 'Le nostre sedi' },
  },
  {
    q: 'Quali sono gli orari? Siete aperti la domenica?',
    a: 'La sede Lungomare è aperta dal lunedì al sabato dalle 8:00 alle 18:30 ed è chiusa la domenica; il suo parcheggio interno è accessibile 24 ore su 24, con operatore dal lunedì al sabato dalle 7:30 alle 18:30. Al POP Paesi Etnei il self service è aperto 24 ore su 24, tutti i giorni; il lavaggio a mano con operatori dal lunedì al sabato dalle 8:00 alle 19:00 e la domenica dalle 8:00 alle 13:30.',
  },
  {
    q: 'Quanto costa un lavaggio auto?',
    a: 'Al Lungomare il lavaggio esterno parte da €14 e dura circa 15 minuti; il Lavaggio Tradizionale, interno ed esterno, parte da €18 e dura circa 30 minuti; il Performance Intenso costa €29 per utilitarie e berline e €35 per SUV, monovolume e station wagon; moto e scooter €12.',
    link: { href: '/servizi', label: 'Vedi il listino' },
  },
  {
    q: 'Devo prenotare o posso venire direttamente?',
    a: 'Al Lungomare puoi prenotare online oppure passare direttamente: accogliamo chi arriva senza prenotazione compatibilmente con la disponibilità degli orari. Al POP Paesi Etnei non si prenota, né per il self service né per il lavaggio a mano: passi direttamente.',
    link: { href: '/prenota', label: 'Prenota online' },
  },
  {
    q: 'Posso disdire una prenotazione?',
    a: 'Sì, puoi disdire gratis una prenotazione fino a 2 ore prima dell\'orario prenotato, dalla pagina Disdici: ti servono il telefono usato per prenotare, il nome e il giorno. Se mancano meno di 2 ore, scrivici su WhatsApp.',
    link: { href: '/disdici', label: 'Disdici una prenotazione' },
  },
  {
    q: 'Cos\'è Priority?',
    a: 'Priority è il posto prioritario nelle ore di punta al Lungomare: costa €5 in più sul lavaggio, arrivi all\'orario scelto ed entri in lavaggio entro 10 minuti. Se aspetti di più, ti restituiamo i €5.',
    link: { href: '/priority', label: 'Come funziona Priority' },
  },
  {
    q: 'Quanto tempo ci vuole per un lavaggio?',
    a: 'Il lavaggio esterno richiede circa 15 minuti. Il Lavaggio Tradizionale (esterno + interni) circa 30 minuti. Il Performance Intenso varia da veicolo a veicolo: dipende da dimensioni e da quanto è sporca l\'auto. Per la tappezzeria i tempi variano in base al servizio richiesto.',
    link: { href: '/servizi', label: 'Vedi il listino' },
  },
  {
    q: 'Cosa include il lavaggio esterno?',
    a: 'Il lavaggio esterno include carrozzeria completa, vetri, cerchi e passaruota. Usiamo prodotti professionali e risciacquo finale con acqua osmotizzata per evitare aloni.',
  },
  {
    q: 'Cosa include il Lavaggio Tradizionale?',
    a: 'Il Lavaggio Tradizionale è il lavaggio completo interno ed esterno: tutto il lavaggio esterno più aspirazione abitacolo, pulizia cruscotto e superfici interne, e cura dei vetri interni.',
  },
  {
    q: 'Cosa include il Performance Intenso?',
    a: 'Il Performance Intenso include tutto quello che fa il Lavaggio Tradizionale, fatto in modo intenso: esterno e interni curati a fondo, con trattamento schiumogeno. È pensato per le auto molto sporche o per chi vuole il massimo risultato. Il prezzo dipende dalla taglia dell\'auto e la durata dal veicolo.',
  },
  {
    q: 'Fate smacchiatura e sanificazione degli interni?',
    a: 'Sì, facciamo smacchiatura e sanificazione degli interni al Lungomare. Smacchiamo a fondo sedili e tessuti e sanifichiamo l\'abitacolo. Per l\'impianto del clima usiamo una bomboletta sanificante, presidio medico-chirurgico. Si parte da €100: il prezzo esatto dipende dalle macchie, da quanto è grande l\'auto e da quanto lavoro c\'è da fare, e te lo diciamo prima di iniziare. Per il preventivo scrivici su WhatsApp, anche con le foto dei sedili.',
    link: { href: '/servizi/sanificazione-interni', label: 'Sanificazione interni: come funziona' },
  },
  {
    q: 'Fate il lavaggio motore?',
    a: 'Sì, facciamo il lavaggio motore al Lungomare, su richiesta. Chiedi in sede o scrivici su WhatsApp prima di venire, così ti diciamo tempi e costo per la tua auto.',
  },
  {
    q: 'Posso lavare la moto?',
    a: 'Sì, al Lungomare laviamo moto e scooter a €12. Ti chiediamo solo di farla raffreddare prima di portarla: il cambio di temperatura repentino non fa bene ai componenti.',
  },
  {
    q: 'C\'è il parcheggio?',
    a: 'Sì, al Lungomare c\'è il parcheggio interno, in Via Anfuso 35: costa €2 l\'ora con minimo 2 ore. Per parcheggiare a ore serve sempre il codice di Parcheggio Smart: paghi online e apri il cancello a qualsiasi ora, anche di notte. Il parcheggio è accessibile 24 ore su 24 e l\'operatore è presente dal lunedì al sabato, dalle 7:30 alle 18:30. C\'è anche l\'abbonamento mensile con posto riservato: scoperto €100, coperto €140.',
    link: { href: '/parcheggio-smart', label: 'Parcheggio al Lungomare' },
  },
  {
    q: 'Il self service ai Paesi Etnei è sempre aperto?',
    a: 'Sì, il self service ai Paesi Etnei è aperto 24 ore su 24, 7 giorni su 7, inclusi domenica e festivi. Gli operatori per il lavaggio manuale sono invece disponibili dal lunedì al sabato dalle 8:00 alle 19:00 e la domenica dalle 8:00 alle 13:30.',
    link: { href: '/sedi/paesi-etnei', label: 'La sede POP Paesi Etnei' },
  },
  {
    q: 'Come si paga?',
    a: 'Al Lungomare accettiamo contanti e carte di credito/debito. Al self service dei Paesi Etnei si paga con monete, carta o contactless.',
  },
  {
    q: 'Fate la tappezzeria su tutti i tipi di auto?',
    a: 'Sì, facciamo la tappezzeria su qualsiasi tipo di interno: tessuto, pelle, alcantara, similpelle. Per un preventivo accurato ti consigliamo di portare il veicolo o mandarci delle foto via WhatsApp prima.',
  },
  {
    q: 'Il risultato è garantito?',
    a: 'Sì, il risultato è garantito: se al ritiro non sei soddisfatto, te lo rifacciamo. Nessuna discussione.',
  },
  {
    q: 'Posso portare un SUV o un furgone?',
    a: 'Sì, laviamo SUV, furgoni leggeri e veicoli commerciali. Il prezzo varia in base alla dimensione: scrivici su WhatsApp per un preventivo rapido.',
  },
]
