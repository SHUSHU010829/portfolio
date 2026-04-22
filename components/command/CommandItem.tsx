import { Command } from 'cmdk'
import type { CommandCategory } from '@/lib/commands'
import { cn } from '@/lib/utils'

type CommandItemProps = {
  id: string
  label: string
  description?: string
  category: CommandCategory
  onSelect: () => void
}

export function CommandItem({ id, label, description, onSelect }: CommandItemProps) {
  return (
    <Command.Item
      value={`${label} ${description ?? ''}`}
      onSelect={onSelect}
      className={cn(
        'group relative flex cursor-pointer items-center gap-3 px-3 py-2',
        'text-sm text-fg-muted',
        'data-[selected=true]:bg-accent-dim data-[selected=true]:text-fg',
        'transition-colors duration-fast',
        'outline-none',
      )}
    >
      {/* > indicator */}
      <span
        className="invisible text-accent group-data-[selected=true]:visible select-none"
        aria-hidden="true"
      >
        &gt;
      </span>
      <span className="flex-1 font-mono">{label}</span>
      {description && (
        <span className="shrink-0 text-xs text-fg-subtle">{description}</span>
      )}
    </Command.Item>
  )
}
