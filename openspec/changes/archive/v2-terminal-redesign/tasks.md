
## Week 1 — Foundation + Command Palette

### 1.1 Project Structure & Package Audit
- [x] 1.1.1 Confirm Next.js ≥ 15 and App Router in use (✓ already confirmed: 15.1.6)
- [x] 1.1.2 Install missing packages: `pnpm add cmdk next-themes @next/mdx @mdx-js/loader @mdx-js/react gray-matter remark-gfm rehype-slug rehype-autolink-headings clsx tailwind-merge @vercel/analytics @vercel/speed-insights`
- [x] 1.1.3 Install MDX type package: `pnpm add -D @types/mdx`
- [x] 1.1.4 Create `lib/` directory with `utils.ts` (`cn()` helper)
- [x] 1.1.5 Create `content/` directory with `content/work/` subdirectory
- [x] 1.1.6 Create `components/terminal/` directory
- [x] 1.1.7 Create `components/command/` directory
- [x] 1.1.8 Create `components/sections/` directory (move existing section components here)
- [x] 1.1.9 Verify `pnpm dev` starts without errors after restructure

### 1.2 Design Token Migration
- [x] 1.2.1 Add new OKLCH `--color-*` variables to `app/globals.css` `:root` block (keep old vars temporarily)
- [x] 1.2.2 Add `[data-theme="light"]` block with OKLCH light-mode overrides
- [x] 1.2.3 Add motion tokens: `--duration-fast`, `--duration-base`, `--duration-slow`, `--duration-slowest`, `--ease-out-expo`, `--ease-spring`
- [x] 1.2.4 Add spacing tokens: `--space-1` through `--space-32`
- [x] 1.2.5 Add typography tokens: `--font-mono`, `--font-sans`, `--text-xs` through `--text-3xl`
- [x] 1.2.6 Add Geist Mono to `app/layout.tsx` via `next/font/google` alongside existing JetBrains Mono
- [x] 1.2.7 Expose new tokens via Tailwind v4 `@theme` block (e.g., `bg: var(--color-bg)`, `text-fg: var(--color-fg)`, etc.)
- [x] 1.2.8 Add `prefers-reduced-motion` global CSS rule
- [x] 1.2.9 Migrate existing components to use new token class names (find/replace pass)
- [x] 1.2.10 Remove old shadcn-style variable names after migration is confirmed working

### 1.3 next-themes Integration
- [x] 1.3.1 Install `next-themes` (`pnpm add next-themes`)
- [x] 1.3.2 Create `ThemeProvider` wrapper component at `components/layout/ThemeProvider.tsx`
- [x] 1.3.3 Add `<ThemeProvider attribute="data-theme" defaultTheme="dark">` to `app/layout.tsx`
- [x] 1.3.4 Refactor `components/ui/animated-theme-toggler.tsx` to use `useTheme()` from `next-themes`
- [x] 1.3.5 Preserve View Transitions API animation by wrapping `setTheme()` in `document.startViewTransition`
- [x] 1.3.6 Test theme persistence across page reloads
- [x] 1.3.7 Test that no FOUT occurs on initial page load in dark mode

### 1.4 Terminal UI Primitives
- [x] 1.4.1 Create `components/terminal/TerminalPrompt.tsx` (symbol + children + optional cursor, Server Component)
- [x] 1.4.2 Create `components/terminal/TerminalCursor.tsx` (blink + reduced-motion support, Server Component)
- [x] 1.4.3 Move `components/ui/typing-animation.tsx` → `components/terminal/TypeAnimation.tsx` and add `onComplete` prop if missing
- [x] 1.4.4 Create `components/terminal/CommentDivider.tsx` (`// <label>`, Server Component)
- [x] 1.4.5 Create `components/terminal/CodeBlock.tsx` (language prop + syntax tokens, Server Component)
- [x] 1.4.6 Create `components/terminal/index.ts` barrel export

### 1.5 Command Palette
- [x] 1.5.1 Create `lib/commands.ts` with full command registry (Navigation / Actions / External / Easter / System)
- [x] 1.5.2 Create `components/command/useCommandPalette.ts` (open state hook with context or zustand)
- [x] 1.5.3 Create `components/command/CommandPalette.tsx` ("use client", cmdk integration, keyboard listener)
- [x] 1.5.4 Create `components/command/CommandItem.tsx` with hover `>` indicator
- [x] 1.5.5 Create `components/command/CommandGroup.tsx` with group header
- [x] 1.5.6 Implement backtick trigger with input-focus guard
- [x] 1.5.7 Implement mobile bottom-sheet variant (< 768px with Motion slide-up)
- [x] 1.5.8 Mount `<CommandPalette>` in `app/layout.tsx`
- [x] 1.5.9 Test: ⌘K opens, ESC closes, backtick outside input opens
- [x] 1.5.10 Test: fuzzy search "wrk" → "cd /work" appears
- [x] 1.5.11 Test: "sudo" search shows hidden Easter command



## Week 2 — Home Page Upgrade

### 2.1 Hero Section
- [x] 2.1.1 Enhance `components/hero.tsx` (or create `components/sections/Hero.tsx`) with typing animation on `shu/dev`
- [x] 2.1.2 Set typing animation total duration ≤ 1200ms
- [x] 2.1.3 Add persistent `<TerminalCursor>` after title completes
- [x] 2.1.4 Add click-to-replay handler on title
- [x] 2.1.5 Create `NoiseBackground` component with SVG filter noise at `opacity-[0.015]`
- [x] 2.1.6 Add CLI hint (`Press \` to open CLI`) below Hero, delayed 2s fade-in
- [x] 2.1.7 Mount `<Hero>` in `app/page.tsx` at the top of the page (currently not mounted)
- [x] 2.1.8 Verify `public/resume.pdf` exists (create placeholder if not); confirm `[$ cat resume.pdf_]` button works

### 2.2 Experience Section Enhancement
- [x] 2.2.1 Create `content/experience.ts` with typed `Experience[]` array, migrate data from `components/experience.tsx:12-61`
- [x] 2.2.2 Update `components/experience.tsx` to import from `content/experience.ts`
- [x] 2.2.3 Add `workSlug?: string` field to `Experience` type and data entries
- [x] 2.2.4 Render "→ Read full case: /work/[slug]" link in expanded detail for entries that have a `workSlug`
- [x] 2.2.5 Verify multiple entries can be expanded simultaneously (remove single-expand constraint if present)
- [x] 2.2.6 Test expand/collapse animation ≤ 160ms

### 2.3 Projects Section — ls-style
- [x] 2.3.1 Create `content/projects.ts` with typed `Project[]` array, migrate DailyVal data from `components/projects.tsx:10-31`
- [x] 2.3.2 Add more projects to `content/projects.ts`: vinyl-component, livestream-overlay, threads-discord-bot, design-system-relianz
- [x] 2.3.3 Rewrite `components/projects.tsx` to render `$ ls -la ./projects` listing style
- [x] 2.3.4 Implement row hover: full-row `--color-accent-dim` highlight + `>` left indicator
- [x] 2.3.5 Implement mobile card fallback via responsive CSS (< 768px)
- [x] 2.3.6 Ensure entire row is clickable and navigates to `project.href`

### 2.4 Footer Version Info
- [x] 2.4.1 Add `NEXT_PUBLIC_VERSION` and `NEXT_PUBLIC_BUILD_TIME` env injection to `next.config.ts`
- [x] 2.4.2 Update `components/footer.tsx` to display `v<version>` and last-updated timestamp
- [x] 2.4.3 Verify `$ exit 0` text is preserved



## Week 3 — /work Case Studies

### 3.1 MDX Pipeline Setup
- [x] 3.1.1 Update `next.config.ts` to enable MDX support via `withMDX()`
- [x] 3.1.2 Create `mdx-components.tsx` at project root with custom MDX component map
- [x] 3.1.3 Create `lib/content.ts` with `getCaseStudies()` and `getCaseStudy(slug)` helpers
- [x] 3.1.4 Define `CaseStudy` TypeScript type matching frontmatter schema
- [x] 3.1.5 Create `components/mdx/QuickFacts.tsx`
- [x] 3.1.6 Create `components/mdx/Highlight.tsx`
- [x] 3.1.7 Create `components/mdx/Callout.tsx` (insight / warning / tip variants)
- [x] 3.1.8 Create `components/mdx/Diagram.tsx` (passthrough container for now)
- [x] 3.1.9 Register all MDX components in `mdx-components.tsx`

### 3.2 /work List Page
- [x] 3.2.1 Create `app/work/page.tsx` with `$ ls ./case-studies` hero
- [x] 3.2.2 Implement 2-column grid (desktop) / 1-column (mobile) card layout
- [x] 3.2.3 Read and sort published case studies via `getCaseStudies()`
- [x] 3.2.4 Render each case study card with cover image, title, subtitle, role, year, stack tags
- [x] 3.2.5 Add `generateMetadata` for `/work` list page

### 3.3 /work/[slug] Detail Template
- [x] 3.3.1 Create `app/work/[slug]/page.tsx` with dynamic route
- [x] 3.3.2 Implement `generateStaticParams()` from published case studies
- [x] 3.3.3 Implement `generateMetadata()` for SEO and OG
- [x] 3.3.4 Render terminal breadcrumb `/ > work > [slug]`
- [x] 3.3.5 Render `$ cat [slug].md` section header using `TerminalPrompt`
- [x] 3.3.6 Render MDX body content
- [x] 3.3.7 Render closing `$ _` cursor line at bottom
- [x] 3.3.8 Implement Prev / Next navigation between case studies
- [x] 3.3.9 Call `notFound()` for unknown slugs

### 3.4 Relianz Case Study Content
- [x] 3.4.1 Create `content/work/relianz.mdx` with valid frontmatter
- [x] 3.4.2 Write Context section (why the design system, dual-brand challenge, Revolut architecture inspiration)
- [x] 3.4.3 Write Process section (research → token design → component library → documentation)
- [x] 3.4.4 Write Technical Highlights section (color token extraction, Tailwind config, Storybook setup)
- [x] 3.4.5 Write Results section (component count, product coverage, time savings estimate)
- [x] 3.4.6 Write Reflection section (what would be done differently, next steps)
- [x] 3.4.7 Add cover image at `public/images/relianz/cover.png` (use existing `public/relianz.png` as source)
- [x] 3.4.8 Verify `/work/relianz` renders correctly



## Week 4 — Polish + Remaining Cases + Launch

### 4.1 DailyVal Case Study Content
- [x] 4.1.1 Create `content/work/dailyval.mdx` with valid frontmatter
- [x] 4.1.2 Write Context section (Valorant community app, contractor role)
- [x] 4.1.3 Write Process section (iOS + Next.js + CloudKit architecture)
- [x] 4.1.4 Write Technical Highlights section (security vulnerability discovery + fix)
- [x] 4.1.5 Write Results + Reflection sections
- [x] 4.1.6 Add cover image at `public/images/dailyval/cover.png`

### 4.2 SoftMobile Case Study Content
- [x] 4.2.1 Create `content/work/softmobile.mdx` with valid frontmatter
- [x] 4.2.2 Write Context section (internship setup, team structure)
- [x] 4.2.3 Write Process + Technical Highlights sections (RN ↔ web React differences)
- [x] 4.2.4 Write Results + Reflection sections
- [x] 4.2.5 Add cover image at `public/images/softmobile/cover.png` (use existing `public/softmobile.png`)

### 4.3 SEO & Metadata
- [x] 4.3.1 Set root `metadata` in `app/layout.tsx` (title template, description, OG, Twitter Card)
- [x] 4.3.2 Implement `app/opengraph-image.tsx` with Next.js ImageResponse — auto-generated terminal-themed OG image (1200×630px, no static file needed)
- [x] 4.3.3 Create `app/sitemap.ts` (includes `/`, `/work`, all published slugs)
- [x] 4.3.4 Create `app/robots.ts` (allow all except `/api/`)
- [x] 4.3.5 Verify OG preview with [opengraph.xyz](https://www.opengraph.xyz) or equivalent
- [x] 4.3.6 Verify sitemap accessible at `/sitemap.xml`

### 4.4 Analytics & Performance
- [x] 4.4.1 Add `<Analytics>` from `@vercel/analytics/react` to `app/layout.tsx`
- [x] 4.4.2 Add `<SpeedInsights>` from `@vercel/speed-insights/next` to `app/layout.tsx`
- [~] 4.4.3 Run Lighthouse on localhost — target Performance ≥ 90 before deploy → **migrated to v2-play-3d-launch task 0.1**
- [x] 4.4.4 Check CLS: confirm all images use `next/image` with explicit dimensions
- [x] 4.4.5 Check INP: no heavy synchronous operations on interaction handlers

### 4.5 Integration Testing
- [x] 4.5.1 All pages accessible: `/`, `/work`, `/work/relianz`, `/work/dailyval`, `/work/softmobile`
- [x] 4.5.2 Command Palette works on every page (⌘K, backtick, ESC)
- [x] 4.5.3 Dark / Light theme toggle works, persists across reload, no FOUT
- [x] 4.5.4 Mobile layout correct on all pages (375px viewport test)
- [x] 4.5.5 Keyboard navigation completes main flows (Tab → Command Palette → Enter → navigate)
- [x] 4.5.6 All external links in Command Palette open correctly
- [x] 4.5.7 `/resume.pdf` downloads successfully
- [x] 4.5.8 404 page shows for unknown routes (e.g., `/work/nonexistent`)
- [x] 4.5.9 Console is clean: no errors or warnings in production build

### 4.6 Pre-Launch Checklist
- [x] 4.6.1 Remove all `console.log` debug statements
- [x] 4.6.2 Remove development-only comments from production code
- [x] 4.6.3 Verify `.env.local` variables are set in Vercel project settings
- [x] 4.6.4 `pnpm build` completes without errors
- [~] 4.6.5 Lighthouse all categories ≥ 90 on preview deployment → **migrated to v2-play-3d-launch task 0.1**
- [x] 4.6.6 Confirm current shuyuan.tw v1 is backed up (Vercel keeps previous deployment)
- [x] 4.6.7 Archive this OpenSpec change: `openspec archive v2-terminal-redesign`

