# Delta for Work Case Studies

## ADDED Requirements

### Requirement: MDX Pipeline
The system SHALL configure `@next/mdx` for the Next.js application and support MDX content files at `content/work/*.mdx`. The pipeline MUST include `gray-matter` for frontmatter parsing, `remark-gfm` for GitHub-Flavored Markdown, `rehype-slug` for heading IDs, and `rehype-autolink-headings` for anchor links.

Required frontmatter fields per case study MDX file:

```
slug: string           (URL segment, e.g. "relianz")
title: string          (display title)
subtitle: string       (one-line description)
role: string           (job title / role on project)
period: string         (e.g. "06.2024 – 10.2024")
team: string[]         (e.g. ["PM × 1", "Backend × 2"])
stack: string[]        (e.g. ["React", "TypeScript", "Figma"])
cover: string          (path to cover image, e.g. "/images/relianz/cover.png")
status: "published" | "draft"
order: number          (ascending sort order in the list page)
```

#### Scenario: MDX file is parsed
- GIVEN `content/work/relianz.mdx` exists with valid frontmatter
- WHEN the Next.js build processes the content directory
- THEN all frontmatter fields are extracted without error
- AND the MDX body is compiled into a React component tree

#### Scenario: GFM tables render
- GIVEN a case study MDX file contains a Markdown table
- WHEN the page renders
- THEN the table is displayed with correct `<table>`, `<thead>`, `<tbody>` elements
- AND no raw pipe characters are visible

#### Scenario: Heading slugs are generated
- GIVEN a case study MDX file with `## Technical Highlights` heading
- WHEN the page renders
- THEN the heading element has `id="technical-highlights"`
- AND the rehype-autolink-headings plugin adds an anchor `#` link next to it

#### Scenario: Missing required frontmatter field fails build
- GIVEN a case study MDX file is missing the `title` field
- WHEN the Next.js build runs
- THEN a build error is thrown indicating the missing field
- AND the site does not silently deploy with an undefined title

### Requirement: /work List Page
The system SHALL create `app/work/page.tsx` that renders a list of all published case studies. The page MUST:
- Display a terminal-style hero with `$ ls ./case-studies`
- Show case studies in a 2-column grid on desktop (≥ 768px) and 1-column on mobile
- Sort entries by frontmatter `order` ascending
- Only show entries with `status: "published"`
- Each card shows: cover image, title, subtitle, role, year, and stack tags

#### Scenario: List page renders published studies
- GIVEN three MDX files: relianz (published, order 1), dailyval (published, order 2), softmobile (published, order 3)
- WHEN the user visits `/work`
- THEN all three are displayed in order: relianz, dailyval, softmobile

#### Scenario: Draft studies are hidden
- GIVEN a case study MDX file with `status: "draft"`
- WHEN the user visits `/work`
- THEN that case study does NOT appear in the list
- AND no error or empty slot is shown in its place

#### Scenario: Mobile single column
- GIVEN a viewport width of 375px
- WHEN the user visits `/work`
- THEN case study cards stack in a single column

#### Scenario: Card navigates to detail
- GIVEN the user views the Relianz card on `/work`
- WHEN the user clicks the card
- THEN the browser navigates to `/work/relianz`

### Requirement: /work/[slug] Detail Page Template
The system SHALL create `app/work/[slug]/page.tsx` as a dynamic route that renders an individual case study. The layout MUST include:
- Terminal breadcrumb: `/ > work > [slug]`
- Section header: `$ cat [slug].md` using TerminalPrompt
- A horizontal divider line
- The MDX body content with five standard sections: Context, Process, Technical Highlights, Results, Reflection
- A closing cursor line: `$ _`
- Previous / Next case navigation at the bottom

If the slug does not match any published case study, the page MUST return a 404 (`notFound()` in Next.js).

#### Scenario: Detail page renders Relianz
- GIVEN `content/work/relianz.mdx` exists with `status: "published"`
- WHEN the user navigates to `/work/relianz`
- THEN the page renders with title "Relianz Design System"
- AND the breadcrumb shows `/ > work > relianz`
- AND all five content sections are present

#### Scenario: 404 for missing slug
- GIVEN no MDX file exists for slug "nonexistent-project"
- WHEN the user navigates to `/work/nonexistent-project`
- THEN the page returns HTTP 404
- AND Next.js renders its notFound page

#### Scenario: Previous/Next navigation
- GIVEN case studies are ordered: relianz (1), dailyval (2), softmobile (3)
- WHEN the user is on `/work/dailyval`
- THEN a "← Relianz" previous link appears
- AND a "SoftMobile →" next link appears

#### Scenario: Server-side generated
- GIVEN the Next.js build runs `generateStaticParams`
- WHEN inspecting the build output
- THEN `/work/relianz`, `/work/dailyval`, `/work/softmobile` are pre-rendered as static HTML
- AND no runtime database query is needed to serve the pages

### Requirement: Custom MDX Components
The system SHALL provide the following custom React components for use inside MDX files. These components MUST be registered via `mdx-components.tsx` at the project root. All components MUST use design-system tokens (no hardcoded colors).

- `<QuickFacts>` — displays role, period, team, and stack in a structured terminal-style block
- `<Highlight>` — visually emphasizes a key insight or quote
- `<Callout type="insight" | "warning" | "tip">` — colored callout box with icon
- `<Diagram>` — reserved container for future interactive diagrams (renders children as-is for now)

#### Scenario: QuickFacts renders structured metadata
- GIVEN a case study MDX uses `<QuickFacts role="..." period="..." team={[...]} stack={[...]} />`
- WHEN the page renders
- THEN a table-like block shows the four fields with labels
- AND the font is monospace

#### Scenario: Callout insight variant
- GIVEN a case study MDX uses `<Callout type="insight">This was the key learning.</Callout>`
- WHEN the page renders
- THEN a callout box appears with a distinct left border in `--color-accent`
- AND the text "This was the key learning." is displayed inside

#### Scenario: Callout warning variant
- GIVEN a case study MDX uses `<Callout type="warning">Be careful here.</Callout>`
- WHEN the page renders
- THEN the callout has a yellow/amber left border using `--color-warning`

#### Scenario: Unregistered MDX component logs warning
- GIVEN a case study MDX references `<UnknownComponent />`
- WHEN the page renders
- THEN a console warning is logged in development
- AND the page does not crash in production (graceful fallback)

### Requirement: Relianz Case Study Published
The system SHALL provide `content/work/relianz.mdx` as the first published case study. The file MUST contain all five required sections (Context, Process, Technical Highlights, Results, Reflection) with substantive content — not placeholder text.

#### Scenario: Relianz page is accessible
- GIVEN the site is deployed
- WHEN a user visits `/work/relianz`
- THEN the page loads with status 200
- AND the title "Relianz Design System" is visible in the `<h1>` element

#### Scenario: Five sections present
- GIVEN the user views `/work/relianz`
- WHEN scrolling through the page
- THEN headings for "Context", "Process", "Technical Highlights", "Results", and "Reflection" are all present
- AND each section has at least one paragraph of non-placeholder content

#### Scenario: Stack tags displayed
- GIVEN the Relianz frontmatter includes `stack: ["React", "TypeScript", "Tailwind", "Storybook", "Figma"]`
- WHEN the page renders
- THEN those five stack tags are visible (in QuickFacts or a tag list)

### Requirement: DailyVal Case Study Published
The system SHALL provide `content/work/dailyval.mdx` as the second published case study. Content MUST cover the iOS + Next.js + CloudKit architecture decision, the security vulnerability discovery and fix (exposed API tokens, missing auth), and the contractor role context.

#### Scenario: DailyVal page is accessible
- GIVEN the site is deployed
- WHEN a user visits `/work/dailyval`
- THEN the page loads with status 200
- AND the title references DailyVal Social

#### Scenario: Security section present
- GIVEN the user views `/work/dailyval`
- WHEN reading the Technical Highlights section
- THEN the content mentions the exposed API token issue and the fix applied
- AND the content is honest about the security gap found

### Requirement: SoftMobile Case Study Published
The system SHALL provide `content/work/softmobile.mdx` as the third published case study. Content MUST cover the internship main contributions and the cognitive shift between React Native mobile development and web React development.

#### Scenario: SoftMobile page is accessible
- GIVEN the site is deployed
- WHEN a user visits `/work/softmobile`
- THEN the page loads with status 200
- AND the title references SoftMobile Technology

#### Scenario: RN vs Web React comparison present
- GIVEN the user views `/work/softmobile`
- WHEN reading the Process or Reflection section
- THEN the content explicitly discusses the differences and similarities between React Native and web React from the author's perspective
