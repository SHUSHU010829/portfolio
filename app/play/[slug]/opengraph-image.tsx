import { ImageResponse } from 'next/og'
import { getExperiment } from '@/lib/content'

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

type Props = { params: Promise<{ slug: string }> }

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params
  return [{ id: slug, alt: `${slug} — shu/dev` }]
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const result = await getExperiment(slug)

  const title = result?.meta.title ?? slug
  const subtitle = result?.meta.description ?? ''
  const stack = result?.meta.stack ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: C.bg,
          fontFamily: '"Courier New", monospace',
        }}
      >
        {/* Navbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, padding: '0 48px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          <span style={{ color: C.accent, fontSize: 22, fontWeight: 700 }}>$ shu/dev</span>
          <span style={{ color: C.fgSubtle, fontSize: 16 }}>/ play / {slug}</span>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '48px', justifyContent: 'center', gap: 24 }}>
          <span style={{ color: C.fgSubtle, fontSize: 18 }}>$ cat {slug}.mdx</span>
          <span style={{ color: C.fg, fontSize: 52, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {title}
          </span>
          <span style={{ color: C.fgMuted, fontSize: 22, maxWidth: 700 }}>
            {subtitle.slice(0, 100)}
          </span>
          {stack.length > 0 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {stack.slice(0, 5).map(t => (
                <span key={t} style={{ color: C.fgSubtle, fontSize: 16, border: `1px solid ${C.border}`, padding: '3px 10px' }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 48px', borderTop: `1px solid ${C.border}`, backgroundColor: C.bgElevated, gap: 8 }}>
          <span style={{ color: C.fgSubtle, fontSize: 16 }}>$</span>
          <div style={{ width: 10, height: 20, backgroundColor: C.accent, opacity: 0.85 }} />
        </div>
      </div>
    ),
    { ...size },
  )
}
