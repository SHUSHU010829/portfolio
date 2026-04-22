'use client'

import { useEffect, useState } from 'react'

const QUERY = '(min-width: 1024px) and (pointer: fine)'

/**
 * Returns true on desktop with a precise pointer (mouse/trackpad).
 * `pointer: fine` excludes touch tablets with external keyboards.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setIsDesktop(mq.matches)

    function handler(e: MediaQueryListEvent) {
      setIsDesktop(e.matches)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isDesktop
}
