'use client'

import { useEffect, useState } from 'react'

// Meteo di Catania (Open-Meteo, pubblico e gratuito) tradotto in un consiglio semplice.
// Nessun dato sul carico di lavoro: solo il tempo (decisione Guido 07/10/2026, niente orari liberi in vista).
type Giorno = { data: string; codice: number; pioggia: number }

const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']
const piove = (g: Giorno) => g.pioggia >= 55 || (g.codice >= 51 && g.codice <= 99)

function consiglio(gg: Giorno[]): { icona: string; testo: string } | null {
  if (!gg.length) return null
  const [oggi, ...dopo] = gg
  const domenica = new Date(oggi.data + 'T12:00:00').getDay() === 0
  if (domenica) {
    const lun = dopo[0]
    return lun && !piove(lun)
      ? { icona: '☀️', testo: 'Domani si lava: cielo asciutto in arrivo' }
      : { icona: '🌤️', testo: 'Oggi siamo chiusi, ci vediamo domani' }
  }
  if (!piove(oggi)) {
    const pioggiaVicina = dopo.slice(0, 2).find(piove)
    if (pioggiaVicina) return { icona: '🌤️', testo: `Oggi asciutto, pioggia ${GIORNI[new Date(pioggiaVicina.data + 'T12:00:00').getDay()]}: lava adesso o subito dopo` }
    return { icona: '☀️', testo: 'Oggi è giornata da lavaggio' }
  }
  const asciutto = dopo.find(g => !piove(g) && new Date(g.data + 'T12:00:00').getDay() !== 0)
  return asciutto
    ? { icona: '🌧️', testo: `Oggi piove: il momento giusto è ${GIORNI[new Date(asciutto.data + 'T12:00:00').getDay()]}` }
    : { icona: '🌧️', testo: 'Settimana di pioggia: gli interni non temono il meteo' }
}

export function MeteoOggi() {
  const [c, setC] = useState<{ icona: string; testo: string } | null>(null)
  useEffect(() => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=37.507&longitude=15.087&daily=weather_code,precipitation_probability_max&timezone=Europe%2FRome&forecast_days=5'
    fetch(url).then(r => r.json()).then(d => {
      const gg: Giorno[] = (d?.daily?.time || []).map((t: string, i: number) => ({ data: t, codice: d.daily.weather_code[i], pioggia: d.daily.precipitation_probability_max[i] ?? 0 }))
      setC(consiglio(gg))
    }).catch(() => setC(null))
  }, [])
  if (!c) return <div className="h-9" aria-hidden />
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/35 backdrop-blur-md border border-white/15 text-white text-sm font-semibold">
      <span className="text-base">{c.icona}</span>
      <span>{c.testo}</span>
    </div>
  )
}
