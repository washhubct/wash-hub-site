#!/usr/bin/env node
/**
 * Fetch Google Reviews → src/data/reviews.json
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=xxx node scripts/fetch-reviews.mjs
 *
 * Oppure con URL Google Maps custom:
 *   GOOGLE_PLACES_API_KEY=xxx MAPS_URL="https://maps.google.com/?cid=..." node scripts/fetch-reviews.mjs
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dir, '../src/data/reviews.json')

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const MAPS_URL = process.env.MAPS_URL || ''

// Place ID fisso di WASH HUB Lungomare (da Maps URL kgmid=/g/11y39jbpys)
// Puoi sovrascriverlo con PLACE_ID=xxx
const DEFAULT_PLACE_ID = process.env.PLACE_ID || ''

if (!API_KEY) {
  console.error('❌  Manca GOOGLE_PLACES_API_KEY')
  console.error('   Ottienila su: https://console.cloud.google.com → API & Services → Places API')
  process.exit(1)
}

async function findPlaceId(mapsUrl) {
  // Estrai nome dal URL se presente (?q=...)
  const urlObj = new URL(mapsUrl)
  const query = urlObj.searchParams.get('q') || 'Wash Hub Lungomare Catania'

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name&key=${API_KEY}`
  )
  const data = await res.json()
  if (data.candidates?.[0]?.place_id) return data.candidates[0].place_id
  throw new Error(`Place non trovato per query: "${query}"`)
}

async function fetchReviews(placeId) {
  const fields = 'name,rating,reviews,user_ratings_total'
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&language=it&reviews_sort=newest&key=${API_KEY}`
  )
  const data = await res.json()
  if (data.status !== 'OK') throw new Error(`Places API error: ${data.status} — ${data.error_message || ''}`)
  return data.result
}

async function main() {
  let placeId = DEFAULT_PLACE_ID

  if (!placeId && MAPS_URL) {
    console.log('🔍  Cerco Place ID da URL...')
    placeId = await findPlaceId(MAPS_URL)
    console.log(`✅  Place ID trovato: ${placeId}`)
  }

  if (!placeId) {
    // Fallback: cerca per nome
    console.log('🔍  Cerco Place ID per nome "Wash Hub Lungomare Catania"...')
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent('Wash Hub Lungomare Catania')}&inputtype=textquery&fields=place_id,name&key=${API_KEY}`
    )
    const data = await res.json()
    placeId = data.candidates?.[0]?.place_id
    if (!placeId) throw new Error('Place non trovato. Passa PLACE_ID=xxx come env var.')
    console.log(`✅  Place ID: ${placeId}`)
  }

  console.log('📥  Scarico recensioni...')
  const place = await fetchReviews(placeId)

  const reviews = (place.reviews || []).map(r => ({
    name: r.author_name,
    avatar: r.profile_photo_url || '',
    rating: r.rating,
    text: r.text,
    date: r.relative_time_description,
    time: r.time,
  }))

  const output = {
    placeId,
    placeName: place.name,
    rating: place.rating,
    totalRatings: place.user_ratings_total,
    updatedAt: new Date().toISOString(),
    reviews,
  }

  writeFileSync(OUT, JSON.stringify(output, null, 2))
  console.log(`✅  ${reviews.length} recensioni salvate → src/data/reviews.json`)
  console.log(`⭐  Rating: ${place.rating} (${place.user_ratings_total} recensioni totali)`)
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
