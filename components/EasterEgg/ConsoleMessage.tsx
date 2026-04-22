'use client'

import { useEffect } from 'react'
import { events } from '@/lib/analytics'

// hex values intentionally hardcoded — console.log %c styles cannot resolve CSS variables
// #00D97E = --color-accent, #9a9a9a = --color-fg-muted
export function ConsoleMessage() {
  useEffect(() => {
    console.log('%c$ whoami', 'color:#00D97E;font-size:16px;font-family:monospace;font-weight:bold')
    console.log(
      '%cHey there, fellow dev 👋\nIf you\'re reading this, we should probably talk.',
      'color:#9a9a9a;font-size:13px;font-family:monospace;line-height:1.6',
    )
    console.log(
      '%chttps://shuyuan.tw → %ccat contact.md',
      'color:#9a9a9a;font-family:monospace',
      'color:#00D97E;font-family:monospace',
    )
    console.log(
      '%chint: type %csecrets%c in the command palette to track your discoveries',
      'color:#9a9a9a;font-family:monospace',
      'color:#00D97E;font-family:monospace',
      'color:#9a9a9a;font-family:monospace',
    )
    console.log(
      '%ctry typing %csudo%c in the command palette',
      'color:#9a9a9a;font-family:monospace',
      'color:#00D97E;font-family:monospace',
      'color:#9a9a9a;font-family:monospace',
    )
    console.log('%c$ _', 'color:#00D97E;font-size:16px;font-family:monospace;font-weight:bold')

    events.easterEggTriggered('console')
    // Mark as discovered
    try {
      const eggs = JSON.parse(localStorage.getItem('shuyuan_eggs') ?? '[]') as string[]
      if (!eggs.includes('console')) {
        localStorage.setItem('shuyuan_eggs', JSON.stringify([...eggs, 'console']))
      }
    } catch {
      // localStorage may be unavailable in some contexts
    }
  }, [])

  return null
}
