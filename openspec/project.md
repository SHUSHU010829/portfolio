# shuyuan.tw — OpenSpec Project Conventions

## Project Overview

Personal portfolio for Shu Yuan (SHUSHU). A terminal-first interactive portfolio built with Next.js. The site is the "self-introduction written in HTML/CSS/JS".

Domain: shuyuan.tw  
Repository: `/Users/chuangshuyuan/Desktop/portfolio`

## Core Philosophy

Three non-negotiable principles:

1. **Terminal-first** — All UI decisions start from terminal vocabulary (`$`, `>`, `//`, `cat`, `ls`, `whoami`).
2. **Show, not tell** — No boasting in text; use interaction to prove skill.
3. **Subtle over spectacular** — Low-key details over flashy animations.

## Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js App Router | `^15.1.6` |
| UI | React | `^19.0.0` |
| Language | TypeScript strict | latest |
| Styling | Tailwind CSS v4 (CSS-native config via `@theme`) | `^4.0.0` |
| Animation | Motion (formerly Framer Motion) | `^12.34.3` |
| Icons | Lucide React | `^0.468.0` |
| Command Palette | cmdk | to be installed |
| Theme | next-themes | to be installed |
| Content | MDX (`@next/mdx`) | to be installed |
| Deployment | Vercel | — |

## Design Token Conventions

All colors MUST be OKLCH. All visual values MUST be read from CSS variables — never hardcode hex/rgb directly in components.

### Color Naming

```
--color-bg              Surface (darkest)
--color-bg-elevated     Cards, modals
--color-bg-overlay      Tooltips, overlays
--color-border          Default borders
--color-border-hover    Hovered borders
--color-fg              Primary text
--color-fg-muted        Secondary text
--color-fg-subtle       Metadata, timestamps
--color-accent          Terminal green (interactive)
--color-accent-hover    Lighter accent (hover state)
--color-accent-dim      Accent at 15% opacity (backgrounds)
```

### Motion Tokens

```
--duration-instant  80ms
--duration-fast    120ms
--duration-base    160ms
--duration-slow    240ms
--duration-slowest 400ms
--ease-out-expo    cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring      cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Prohibited:** `ease-in-out`, `ease-in`, linear, any duration > 400ms (outside special easter eggs).

## Component Conventions

- **Naming:** `PascalCase.tsx` for components, `camelCase.ts` for hooks/utils
- **Declaration:** `export function ComponentName()` — never arrow function default export
- **Props:** `type ComponentNameProps = {...}` (not `interface`)
- **JSDoc:** Every prop MUST have JSDoc comment
- **Client:** Default to Server Component; add `'use client'` only when state/events needed
- **className:** Use `cn()` helper from `@/lib/utils`

## Directory Layout

```
/app                          Next.js App Router
  /(main)/page.tsx            Home page
  /work/page.tsx              Work list
  /work/[slug]/page.tsx       Case study detail
  /api/spotify/route.ts       Now Playing endpoint
/components
  /ui                         Lowest-level reusable (Button, Input)
  /terminal                   Terminal-themed primitives
  /command                    Command Palette components
  /sections                   Page-level sections (Hero, Experience, Projects)
  /layout                     Structural (Navbar, Footer)
  /mdx                        MDX custom components
/lib
  utils.ts                    cn() helper
  commands.ts                 Command Palette registry
/content
  /work/*.mdx                 Case study content
  experience.ts               Experience data source
  projects.ts                 Projects data source
/public
  /images                     Project images
  resume.pdf                  Downloadable CV
```

## Accessibility Requirements

Every component MUST pass:
- Keyboard navigable (Tab, Enter, Escape)
- Correct `aria-label` or visible text
- Visible focus state (`focus-visible:ring-2 focus-visible:ring-accent`)
- Color contrast ≥ WCAG AA (4.5:1 for text)
- Respects `prefers-reduced-motion`
- Correct semantic HTML

## Performance Budget

- Lighthouse Performance ≥ 90
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- First-load JS < 150KB gzipped
- 3D components: MUST use `dynamic(() => import(), { ssr: false })`

## Out-of-Scope (v2 Week 1-4)

The following are planned for Week 5+ and MUST NOT be referenced in current specs:
- `/play` experimental area
- `/about` page
- `/stream` page
- `/sudo` 3D easter egg
- TAPI 3D dog animation
- Konami code glitch
- 404 interactive page
- Blog / Guestbook
