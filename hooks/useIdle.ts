'use client'

import { useEffect, useRef, useState } from 'react'

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'scroll', 'pointerdown'] as const

/**
 * Returns true after `delay`ms of user inactivity.
 * Resets on any mousemove, keydown, scroll, or pointerdown.
 */
export function useIdle(delay: number): boolean {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function reset() {
      setIsIdle(false)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setIsIdle(true), delay)
    }

    // Kick off timer on mount
    timerRef.current = setTimeout(() => setIsIdle(true), delay)

    ACTIVITY_EVENTS.forEach(event => window.addEventListener(event, reset, { passive: true }))

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      ACTIVITY_EVENTS.forEach(event => window.removeEventListener(event, reset))
    }
  }, [delay])

  return isIdle
}
