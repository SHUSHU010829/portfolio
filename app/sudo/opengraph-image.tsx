import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '/sudo — shu/dev'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const C = {
  bg:        '#0a0a0a',
  bgElevated:'#131313',
  border:    '#262626',
  fg:        '#f5f5f5',
  fgMuted:   '#9a9a9a',
  fgSubtle:  '#6b6b6b',
  accent:    '#00d97e',
}

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: C.bg,
          fontFamily: '"Courier New", monospace',
          gap: 24,
        }}
      >
        <span style={{ color: C.fgSubtle, fontSize: 20 }}>$ sudo enter_space/</span>
        <span style={{ color: C.accent, fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em' }}>
          /sudo
        </span>
        <span style={{ color: C.fgMuted, fontSize: 24 }}>
          an interactive 3D room
        </span>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {['3D', 'Three.js', 'R3F', 'Easter Egg'].map(t => (
            <span key={t} style={{ color: C.fgSubtle, fontSize: 16, border: `1px solid ${C.border}`, padding: '3px 10px' }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{ color: C.fgSubtle, fontSize: 16, marginTop: 16 }}>shuyuan.tw</span>
      </div>
    ),
    { ...size },
  )
}
