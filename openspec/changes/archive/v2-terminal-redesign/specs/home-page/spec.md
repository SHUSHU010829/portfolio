# Delta for Home Page

## ADDED Requirements

### Requirement: Hero Section
The system SHALL render a `<Hero>` component at the top of the home page (`app/page.tsx` or `app/(main)/page.tsx`). The current `components/hero.tsx` file exists but is NOT mounted in `app/page.tsx`; this requirement mandates its integration and enhancement.

The Hero MUST:
- Display the title `shu/dev` as the primary heading (H1)
- Animate the title with a typing effect on first load (total duration ≤ 1200ms)
- Show a persistently blinking cursor after the typed text completes
- Re-play the typing animation when the user clicks the title
- Display a subtitle line with the current role (e.g., "Frontend Engineer")
- Show the local Taipei time (already implemented in `Overview` — to be integrated)
- Include a `[$ cat resume.pdf_]` CTA button linking to `/resume.pdf`
- Include social links (GitHub, LinkedIn, etc.)
- Render an extremely subtle noise/grain background (opacity ≤ 0.015) covering the viewport
- Show a Command Palette hint at the bottom of the Hero after a 2-second delay

#### Scenario: Typing animation on load
- GIVEN the user navigates to the home page for the first time
- WHEN the Hero section renders
- THEN the title "shu/dev" appears character by character
- AND the total time from first character to last character is ≤ 1200ms
- AND a blinking cursor appears after the final character

#### Scenario: Replay on click
- GIVEN the Hero title has finished typing
- WHEN the user clicks on the title text
- THEN the title clears and the typing animation replays from the beginning

#### Scenario: CLI hint appears after 2 seconds
- GIVEN the Hero has finished its initial render
- WHEN 2 seconds have elapsed
- THEN a small hint text fades in (e.g., "Press ` to open CLI")
- AND the hint uses `<kbd>` for the backtick key
- AND the hint is in `--color-fg-subtle` (barely visible)

#### Scenario: Resume CTA functional
- GIVEN the Hero renders the `[$ cat resume.pdf_]` button
- WHEN the user clicks it
- THEN the browser opens or downloads `/resume.pdf`
- AND `public/resume.pdf` exists and is reachable

#### Scenario: Noise background is imperceptible
- GIVEN the Hero renders with the noise background
- WHEN viewing the page at normal brightness
- THEN the noise pattern is barely visible (opacity ≤ 0.015)
- AND it does not interfere with text readability

### Requirement: Experience Section Enhancement
The system SHALL enhance the existing `<Experience>` component by adding `/work/[slug]` links and extracting hardcoded data into a content file. The expand/collapse interaction MUST be preserved.

Data MUST be moved from `components/experience.tsx` (currently lines 12-61) to `content/experience.ts`. Multiple entries MUST be expandable simultaneously.

Each experience entry with a matching case study MUST include a "Read full case: /work/[slug]" link inside its expanded detail view.

#### Scenario: Data loaded from content file
- GIVEN `content/experience.ts` exports an array of experience entries
- WHEN the Experience component renders
- THEN it reads from that export, not from inline hardcoded data
- AND adding a new entry to `content/experience.ts` is immediately reflected in the rendered list

#### Scenario: Work case link present for Relianz
- GIVEN the Relianz experience entry is expanded
- WHEN the detail panel is visible
- THEN a link "→ Read full case: /work/relianz" (or equivalent) is displayed
- AND clicking it navigates to `/work/relianz`

#### Scenario: Multiple entries expandable
- GIVEN the Experience section has both Relianz and SoftMobile entries
- WHEN the user expands Relianz then also expands SoftMobile
- THEN both entries show their detail panels simultaneously
- AND neither expansion collapses the other

#### Scenario: Expand/collapse animation preserved
- GIVEN an experience entry is collapsed
- WHEN the user clicks the expand toggle (▸)
- THEN the detail panel animates open using Motion with duration ≤ `--duration-base` (160ms)
- AND the triangle icon rotates from ▸ to ▾

### Requirement: Projects Section — ls-style
The system SHALL replace the current single-column expandable card layout in `components/projects.tsx` with a `$ ls -la` terminal listing style. Data MUST be extracted to `content/projects.ts`.

Each project row MUST display: fake permissions string (`drwxr-xr-x`), slug/name, date (YYYY-MM), primary stack tag, one-line description.

On hover, each row MUST show a `>` indicator on the left and highlight the full row with `--color-accent-dim` background.

On mobile (< 768px), the listing MUST degrade to a vertical card layout for readability.

#### Scenario: ls-style row renders
- GIVEN `content/projects.ts` has a project entry for "vinyl-component"
- WHEN the Projects section renders
- THEN a row appears as: `drwxr-xr-x  vinyl-component  2025-11  [CSS]  Pure CSS vinyl record`
- AND the row is clickable, navigating to the project's `href`

#### Scenario: Row hover effect
- GIVEN the Projects list is rendered
- WHEN the user hovers over a project row
- THEN the entire row highlights with a subtle `--color-accent-dim` background
- AND a `>` character appears at the left edge of the row
- AND the transition duration is ≤ `--duration-fast` (120ms)

#### Scenario: Mobile card fallback
- GIVEN a viewport width of 375px
- WHEN the Projects section renders
- THEN rows display as stacked cards rather than a single-line listing
- AND the card layout remains readable without horizontal scrolling

#### Scenario: Data loaded from content file
- GIVEN `content/projects.ts` exports a `Project[]` array
- WHEN the Projects component renders
- THEN all displayed projects come from that array
- AND a new entry added to `content/projects.ts` is immediately reflected

### Requirement: Footer with Version Info
The system SHALL update the `<Footer>` component to display site version, last-updated timestamp, and copyright year. The `$ exit 0` terminal motif MUST be preserved as the primary footer text.

Version MUST be read from `package.json`. Last-updated timestamp MUST be injected at build time (e.g., via `process.env.NEXT_PUBLIC_BUILD_TIME` set in `next.config.ts`). Copyright year MUST be dynamic (`new Date().getFullYear()`).

#### Scenario: Version displayed
- GIVEN `package.json` has `"version": "2.0.0"`
- WHEN the footer renders
- THEN the text `v2.0.0` (or equivalent) is visible in the footer
- AND it reads from the build-time injected value, not hardcoded

#### Scenario: Exit motif preserved
- GIVEN the footer renders
- WHEN inspecting the DOM
- THEN the text `$ exit 0` is present as the primary footer identifier

#### Scenario: Copyright year is current
- GIVEN the footer renders in year 2026
- WHEN inspecting the copyright text
- THEN it reads `© 2026 SHUU` or equivalent with the current year

### Requirement: Page Load Animation Budget
The system SHALL constrain the home page's entrance animation sequence to ensure a fast, sharp feel consistent with the terminal aesthetic. The entire staggered entrance sequence MUST complete within 300ms total. Each individual section's y-axis displacement MUST NOT exceed 8px. Scale effects MUST remain within 0.98–1.02.

#### Scenario: Total animation within budget
- GIVEN the home page loads
- WHEN all entrance animations have completed
- THEN the total elapsed time from first animation frame to last animated element's completion is ≤ 300ms

#### Scenario: Y-axis displacement bounded
- GIVEN a page section animating in
- WHEN measuring its initial and final y position
- THEN the difference is ≤ 8px
- AND there is no y displacement > 8px at any frame during the animation

#### Scenario: No janky large-range slides
- GIVEN any motion.div on the home page
- WHEN inspecting its `initial` animation state
- THEN `y` values do not exceed `8` or `-8`
- AND `x` displacement is `0` unless explicitly designed
