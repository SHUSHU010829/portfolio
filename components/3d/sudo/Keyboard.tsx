'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { InteractiveObject } from './InteractiveObject'

const KEY_ROWS = [
  { count: 14, width: 0.065, z: -0.05 },
  { count: 13, width: 0.072, z: 0.02 },
  { count: 12, width: 0.08,  z: 0.09 },
  { count: 3,  width: 0.12,  z: 0.16 },
]

function Key({ position, width }: { position: [number, number, number]; width: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const pressRef = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const target = hovered ? -0.02 : 0
    pressRef.current = THREE.MathUtils.lerp(pressRef.current, target, delta * 15)
    meshRef.current.position.y = position[1] + pressRef.current
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={e => { e.stopPropagation(); setHovered(true) }}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[width - 0.005, 0.02, 0.06]} />
      <meshStandardMaterial
        color={hovered ? '#2a2a2a' : '#1a1a1a'}
        roughness={0.7}
      />
    </mesh>
  )
}

export function Keyboard() {
  return (
    <InteractiveObject tooltip="// my daily driver">
      <group position={[0.6, 0.1, 0.5]}>
        {/* Keyboard base */}
        <mesh>
          <boxGeometry args={[1.1, 0.03, 0.38]} />
          <meshStandardMaterial color="#111" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Keys */}
        {KEY_ROWS.map((row, ri) => {
          const totalWidth = row.count * (row.width + 0.005)
          return Array.from({ length: row.count }).map((_, ki) => {
            const x = -totalWidth / 2 + ki * (row.width + 0.005) + row.width / 2
            return (
              <Key
                key={`${ri}-${ki}`}
                position={[x, 0.025, row.z]}
                width={row.width}
              />
            )
          })
        })}
      </group>
    </InteractiveObject>
  )
}
