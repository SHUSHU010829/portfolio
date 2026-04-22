
## Pre-flight (Carry-over from v2-terminal-redesign)

### 0.1 Lighthouse Audit
- [ ] 0.1.1 Run Lighthouse on production deployment — all pages (`/`, `/work`, `/work/relianz`, `/work/dailyval`, `/work/softmobile`) must score Performance ≥ 90
- [ ] 0.1.2 Identify and fix any LCP > 2.5s issues (image optimisation, font preloading)
- [ ] 0.1.3 Identify and fix any CLS > 0.1 issues (explicit image dimensions, layout stability)
- [ ] 0.1.4 Verify first-load JS bundle < 150KB gzipped (use `pnpm build` + check `.next/analyze/`)
- [ ] 0.1.5 Confirm all Lighthouse categories ≥ 90 on preview deployment before proceeding to Week 5



## Week 5 — /play Experimental Area + Light Easter Eggs

### 5.1 /play Route and List Page
- [x] 5.1.1 Create `content/play/` directory with placeholder MDX files: `vinyl.mdx`, `overlay.mdx`, `discord-bot.mdx`
- [x] 5.1.2 Define `Experiment` TypeScript type in `lib/content.ts` (slug, title, subtitle, duration, year, stack, difficulty, status, previewMode)
- [x] 5.1.3 Add `getExperiments()` and `getExperiment(slug)` helpers to `lib/content.ts`
- [x] 5.1.4 Create `components/play/MetaBar.tsx` (difficulty badge, duration, stack tags)
- [x] 5.1.5 Create `components/play/LivePreview.tsx` with `mode` prop (`inline` | `iframe` | `video`) and placeholder state
- [x] 5.1.6 Create `components/play/ExperimentCard.tsx` with IntersectionObserver lazy-activation and mobile click-to-activate guard
- [x] 5.1.7 Create `app/play/page.tsx` with `$ cd /play` + `$ ls -la` hero and 2-col (desktop) / 1-col (mobile) grid
- [x] 5.1.8 Create `app/play/[slug]/page.tsx` with `generateStaticParams()`, `generateMetadata()`, and MDX body rendering
- [x] 5.1.9 Add `generateMetadata` for `/play` list page
- [x] 5.1.10 Add Command Palette entries: `cd /play`, `ls ./play` (in `lib/commands.ts` Navigation group)
- [x] 5.1.11 Verify `/play` accessible, 3 placeholder cards display, hover effect subtle (≤ 2px translate)
- [x] 5.1.12 Verify mobile layout correct at 375px viewport

### 5.2 Vinyl Experiment — First Live Preview
- [x] 5.2.1 Create `components/experiments/Vinyl/Vinyl.tsx` with props: `{ isPlaying: boolean, coverUrl?: string, size?: number }`
- [x] 5.2.2 Implement CSS-only rotation via `@keyframes` + `animation-play-state` toggle
- [x] 5.2.3 Create `components/mdx/InteractivePlayground.tsx` (slider/switch controls for props)
- [x] 5.2.4 Write `content/play/vinyl.mdx` with full frontmatter, LivePreview block, Why/How/Try it/Code sections
- [x] 5.2.5 Wire `<Vinyl isPlaying={true}>` into `/play` list page ExperimentCard (inline preview mode)
- [ ] 5.2.6 Verify `/play/vinyl` renders live vinyl + at least 1 interactive parameter (isPlaying toggle)
- [ ] 5.2.7 Verify vinyl animation respects `prefers-reduced-motion` (animation paused)

### 5.3 Easter Egg — Console Recruitment Message
- [x] 5.3.1 Create `components/EasterEgg/ConsoleMessage.tsx` (client component, useEffect with formatted console.log)
- [x] 5.3.2 Mount `<ConsoleMessage />` in `app/layout.tsx` (once, outside Suspense)
- [ ] 5.3.3 Verify message appears in DevTools Console on any page load
- [ ] 5.3.4 Verify colours match design tokens (`#00D97E` = accent, `#9a9a9a` = fg-muted)
- [ ] 5.3.5 Verify message tone is friendly and non-cringe

### 5.4 Easter Egg — Konami Code Glitch Mode
- [x] 5.4.1 Create `hooks/useKonamiCode.ts` with `useRef<string[]>` buffer + keydown listener
- [x] 5.4.2 Create `components/EasterEgg/GlitchMode.tsx` with SVG filter (`<feTurbulence>` + `<feDisplacementMap>`) + RGB split text-shadow
- [x] 5.4.3 Apply glitch class to `<html>` element for 10 seconds, auto-reset via `setTimeout`
- [x] 5.4.4 Add `useReducedMotion()` guard — if reduced motion, hook fires but GlitchMode renders null
- [x] 5.4.5 Log `> recovered.` to console after glitch ends
- [x] 5.4.6 Mount `<GlitchMode />` + `useKonamiCode` in `app/layout.tsx`
- [ ] 5.4.7 Verify trigger: ↑↑↓↓←→←→BA sequence
- [ ] 5.4.8 Verify auto-recovery after 10s
- [ ] 5.4.9 Verify no trigger on reduced-motion preference

### 5.5 Easter Egg — Logo Long-Press Liquify
- [x] 5.5.1 Wrap Hero title in `motion.div` with `onPointerDown` / `onPointerUp` handlers
- [x] 5.5.2 Use `useMotionValue(0)` + `useTransform` to map press duration (0→800ms) to blur (0→8px) and contrast (1→3)
- [x] 5.5.3 Apply spring animation back to 0 on `onPointerUp`
- [x] 5.5.4 Add 800ms `setTimeout` on `onPointerDown` before activating liquify (short-press = no effect)
- [ ] 5.5.5 Verify mobile long-press triggers (touch pointer events)
- [ ] 5.5.6 Verify short click has zero visual effect
- [ ] 5.5.7 Verify spring-back on release



## Week 6 — 3D Foundation + TAPI Idle Easter Egg

### 6.1 R3F Base Architecture
- [x] 6.1.1 Install packages: `pnpm add three @react-three/fiber @react-three/drei && pnpm add -D @types/three`
- [x] 6.1.2 Create `components/3d/Canvas3D.tsx` with `performance` prop and `gl: { powerPreference: 'low-power' }`
- [x] 6.1.3 Create `components/3d/Lights.tsx` with ambient + directional + rim light presets
- [ ] 6.1.4 Verify main bundle does NOT include `three` (check `.next/analyze/` or `pnpm next build --debug`)
- [ ] 6.1.5 Run Lighthouse on `/` after package install — Performance must remain ≥ 90

### 6.2 TAPI Model Acquisition and Preprocessing
- [ ] 6.2.1 Find CC0 low-poly dog model (Poly Pizza / Quaternius; target: < 3000 polygons, `.glb` format)
- [ ] 6.2.2 Compress with `gltfpack`: `npx gltfpack -i original.glb -o tapi.glb -cc` — target < 200KB
- [ ] 6.2.3 Place at `public/models/tapi.glb`
- [ ] 6.2.4 Add `useGLTF.preload('/models/tapi.glb')` call in `TapiCanvas.tsx`
- [x] 6.2.5 Fallback: if no suitable model found, implement box + sphere placeholder that can swap in later

### 6.3 TAPI Idle Easter Egg
- [x] 6.3.1 Create `hooks/useIdle.ts` — resets `setTimeout` on `mousemove`, `keydown`, `scroll`, `pointerdown`
- [x] 6.3.2 Create `hooks/useIsDesktop.ts` — `matchMedia('(min-width: 1024px) and (pointer: fine)')`
- [x] 6.3.3 Create `components/EasterEgg/TapiCanvas.tsx` — R3F scene with model + idle + look-at-cursor animation
- [x] 6.3.4 Create `components/EasterEgg/TapiIdle.tsx` — renders `dynamic(() => import('./TapiCanvas'))` only when idle + desktop
- [x] 6.3.5 Add tail-wag animation on idle trigger (keyframe or mixer)
- [x] 6.3.6 Add cursor-look-at on hover (mouse position → head rotation via `lerp` in `useFrame`)
- [x] 6.3.7 Add click feedback: jump animation + optional bark sound (muted by default, toggle via click)
- [x] 6.3.8 Add Command Palette hidden command `tapi` → force-trigger TAPI regardless of idle state
- [x] 6.3.9 Mount `<TapiIdle />` in `app/layout.tsx` (fixed bottom-right, `pointer-events-auto`)
- [x] 6.3.10 Verify: 30s idle → TAPI appears; any mousemove → resets timer
- [x] 6.3.11 Verify: Mobile (touch device) → never triggers
- [x] 6.3.12 Verify: `prefers-reduced-motion` → TAPI renders as static image, no animation
- [x] 6.3.13 Verify: three.js chunk NOT in main bundle

### 6.4 Easter Egg Discovery Page (Optional — skip if time-constrained)
- [x] 6.4.1 Create `app/secret/page.tsx` with `$ ls ./secrets` display of discovered/undiscovered eggs
- [x] 6.4.2 Use `localStorage` key `shuyuan_eggs` to persist discovered egg IDs
- [x] 6.4.3 Create `lib/easter-eggs.ts` registry with 4 confirmed eggs + placeholder slots
- [x] 6.4.4 Each egg-trigger writes its ID to localStorage (ConsoleMessage, Konami, Logo, TAPI)
- [x] 6.4.5 Add Command Palette command `secrets` → navigate to `/secret`
- [x] 6.4.6 Add console hint in `ConsoleMessage`: "hint: type 'secrets' to track your discoveries"



## Week 7 — /sudo 3D Room

### 7.1 Scene Concept and Entry UX
- [x] 7.1.1 Create `app/sudo/page.tsx` with `state: 'loading' | 'intro' | 'scene' | 'exit'` local state machine
- [x] 7.1.2 Implement intro terminal sequence: `$ sudo enter_space/` → loading lines → fade-in (total ≤ 3s)
- [x] 7.1.3 Add ESC key handler: `state → 'exit'` → fade to black → `router.push('/')`
- [x] 7.1.4 Add `[esc] exit` hint in scene top-left corner
- [x] 7.1.5 Add Command Palette hidden Easter command `sudo` → `router.push('/sudo')`
- [x] 7.1.6 Add console hint in `ConsoleMessage`: "try typing sudo in the command palette"

### 7.2 3D Scene Architecture
- [x] 7.2.1 Create `components/3d/sudo/SudoScene.tsx` — root R3F scene; dynamic imported in page.tsx
- [x] 7.2.2 Create `components/3d/sudo/DeskSurface.tsx` — low-poly floating plane with contact shadows
- [x] 7.2.3 Create `components/3d/sudo/InteractiveObject.tsx` — generic wrapper with hover scale (1.05) + pointer cursor + `<Tooltip3D>`
- [x] 7.2.4 Create `components/3d/sudo/Tooltip3D.tsx` — Drei `<Html>` floating label above hovered object
- [x] 7.2.5 Create `components/3d/sudo/CRTMonitor.tsx` — monitor mesh + Drei `<Html>` content panel (CRT content loop)
- [x] 7.2.6 Create `components/3d/sudo/Keyboard.tsx` — keyboard mesh; hover highlights individual keys
- [x] 7.2.7 Create `components/3d/sudo/Vinyl3D.tsx` — spinning vinyl record (reuses Vinyl CSS animation logic in 3D)
- [x] 7.2.8 Create `components/3d/sudo/TapiOnDesk.tsx` — TAPI model seated on desk (static pose)
- [x] 7.2.9 Add at least 8 interactive objects in SudoScene: CRT, keyboard, books, coffee, TAPI, vinyl, phone, notebook

### 7.3 Lighting and Atmosphere
- [x] 7.3.1 Add `<ambientLight intensity={0.2} />` for base fill
- [x] 7.3.2 Add `<pointLight>` at CRT screen position with `color="#00D97E"` to simulate screen glow
- [x] 7.3.3 Add `<directionalLight>` key light (right-top) at 0.4 intensity
- [x] 7.3.4 Add `<pointLight>` rim light (back-left) at 0.8 intensity with accent green
- [x] 7.3.5 Add `<fog>` with `args={['#0a0a0a', 8, 20]}` for depth
- [x] 7.3.6 Add Drei `<ContactShadows>` on desk surface
- [ ] 7.3.7 Optional: add `@react-three/postprocessing` Bloom on CRT light (only if Lighthouse still ≥ 90)

### 7.4 Camera Control
- [x] 7.4.1 Add Drei `<OrbitControls enablePan={false} minDistance={5} maxDistance={15} enableDamping dampingFactor={0.08} />`
- [x] 7.4.2 Set `minPolarAngle={Math.PI / 6}` and `maxPolarAngle={Math.PI / 2}`
- [ ] 7.4.3 Verify smooth damping on mouse drag
- [ ] 7.4.4 Verify scroll zoom within min/max distance

### 7.5 CRT Monitor Content
- [x] 7.5.1 Implement content array with 4 rotating screens: `whoami`, `passions.txt`, `things-i-love`, `contact --help`
- [x] 7.5.2 Rotate every 4s with fade transition (Drei `<Html>` + CSS opacity transition)
- [x] 7.5.3 Use `--font-mono` and `--color-accent` in CRT HTML content for consistency
- [x] 7.5.4 Add blinking cursor at end of each content block

### 7.6 Interactive Object Behaviors
- [x] 7.6.1 CRT click → cycle to next content screen immediately
- [x] 7.6.2 Keyboard hover → individual key geometries visually depress (translate-y -0.05)
- [x] 7.6.3 Coffee cup → hover shows steam particle effect (SVG or simple animated circle)
- [x] 7.6.4 Vinyl → already spinning; click toggles spin on/off
- [x] 7.6.5 TAPI on desk → click plays tail-wag animation
- [x] 7.6.6 Notebook click → console log "nice try." (door is closed to outsiders)
- [x] 7.6.7 Phone → hover shows DailyVal icon on screen; click navigates to `/work/dailyval`
- [x] 7.6.8 Books → click navigates to `/about#toolbox`

### 7.7 Performance and Mobile Strategy
- [ ] 7.7.1 Run Lighthouse on `/sudo` (target Performance ≥ 80; 3D pages get relaxed budget)
- [ ] 7.7.2 Verify main bundle (homepage) still scores ≥ 90 after all Week 7 changes
- [ ] 7.7.3 Test at ~30fps on older hardware (throttle CPU 4x in DevTools; scene must remain usable)
- [x] 7.7.4 Mobile fallback: detect `pointer: coarse` → render static SVG isometric desk illustration instead of 3D scene
- [x] 7.7.5 Loading UX: if model load takes > 2s, show terminal loading lines (`$ loading assets...`)



## Week 8 — /stream + /about + Launch

### 8.1 /stream Page — Twitch and Discord Integration
- [ ] 8.1.1 Set environment variables: `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `DISCORD_GUILD_ID`, `DISCORD_INVITE_URL` in Vercel project settings
- [x] 8.1.2 Create `app/api/twitch/route.ts` with App Access Token auth + `revalidate = 60`
- [x] 8.1.3 Create `app/stream/page.tsx` (Server Component) that fetches `/api/twitch`
- [x] 8.1.4 Implement LIVE status badge: pulsing `--color-accent` dot + "LIVE on Twitch" label when live
- [x] 8.1.5 Implement offline state: grey dot + "Offline" label
- [x] 8.1.6 Add Discord client component that polls `discord.com/api/guilds/{id}/widget.json` every 60s
- [x] 8.1.7 Display Discord online member count + avatar row (widget.json `members` array)
- [x] 8.1.8 Add error fallback for both APIs (static invite link, no member count)
- [x] 8.1.9 Add Command Palette entry: `cd /stream`
- [x] 8.1.10 Add `generateMetadata` for `/stream`
- [ ] 8.1.11 Verify LIVE badge shows correct status (test with mock data if not currently streaming)

### 8.2 /about Page
- [x] 8.2.1 Create `app/about/page.tsx` with sections: Story, Now, How I Work, Toolbox, Beyond Code, Timeline
- [x] 8.2.2 Write Story section: iOS → frontend transition, design+engineering parallel, perspective gained (first person, specific, 3-4 paragraphs)
- [x] 8.2.3 Implement Now section with `lastUpdated` timestamp and manual update workflow
- [x] 8.2.4 Implement Toolbox grid with logo icons — hover triggers subtle CSS 3D tilt (`perspective` + `rotateX/Y`)
- [x] 8.2.5 Implement Timeline: `2020 NCCU → 2022 SoftMobile → 2023 Relianz → 2025 DailyVal → 2026 ?` with scroll-driven subtle parallax
- [x] 8.2.6 Add Command Palette entry: `cd /about`
- [x] 8.2.7 Add `generateMetadata` for `/about`
- [ ] 8.2.8 Verify all sections have real content (no placeholder text in any section)
- [ ] 8.2.9 Verify `/about` links out to `/stream`, `/work`, `/play` where referenced

### 8.3 Interactive 404 Page
- [x] 8.3.1 Install Matter.js: `pnpm add matter-js && pnpm add -D @types/matter-js`
- [x] 8.3.2 Create `app/not-found.tsx` (replaces Next.js default 404)
- [x] 8.3.3 Implement 3 body objects (digit 4, digit 0, digit 4) with gravity + floor boundary
- [x] 8.3.4 Implement drag via `Matter.Mouse` + `Matter.MouseConstraint`
- [x] 8.3.5 Add `> page not found. maybe try:` text below canvas with `cd /` link
- [x] 8.3.6 Add fallback: if Matter.js fails to load, show static "404" text with same nav link
- [ ] 8.3.7 Verify any unknown route (e.g. `/not-real`) shows the 404 page
- [ ] 8.3.8 Verify 404 digits are draggable and bounce

### 8.4 SEO Completion
- [x] 8.4.1 Create `app/play/[slug]/opengraph-image.tsx` with ImageResponse terminal-themed OG (1200×630)
- [x] 8.4.2 Create `app/sudo/opengraph-image.tsx` — static terminal OG (desk scene screenshot or illustrated)
- [x] 8.4.3 Add `Person` JSON-LD schema to `app/layout.tsx`
- [x] 8.4.4 Add `Article` JSON-LD schema to `app/work/[slug]/page.tsx`
- [x] 8.4.5 Update `app/sitemap.ts` to include `/play`, `/about`, `/stream`, `/sudo`, `/secret`, all play slugs
- [ ] 8.4.6 Verify sitemap at `/sitemap.xml` includes all new routes

### 8.5 Analytics Events
- [x] 8.5.1 Create `lib/analytics.ts` with typed `events` object using `@vercel/analytics` `track()`
- [x] 8.5.2 Add `events.commandPaletteOpen()` in `CommandPalette.tsx` on open
- [x] 8.5.3 Add `events.easterEggTriggered('console')` in `ConsoleMessage.tsx`
- [x] 8.5.4 Add `events.easterEggTriggered('konami')` in `GlitchMode.tsx`
- [x] 8.5.5 Add `events.easterEggTriggered('logo-liquify')` in Hero long-press handler
- [x] 8.5.6 Add `events.easterEggTriggered('tapi-idle')` in `TapiIdle.tsx` on first render
- [x] 8.5.7 Add `events.sudoEntered()` in `app/sudo/page.tsx` on scene mount
- [ ] 8.5.8 Verify events appear in Vercel Analytics dashboard after test triggers

### 8.6 Pre-Launch Content Audit and Checklist
- [ ] 8.6.1 Audit: all pages have real content — no lorem ipsum, no empty placeholder sections
- [ ] 8.6.2 Audit: all external links (GitHub, LinkedIn, Twitch, Discord, email) are correct and functional
- [ ] 8.6.3 Audit: all images have `alt` attributes; all `<section>` elements have `aria-label`
- [ ] 8.6.4 Audit: `/work`, `/play` each have at least 3 published items
- [ ] 8.6.5 Audit: Footer `$ exit 0` text present; version/timestamp correct
- [x] 8.6.6 Technical: `pnpm build` completes without TypeScript errors or warnings
- [ ] 8.6.7 Technical: no `console.log` debug statements (grep pass)
- [ ] 8.6.8 Technical: Lighthouse Performance ≥ 90 on `/`, `/work`, `/about`, `/stream` (3D pages exempt at ≥ 80)
- [ ] 8.6.9 Technical: mobile layout correct at 375px on all pages (no horizontal overflow)
- [ ] 8.6.10 Technical: keyboard navigation completes main flows (Tab → ⌘K → navigate → ESC)
- [ ] 8.6.11 Technical: all 4 easter eggs can be triggered (manual QA pass)
- [ ] 8.6.12 Verify Vercel environment variables are set for production (`TWITCH_CLIENT_ID`, etc.)
- [ ] 8.6.13 Prepare launch copy: Twitter/Threads (EN + ZH), Discord announcement
- [ ] 8.6.14 Archive this OpenSpec change: `openspec archive v2-play-3d-launch`
