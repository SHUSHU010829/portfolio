'use client'

import { useEffect, useRef } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

/**
 * Fires `onTrigger` when the Konami sequence is entered.
 * Uses a ref buffer — no re-renders on each keypress.
 */
export function useKonamiCode(onTrigger: () => void) {
  const buffer = useRef<string[]>([])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      buffer.current = [...buffer.current, e.key].slice(-KONAMI.length)

      if (buffer.current.join(',') === KONAMI.join(',')) {
        buffer.current = []
        onTrigger()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onTrigger])
}
