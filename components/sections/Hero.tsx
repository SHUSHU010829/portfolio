'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { TypeAnimation } from '@/components/terminal/TypeAnimation'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'
import { NoiseBackground } from './NoiseBackground'

export function Hero() {
  const [replayKey, setReplayKey] = useState(0)
  const [titleDone, setTitleDone] = useState(false)

  const handleTitleClick = () => {
    setTitleDone(false)
    setReplayKey(k => k + 1)
  }

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden px-10 py-12 sm:py-20">
      <NoiseBackground />

      {/* Title with typing animation */}
      <h2
        className="font-mono text-center text-[32px] font-semibold leading-tight text-fg cursor-pointer select-none"
        onClick={handleTitleClick}
        title="Click to replay"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleTitleClick()}
        aria-label="shu/dev — click to replay animation"
      >
        <TypeAnimation
          key={replayKey}
          duration={55}
          startOnView={false}
          showCursor={!titleDone}
          cursorStyle="block"
          onComplete={() => setTitleDone(true)}
        >
          {'$ shu/dev'}
        </TypeAnimation>
        {titleDone && <TerminalCursor char="_" />}
      </h2>

      {/* Subtitle */}
      <p className="font-mono text-center text-base text-fg-muted">
        <TypeAnimation
          key={`sub-${replayKey}`}
          delay={600}
          duration={50}
          startOnView={false}
          showCursor={false}
        >
          Frontend Engineer
        </TypeAnimation>
      </p>

      {/* CLI hint — delayed 2s fade-in */}
      <motion.p
        className="font-mono text-xs text-fg-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Press backtick to open CLI"
      >
        Press{' '}
        <kbd className="rounded border border-border px-1 py-0.5 text-[10px]">`</kbd>
        {' '}to open CLI
      </motion.p>
    </section>
  )
}
