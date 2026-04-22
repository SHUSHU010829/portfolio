'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Canvas3D } from '@/components/3d/Canvas3D'
import { StandardLights } from '@/components/3d/Lights'
import * as THREE from 'three'

// Preload the model if it exists
useGLTF.preload('/models/tapi.glb')

// ---- Placeholder dog (box body + sphere head) ----
function PlaceholderDog({ isJumping, mousePos }: { isJumping: boolean; mousePos: THREE.Vector2 }) {
  const bodyRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const jumpRef = useRef(0)
  const jumpVelRef = useRef(0)

  useFrame((_, delta) => {
    if (!bodyRef.current || !headRef.current) return

    // Tail-wag: gentle body sway
    const t = Date.now() / 1000
    bodyRef.current.rotation.z = Math.sin(t * 4) * 0.05

    // Head follows cursor
    const targetRotX = -mousePos.y * 0.4
    const targetRotY = mousePos.x * 0.5
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, delta * 5)
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, delta * 5)

    // Jump physics
    if (isJumping && jumpRef.current === 0) {
      jumpVelRef.current = 2.5
    }
    if (jumpRef.current > 0 || jumpVelRef.current > 0) {
      jumpVelRef.current -= 8 * delta
      jumpRef.current = Math.max(0, jumpRef.current + jumpVelRef.current * delta)
    }
    bodyRef.current.position.y = jumpRef.current
  })

  return (
    <group ref={bodyRef}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.8]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.55, 0.25]}>
        <sphereGeometry args={[0.25, 12, 8]} />
        <meshStandardMaterial color="#9B7524" roughness={0.7} />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.15, 0.72, 0.2]}>
        <boxGeometry args={[0.1, 0.18, 0.08]} />
        <meshStandardMaterial color="#7A5A0A" roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.72, 0.2]}>
        <boxGeometry args={[0.1, 0.18, 0.08]} />
        <meshStandardMaterial color="#7A5A0A" roughness={0.9} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.38, -0.45]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.02, 0.4, 6]} />
        <meshStandardMaterial color="#7A5A0A" roughness={0.9} />
      </mesh>
      {/* Legs */}
      {([-0.2, 0.2] as const).map(x =>
        ([-0.25, 0.2] as const).map(z => (
          <mesh key={`${x}-${z}`} position={[x, -0.1, z]}>
            <cylinderGeometry args={[0.06, 0.05, 0.3, 6]} />
            <meshStandardMaterial color="#8B6914" roughness={0.8} />
          </mesh>
        ))
      )}
    </group>
  )
}

// ---- Scene ----
function TapiScene() {
  const [isJumping, setIsJumping] = useState(false)
  const mousePos = useRef(new THREE.Vector2(0, 0))
  const mousePosSmooth = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mousePos.current.set(x, y)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((_, delta) => {
    mousePosSmooth.current.lerp(mousePos.current, delta * 4)
  })

  function handleClick() {
    setIsJumping(true)
    // Mark egg as discovered
    try {
      const eggs = JSON.parse(localStorage.getItem('shuyuan_eggs') ?? '[]') as string[]
      if (!eggs.includes('tapi-idle')) {
        localStorage.setItem('shuyuan_eggs', JSON.stringify([...eggs, 'tapi-idle']))
      }
    } catch { /* ignore */ }
    setTimeout(() => setIsJumping(false), 400)
  }

  return (
    <>
      <StandardLights />
      <PlaceholderDog isJumping={isJumping} mousePos={mousePosSmooth.current} />
      {/* Invisible click plane */}
      <mesh onClick={handleClick} position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  )
}

export function TapiCanvas() {
  return (
    <Canvas3D
      camera={{ position: [0, 0.5, 3], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
    >
      <TapiScene />
    </Canvas3D>
  )
}
