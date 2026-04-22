import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Work — shu/dev'
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

export default async function OGImage() {
  const fontRegular = await fetch(
    'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-KxTOlOVk6OThhvA.woff2'
  ).then(async r => {
    if (!r.ok) return null
    return r.arrayBuffer()
  }).catch(() => null)

  const fontFamily = fontRegular ? '"JetBrains Mono", "Courier New", monospace' : '"Courier New", monospace'

  const cases = [
    { slug: 'relianz',    title: 'Relianz Design System',   role: 'Frontend Engineer' },
    { slug: 'dailyval',   title: 'DailyVal Social',          role: 'Contractor' },
    { slug: 'softmobile', title: 'SoftMobile Internship',    role: 'Frontend Intern' },
  ]

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
        {/* Navbar */}
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
          <span style={{ color: C.accent, fontSize: 22, fontWeight: 700 }}>$ shu/dev</span>
          <span style={{ color: C.fgSubtle, fontSize: 16 }}>/ work</span>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }}>
            <span style={{ color: C.fgSubtle, fontSize: 18 }}>$ ls ./case-studies</span>
            <span style={{ color: C.fg, fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>
              Work
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {cases.map((c, i) => (
              <div
                key={c.slug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 0',
                  borderBottom: i < cases.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <span style={{ color: C.accent, fontSize: 16, width: 16 }}>›</span>
                <span style={{ color: C.fg, fontSize: 22, fontWeight: 600, flex: 1 }}>
                  {c.title}
                </span>
                <span style={{ color: C.fgSubtle, fontSize: 16 }}>{c.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 44,
            padding: '0 48px',
            borderTop: `1px solid ${C.border}`,
            backgroundColor: C.bgElevated,
            gap: 8,
          }}
        >
          <span style={{ color: C.fgSubtle, fontSize: 16 }}>$</span>
          <div style={{ width: 10, height: 20, backgroundColor: C.accent, opacity: 0.85 }} />
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
