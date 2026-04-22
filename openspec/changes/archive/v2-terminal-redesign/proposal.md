# Proposal: v2 Terminal Redesign (Week 1-4)

## Intent

shuyuan.tw is a personal portfolio that already has a strong terminal aesthetic (monospace fonts, `$ whoami`, `// Overview` comment dividers, `$ exit 0` footer). However, the current v1 implementation has several structural weaknesses that prevent it from being a competitive engineering portfolio:

1. **No navigable case studies.** Work experience only shows flat company lists with tags. There is no `/work/[slug]` page to communicate depth of contribution.
2. **No keyboard-driven navigation.** A terminal-themed site with no Command Palette (⌘K) is a missed opportunity — engineers expect CLI-level interaction.
3. **Design tokens are not OKLCH-based.** The current `@theme` block uses shadcn-style naming and hex colors, inconsistent with CLAUDE.md's OKLCH specification.
4. **Theme management uses a custom toggle** (View Transitions API + localStorage) instead of `next-themes`, causing SSR/hydration inconsistencies.
5. **All data is hardcoded inline in components**, blocking content-driven workflows.
6. **No MDX infrastructure**, blocking the case study content pipeline.
7. **Missing basic site infra**: no sitemap, no robots.txt, no OG images, no analytics.

The v2 redesign (Week 1-4) resolves all of the above while preserving shuyuan.tw's existing terminal identity.

## Scope

**In scope (Week 1-4):**
- Design token system migration (hex → OKLCH, shadcn naming → CLAUDE.md spec)
- Terminal UI primitive components (`TerminalPrompt`, `TerminalCursor`, `CommentDivider`, `CodeBlock`)
- Command Palette (⌘K / backtick trigger, cmdk-powered, mobile bottom-sheet variant)
- Home page upgrade: Hero with typing animation, expandable Experience with case study links, `ls`-style Projects, versioned Footer
- `/work` route: MDX pipeline, list page, `[slug]` detail template
- Three case study content files: Relianz, DailyVal, SoftMobile
- Site infrastructure: metadata, sitemap, robots.txt, OG image, Vercel Analytics + Speed Insights

**Out of scope (deferred to Week 5+):**
- `/play` experimental area
- `/about` and `/stream` pages
- `/sudo` 3D easter egg and all React Three Fiber work
- TAPI dog animation, Konami code, 404 interactive page
- Blog, guestbook, comment system

## What Changes

| Capability | Current State | Target State |
|------------|--------------|--------------|
| Design tokens | shadcn-style hex vars in `@theme` | OKLCH vars matching CLAUDE.md spec |
| Theming | Custom `animated-theme-toggler` | `next-themes` + preserved View Transitions animation |
| Terminal primitives | Scattered string literals + one `TypingAnimation` component | `components/terminal/` reusable library |
| Command Palette | None | ⌘K / backtick → cmdk palette, global, mobile-ready |
| Home Hero | `components/hero.tsx` exists but not rendered | Typing animation Hero mounted at top of home |
| Experience | Expandable inline component, no case study links | Expandable + `/work/[slug]` links, data in `content/experience.ts` |
| Projects | Single DailyVal expandable card | `$ ls -la` style list, data in `content/projects.ts` |
| `/work` route | Does not exist | MDX-powered list + detail pages |
| Case studies | None | Relianz, DailyVal, SoftMobile |
| SEO / infra | Minimal title only | Full metadata API, sitemap, OG image, analytics |
| Data source | All hardcoded inline in components | Extracted to `content/` and `lib/` |

## Impact

**User-facing:**
- Engineers and hiring managers can now explore case studies in depth via `/work/relianz`, `/work/dailyval`, `/work/softmobile`.
- Command Palette lets keyboard-native users navigate the entire site without mouse.
- Consistent visual language (OKLCH tokens, motion timing, type scale) across all pages.

**Technical:**
- Clean content pipeline: MDX case studies can be added independently of UI code.
- `openspec/specs/` will gain 6 capability spec files after this change is archived — providing a source of truth for all future v2.x patches.
- Passing `openspec validate --all --strict` at the end of this change ensures all Requirement+Scenario contracts are well-formed before implementation begins.

**Non-goals:**
- This proposal does NOT change any routing logic outside `app/work/**` and the root layout (Command Palette registration).
- This proposal does NOT introduce any 3D libraries or WebGL.
- Resume PDF content is out of scope — only `public/resume.pdf` file placement is required (empty file acceptable until SHUSHU provides the actual PDF).
