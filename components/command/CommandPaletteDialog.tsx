'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useReducedMotion, AnimatePresence, motion } from 'motion/react'
import { buildCommands, type CommandCategory } from '@/lib/commands'
import { useCommandPalette } from './useCommandPalette'
import { CommandItem } from './CommandItem'
import { CommandGroup } from './CommandGroup'
import { cn } from '@/lib/utils'

const CATEGORY_ORDER: CommandCategory[] = ['Navigation', 'Actions', 'External', 'System']

export default function CommandPaletteDialog() {
  const { open, setOpen, toggle } = useCommandPalette()
  const [query, setQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const router = useRouter()

  const commands = useMemo(() => buildCommands({ push: router.push }), [router])

  const visibleCommands = useMemo(() => {
    const showHidden = query.toLowerCase().includes('sudo')
    return commands.filter(c => !c.hidden || showHidden)
  }, [commands, query])

  const grouped = useMemo(() => {
    const map = new Map<CommandCategory, typeof visibleCommands>()
    for (const cmd of visibleCommands) {
      const group = map.get(cmd.category) ?? []
      group.push(cmd)
      map.set(cmd.category, group)
    }
    return map
  }, [visibleCommands])

  const close = useCallback(() => {
    ;(document.activeElement as HTMLElement)?.blur()
    setOpen(false)
    setQuery('')
  }, [setOpen])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
        return
      }
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.code === 'Backquote') {
        const active = document.activeElement
        if (!active) return
        const tag = (active as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (active as HTMLElement).isContentEditable) return
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close, toggle])

  const handleSelect = (action: () => void) => {
    close()
    action()
  }

  const slideVariants = {
    hidden: { opacity: 0, y: isMobile ? '100%' : -8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: isMobile ? '100%' : -8 },
  }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            className={cn(
              'fixed z-50 w-full',
              isMobile
                ? 'bottom-0 left-0 right-0 max-h-[80vh]'
                : 'left-1/2 top-[20vh] max-w-[560px] -translate-x-1/2',
            )}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
          >
            <Command
              className={cn(
                'flex flex-col overflow-hidden',
                'border border-border bg-bg-elevated font-mono',
                isMobile ? 'rounded-t-lg' : '',
              )}
              loop
              shouldFilter={true}
              filter={(value, search) => {
                const v = value.toLowerCase()
                const s = search.toLowerCase()
                let j = 0
                for (let i = 0; i < v.length && j < s.length; i++) {
                  if (v[i] === s[j]) j++
                }
                return j === s.length ? 1 : 0
              }}
            >
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <span className="text-accent text-sm select-none">$</span>
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="type a command..."
                  className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-subtle outline-none"
                  autoFocus
                />
                <kbd className="text-xs text-fg-subtle select-none">esc</kbd>
              </div>

              <Command.List className="max-h-[400px] overflow-y-auto py-1">
                <Command.Empty className="px-3 py-6 text-center text-sm text-fg-subtle">
                  No commands found.
                </Command.Empty>

                {CATEGORY_ORDER.map(category => {
                  const items = grouped.get(category)
                  if (!items?.length) return null
                  return (
                    <CommandGroup key={category} heading={category}>
                      {items.map(cmd => (
                        <CommandItem
                          key={cmd.id}
                          id={cmd.id}
                          label={cmd.label}
                          description={cmd.description}
                          category={cmd.category}
                          onSelect={() => handleSelect(cmd.action)}
                        />
                      ))}
                    </CommandGroup>
                  )
                })}

                {(() => {
                  const easterItems = grouped.get('Easter')
                  if (!easterItems?.length) return null
                  return (
                    <CommandGroup key="Easter" heading="Easter">
                      {easterItems.map(cmd => (
                        <CommandItem
                          key={cmd.id}
                          id={cmd.id}
                          label={cmd.label}
                          description={cmd.description}
                          category={cmd.category}
                          onSelect={() => handleSelect(cmd.action)}
                        />
                      ))}
                    </CommandGroup>
                  )
                })()}
              </Command.List>

              <div className="border-t border-border px-3 py-1.5 flex items-center gap-3 text-xs text-fg-subtle select-none">
                <span><kbd>↑↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
                <span><kbd>esc</kbd> close</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
