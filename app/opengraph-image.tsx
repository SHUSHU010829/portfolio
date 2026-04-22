import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'shu/dev — Frontend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Colors from design tokens (OKLCH → hex approximations for ImageResponse)
const C = {
  bg:        '#0a0a0a',
  bgElevated:'#131313',
  border:    '#262626',
  borderHov: '#3a3a3a',
  fg:        '#f5f5f5',
  fgMuted:   '#9a9a9a',
  fgSubtle:  '#6b6b6b',
  accent:    '#00d97e',
  accentDim: 'rgba(0,217,126,0.12)',
}

export default async function OGImage() {
  // Load JetBrains Mono from Google Fonts
  const fontRegular = await fetch(
    'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-KxTOlOVk6OThhvA.woff2'
  ).then(async r => {
    if (!r.ok) return null
    return r.arrayBuffer()
  }).catch(() => null)

  const fontFamily = fontRegular ? '"JetBrains Mono", "Courier New", monospace' : '"Courier New", monospace'
  const skills = ['TypeScript', 'Next.js', 'React', 'Go', 'Tailwind CSS']
  const works  = ['relianz', 'dailyval', 'softmobile']

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: C.bg,
          fontFamily,
        }}
      >
        {/* ── Navbar bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            padding: '0 48px',
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
          }}
        >
          <span style={{ color: C.accent, fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>
            $ shu/dev
          </span>
          <span style={{ color: C.fgSubtle, fontSize: 16 }}>shuyuan.tw</span>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '48px 48px 40px',
            gap: 0,
          }}
        >
          {/* Left column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: 0,
              paddingRight: 48,
              borderRight: `1px solid ${C.border}`,
            }}
          >
            {/* whoami block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 36 }}>
              <span style={{ color: C.fgSubtle, fontSize: 18 }}>$ whoami</span>
              <span
                style={{
                  color: C.fg,
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Shuyuan
              </span>
              <span
                style={{
                  color: C.fgMuted,
                  fontSize: 24,
                  letterSpacing: '-0.01em',
                }}
              >
                Frontend Engineer
              </span>
            </div>

            {/* skills block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ color: C.fgSubtle, fontSize: 18 }}>$ cat skills.md</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map(s => (
                  <span
                    key={s}
                    style={{
                      border: `1px solid ${C.border}`,
                      padding: '3px 10px',
                      color: C.fgMuted,
                      fontSize: 15,
                      backgroundColor: C.bgElevated,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 340,
              paddingLeft: 48,
              gap: 0,
            }}
          >
            {/* ls work block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              <span style={{ color: C.fgSubtle, fontSize: 18 }}>$ ls ./work</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {works.map(w => (
                  <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: C.accent, fontSize: 14 }}>›</span>
                    <span style={{ color: C.fgMuted, fontSize: 18 }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* echo email block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ color: C.fgSubtle, fontSize: 18 }}>$ echo $EMAIL</span>
              <span style={{ color: C.fgMuted, fontSize: 16 }}>
                shuyuan010829@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 44,
            padding: '0 48px',
            borderTop: `1px solid ${C.border}`,
            backgroundColor: C.bgElevated,
            flexShrink: 0,
            gap: 8,
          }}
        >
          <span style={{ color: C.fgSubtle, fontSize: 16 }}>$</span>
          <div
            style={{
              width: 10,
              height: 20,
              backgroundColor: C.accent,
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontRegular
        ? [{ name: 'JetBrains Mono', data: fontRegular, weight: 400 as const, style: 'normal' as const }]
        : undefined,
    },
  )
}
