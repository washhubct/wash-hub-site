# WASH HUB Site — Handoff Document

## Stack

| Layer | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (config inline in globals.css) |
| Animazioni | Framer Motion 12 |
| Font | Bricolage Grotesque + Instrument Serif + Inter (Google Fonts via next/font) |
| Deploy | Vercel (raccomandato) |
| Email contatti | API route `/api/contact` — integrazione Resend da completare |

## Decisioni di design

- **Palette:** giallo brand #F5C518, gold #C8A84E solo per Lungomare, rosso #E63946 solo per CTA/badge, dark #0F0F0F, cream #FAFAF7
- **Typography:** Bricolage Grotesque per headline (bold, energico), Instrument Serif per citazioni editoriali, Inter per body
- **Layout:** mobile-first, max-w-7xl, padding 5/8 (mobile/desktop)
- **Animazioni:** spring physics Framer Motion (damping 20-22, stiffness 70-100), scroll-triggered con useInView

## Stub Higgsfield da completare

Cerca `HIGGSFIELD_STUB` nel codice. Ogni `<HiggsfieldImage>` e `<HiggsfieldVideo>` ha un prop `prompt` pronto per Higgsfield.

| Componente | Prompt | File |
|---|---|---|
| Hero video | cinematic aerial shot luxury car wash, water slow motion, golden hour, Catania Sicily | `components/home/Hero.tsx` |
| Card Lungomare home | premium car wash exterior golden hour Catania seafront | `components/home/SediPreview.tsx` |
| Card Paesi Etnei home | modern self-service car wash at night, neon lights, futuristic | `components/home/SediPreview.tsx` |
| Hero Lungomare | luxury premium car wash station golden hour, professional operators | `app/sedi/lungomare/page.tsx` |
| Gallery Lungomare (6 immagini) | vari (vedere file) | `app/sedi/lungomare/page.tsx` |
| Hero Paesi Etnei | modern self-service car wash at night, neon illuminated, futuristic | `app/sedi/paesi-etnei/page.tsx` |
| Hero Chi siamo | professional car wash team portrait, Catania Sicily | `app/chi-siamo/page.tsx` |
| Team (4 persone) | vari (vedere file) | `app/chi-siamo/page.tsx` |
| Tappezzeria | close up professional car interior detailing, leather seats | `app/servizi/page.tsx` |

**Come sostituire uno stub:**
1. Genera l'asset con Higgsfield usando il prompt indicato
2. Salva in `/public/brand/` (es. `hero-bg.mp4`, `lungomare-hero.jpg`)
3. Sostituisci `<HiggsfieldImage prompt="...">` con `<Image src="/brand/..." ... />`
4. Rimuovi il commento `/* HIGGSFIELD_STUB */`

## Deploy su Vercel

```bash
cd /Users/macia/Progetti/wash-hub-site
npx vercel --yes
# Segui le istruzioni. Repo: washhubct/wash-hub-site
# Vercel ti darà un URL tipo https://wash-hub-site-xxx.vercel.app
```

Per collegare il dominio wash-hub.it:
```bash
npx vercel domains add wash-hub.it
```

## Checklist DNS cutover (GoDaddy → Vercel)

1. Deploy staging funziona correttamente → test su tutti i device
2. Go su GoDaddy DNS Manager
3. Modifica record `A` di `wash-hub.it` → IP Vercel (fornito da Vercel nel pannello)
4. Modifica record `CNAME` di `www.wash-hub.it` → `cname.vercel-dns.com`
5. Attendi propagazione (max 24h, di solito <1h)
6. Verifica SSL attivo su Vercel

**NON toccare il DNS finché Guido non ha revisionato lo staging.**

## Booking iframe

La pagina `/prenota` embeds `https://dashboard.washhub.it/prenota.html` via iframe.
Il componente ascolta `postMessage({height})` per resize dinamico.
**Nessuna modifica necessaria al booking flow esistente.**

## Email contatti — completare

1. Crea account su [resend.com](https://resend.com) (free tier: 100 email/giorno)
2. Aggiungi dominio `wash-hub.it` su Resend, configura DNS (SPF, DKIM)
3. Crea API key
4. Aggiungi env var: `RESEND_API_KEY=re_xxxxx`
5. Decommentare il codice Resend in `src/app/api/contact/route.ts`
6. `npm install resend`

## Prezzi abbonamenti

I prezzi sono placeholder (`€XXX`). Aggiornare in `src/app/servizi/page.tsx`, costante `ABBONAMENTI`.

## Analytics

Per abilitare GA4:
1. Crea property GA4 su analytics.google.com
2. Aggiungi `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in Vercel env vars
3. Aggiungere Google Analytics component nel root layout

Vercel Analytics è già integrato automaticamente sul piano Pro Vercel.
