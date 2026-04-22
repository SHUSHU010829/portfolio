'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { EASTER_EGGS, type EasterEgg } from '@/lib/easter-eggs'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'shuyuan_eggs'

export default function SecretPage() {
  const [discovered, setDiscovered] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
      setDiscovered(stored)
    } catch { /* ignore */ }
  }, [])

  const confirmedEggs = EASTER_EGGS.filter(e => !e.id.startsWith('slot'))
  const totalFound = discovered.filter(id => confirmedEggs.some(e => e.id === id)).length

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex flex-col gap-8 px-10 pb-10 pt-10">
        <TerminalPrompt className="text-sm text-fg-muted">
          ls ./secrets
        </TerminalPrompt>

        <p className="font-mono text-xs text-fg-subtle">
          {totalFound}/{confirmedEggs.length} eggs discovered
        </p>

        <ul className="flex flex-col gap-3" role="list">
          {EASTER_EGGS.map(egg => (
            <EggRow key={egg.id} egg={egg} found={discovered.includes(egg.id)} />
          ))}
        </ul>

        <p className="font-mono text-xs text-fg-subtle border-t border-border pt-6">
          // discoveries are stored locally in your browser — no tracking
        </p>
      </main>
      <Footer />
    </div>
  )
}

function EggRow({ egg, found }: { egg: EasterEgg; found: boolean }) {
  const isPlaceholder = egg.id.startsWith('slot')

  return (
    <li className={cn(
      'flex flex-col gap-1 border border-border p-4 font-mono text-sm',
      found && !isPlaceholder && 'border-accent/30 bg-accent-dim',
      isPlaceholder && 'opacity-40',
    )}>
      <div className="flex items-center gap-3">
        <span className={cn(
          'text-base',
          found && !isPlaceholder ? 'text-accent' : 'text-fg-subtle',
        )}>
          {found && !isPlaceholder ? '✓' : '○'}
        </span>
        <span className={cn(
          'font-semibold',
          found && !isPlaceholder ? 'text-fg' : 'text-fg-muted',
        )}>
          {isPlaceholder ? '???' : egg.name}
        </span>
      </div>
      <p className="ml-7 text-xs text-fg-subtle">
        {found && !isPlaceholder ? egg.howTo : egg.hint}
      </p>
    </li>
  )
}
