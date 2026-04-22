import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HighlightProps = {
  children: ReactNode
  className?: string
}

export function Highlight({ children, className }: HighlightProps) {
  return (
    <span className={cn('bg-accent-dim text-accent px-1 rounded-sm font-mono', className)}>
      {children}
    </span>
  )
}
