'use client'

import { createContext, useContext, useState, useCallback } from 'react'

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
  const setOpen = useCallback((v: boolean) => setOpenState(v), [])
  const toggle = useCallback(() => setOpenState(prev => !prev), [])
  return { open, setOpen, toggle }
}
