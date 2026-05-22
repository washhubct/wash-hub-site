'use client'
/* HIGGSFIELD_STUB — Sostituire con <video> quando asset generato da Higgsfield */
import { cn } from '@/lib/utils'

interface Props {
  prompt: string
  className?: string
  overlay?: boolean
  overlayOpacity?: number
}

export function HiggsfieldVideo({ prompt, className, overlay = true, overlayOpacity = 0.55 }: Props) {
  return (
    <div className={cn('relative overflow-hidden bg-gradient-to-br from-[#0F0F0F] via-[#0d1a26] to-[#1A6B9A]/30', className)}>
      {/* Animated gradient simulating water/light movement */}
      <div className="absolute inset-0 animate-pulse"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(26,107,154,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(245,197,24,0.1) 0%, transparent 60%)' }}
      />
      {overlay && (
        <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />
      )}
      <div className="absolute bottom-3 left-3 z-10">
        <p className="text-[10px] text-white/25 font-mono">🎬 Higgsfield: {prompt}</p>
      </div>
    </div>
  )
}
