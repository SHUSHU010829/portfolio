'use client'

import { Html } from '@react-three/drei'

type Tooltip3DProps = {
  label: string
  visible: boolean
}

export function Tooltip3D({ label, visible }: Tooltip3DProps) {
  if (!visible) return null

  return (
    <Html
      position={[0, 0.6, 0]}
      center
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div
        style={{
          background: 'oklch(0.16 0 0)',
          border: '1px solid oklch(0.22 0 0)',
          color: 'oklch(0.96 0 0)',
          fontFamily: 'monospace',
          fontSize: '11px',
          padding: '3px 8px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </Html>
  )
}
