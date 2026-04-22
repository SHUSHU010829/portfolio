'use client'

import { cn } from '@/lib/utils'

type VinylProps = {
  /** Whether the record is spinning */
  isPlaying: boolean
  /** Album cover image URL — defaults to a grooved placeholder */
  coverUrl?: string
  /** Diameter in pixels */
  size?: number
}

export function Vinyl({ isPlaying, coverUrl, size = 160 }: VinylProps) {
  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Vinyl record — ${isPlaying ? 'playing' : 'paused'}`}
    >
      {/* Outer record ring */}
      <div
        className={cn(
          'absolute inset-0 rounded-full',
          'bg-[radial-gradient(circle,_#1a1a1a_30%,_#0d0d0d_31%,_#222_38%,_#111_39%,_#1c1c1c_46%,_#0a0a0a_47%,_#1f1f1f_54%,_#0d0d0d_55%,_#1a1a1a_100%)]',
          isPlaying ? 'vinyl-playing' : 'vinyl-paused',
        )}
        style={{ willChange: 'transform' }}
      />

      {/* Center label */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
        style={{ width: size * 0.32, height: size * 0.32 }}
      >
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt="Album cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-accent-dim flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-bg-overlay" />
          </div>
        )}
      </div>

      {/* Center spindle hole */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg"
        style={{ width: size * 0.045, height: size * 0.045 }}
      />
    </div>
  )
}
