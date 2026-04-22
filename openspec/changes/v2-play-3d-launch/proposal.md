# Proposal: v2 Play Area, 3D Easter Eggs & Launch (Week 5-8)

## Intent

Week 1-4 delivered a **professional engineering portfolio** — Command Palette, case studies, terminal aesthetics, and solid SEO infrastructure. Week 5-8 upgrades it to something **people actively share**: a playground that proves technical curiosity, hidden layers that reward exploration, and a 3D space that lives in your browser.

The strategic shift:

> Week 1-4 makes hiring managers want to meet you.  
> Week 5-8 makes peers want to share you.

Every feature in this phase has an explicit **social transmission intent** — a screenshot worth posting, an easter egg worth describing to a friend, or a depth that makes a senior engineer say "okay, this person is serious."

## Scope

**In scope (Week 5-8):**

- **Lighthouse pre-flight** — carry-over from v2-terminal-redesign; all pages must hit Performance ≥ 90 before the new features are layered on
- **`/play` experimental area** — list page + detail template; first experiment: vinyl component
- **MDX extensions for `/play`** — `<LivePreview>`, `<InteractivePlayground>` custom components
- **Light easter eggs** — console.log recruitment message, Konami code glitch mode, logo long-press liquify
- **React Three Fiber base architecture** — `<Canvas3D>` wrapper, dynamic import conventions, shared lights
- **TAPI idle easter egg** — 30s idle → 3D dog appears at bottom-right (desktop only)
- **`/sudo` 3D room** — interactive desk scene with 8 clickable objects, mouse-driven camera, CRT content loop, enter/exit flow
- **`/stream` page** — Twitch live status + Discord widget integration via server-side API routes
- **`/about` page** — narrative bio, Now section, Toolbox grid, Timeline
- **Interactive 404** — draggable 404 digits with 2D physics (Matter.js)
- **Easter egg discovery page `/secret`** — localStorage-tracked discovered eggs
- **Analytics events** — track Command Palette usage, easter egg triggers, `/sudo` entries
- **Pre-launch checklist** — content audit, Lighthouse on all pages, launch copy

**Out of scope (Week 9+):**
- Blog system and first article
- Guestbook (NextAuth + database)
- i18n
- Second easter egg batch (`rm -rf /`, advanced ⌘K features)
- RSS feed / Newsletter

## What Changes

| Capability | Current State (end of Week 4) | Target State (end of Week 8) |
|------------|------------------------------|------------------------------|
| Lighthouse Performance | Unknown (not yet measured) | ≥ 90 on all pages |
| `/play` route | Does not exist | Live preview cards + MDX detail pages |
| Easter eggs | None | 4 confirmed: console, Konami, logo liquify, TAPI idle |
| 3D in bundle | None | three.js in isolated async chunk, never in main bundle |
| `/sudo` route | Does not exist | Interactive 3D desk scene, mouse-driven camera |
| `/stream` route | Does not exist | Twitch LIVE status + Discord member count |
| `/about` route | Does not exist | Narrative bio + Now + Toolbox + Timeline |
| 404 page | Next.js default | Draggable physics-based 404 digits |
| `/secret` route | Does not exist | Easter egg tracker (localStorage) |
| Analytics events | Page views only | Command Palette + easter egg + sudo entry events |

## Impact

**User-facing:**
- `/play` gives developers a reason to stay — live experiments they can interact with
- Easter eggs create conversation: "have you found the dog yet?"
- `/sudo` is a showcase in itself — a 3D room that proves frontend depth beyond the portfolio copy
- `/stream` + `/about` add the human dimension — who is this person outside of work?

**Technical:**
- First use of React Three Fiber — establishes conventions for all future 3D work (dynamic imports, `<Canvas3D>` wrapper, performance budgets)
- Twitch + Discord API integration — first server-side API routes beyond OG image generation
- Matter.js physics — lightweight alternative to R3F for 2D-only interactions
- All 3D assets (models) must be < 200KB — enforced at build time

**Non-goals:**
- This proposal does NOT change the existing `/work` case study pipeline
- This proposal does NOT introduce any database or authentication
- This proposal does NOT touch the Command Palette architecture (only adds new commands to the existing registry)
