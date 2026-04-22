'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'
import { InteractiveObject } from './InteractiveObject'

export function TapiOnDesk() {
  const tailRef = useRef<THREE.Mesh>(null)
  const wagRef = useRef(0)

  function handleClick() {
    wagRef.current = Math.PI * 4 // trigger 2 full wag cycles
  }

  useFrame((_, delta) => {
    if (!tailRef.current) return
    if (wagRef.current > 0) {
      wagRef.current = Math.max(0, wagRef.current - delta * 8)
      tailRef.current.rotation.z = Math.sin(wagRef.current * 4) * 0.5
    }
  })

  return (
    <InteractiveObject tooltip="// good boy 🐕" onClick={handleClick}>
      <group position={[1.0, 0.2, -0.8]} scale={0.6}>
        {/* Body */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.8]} />
          <meshStandardMaterial color="#8B6914" roughness={0.8} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.55, 0.3]}>
          <sphereGeometry args={[0.25, 10, 8]} />
          <meshStandardMaterial color="#9B7524" roughness={0.7} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.15, 0.72, 0.25]}>
          <boxGeometry args={[0.1, 0.18, 0.08]} />
          <meshStandardMaterial color="#7A5A0A" roughness={0.9} />
        </mesh>
        <mesh position={[0.15, 0.72, 0.25]}>
          <boxGeometry args={[0.1, 0.18, 0.08]} />
          <meshStandardMaterial color="#7A5A0A" roughness={0.9} />
        </mesh>
        {/* Tail */}
        <mesh ref={tailRef} position={[0, 0.38, -0.45]} rotation={[0.6, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.02, 0.4, 6]} />
          <meshStandardMaterial color="#7A5A0A" roughness={0.9} />
        </mesh>
      </group>
    </InteractiveObject>
  )
}
