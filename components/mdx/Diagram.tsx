import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DiagramProps = {
  children: ReactNode
  caption?: string
  className?: string
}

export function Diagram({ children, caption, className }: DiagramProps) {
  return (
    <figure className={cn('my-6 flex flex-col gap-2', className)}>
      <div className="border border-border bg-bg-elevated p-4">{children}</div>
      {caption && (
        <figcaption className="font-mono text-xs text-fg-subtle">{caption}</figcaption>
      )}
    </figure>
  )
}
