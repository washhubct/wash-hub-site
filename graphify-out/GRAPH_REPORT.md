# Graph Report - wash-hub-site  (2026-11-03)

## Corpus Check
- Corpus is ~26,819 words - fits in a single context window. You may not need a graph.

## Summary
- 422 nodes · 734 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Pagine Informative
- Flusso Prenotazione
- Conferme Pagamento e Config Next
- Backend e Cloud Functions
- Regole Progetto e Deploy
- Dipendenze package.json
- Workflow GitHub Pages
- Parcheggio Smart
- Config TypeScript
- Layout Header Footer
- Recensioni e Social Proof
- Script Fetch Recensioni
- Componente Logo
- Config PostCSS

## God Nodes (most connected - your core abstractions)
1. `AnimatedSection()` - 41 edges
2. `next` - 40 edges
3. `react` - 23 edges
4. `compilerOptions` - 16 edges
5. `BookingFlow()` - 15 edges
6. `framer-motion` - 11 edges
7. `HomePage()` - 10 edges
8. `ParcheggioSmartForm()` - 10 edges
9. `wash-hub-site: sito vetrina + prenotazione online WASH HUB` - 10 edges
10. `BookingFlow.tsx (wizard 4 step: Servizio, Data, Orario, Dati)` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Stack handoff: Next.js 16 App Router, Tailwind v4, Framer Motion 12` --semantically_similar_to--> `Next.js 16 App Router + React 19 + TypeScript 5`  [INFERRED] [semantically similar]
  memory/_archive/HANDOFF.md → BRAIN.md
- `Typography: Bricolage Grotesque headline, Instrument Serif citazioni, Inter body` --semantically_similar_to--> `Font: Bricolage Grotesque / Instrument Serif / Inter via next/font`  [INFERRED] [semantically similar]
  memory/_archive/HANDOFF.md → BRAIN.md
- `HIGGSFIELD_STUB: HiggsfieldImage/Video con prop prompt da sostituire con asset reali` --semantically_similar_to--> `HiggsfieldImage/Video stub asset (residui in sedi, servizi, SediPreview)`  [INFERRED] [semantically similar]
  memory/_archive/HANDOFF.md → BRAIN.md
- `Prezzi abbonamenti placeholder (€XXX) in servizi/page.tsx ABBONAMENTI` --semantically_similar_to--> `Abbonamenti: sezione Coming Soon con link Stripe placeholder`  [INFERRED] [semantically similar]
  memory/_archive/HANDOFF.md → BRAIN.md
- `Palette design (giallo #F5C518, gold #C8A84E, rosso #E63946, dark, cream)` --semantically_similar_to--> `Palette: giallo #F5C518, gold #C8A84E (Lungomare), rosso #E63946 (CTA), dark #0F0F0F, cream #FAFAF7`  [INFERRED] [semantically similar]
  memory/_archive/HANDOFF.md → BRAIN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Client TypeScript delle Cloud Function del gestionale (il sito è solo client)** — brain_prenota_online_ts, brain_priority_ts, brain_garanzia_ts, brain_parcheggio_smart_ts, brain_firebase_booking_ts, brain_cloud_functions [EXTRACTED 1.00]
- **Flusso prenotazione e pagamento (wizard, Priority, caparra, garanzia, referral, disdetta)** — brain_bookingflow, brain_priority, brain_caparra, brain_carta_garanzia_stripe, brain_referral_programma, brain_disdici_page, brain_prenotazioni_collection [EXTRACTED 1.00]
- **Decisioni dell'handoff originale superate (Vercel, API route contatti, iframe prenotazione)** — memory__archive_handoff_vercel, memory__archive_handoff_api_contact_route, memory__archive_handoff_booking_iframe, brain_github_pages_deploy, brain_export_statico, brain_prenotazione_nativa [INFERRED 0.85]

## Communities (14 total, 2 thin omitted)

### Community 0 - "Pagine Informative"
Cohesion: 0.06
Nodes (45): ChiSiamoPage(), metadata, ContattiPage(), FAQ, FAQItem(), FAQPage(), BENEFITS, CLIENTI (+37 more)

### Community 1 - "Flusso Prenotazione"
Cohesion: 0.08
Nodes (39): DisdiciPage(), metadata, metadata, PrenotaPage(), ReferralPage(), BookingFlow(), getDates(), getLocalToday() (+31 more)

### Community 2 - "Conferme Pagamento e Config Next"
Cohesion: 0.06
Nodes (24): nextConfig, framer-motion, next, react, metadata, metadata, ConfermaCaparraPage(), metadata (+16 more)

### Community 3 - "Backend e Cloud Functions"
Cohesion: 0.06
Nodes (30): AutoVideo (autoplay video iPhone), BookingFlow.tsx (wizard 4 step: Servizio, Data, Orario, Dati), Cloud Functions del gestionale (dashdebug/functions, europe-west1), Progetto Firebase dashboard-washhub (gestionale dashdebug, dashboard.washhub.it), src/app/disdici (disdetta online gratis fino a 2h prima), Env vars NEXT_PUBLIC_*_API (prenota, priority, garanzia, parcheggio) + GOOGLE_PLACES_API_KEY, src/lib/firebase-booking.ts (init Firebase, SLOTS, GIORNI_CHIUSI, getBookedSlots, validaCodiceAmico, saveBooking), Firebase JS SDK 12 (solo Firestore client) (+22 more)

### Community 4 - "Regole Progetto e Deploy"
Cohesion: 0.07
Nodes (35): basePath /wash-hub-site (staging) vuoto in produzione via NEXT_PUBLIC_BASE_PATH, Enrico (n8n self-hosted), Font: Bricolage Grotesque / Instrument Serif / Inter via next/font, Framer Motion 12, Google Analytics 4 (da valutare, non integrato), Guido Consoli (owner, CTO-partnership workflow), Header.tsx (navbar floating pill, NAV) / Footer.tsx (logo MA-FRA), HiggsfieldImage/Video stub asset (residui in sedi, servizi, SediPreview) (+27 more)

### Community 5 - "Dipendenze package.json"
Cohesion: 0.06
Nodes (39): eslintConfig, dependencies, clsx@^2.1.1, firebase@^12.13.0, framer-motion@^12.40.0, next@16.2.6, react@19.2.4, react-dom@19.2.4 (+31 more)

### Community 6 - "Workflow GitHub Pages"
Cohesion: 0.06
Nodes (32): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+24 more)

### Community 7 - "Parcheggio Smart"
Cohesion: 0.13
Nodes (27): ConfermaPage(), metadata, FAQ, metadata, ParcheggioSmartPage(), STEPS, ConfermaCodice(), Info() (+19 more)

### Community 8 - "Config TypeScript"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "Layout Header Footer"
Cohesion: 0.18
Nodes (14): bricolage, instrument, inter, jsonLd, metadata, RootLayout(), Footer(), IconFacebook() (+6 more)

### Community 10 - "Recensioni e Social Proof"
Cohesion: 0.24
Nodes (7): FALLBACK_REVIEWS, rawReviews, Reviews(), Stars(), CountUp(), SocialProof(), STATS

### Community 11 - "Script Fetch Recensioni"
Cohesion: 0.28
Nodes (5): __dir, fetchReviews(), findPlaceId(), main(), OUT

## Ambiguous Edges - Review These
- `Font: Bricolage Grotesque / Instrument Serif / Inter via next/font` → `Geist font via next/font (template default, non usato)`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **11 isolated node(s):** `Skippa (operations Wash Hub, prenotazioni)`, `Michela (contabilità)`, `Enrico (n8n self-hosted)`, `Mac Mini M4 dev server (tmux session washhub)`, `basePath /wash-hub-site (staging) vuoto in produzione via NEXT_PUBLIC_BASE_PATH` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 139 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Conferme Pagamento e Config Next` to `Pagine Informative`, `Flusso Prenotazione`, `Dipendenze package.json`, `Parcheggio Smart`, `Layout Header Footer`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **What connects `Skippa (operations Wash Hub, prenotazioni)`, `Michela (contabilità)`, `Enrico (n8n self-hosted)` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pagine Informative` be split into smaller, more focused modules?**
  _Cohesion score 0.06095481670929241 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Conferme Pagamento e Config Next` to `Pagine Informative`, `Flusso Prenotazione`, `Dipendenze package.json`, `Parcheggio Smart`, `Recensioni e Social Proof`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Should `Flusso Prenotazione` be split into smaller, more focused modules?**
  _Cohesion score 0.08163265306122448 - nodes in this community are weakly interconnected._
- **Why does `AnimatedSection()` connect `Pagine Informative` to `Flusso Prenotazione`, `Parcheggio Smart`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Font: Bricolage Grotesque / Instrument Serif / Inter via next/font` and `Geist font via next/font (template default, non usato)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._