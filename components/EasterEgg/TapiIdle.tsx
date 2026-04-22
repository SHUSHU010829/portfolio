'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useIdle } from '@/hooks/useIdle'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { events } from '@/lib/analytics'

// Three.js chunk only loads when TAPI actually renders
const TapiCanvas = dynamic(() => import('./TapiCanvas').then(m => ({ default: m.TapiCanvas })), {
  ssr: false,
})

const IDLE_TIMEOUT = 30_000 // 30 seconds

export function TapiIdle() {
  const isIdle = useIdle(IDLE_TIMEOUT)
  const isDesktop = useIsDesktop()
  const prefersReducedMotion = useReducedMotion()
  const [forceShow, setForceShow] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  // Listen for force-trigger from Command Palette
  useEffect(() => {
    function handler() {
      setForceShow(true)
      setHasShown(true)
    }
    window.addEventListener('tapi:force', handler)
    return () => window.removeEventListener('tapi:force', handler)
  }, [])

  const shouldShow = (isIdle && isDesktop) || forceShow

  useEffect(() => {
    if (shouldShow && !hasShown) {
      setHasShown(true)
      events.easterEggTriggered('tapi-idle')
    }
  }, [shouldShow, hasShown])

  if (!isDesktop && !forceShow) return null
  if (!shouldShow && !hasShown) return null

  // Reduced motion: show static silhouette, no animation
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed bottom-4 right-4 flex h-24 w-20 items-end justify-center"
        aria-label="Tapi the dog — sitting quietly"
        role="img"
      >
        <div className="h-16 w-12 rounded-t-full bg-fg-subtle opacity-30" />
      </div>
    )
  }

  if (!shouldShow) return null

  return (
    <div
      className="fixed bottom-0 right-4 z-40 h-32 w-28 pointer-events-auto"
      aria-label="Tapi the dog — click to interact"
    >
      <TapiCanvas />
    </div>
  )
}
