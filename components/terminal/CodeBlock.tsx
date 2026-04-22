import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CodeBlockProps = {
  language?: string
  className?: string
  children: ReactNode
}

export function CodeBlock({ language, className, children }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'rounded-none border border-border bg-bg-elevated p-4 font-mono text-sm',
        className,
      )}
    >
      {language && (
        <div className="mb-2 text-xs text-fg-subtle select-none">{language}</div>
      )}
      <pre className="overflow-x-auto text-fg">
        <code>{children}</code>
      </pre>
    </div>
  )
}
