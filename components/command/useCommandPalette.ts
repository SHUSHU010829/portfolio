'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { events } from '@/lib/analytics'

type CommandPaletteContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

export const CommandPaletteContext = createContext<CommandPaletteContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
})

export function useCommandPalette() {
  return useContext(CommandPaletteContext)
}

export function useCommandPaletteState(): CommandPaletteContextValue {
  const [open, setOpenState] = useState(false)
  const setOpen = useCallback((v: boolean) => {
    if (v) events.commandPaletteOpen()
    setOpenState(v)
  }, [])
  const toggle = useCallback(() => setOpenState(prev => {
    if (!prev) events.commandPaletteOpen()
    return !prev
  }), [])
  return { open, setOpen, toggle }
}
