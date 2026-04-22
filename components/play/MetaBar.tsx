import { cn } from '@/lib/utils'
import type { Experiment } from '@/lib/content'

type MetaBarProps = {
  difficulty: Experiment['difficulty']
  duration: string
  stack: string[]
  className?: string
}

const difficultyColor = {
  beginner:     'text-accent border-accent/30',
  intermediate: 'text-[var(--color-warning)] border-[var(--color-warning)]/30',
  advanced:     'text-[var(--color-error)] border-[var(--color-error)]/30',
}

export function MetaBar({ difficulty, duration, stack, className }: MetaBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2 font-mono text-xs', className)}>
      <span
        className={cn(
          'rounded border px-1.5 py-0.5',
          difficultyColor[difficulty],
        )}
      >
        {difficulty}
      </span>
      <span className="text-fg-subtle">{duration}</span>
      <span className="text-fg-subtle">·</span>
      {stack.map(t => (
        <span
          key={t}
          className="rounded border border-border px-1.5 py-0.5 text-fg-subtle"
        >
          {t}
        </span>
      ))}
    </div>
  )
}
