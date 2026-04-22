# Design: v2 Play Area, 3D Easter Eggs & Launch (Week 5-8)

## Technical Approach

This phase layers **interactive depth** on top of the solid Week 1-4 foundation. The core engineering challenges are:

1. **3D without poisoning the main bundle** — R3F is ~200KB; it must never appear in the first-load JS
2. **Easter eggs that degrade gracefully** — `prefers-reduced-motion` users must get a no-op, not a broken experience
3. **Live preview cards for `/play`** — Intersection Observer + lazy-init so 3 demos don't all boot at once
4. **External APIs (Twitch, Discord) at the edge** — server-side route handlers with short revalidation, not client-side fetches

## Architecture Decisions

### Decision: React Three Fiber — Dynamic Import First

**Rule:** Every 3D component must be loaded with `next/dynamic` and `{ ssr: false }`.

```tsx
// ✅ Correct
const TapiCanvas = dynamic(() => import('./TapiCanvas'), { ssr: false })

// ❌ Wrong — ships three.js to all users
import TapiCanvas from './TapiCanvas'
```

**Verification:** After adding any 3D component, run `pnpm build && pnpm next-bundle-analyzer` (or check `.next/analyze/`) to confirm `three` does not appear in the first-load JS chunk.

**`<Canvas3D>` wrapper** (`components/3d/Canvas3D.tsx`) is the single entry point for all R3F scenes:

```tsx
'use client'
import { Canvas, type CanvasProps } from '@react-three/fiber'
import { Suspense } from 'react'

type Canvas3DProps = Omit<CanvasProps, 'gl'> & {
  /** 'low' caps DPR at 1.5 to save GPU on casual views */
  performance?: 'low' | 'high'
}

export function Canvas3D({ performance = 'low', children, ...props }: Canvas3DProps) {
  return (
    <Canvas
      dpr={performance === 'low' ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
```

**Why `powerPreference: 'low-power'`:** Most portfolio visitors are on laptops; this preference signals the browser to use integrated GPU rather than discrete GPU, reducing fan noise and heat — a subtle quality-of-life signal.

---

### Decision: /play Architecture — Lazy Live Preview

**Problem:** Three live experiments on one page = three React trees booting simultaneously = jank.

**Solution:** `IntersectionObserver` + `useState(false)` gate:

```tsx
// ExperimentCard.tsx (simplified)
const [activated, setActivated] = useState(false)
const cardRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setActivated(true) },
    { threshold: 0.3 }
  )
  if (cardRef.current) observer.observe(cardRef.current)
  return () => observer.disconnect()
}, [])

return (
  <div ref={cardRef}>
    {activated ? <LivePreview /> : <PreviewPlaceholder />}
  </div>
)
```

**Mobile override:** On `(pointer: coarse)` devices, `activated` only flips on explicit click — not on scroll-into-view. This avoids draining battery on phones where the user is just browsing.

**Three `<LivePreview>` modes:**

| Mode | When to use | Implementation |
|------|-------------|----------------|
| `inline` | React component demos (vinyl) | Render component directly in card |
| `iframe` | Self-contained HTML experiments | `<iframe src="/experiments/[slug].html">` |
| `video` | Complex system demos (Discord bot) | `<video autoPlay loop muted playsInline>` |

---

### Decision: Easter Egg — Console Message

**Philosophy:** Single `useEffect` in a client component, mounted once in root layout. Zero dependencies, zero overhead.

```tsx
// components/EasterEgg/ConsoleMessage.tsx
'use client'
import { useEffect } from 'react'

export function ConsoleMessage() {
  useEffect(() => {
    console.log('%c$ whoami', 'color:#00D97E;font-size:16px;font-family:monospace;font-weight:bold')
    console.log('%cHey there, fellow dev 👋\nIf you\'re reading this, we should probably talk.',
      'color:#9a9a9a;font-size:13px;font-family:monospace;line-height:1.6')
    console.log('%chttps://shuyuan.tw → %ccat contact.md',
      'color:#9a9a9a;font-family:monospace',
      'color:#00D97E;font-family:monospace')
    console.log('%c$ _', 'color:#00D97E;font-size:16px;font-family:monospace;font-weight:bold')
  }, [])
  return null
}
```

**Why hardcoded hex here:** `console.log` `%c` styles are plain strings — CSS variables are not resolvable. These exact hex values (`#00D97E`, `#9a9a9a`) match `--color-accent` and `--color-fg-muted` respectively. If tokens change, update this file.

---

### Decision: Easter Egg — Konami Code

**Implementation:** A `useRef<string[]>` buffer that compares the last N keypresses to the KONAMI sequence. No third-party library needed.

**Glitch effect approach:** SVG filter (`<feTurbulence>` + `<feDisplacementMap>`) applied to `:root` via a CSS class toggle. This avoids any JavaScript animation loop — CSS handles the turbulence animation.

```css
/* globals.css */
@keyframes glitch-turbulence {
  0%   { stdDeviation: 0 }
  20%  { stdDeviation: 3 }
  40%  { stdDeviation: 0 }
  60%  { stdDeviation: 5 }
  80%  { stdDeviation: 1 }
  100% { stdDeviation: 0 }
}
```

**`prefers-reduced-motion` guard:** `useKonamiCode` calls `useReducedMotion()` (from Motion) before triggering. If reduced motion is active, the hook fires but the glitch component renders nothing.

**Auto-reset:** `setTimeout(reset, 10_000)` set at trigger time. No interval polling.

---

### Decision: Easter Egg — Logo Liquify

**Mechanism:** CSS `filter: blur()` + `contrast()` (classic "liquid" trick) animated via Motion `useMotionValue` bound to pointer press duration.

```tsx
const pressProgress = useMotionValue(0) // 0 → 1 over 800ms hold
const blur = useTransform(pressProgress, [0, 1], [0, 8])
const contrast = useTransform(pressProgress, [0, 1], [1, 3])
```

**Spring-back:** On `pointerUp`, animate `pressProgress` back to 0 with `spring({ stiffness: 400, damping: 30 })`.

**Mobile long-press:** `onPointerDown` + `onPointerUp` work identically for touch. No `ontouchstart` needed.

---

### Decision: TAPI Idle Easter Egg — Load Architecture

**Loading sequence:**
1. App boots — no 3D loaded whatsoever
2. `useIdle(30_000)` starts timer on first user interaction
3. After 30s idle + `useIsDesktop()` check passes → `TapiIdle` renders
4. `TapiIdle` renders `<TapiCanvas>` via `dynamic()` — THIS is when three.js chunk loads
5. Model streams in via `useGLTF`; Suspense fallback (`null`) during load

**Why load-on-trigger vs preload:** The 3D chunk is ~200KB gzipped. Preloading it would burn that bandwidth for the ~30% of visitors who leave before 30s idle. Load-on-trigger means the cost is only paid by engaged users.

**`useIdle` implementation:** Event listeners on `mousemove`, `keydown`, `scroll`, `pointerdown` — all reset a `setTimeout`. Uses `clearTimeout` / `setTimeout` pattern (not `setInterval`) so the timer is always reset from the last event.

**`useIsDesktop`:** `window.matchMedia('(min-width: 1024px) and (pointer: fine)')`. The `pointer: fine` guard excludes touch tablets with external keyboards.

---

### Decision: /sudo 3D Room — Camera Control

**Using Drei's `<OrbitControls>` with constraints:**

```tsx
<OrbitControls
  enablePan={false}            // no WASD-style pan
  minDistance={5}
  maxDistance={15}
  minPolarAngle={Math.PI / 6}  // can't look from below
  maxPolarAngle={Math.PI / 2}  // can't look from top-down
  enableDamping
  dampingFactor={0.08}         // slightly springy feel
/>
```

**Why no custom camera rig:** Drei's `OrbitControls` already handles mouse, touch, and keyboard fallback. A custom rig would need to replicate all of that. The constraint parameters give enough control over the "feel" without reinventing the wheel.

**Entry sequence:** Managed by a local state machine with 4 states: `'loading' | 'intro' | 'scene' | 'exit'`. Transitions are driven by `setTimeout` chains, not timelines — simpler and easier to debug.

---

### Decision: /stream Page — API Strategy

**Twitch LIVE status** uses a Next.js Route Handler with `revalidate = 60`:

```ts
// app/api/twitch/route.ts
export const revalidate = 60

export async function GET() {
  // Uses App Access Token (no user auth needed for public stream data)
  const token = await getAppAccessToken() // cached in-memory
  const res = await fetch(`https://api.twitch.tv/helix/streams?user_login=YOUR_HANDLE`, {
    headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID!, 'Authorization': `Bearer ${token}` },
    next: { revalidate: 60 },
  })
  const data = await res.json()
  return Response.json({ isLive: data.data.length > 0, stream: data.data[0] ?? null })
}
```

**Why not client-side fetch of Twitch API:** Twitch API requires OAuth credentials that cannot be exposed to the browser. Server route is the only safe option.

**Discord widget** (`discord.com/api/guilds/{id}/widget.json`) is a public endpoint — fetched directly on the client every 60s with `setInterval`. No auth needed; no sensitive data exposed.

**Error handling:** Both data sources must have explicit fallback UI:
- Twitch: `{ isLive: false, stream: null }` → show "Offline" state
- Discord: fetch failure → show static invite link without member count

---

### Decision: 404 Interactive — Matter.js over R3F

**Why Matter.js, not R3F:**
- Matter.js is 60KB vs three.js + R3F at ~200KB
- `/sudo` already loads R3F; adding it to 404 increases the chance both are cached but also means the 404 bundle always ships 3D code
- 2D physics is sufficient for draggable/bouncing digits
- Matter.js is well-documented for exactly this "draggable objects" pattern

**Implementation sketch:**
1. Create an `<Engine>` from `Matter.Bodies.rectangle()` for each digit (4, 0, 4)
2. Add gravity + floor body
3. On pointer events, use `Matter.Mouse` + `Matter.MouseConstraint` for drag
4. Render to a `<canvas>` element via `Matter.Render`

**Alternative (if Matter.js is too heavy):** CSS `animation` + `transform: rotate()` on SVG 404 digits — no physics, but creates a "falling" feel with near-zero bundle cost. Decision deferred to implementation.

---

## File Changes Summary

**New files:**
- `components/3d/Canvas3D.tsx`
- `components/3d/Lights.tsx`
- `components/3d/sudo/SudoScene.tsx`, `CRTMonitor.tsx`, `Keyboard.tsx`, `DeskSurface.tsx`, `Vinyl3D.tsx`, `TapiOnDesk.tsx`, `InteractiveObject.tsx`, `Tooltip3D.tsx`, `CameraController.tsx`
- `components/EasterEgg/ConsoleMessage.tsx`
- `components/EasterEgg/GlitchMode.tsx`
- `components/EasterEgg/TapiIdle.tsx`
- `components/EasterEgg/TapiCanvas.tsx`
- `components/play/ExperimentCard.tsx`
- `components/play/LivePreview.tsx`
- `components/play/MetaBar.tsx`
- `components/mdx/InteractivePlayground.tsx`
- `components/experiments/Vinyl/Vinyl.tsx`
- `hooks/useIdle.ts`
- `hooks/useIsDesktop.ts`
- `hooks/useKonamiCode.ts`
- `app/play/page.tsx`
- `app/play/[slug]/page.tsx`
- `app/sudo/page.tsx`
- `app/stream/page.tsx`
- `app/about/page.tsx`
- `app/not-found.tsx`
- `app/secret/page.tsx`
- `app/api/twitch/route.ts`
- `content/play/vinyl.mdx`
- `content/play/overlay.mdx`
- `content/play/discord-bot.mdx`
- `lib/analytics.ts`
- `public/models/tapi.glb`

**Modified files:**
- `app/layout.tsx` — add `<ConsoleMessage>`, `<TapiIdle>`, `<GlitchMode>`
- `lib/commands.ts` — add commands for `/play`, `/about`, `/stream`, `/sudo`, `tapi`, `secrets`
- `lib/content.ts` — add `getExperiments()` + `getExperiment(slug)` helpers
- `package.json` — add `three`, `@react-three/fiber`, `@react-three/drei`, `matter-js`, `@vercel/og`

**Environment variables (Vercel):**
```
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
DISCORD_GUILD_ID=
DISCORD_INVITE_URL=
```

## Data Flow Diagrams

### TAPI Idle Trigger Flow

```
App mounts
  │
  ▼
useIdle(30_000) — listens to mousemove/keydown/scroll
  │
  (30s no activity)
  │
  ▼
useIsDesktop() === true?
  │ No → return null (mobile never shows TAPI)
  │ Yes ↓
  ▼
TapiIdle renders → dynamic import fires
  → three.js chunk loads (~200KB, one-time)
  → TapiCanvas mounts with useGLTF('/models/tapi.glb')
  → Model renders at bottom-right corner
```

### /sudo Entry Flow

```
User types "sudo" in Command Palette
  │
  ▼
router.push('/sudo')
  │
  ▼
page.tsx: state = 'intro'
  display terminal loading lines
  ($ loading assets... → $ initializing... → $ ready.)
  │ (after 3s)
  ▼
state = 'scene'
  <SudoScene> renders via dynamic import
  Camera starts at default position
  Objects interactive
  │
  (ESC key)
  ▼
state = 'exit' → fade to black → router.push('/')
```

### /stream Data Flow

```
/stream page.tsx (Server Component)
  │
  ├─ fetch('/api/twitch') → { isLive, stream } (revalidates every 60s)
  │
  └─ Client component polls Discord widget.json every 60s
       → { presence_count, members }
```
