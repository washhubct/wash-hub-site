#!/usr/bin/env node
/**
 * Recensioni Google → src/data/reviews.json
 *
 * Legge voto, numero di recensioni e recensioni dalla Cloud Function `recensioniGoogle` del gestionale
 * (Places API con il token del suo service account): qui non serve nessuna API key.
 * Gira prima di ogni build su GitHub Actions (push + giro giornaliero) e a mano con `npm run fetch-reviews`.
 * Se l'endpoint non risponde o i dati non tornano, resta il file già committato e la build va avanti.
 *
 *   RECENSIONI_API=https://... node scripts/fetch-reviews.mjs   (solo per provare un altro endpoint)
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dir, '../src/data/reviews.json')
const API = process.env.RECENSIONI_API || 'https://europe-west1-dashboard-washhub.cloudfunctions.net/recensioniGoogle'

function valida(d) {
  if (!d || typeof d !== 'object') throw new Error('risposta vuota')
  if (!(typeof d.rating === 'number' && d.rating >= 1 && d.rating <= 5)) throw new Error(`voto non valido: ${d.rating}`)
  if (!(Number.isInteger(d.totalRatings) && d.totalRatings > 0)) throw new Error(`numero recensioni non valido: ${d.totalRatings}`)
  if (!Array.isArray(d.reviews)) throw new Error('elenco recensioni mancante')
  const reviews = d.reviews
    .filter(r => r && typeof r.name === 'string' && r.name && typeof r.text === 'string' && r.text.trim() && r.rating >= 1 && r.rating <= 5)
    .map(r => ({ name: r.name, avatar: String(r.avatar || ''), rating: r.rating, text: r.text.trim(), date: String(r.date || ''), time: Number(r.time) || 0 }))
  return {
    placeId: String(d.placeId || ''),
    placeName: String(d.placeName || ''),
    rating: d.rating,
    totalRatings: d.totalRatings,
    updatedAt: String(d.updatedAt || new Date().toISOString()),
    reviews,
  }
}

async function main() {
  const res = await fetch(API, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const nuovo = valida(await res.json())

  // Se Google non restituisce recensioni con testo, teniamo quelle già in pagina e aggiorniamo solo i numeri
  if (nuovo.reviews.length === 0) {
    try { nuovo.reviews = JSON.parse(readFileSync(OUT, 'utf8')).reviews || [] } catch { /* nessun file precedente */ }
  }

  writeFileSync(OUT, JSON.stringify(nuovo, null, 2) + '\n')
  console.log(`✅  ${nuovo.rating} ★ · ${nuovo.totalRatings} recensioni totali · ${nuovo.reviews.length} in vetrina → src/data/reviews.json`)
}

main().catch(e => {
  console.warn(`⚠️  Recensioni non aggiornate (${e.message}): resta src/data/reviews.json già presente.`)
})
