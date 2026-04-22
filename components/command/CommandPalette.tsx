'use client'

import dynamic from 'next/dynamic'
import { CommandPaletteContext, useCommandPaletteState } from './useCommandPalette'

const CommandPaletteDialog = dynamic(() => import('./CommandPaletteDialog'), {
  ssr: false,
})

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const state = useCommandPaletteState()
  return (
    <CommandPaletteContext.Provider value={state}>
      {children}
      <CommandPaletteDialog />
    </CommandPaletteContext.Provider>
  )
}
