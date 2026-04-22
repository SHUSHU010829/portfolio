'use client'

import { Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { InteractiveObject } from './InteractiveObject'

const CRT_SCREENS = [
  {
    title: '$ whoami',
    lines: [
      'Shuyuan Chuang',
      'Frontend Engineer',
      'Taipei, Taiwan',
      'iOS → Web journey',
    ],
  },
  {
    title: 'cat passions.txt',
    lines: [
      '- Design systems',
      '- Terminal aesthetics',
      '- 3D on the web',
      '- Valorant (elo: iron 1)',
    ],
  },
  {
    title: 'ls ./things-i-love',
    lines: [
      'coffee.md',
      'lo-fi-beats/',
      'mechanical-keyboard.txt',
      'tapi.glb',
    ],
  },
  {
    title: 'contact --help',
    lines: [
      'email: shuyuan010829@',
      '       gmail.com',
      'github: SHUSHU010829',
      'web: shuyuan.tw',
    ],
  },
]

export function CRTMonitor() {
  const [screenIdx, setScreenIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function cycleToNext(idx: number) {
    setFading(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setScreenIdx(idx)
      setFading(false)
    }, 300)
  }

  // Auto-rotate every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      cycleToNext((screenIdx + 1) % CRT_SCREENS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [screenIdx])

  function handleClick() {
    cycleToNext((screenIdx + 1) % CRT_SCREENS.length)
  }

  const screen = CRT_SCREENS[screenIdx]

  return (
    <InteractiveObject tooltip="// click to cycle" onClick={handleClick}>
      <group position={[-1.2, 0.8, 0]}>
        {/* Monitor body */}
        <mesh>
          <boxGeometry args={[1.2, 0.9, 0.15]} />
          <meshStandardMaterial color="#111" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Screen bezel */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.0, 0.72, 0.02]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        {/* Monitor stand */}
        <mesh position={[0, -0.55, 0.05]}>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 6]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, -0.65, 0.15]}>
          <boxGeometry args={[0.3, 0.03, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* CRT content via Drei Html */}
        <Html
          position={[0, 0, 0.1]}
          transform
          occlude
          style={{
            width: '180px',
            height: '130px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'oklch(0.08 0.02 155)',
              fontFamily: 'monospace',
              fontSize: '8px',
              padding: '10px',
              color: '#00D97E',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.3s ease',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px' }}>
              {screen.title}
            </div>
            {screen.lines.map((line, i) => (
              <div key={i} style={{ color: i === 0 ? '#00D97E' : '#9a9a9a' }}>
                {line}
              </div>
            ))}
            <div style={{ marginTop: 'auto', color: '#00D97E' }}>
              {'█'}
            </div>
          </div>
        </Html>
      </group>
    </InteractiveObject>
  )
}
