import { cn } from '@/lib/utils'

type CommentDividerProps = {
  label: string
  className?: string
}

export function CommentDivider({ label, className }: CommentDividerProps) {
  return (
    <p className={cn('font-mono text-sm font-semibold text-accent', className)}>
      {'//'} {label}
    </p>
  )
}
