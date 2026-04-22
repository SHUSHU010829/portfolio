import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TerminalCursor } from './TerminalCursor'

type TerminalPromptProps = {
  /** Prompt 符號，預設 `$` */
  symbol?: '$' | '>' | '#'
  /** 是否顯示游標 */
  cursor?: boolean
  className?: string
  children: ReactNode
}

export function TerminalPrompt({
  symbol = '$',
  cursor = false,
  className,
  children,
}: TerminalPromptProps) {
  return (
    <div className={cn('flex items-center gap-2 font-mono', className)}>
      <span className="text-accent select-none">{symbol}</span>
      <span>{children}</span>
      {cursor && <TerminalCursor />}
    </div>
  )
}
