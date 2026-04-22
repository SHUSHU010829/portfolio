'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import * as THREE from 'three'
import { Tooltip3D } from './Tooltip3D'
import type { ReactNode } from 'react'

type InteractiveObjectProps = {
  tooltip: string
  onClick?: () => void
  children: ReactNode
}

export function InteractiveObject({ tooltip, onClick, children }: InteractiveObjectProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const scaleRef = useRef(1)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = hovered ? 1.05 : 1
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, delta * 10)
    groupRef.current.scale.setScalar(scaleRef.current)
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={e => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={e => { e.stopPropagation(); onClick?.() }}
    >
      {children}
      <Tooltip3D label={tooltip} visible={hovered} />
    </group>
  )
}
