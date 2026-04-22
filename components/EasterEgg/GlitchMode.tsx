'use client'

import { useCallback, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { events } from '@/lib/analytics'

export function GlitchMode() {
  const prefersReducedMotion = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trigger = useCallback(() => {
    // Respect prefers-reduced-motion
    if (prefersReducedMotion) return

    const html = document.documentElement
    html.classList.add('glitch-active')
    events.easterEggTriggered('konami')

    // Mark egg as discovered
    try {
      const eggs = JSON.parse(localStorage.getItem('shuyuan_eggs') ?? '[]') as string[]
      if (!eggs.includes('konami')) {
        localStorage.setItem('shuyuan_eggs', JSON.stringify([...eggs, 'konami']))
      }
    } catch { /* ignore */ }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      html.classList.remove('glitch-active')
      console.log('%c> recovered.', 'color:#00D97E;font-family:monospace')
    }, 10_000)
  }, [prefersReducedMotion])

  useKonamiCode(trigger)

  // Render SVG filter into DOM — applied via CSS class on <html>
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glitch-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
      </defs>
    </svg>
  )
}
