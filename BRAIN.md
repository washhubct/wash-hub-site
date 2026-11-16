# BRAIN.md — wash-hub-site (wash-hub.it)

Unica fonte di memoria del progetto. Solo fatti durevoli, una riga ciascuno. Aggiornare la riga che cambia, mai riscrivere tutto. Niente log di sessione.

## Chi è Guido e come lavora con me

- Guido Consoli, imprenditore siciliano: Wash Hub Lungomare (autolavaggio + parcheggio, Catania), AVR Logistic, SaaS FidelAI, domotica casa.
- Sviluppa in prima persona con Claude come CTO di fatto: proponi soluzioni, segnala bug, suggerisci refactoring, non limitarti a eseguire.
- Italiano informale, diretto, zero preamboli e disclaimer; spesso lavora di notte in sessioni lunghe.
- Proponi architettura prima di codificare sulle cose complesse; per fix piccoli procedi.
- Chiedi conferma prima di operazioni distruttive (delete, drop, force push, rm -rf, Firestore rules/indexes).
- Commit atomici in conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`), messaggi in italiano.
- Testa (`npm run build`) prima di dichiarare "fatto".
- Mai push su `main` senza ok esplicito di Guido; mai toccare `.env`, secrets, service account.
- Non aggiungere dipendenze senza avvisare; niente riscritture di moduli interi per fix chirurgici.
- Collaboratori: Skippa (operations Wash Hub, prenotazioni), Michela (contabilità), Enrico (n8n self-hosted).
- Lavora su Mac Mini M4 (utente `macia`), sessioni Claude in tmux (`washhub` è quella di Wash Hub), accesso remoto via claude.ai/code.

## Progetto: scopo, stack, repo, deploy, env

- Sito vetrina + prenotazione online di WASH HUB (autolavaggio Catania): sede Lungomare (Via Anfuso 35, operatori, Lun-Sab 8:00-18:30) e sede POP Paesi Etnei (Via Galileo Galilei 28, San Gregorio, self-service 24/7; lavaggio a mano Lun-Sab 8:00-19:00 e Dom 8:00-13:30; telefono unico delle due sedi 095 469 5153).
- Dominio produzione `wash-hub.it` (CNAME in `public/CNAME`); telefono 095 469 5153 (vale per entrambe le sedi), email info@washhub.it; società titolare LAST MILE SRL (P.IVA 06183200879, REA CT-475508, sede legale Via Duca degli Abruzzi 180, Catania).
- Stack: Next.js 16 App Router, React 19, TypeScript 5, Tailwind v4 (config inline in `globals.css`), Framer Motion 12, Firebase JS SDK 12 (solo Firestore client).
- Font via next/font: Bricolage Grotesque (headline), Instrument Serif (citazioni), Inter (body).
- Export statico (`output: 'export'`, `trailingSlash`, immagini non ottimizzate): nessuna API route, nessun server.
- Repo GitHub `washhubct/wash-hub-site`, branch unico `main`.
- Deploy = push su `main` → GitHub Actions `.github/workflows/deploy.yml` (Node 20, `npm ci`, `npm run build` con `NEXT_PUBLIC_BASE_PATH=''`) → GitHub Pages, 2-5 min.
- `basePath` di default `/wash-hub-site` (staging Pages senza dominio); in produzione vuoto via env.
- Comandi: `npm run dev`, `npm run build` (output in `out/`), `npm run lint`, `npm run fetch-reviews`.
- Env (solo nomi, mai valori): `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_PRENOTA_API`, `NEXT_PUBLIC_PRIORITY_API`, `NEXT_PUBLIC_GARANZIA_API`, `NEXT_PUBLIC_PARCHEGGIO_API`; per lo script recensioni solo `RECENSIONI_API` (facoltativa, nessuna API key).
- Nessun `.env` nel repo: le URL delle Cloud Function hanno default hardcoded nei file `src/lib/*.ts`.
- Backend = progetto Firebase `dashboard-washhub` (gestionale `~/Progetti/dashdebug`, dashboard.washhub.it); le Cloud Function stanno in `dashdebug/functions`, region `europe-west1`.
- La config Firebase web in `src/lib/firebase-booking.ts` è pubblica per design (client key), non è un secret.
- Node locale 25.x, CI Node 20; package manager npm.

## Architettura e file chiave

- `src/app/layout.tsx` — root layout: font, metadata SEO, JSON-LD LocalBusiness delle due sedi, Header/Footer/WhatsAppButton/ParcheggioSmartPopup.
- `src/app/page.tsx` — home: HeroV2 (riceve voto e numero recensioni da `src/data/reviews.json`), SocialProof, InBreve (fatti chiave in prosa), ParcheggioScelta, PrimaDopo, ComeLaviamo, Garanzia, SediPreview, Reviews, ReferralBanner, HomeCTA.
- `src/app/prenota/page.tsx` — pagina prenotazione, monta `BookingFlow`.
- `src/app/prenota/{priority,caparra,garanzia}/page.tsx` — pagine di conferma dopo checkout (polling stato via Function).
- `src/app/disdici/page.tsx` — disdetta online (gratis fino a 2h prima).
- `src/app/priority/page.tsx` — landing Priority (salta la coda nelle ore calde).
- `src/app/referral/page.tsx` — "Porta un amico": codice dal telefono, statistiche, voucher.
- `src/app/parcheggio-smart/page.tsx` + `conferma/page.tsx` — acquisto codice cancello parcheggio e conferma con polling.
- `src/app/servizi/page.tsx` — listino (`LAVAGGI`) e servizi su richiesta (`EXTRA`, solo Lungomare); `servizi/sanificazione-interni/page.tsx` — pagina dedicata a smacchiatura e sanificazione interni (su richiesta, da €100: prezzo esatto a preventivo).
- `src/app/sedi/`, `sedi/lungomare`, `sedi/paesi-etnei` — pagine sedi (Lungomare include tariffe parcheggio); alla sede POP non si prenota: lì i pulsanti sono indicazioni e telefono.
- `src/app/{chi-siamo,contatti,faq,flotte,privacy,termini}/` — pagine statiche; `termini` contiene disdetta, caparra art. 1385, garanzia art. 1382, Priority.
- `src/app/sitemap.ts`, `robots.ts` — SEO statici (`force-static`).
- `src/components/booking/BookingFlow.tsx` — wizard 4 step (Servizio, Data, Orario, Dati): servizi `SERVICES`, slot, Priority, caparra, garanzia, codice amico, voucher.
- `src/components/booking/Conferma{Priority,Caparra,Garanzia}.tsx`, `Disdici.tsx` — client delle pagine conferma/disdetta.
- `src/components/home/*` — sezioni home; `Hero.tsx`, `Differentiators.tsx` e `ParcheggioSmartBanner.tsx` non sono più montati in home.
- `src/components/layout/Header.tsx` — navbar floating pill (voci `NAV`, menu desktop da `lg`, sotto menu a tutto schermo), top-bar che sparisce allo scroll, sulla pagina POP il pulsante è "Come arrivare"; `Footer.tsx` con logo MA-FRA e dati societari.
- `src/components/parcheggio/ParcheggioSmartForm.tsx`, `ConfermaCodice.tsx` — form acquisto (prefisso internazionale, E.164) e stato codice.
- `src/components/ui/` — AnimatedSection, AutoVideo (autoplay iPhone), HiggsfieldImage/Video (stub asset), Logo, ParcheggioSmartPopup, WhatsAppButton.
- `src/lib/firebase-booking.ts` — init Firebase, `SLOTS`, `GIORNI_CHIUSI`/`CHIUSURE`, `isGiornoChiuso`, `getBookedSlots` (via Function), `validaCodiceAmico`, `saveBooking` (scrive `prenotazioni` con `sedeId: 'lungomare'`, nota `[WEB] ...`).
- `src/lib/prenota-online.ts` — client Function `prenotaOnline`: verifica caparra, checkout caparra, stato, disdetta, validazione referral.
- `src/lib/priority.ts` — client Function `priority`: disponibilità ore calde, checkout SumUp, stato, orari occupati.
- `src/lib/garanzia.ts` — client Function `prenotaGaranzia`: carta a garanzia Stripe (0 € ora, penale no-show).
- `src/lib/parcheggio-smart.ts` — client Function `parcheggioSmart`: config, prezzo (`prezzoParcheggioOre`), checkout SumUp, stato codice.
- `src/lib/referral-code.ts` — codice referral deterministico dal telefono (`WH` + 4 char base32), modulo puro senza Firebase.
- `src/lib/referral.ts` — statistiche referral e voucher attivi letti da Firestore (`referral/{code}`, `vouchers/{codice}`).
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge).
- `src/lib/sedi.ts` — fonte unica di telefono, email, link Google Maps (scheda/indicazioni/recensioni) e dati societari; `src/lib/schema.ts` — JSON-LD (sedi, parcheggio, briciole).
- `src/data/faq.ts` — domande frequenti, usate sia dalla pagina sia dal JSON-LD FAQPage.
- `src/data/reviews.json` — recensioni Google reali, generate da `scripts/fetch-reviews.mjs` (Places API); la home legge rating e conteggio da qui.
- `public/brand/` — logo, hero video (`hero-bg-720.mp4`) e poster, clip e foto dei 4 passaggi (`passi/`), prima/dopo in WebP.
- Collezioni Firestore toccate dal sito: `prenotazioni` (solo scrittura), `referral` (+ sub `eventi`), `vouchers` (lettura).

## Decisioni prese e perché

- Hosting GitHub Pages con export statico invece di Vercel: coerente con gli altri gestionali, zero costi; il form contatti con API route è stato rimosso di conseguenza.
- Prenotazione nativa nel sito (non iframe del gestionale) per UX e controllo del flusso.
- Privacy (14/10/2026): il sito non legge più `prenotazioni` né clienti; orari occupati e verifiche passano dalle Cloud Function.
- Tutta la logica di pagamento e business (Priority, caparra, garanzia, parcheggio, referral) vive nelle Cloud Function del gestionale; il sito è solo client.
- Caparra €10 richiesta solo a chi ha già saltato una prenotazione (`perTutti` spento); per tutti gli altri carta a garanzia Stripe con penale €10 no-show.
- Priority: supplemento pagato subito via SumUp negli orari ⚡ delle ore calde; nessun conteggio posti esposto al client.
- Referral (22/10/2026): il codice amico vale solo per clienti NUOVI (verifica su telefono, nome, cognome, email lato Function); €5 all'amico + €5 a chi presenta, buono valido un mese, nessun limite di amici per codice.
- Con il codice amico l'email è obbligatoria; consenso marketing facoltativo e separato.
- Self-referral bloccato lato client (codice calcolato dal telefono) e lato Function.
- Performance Intenso a prezzo per taglia (utilitaria/berlina €29, SUV/monovolume/station €35), prezzo definito in sede: niente prezzo fisso in prenotazione.
- Parcheggio Smart: tariffa identica al gestionale (€2/h, max €8 fino a 6h, max €15 fino a 24h, minimo 2h); a ore si entra sempre con il codice di Parcheggio Smart (nessun pagamento all'uscita, dopo le 18:30 il cancello è chiuso); abbonamento mensile scoperto €100, coperto €140 (richiesta via WhatsApp); nome ed email obbligatori, codice inviato via email; parcheggio accessibile 24 ore su 24, operatore presente 7:30–18:30; il parcheggio si paga online, mai all'operatore (chi resta oltre l'orario prende un nuovo codice).
- Dati fattura nel form parcheggio: provato e revertito (troppo attrito nel form).
- Gift card rimossa (pagina, menu, footer) finché non serve Stripe.
- Abbonamenti lavaggio: in arrivo, nessun prezzo pubblicato (l'unico abbonamento attivo è quello mensile del parcheggio).
- Home 2026: hero con due scelte (lavaggio/parcheggio), voto Google sopra le scelte e pillola Priority sotto, "Porta un amico" dopo le recensioni, passaggi con gli Interni al primo posto, sezioni ripetute rimosse per accorciare del 25%; niente orari liberi in vista.
- Video in autoplay su iPhone tramite `AutoVideo`; animazioni laterali solo da `md` in su per evitare scroll orizzontale.
- Giorni chiusi gestiti in `GIORNI_CHIUSI`/`CHIUSURE` con difesa in profondità in `saveBooking`.
- Palette: giallo brand #F5C518, gold #C8A84E solo per Lungomare, rosso #E63946 solo CTA/badge, dark #0F0F0F, cream #FAFAF7.
- Niente sconti o promozioni nei contenuti (regola brand), tranne il referral €5.
- Recensioni Google automatiche: `scripts/fetch-reviews.mjs` legge la Function `recensioniGoogle` (dashdebug, Places API con cache 12 h) prima di ogni build e aggiorna `src/data/reviews.json`; il workflow di deploy gira anche ogni giorno alle 04:17 UTC; se la lettura fallisce resta il JSON committato.

## Regole non negoziabili

- Mai committare secrets: se compaiono API key, service account JSON o token nei file, blocca tutto e avvisa.
- Firestore rules e indexes si cambiano solo con revisione esplicita di Guido (vivono nel repo del gestionale).
- Non toccare il DNS di wash-hub.it senza ok di Guido.
- Prima di modificare il flusso di prenotazione, verificare la compatibilità con il gestionale (campi `prenotazioni`, nota `[WEB]`, `sedeId`).
- Contenuti: prezzi reali dal listino, mai dati inventati; i prezzi vanno aggiornati in `servizi/page.tsx` e `BookingFlow.tsx` insieme (e FAQ/sede se citati).
- Ogni modifica va verificata con `npm run build` (export statico) prima del commit.
- Leggere `node_modules/next/dist/docs/` prima di usare API Next.js: questa versione ha breaking changes rispetto a quanto so.

## Stato attuale e prossimi passi

- Sito in produzione su wash-hub.it con prenotazione, Priority, caparra/garanzia, disdetta, referral, Parcheggio Smart.
- Recensioni: Google 5,0★ con 22 recensioni (dato di Guido, 14/11/2026); aggiornare con `npm run fetch-reviews`.
- Aperti: abbonamenti lavaggio (prezzi + Payment Link Stripe reali), gift card se torna utile, immagini stub Higgsfield residue in `sedi/page.tsx`, `servizi/page.tsx`, `SediPreview.tsx`.
- Da valutare: Google Analytics 4 (non integrato), Resend per email contatti (non serve finché non c'è un form).
- `GIORNI_CHIUSI` contiene date 2026 da ripulire e integrare per il 2027.
