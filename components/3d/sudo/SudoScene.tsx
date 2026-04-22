'use client'

import { OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { Canvas3D } from '@/components/3d/Canvas3D'
import { SudoLights } from '@/components/3d/Lights'
import { DeskSurface } from './DeskSurface'
import { CRTMonitor } from './CRTMonitor'
import { Keyboard } from './Keyboard'
import { Vinyl3D } from './Vinyl3D'
import { TapiOnDesk } from './TapiOnDesk'
import { InteractiveObject } from './InteractiveObject'
import * as THREE from 'three'

// ---- Misc interactive objects ----

function CoffeeCup() {
  return (
    <InteractiveObject tooltip="// fuel for the build">
      <group position={[-2.0, 0.25, 0.8]}>
        {/* Cup body */}
        <mesh>
          <cylinderGeometry args={[0.1, 0.08, 0.22, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Steam — simple animated spheres via CSS not possible here, use static wisps */}
        {([[-0.02, 0.18, 0], [0.02, 0.22, 0.01], [-0.01, 0.25, -0.01]] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.015, 6, 4]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15 - i * 0.04} />
          </mesh>
        ))}
      </group>
    </InteractiveObject>
  )
}

function Books() {
  const router = useRouter()

  return (
    <InteractiveObject tooltip="// /about#toolbox" onClick={() => router.push('/about#toolbox')}>
      <group position={[-2.2, 0.3, -0.4]}>
        {[
          { color: '#8B0000', tilt: 0.05 },
          { color: '#1a3a6b', tilt: -0.03 },
          { color: '#2a4a2a', tilt: 0.04 },
        ].map((book, i) => (
          <mesh key={i} position={[i * 0.12 - 0.12, 0, 0]} rotation={[0, 0, book.tilt]}>
            <boxGeometry args={[0.1, 0.42, 0.3]} />
            <meshStandardMaterial color={book.color} roughness={0.9} />
          </mesh>
        ))}
      </group>
    </InteractiveObject>
  )
}

function Phone() {
  const router = useRouter()

  return (
    <InteractiveObject tooltip="// DailyVal →" onClick={() => router.push('/work/dailyval')}>
      <group position={[2.0, 0.18, 0.6]}>
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[0.12, 0.24, 0.012]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.007]}>
          <boxGeometry args={[0.1, 0.2, 0.001]} />
          <meshBasicMaterial color="#00D97E" />
        </mesh>
      </group>
    </InteractiveObject>
  )
}

function Notebook() {
  return (
    <InteractiveObject
      tooltip="// private"
      onClick={() => console.log('nice try.')}
    >
      <group position={[1.6, 0.1, 0.3]}>
        {/* Cover */}
        <mesh>
          <boxGeometry args={[0.25, 0.02, 0.32]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.95} />
        </mesh>
        {/* Pages */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.22, 0.015, 0.28]} />
          <meshStandardMaterial color="#f5f0e8" roughness={1} />
        </mesh>
      </group>
    </InteractiveObject>
  )
}

// ---- Root Scene ----
function Scene() {
  return (
    <>
      <SudoLights />
      <fog attach="fog" args={['#0a0a0a', 8, 20]} />

      <DeskSurface />
      <CRTMonitor />
      <Keyboard />
      <Vinyl3D />
      <TapiOnDesk />
      <CoffeeCup />
      <Books />
      <Phone />
      <Notebook />

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.08}
        makeDefault
      />
    </>
  )
}

export function SudoScene() {
  return (
    <Canvas3D
      performance="high"
      camera={{ position: [0, 5, 10], fov: 50 }}
      shadows
      style={{ width: '100vw', height: '100vh' }}
    >
      <Scene />
    </Canvas3D>
  )
}
