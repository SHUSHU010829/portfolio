'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type LivePreviewProps = {
  /** How the experiment is rendered */
  mode: 'inline' | 'iframe' | 'video'
  /** For mode="inline": pass the React component directly */
  children?: ReactNode
  /** For mode="iframe": URL of the self-contained HTML experiment */
  src?: string
  /** For mode="video": URL of the demo video */
  videoSrc?: string
  className?: string
}

export function LivePreview({ mode, children, src, videoSrc, className }: LivePreviewProps) {
  if (mode === 'inline') {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded bg-bg-overlay p-6',
          className,
        )}
      >
        {children ?? (
          <span className="font-mono text-xs text-fg-subtle">// preview placeholder</span>
        )}
      </div>
    )
  }

  if (mode === 'iframe' && src) {
    return (
      <div className={cn('overflow-hidden rounded', className)}>
        <iframe
          src={src}
          title="Live experiment preview"
          className="h-48 w-full border-0 bg-bg-overlay"
          loading="lazy"
        />
      </div>
    )
  }

  if (mode === 'video' && videoSrc) {
    return (
      <div className={cn('overflow-hidden rounded', className)}>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-48 w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex h-32 items-center justify-center rounded bg-bg-overlay',
        className,
      )}
    >
      <span className="font-mono text-xs text-fg-subtle">// no preview available</span>
    </div>
  )
}
