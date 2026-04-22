import { Command } from 'cmdk'
import type { ReactNode } from 'react'

type CommandGroupProps = {
  heading: string
  children: ReactNode
}

export function CommandGroup({ heading, children }: CommandGroupProps) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-fg-subtle [&_[cmdk-group-heading]]:select-none"
    >
      {children}
    </Command.Group>
  )
}
