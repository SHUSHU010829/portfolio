'use client'

import { Canvas, type CanvasProps } from '@react-three/fiber'
import { Suspense } from 'react'

type Canvas3DProps = Omit<CanvasProps, 'gl'> & {
  /** 'low' caps DPR at 1.5 to save GPU on casual views */
  performance?: 'low' | 'high'
}

export function Canvas3D({ performance = 'low', children, ...props }: Canvas3DProps) {
  return (
    <Canvas
      dpr={performance === 'low' ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
