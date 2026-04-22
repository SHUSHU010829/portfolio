import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CalloutVariant = 'insight' | 'warning' | 'tip'

type CalloutProps = {
  variant?: CalloutVariant
  children: ReactNode
  className?: string
}

const variantStyles: Record<CalloutVariant, string> = {
  insight: 'border-accent bg-accent-dim text-fg',
  warning: 'border-warning bg-warning/10 text-fg',
  tip:     'border-fg-subtle bg-bg-overlay text-fg-muted',
}

const variantPrefix: Record<CalloutVariant, string> = {
  insight: '// insight',
  warning: '> warning',
  tip:     '// tip',
}

export function Callout({ variant = 'tip', children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'border-l-2 px-4 py-3 font-mono text-sm',
        variantStyles[variant],
        className,
      )}
      role="note"
    >
      <p className="mb-1 text-xs text-fg-subtle select-none">{variantPrefix[variant]}</p>
      {children}
    </div>
  )
}
