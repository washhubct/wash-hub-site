/* HIGGSFIELD_STUB — Sostituire con <Image> quando asset generato da Higgsfield */
import { cn } from '@/lib/utils'

interface Props {
  prompt: string
  className?: string
  aspectRatio?: string
  overlay?: boolean
}

export function HiggsfieldImage({ prompt, className, aspectRatio = '16/9', overlay = false }: Props) {
  return (
    <div
      className={cn('relative overflow-hidden bg-gradient-to-br from-[#0F0F0F] via-[#1A2A3A] to-[#1A6B9A]/40', className)}
      style={{ aspectRatio }}
    >
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      <div className="absolute inset-0 flex items-end p-3 z-10">
        <p className="text-[10px] text-white/30 font-mono leading-tight">
          📸 Higgsfield: {prompt}
        </p>
      </div>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
      />
    </div>
  )
}
