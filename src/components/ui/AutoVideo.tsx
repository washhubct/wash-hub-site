'use client'

import { useEffect, useRef } from 'react'

// Video muto in loop che parte da solo anche su iPhone: React non scrive l'attributo `muted` nell'HTML,
// quindi Safari blocca l'autoplay. Qui forziamo muted da JS e lo facciamo partire quando entra in vista
// (e ripartire al primo tocco se il telefono è in risparmio energetico).
// `eager` = video della prima schermata (hero): gli altri non si scaricano finché non entrano in vista.
export function AutoVideo({ src, poster, className, eager = false }: { src: string; poster?: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    let visibile = false
    const play = () => { if (visibile && v.paused) v.play().catch(() => {}) }
    const io = new IntersectionObserver(([e]) => {
      visibile = e.isIntersecting
      if (visibile) play(); else v.pause()
    }, { threshold: 0.15 })
    io.observe(v)
    const onVis = () => { if (!document.hidden) play() }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pageshow', onVis)
    // Non `once`: in risparmio energetico serve un tocco anche per i video che entrano in vista dopo
    window.addEventListener('touchstart', play, { passive: true })
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pageshow', onVis)
      window.removeEventListener('touchstart', play)
    }
  }, [])
  return <video ref={ref} src={src} poster={poster} muted autoPlay={eager} loop playsInline preload={eager ? 'auto' : 'none'} aria-hidden className={className} />
}
