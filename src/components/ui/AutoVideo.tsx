'use client'

import { useEffect, useRef } from 'react'

// Video muto in loop che parte da solo anche su iPhone: React non scrive l'attributo `muted` nell'HTML,
// quindi Safari blocca l'autoplay. Qui forziamo muted da JS e lo facciamo partire quando entra in vista
// (e ripartire al primo tocco se il telefono è in risparmio energetico).
export function AutoVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    const play = () => { if (v.paused) v.play().catch(() => {}) }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); else v.pause() }, { threshold: 0.15 })
    io.observe(v)
    const onVis = () => { if (!document.hidden) play() }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pageshow', onVis)
    window.addEventListener('touchstart', play, { once: true, passive: true })
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pageshow', onVis)
      window.removeEventListener('touchstart', play)
    }
  }, [])
  return <video ref={ref} src={src} poster={poster} muted autoPlay loop playsInline preload="auto" aria-hidden className={className} />
}
