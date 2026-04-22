'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { MetaBar } from './MetaBar'
import { LivePreview } from './LivePreview'
import type { Experiment } from '@/lib/content'
import type { ReactNode } from 'react'

type ExperimentCardProps = {
  experiment: Experiment
  /** Live preview content for inline mode */
  previewContent?: ReactNode
}

export function ExperimentCard({ experiment, previewContent }: ExperimentCardProps) {
  const [activated, setActivated] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touch)

    if (touch) {
      // Mobile: activate only on explicit click, not scroll-into-view
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActivated(true)
      },
      { threshold: 0.3 },
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  function handleClick() {
    if (!activated) setActivated(true)
  }

  return (
    <div
      ref={cardRef}
      className="group flex flex-col gap-4 border border-border bg-bg-elevated transition-colors duration-fast hover:border-border-hover"
      onClick={handleClick}
    >
      {/* Live preview area */}
      <div className="overflow-hidden border-b border-border">
        {activated ? (
          <LivePreview
            mode={experiment.previewMode}
            className="min-h-40"
          >
            {experiment.previewMode === 'inline' ? previewContent : undefined}
          </LivePreview>
        ) : (
          <div className="flex min-h-40 items-center justify-center bg-bg-overlay">
            <span className="font-mono text-xs text-fg-subtle">
              {isTouch ? '// tap to activate' : '// scroll to activate'}
            </span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-col gap-3 px-5 pb-5">
        <MetaBar
          difficulty={experiment.difficulty}
          duration={experiment.duration}
          stack={experiment.stack}
        />

        <Link
          href={`/play/${experiment.slug}`}
          className={cn(
            'font-mono text-sm font-semibold text-fg',
            'transition-colors duration-fast group-hover:text-accent',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          )}
        >
          {experiment.title}
        </Link>

        <p className="font-mono text-xs text-fg-muted leading-relaxed">
          {experiment.description}
        </p>
      </div>
    </div>
  )
}
