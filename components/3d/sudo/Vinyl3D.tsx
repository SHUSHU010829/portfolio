'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { InteractiveObject } from './InteractiveObject'

export function Vinyl3D() {
  const discRef = useRef<Mesh>(null)
  const [isSpinning, setIsSpinning] = useState(true)

  useFrame((_, delta) => {
    if (discRef.current && isSpinning) {
      discRef.current.rotation.y += delta * 2
    }
  })

  return (
    <InteractiveObject
      tooltip={isSpinning ? '// click to pause' : '// click to play'}
      onClick={() => setIsSpinning(s => !s)}
    >
      <group position={[1.4, 0.12, -0.2]}>
        {/* Vinyl record — thin cylinder */}
        <mesh ref={discRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.015, 32]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Center label */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.009]}>
          <cylinderGeometry args={[0.09, 0.09, 0.001, 24]} />
          <meshStandardMaterial color="#00D97E" roughness={0.8} />
        </mesh>
      </group>
    </InteractiveObject>
  )
}
