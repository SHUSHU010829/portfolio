'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type SliderControl = {
  type: 'slider'
  label: string
  min: number
  max: number
  step?: number
  defaultValue: number
}

type SwitchControl = {
  type: 'switch'
  label: string
  defaultValue: boolean
}

type Control = SliderControl | SwitchControl

type InteractivePlaygroundProps = {
  controls: Control[]
  children: (values: Record<string, number | boolean>) => React.ReactNode
  className?: string
}

export function InteractivePlayground({ controls, children, className }: InteractivePlaygroundProps) {
  const initialValues = Object.fromEntries(
    controls.map(c => [c.label, c.defaultValue]),
  )
  const [values, setValues] = useState<Record<string, number | boolean>>(initialValues)

  function setValue(label: string, value: number | boolean) {
    setValues(prev => ({ ...prev, [label]: value }))
  }

  return (
    <div className={cn('flex flex-col gap-6 rounded border border-border bg-bg-elevated p-6', className)}>
      {/* Preview area */}
      <div className="flex min-h-40 items-center justify-center rounded bg-bg-overlay p-6">
        {children(values)}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        {controls.map(control => (
          <label
            key={control.label}
            className="flex items-center justify-between gap-4 font-mono text-xs"
          >
            <span className="text-fg-muted">{control.label}</span>

            {control.type === 'switch' ? (
              <button
                role="switch"
                aria-checked={values[control.label] as boolean}
                onClick={() => setValue(control.label, !(values[control.label] as boolean))}
                className={cn(
                  'relative h-5 w-9 rounded-full border transition-colors duration-fast',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg',
                  values[control.label]
                    ? 'border-accent bg-accent-dim'
                    : 'border-border bg-bg-overlay',
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-3.5 w-3.5 rounded-full transition-transform duration-fast',
                    values[control.label]
                      ? 'translate-x-[18px] bg-accent'
                      : 'translate-x-0.5 bg-fg-subtle',
                  )}
                />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step ?? 1}
                  value={values[control.label] as number}
                  onChange={e => setValue(control.label, Number(e.target.value))}
                  className="w-28 accent-accent"
                  aria-label={control.label}
                />
                <span className="w-8 text-right text-fg-subtle">
                  {values[control.label] as number}
                </span>
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
