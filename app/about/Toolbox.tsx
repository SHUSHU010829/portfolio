'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const TOOLS = [
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'React',      icon: '⚛',  color: '#61DAFB' },
  { name: 'Next.js',   icon: '▲',  color: '#ffffff' },
  { name: 'Tailwind',  icon: '~',  color: '#06B6D4' },
  { name: 'Three.js',  icon: '3D', color: '#049EF4' },
  { name: 'Figma',     icon: 'F',  color: '#F24E1E' },
  { name: 'Vercel',    icon: '▲',  color: '#cccccc' },
  { name: 'Swift',     icon: 'S',  color: '#F05138' },
  { name: 'Node.js',   icon: '⬡',  color: '#68A063' },
  { name: 'PostgreSQL',icon: '🐘', color: '#336791' },
  { name: 'Git',       icon: '⎇',  color: '#F05032' },
  { name: 'Motion',    icon: '~',  color: '#8b5cf6' },
]

type Tilt = { rotateX: number; rotateY: number }

export function Toolbox() {
  const [tilts, setTilts] = useState<Record<string, Tilt>>({})

  function handleMouseMove(name: string, e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilts(prev => ({ ...prev, [name]: { rotateX: -y * 12, rotateY: x * 12 } }))
  }

  function handleMouseLeave(name: string) {
    setTilts(prev => ({ ...prev, [name]: { rotateX: 0, rotateY: 0 } }))
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {TOOLS.map(tool => {
        const tilt = tilts[tool.name] ?? { rotateX: 0, rotateY: 0 }
        return (
          <div
            key={tool.name}
            className={cn(
              'flex flex-col items-center gap-2 border border-border bg-bg-elevated p-3',
              'transition-colors duration-fast hover:border-border-hover',
              'cursor-default select-none',
            )}
            style={{
              perspective: '600px',
              transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: 'transform 0.12s ease-out',
            }}
            onMouseMove={e => handleMouseMove(tool.name, e)}
            onMouseLeave={() => handleMouseLeave(tool.name)}
            title={tool.name}
          >
            <span
              className="font-mono text-lg font-bold"
              style={{ color: tool.color }}
            >
              {tool.icon}
            </span>
            <span className="font-mono text-[9px] text-fg-subtle text-center leading-tight">
              {tool.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
