'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'
import Link from 'next/link'
import { events } from '@/lib/analytics'

const SudoScene = dynamic(() => import('@/components/3d/sudo/SudoScene').then(m => ({ default: m.SudoScene })), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-xs text-fg-subtle">
      $ loading assets...
    </div>
  ),
})

function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

type State = 'intro' | 'scene' | 'exit'

const INTRO_LINES = [
  '$ sudo enter_space/',
  '> authenticating...',
  '> loading assets...',
  '> initializing renderer...',
  '> ready.',
]

export default function SudoPage() {
  const router = useRouter()
  const [state, setState] = useState<State>('intro')
  const [visibleLines, setVisibleLines] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  // Fire analytics on scene mount
  useEffect(() => {
    if (state === 'scene') {
      events.sudoEntered()
      try {
        const eggs = JSON.parse(localStorage.getItem('shuyuan_eggs') ?? '[]') as string[]
        if (!eggs.includes('sudo-room')) {
          localStorage.setItem('shuyuan_eggs', JSON.stringify([...eggs, 'sudo-room']))
        }
      } catch { /* ignore */ }
    }
  }, [state])

  // Intro sequence
  useEffect(() => {
    if (state !== 'intro') return

    let lineIndex = 0
    function showNext() {
      lineIndex++
      setVisibleLines(lineIndex)
      if (lineIndex < INTRO_LINES.length) {
        timerRef.current = setTimeout(showNext, 350)
      } else {
        // All lines shown — transition to scene after brief pause
        timerRef.current = setTimeout(() => setState('scene'), 600)
      }
    }

    timerRef.current = setTimeout(showNext, 200)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [state])

  // ESC → exit
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && state === 'scene') {
        setState('exit')
        timerRef.current = setTimeout(() => router.push('/'), 500)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state, router])

  // Mobile fallback — no 3D on touch devices
  if (isTouch) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-bg gap-4 font-mono px-8 text-center">
        <p className="text-sm text-fg-muted">$ sudo enter_space/</p>
        <p className="text-xs text-fg-subtle">
          {'>'} this room requires a mouse and desktop browser
        </p>
        <Link href="/" className="text-xs text-accent hover:text-accent-hover mt-4">
          cd /
        </Link>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-bg font-mono">
      <AnimatePresence mode="wait">
        {state === 'intro' && (
          <motion.div
            key="intro"
            className="flex h-full items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <div className="flex flex-col gap-2 text-sm">
              {INTRO_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={i === 0 ? 'text-accent' : 'text-fg-muted'}>
                    {line}
                  </span>
                  {i === visibleLines - 1 && visibleLines < INTRO_LINES.length && (
                    <TerminalCursor char="▌" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {state === 'scene' && (
          <motion.div
            key="scene"
            className="relative h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            {/* ESC hint */}
            <div className="absolute left-4 top-4 z-10 text-xs text-fg-subtle pointer-events-none">
              [esc] exit
            </div>

            <SudoScene />
          </motion.div>
        )}

        {state === 'exit' && (
          <motion.div
            key="exit"
            className="h-full w-full bg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
