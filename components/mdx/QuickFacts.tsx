import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type QuickFactsProps = {
  items: { label: string; value: string }[]
  className?: string
}

export function QuickFacts({ items, className }: QuickFactsProps) {
  return (
    <dl
      className={cn(
        'grid grid-cols-2 gap-x-6 gap-y-3 border border-border bg-bg-elevated p-4 font-mono sm:grid-cols-3',
        className,
      )}
    >
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-xs text-fg-subtle">{label}</dt>
          <dd className="text-sm text-fg">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
