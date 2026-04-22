'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark' || (!mounted && true)

  const toggleTheme = () => {
    if (!buttonRef.current) return
    const next = isDark ? 'light' : 'dark'

    if (!document.startViewTransition) {
      setTheme(next)
      return
    }

    const transition = document.startViewTransition(() => setTheme(next))

    transition.ready.then(() => {
      if (!buttonRef.current) return
      const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  if (!mounted) {
    return (
      <button ref={buttonRef} className={className} {...props} aria-label="Toggle theme">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={className} {...props}>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
