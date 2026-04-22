'use client'

import { ContactShadows } from '@react-three/drei'

export function DeskSurface() {
  return (
    <group>
      {/* Desk plane */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[6, 0.1, 4]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Desk legs */}
      {([[-2.5, -0.8, 1.5], [2.5, -0.8, 1.5], [-2.5, -0.8, -1.5], [2.5, -0.8, -1.5]] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.06, 0.06, 1.5, 6]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
      ))}

      <ContactShadows
        position={[0, 0.06, 0]}
        opacity={0.4}
        scale={8}
        blur={2}
        far={3}
      />
    </group>
  )
}
