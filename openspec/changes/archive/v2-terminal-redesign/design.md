# Design: v2 Terminal Redesign (Week 1-4)

## Technical Approach

This redesign is an **in-place upgrade** of an existing Next.js 15 / React 19 codebase. No major framework migration is required — App Router is already in use. The changes are additive (new directories, new components, new routes) with targeted replacements (token naming, theme manager, data source extraction).

All implementation follows a dependency order:
1. **Design tokens first** (everything else references variables)
2. **Terminal primitives** (consumed by all sections)
3. **Theme manager** (affects all pages)
4. **Command Palette** (global, in root layout)
5. **Home page sections** (Hero, Experience, Projects, Footer)
6. **MDX pipeline + `/work` route**
7. **Site infra** (metadata, analytics, SEO)

## Architecture Decisions

### Decision: cmdk for Command Palette

**Why cmdk, not Radix Dialog + custom fuzzy search:**
- cmdk is the industry-standard for this pattern (shadcn/ui uses it, Vercel uses it)
- Built-in fuzzy matching saves ~200 lines of custom scoring code
- Headless + accessible by default (ARIA dialog, keyboard navigation)
- Tiny bundle (~5KB)

**How the mobile sheet variant works:**
- On `< 768px`: wrap cmdk's `<Command>` in a bottom-anchored `<div>` with slide-up animation (Motion), not Vaul
- Vaul was considered but adds 8KB and the slide-up can be reproduced with 10 lines of Motion
- `matchMedia('(pointer: coarse)')` is used alongside viewport width to detect mobile intent

**File structure:**
```
components/command/
  CommandPalette.tsx     "use client" — root mount, keyboard listener
  CommandItem.tsx        Server Component
  CommandGroup.tsx       Server Component
  useCommandPalette.ts   Zustand store or React context for open state
lib/commands.ts          Static registry (no runtime fetching)
```

### Decision: OKLCH Color Token Migration Strategy

**Why OKLCH over HSL:**
- Perceptually uniform — adjusting lightness does not shift perceived hue
- Browser support: all modern browsers support `oklch()` natively
- Matches CLAUDE.md specification exactly

**Migration approach (non-breaking):**
1. Add new `--color-bg`, `--color-fg`, etc. variables to `:root` in `app/globals.css` using OKLCH values
2. Update Tailwind v4 `@theme` block to expose the new names as utility classes (`text-fg`, `bg-bg-elevated`)
3. Update existing components to use new class names (find/replace pass)
4. Remove old `--color-background`, `--color-foreground`, etc. shadcn-style variables once all references are migrated
5. Run `pnpm dev` and verify no broken styles

**Risk:** The old variable names (`--color-background`) may be referenced in third-party components if any are installed later. Mitigation: document the naming contract in `openspec/project.md`.

### Decision: next-themes + Preserved View Transitions

**Why next-themes over the current custom toggle:**
- Current `animated-theme-toggler.tsx` writes directly to `document.documentElement.style.colorScheme` — this is non-standard and conflicts with `next-themes`'s `ThemeProvider`
- `next-themes` is SSR-safe: it uses a `<script>` blocking tag to apply the theme before first paint, eliminating FOUT
- `next-themes` integrates with CSS `[data-theme]` attribute selectors naturally

**How to preserve View Transitions animation:**
```tsx
// ThemeToggle.tsx ("use client")
import { useTheme } from 'next-themes'

function toggleWithViewTransition(setTheme: (t: string) => void, next: string) {
  if (!document.startViewTransition) {
    setTheme(next)
    return
  }
  document.startViewTransition(() => setTheme(next))
}
```
The `document.startViewTransition` wrapper fires around the `setTheme` call. The View Transitions CSS (clip-path animation) in `app/globals.css` is preserved. Feature-detected at runtime — no error in unsupported browsers.

**ThemeProvider placement:**
- Wrap `<html>` children in `app/layout.tsx` with `<ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange={false}>`
- The `attribute="data-theme"` aligns with the CSS `[data-theme="light"]` selectors defined in design tokens

### Decision: MDX Pipeline with @next/mdx

**Why `@next/mdx` over `next-mdx-remote` or `contentlayer`:**
- `@next/mdx` is the officially supported Next.js integration — no risk of incompatibility with Next.js 15
- `next-mdx-remote` requires runtime serialization — adds complexity for a static portfolio
- `contentlayer` is no longer maintained

**Content reading strategy:**
```ts
// lib/content.ts
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function getCaseStudies() {
  const dir = path.join(process.cwd(), 'content/work')
  const files = await fs.readdir(dir)
  const studies = await Promise.all(
    files.filter(f => f.endsWith('.mdx')).map(async f => {
      const raw = await fs.readFile(path.join(dir, f), 'utf8')
      const { data } = matter(raw)
      return data as CaseStudy
    })
  )
  return studies
    .filter(s => s.status === 'published')
    .sort((a, b) => a.order - b.order)
}
```

**Dynamic route static generation:**
```ts
// app/work/[slug]/page.tsx
export async function generateStaticParams() {
  const studies = await getCaseStudies()
  return studies.map(s => ({ slug: s.slug }))
}
```

### Decision: Data Extraction from Components

**Current problem:** `components/experience.tsx` (lines 12-61) and `components/projects.tsx` (lines 10-31) embed content data as TypeScript arrays inline. This couples content editing to component code changes.

**Solution:**
- `content/experience.ts` — `export const experience: Experience[]`
- `content/projects.ts` — `export const projects: Project[]`
- Components import from these files; no functional change to component logic

**Why not MDX for experience/projects:** They are structured data (typed fields), not prose. TypeScript arrays give better type safety and are simpler to validate.

### Decision: lib/ Utilities

**Create `lib/utils.ts` with `cn()` helper** (currently missing from the codebase):
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
This requires installing `clsx` and `tailwind-merge` (`pnpm add clsx tailwind-merge`).

### Decision: Build-Time Env Injection for Footer

To surface `version` and `lastUpdated` in the footer without runtime API calls:
```ts
// next.config.ts
const config: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_VERSION: process.env.npm_package_version ?? '0.0.0',
  }
}
```
The Footer reads `process.env.NEXT_PUBLIC_VERSION` and `NEXT_PUBLIC_BUILD_TIME` — both resolved at build time, zero runtime overhead.

## Data Flow Diagrams

### Command Palette State Flow

```
User presses ⌘K / backtick
        │
        ▼
useCommandPalette (context/zustand)
  setOpen(true)
        │
        ▼
CommandPalette.tsx mounts cmdk <Command.Dialog>
  reads lib/commands.ts
  renders CommandGroup + CommandItem tree
        │
        ▼
User selects command
  command.action() fires
  setOpen(false)
```

### MDX Content Flow

```
content/work/*.mdx
        │
        ▼
lib/content.ts (fs.readdir + gray-matter)
  getCaseStudies() → CaseStudy[]
        │
   ┌────┴────┐
   ▼         ▼
app/work/   app/work/[slug]/
page.tsx     page.tsx
(list)       (detail: import MDX component)
```

### Theme Flow

```
app/layout.tsx
  <ThemeProvider attribute="data-theme" defaultTheme="dark">
        │
        ▼
Navbar → ThemeToggle ("use client")
  useTheme() → { theme, setTheme }
  onClick: document.startViewTransition? → setTheme(next)
        │
        ▼
<html data-theme="light"|"dark">
  CSS [data-theme="light"] { --color-bg: oklch(0.99 0 0); ... }
```

## File Changes Summary

**New files:**
- `openspec/` directory (complete)
- `lib/utils.ts`, `lib/commands.ts`, `lib/content.ts`
- `content/experience.ts`, `content/projects.ts`
- `content/work/relianz.mdx`, `content/work/dailyval.mdx`, `content/work/softmobile.mdx`
- `components/terminal/TerminalPrompt.tsx`, `TerminalCursor.tsx`, `TypeAnimation.tsx`, `CommentDivider.tsx`, `CodeBlock.tsx`
- `components/command/CommandPalette.tsx`, `CommandItem.tsx`, `CommandGroup.tsx`, `useCommandPalette.ts`
- `app/work/page.tsx`, `app/work/[slug]/page.tsx`
- `app/sitemap.ts`, `app/robots.ts`
- `mdx-components.tsx`
- `public/resume.pdf` (placeholder until actual PDF provided)
- `public/og-image.png`

**Modified files:**
- `app/globals.css` — OKLCH token migration, add `[data-theme="light"]` block
- `app/layout.tsx` — add ThemeProvider, metadata, Analytics, Speed Insights, CommandPalette
- `app/page.tsx` — mount Hero, update Experience/Projects sections
- `components/experience.tsx` — read from `content/experience.ts`, add `/work/[slug]` links
- `components/projects.tsx` — replace card layout with ls-style, read from `content/projects.ts`
- `components/footer.tsx` — add version/timestamp
- `next.config.ts` — add MDX support, env injection, `NEXT_PUBLIC_BUILD_TIME`
- `package.json` — add `cmdk`, `next-themes`, `@next/mdx`, `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `clsx`, `tailwind-merge`, `@vercel/analytics`, `@vercel/speed-insights`
