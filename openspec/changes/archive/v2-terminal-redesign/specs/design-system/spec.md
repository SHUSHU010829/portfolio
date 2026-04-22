# Delta for Design System

## ADDED Requirements

### Requirement: Color Token System
The system SHALL define all color values as OKLCH CSS custom properties in `app/globals.css`. Components MUST reference these variables exclusively — no hardcoded hex, rgb, or hsl values are permitted in component files.

Required variables:
- Surfaces: `--color-bg`, `--color-bg-elevated`, `--color-bg-overlay`
- Borders: `--color-border`, `--color-border-hover`
- Text: `--color-fg`, `--color-fg-muted`, `--color-fg-subtle`
- Accent: `--color-accent`, `--color-accent-hover`, `--color-accent-dim`
- Semantic: `--color-success`, `--color-warning`, `--color-error`
- Syntax highlight: `--color-syntax-keyword`, `--color-syntax-string`, `--color-syntax-comment`, `--color-syntax-number`

#### Scenario: Dark mode default
- GIVEN the application loads with no stored theme preference
- WHEN a component renders any color value
- THEN it reads from the `:root` CSS variable block (dark mode default)
- AND the background is approximately `oklch(0.12 0 0)` (near black)

#### Scenario: Light mode override
- GIVEN a user has switched to light mode
- WHEN the `[data-theme="light"]` attribute is set on `<html>`
- THEN all `--color-*` variables resolve to their light-mode overrides
- AND `--color-bg` becomes approximately `oklch(0.99 0 0)` (near white)
- AND `--color-accent` is darker (`oklch(0.58 0.18 155)`) for sufficient contrast

#### Scenario: Component reads token, not hex
- GIVEN a component displays text
- WHEN inspecting its CSS in browser DevTools
- THEN the color property references `var(--color-fg)` or a descendant variable
- AND no raw hex value appears in the component's own stylesheet rules

#### Scenario: Existing shadcn-style tokens are replaced
- GIVEN the codebase previously used `--color-background`, `--color-foreground`, `--color-muted-foreground`
- WHEN the migration is complete
- THEN those old variable names no longer appear in `app/globals.css`
- AND all components that referenced them are updated to the new naming scheme

### Requirement: Spacing Scale
The system SHALL define spacing tokens as CSS custom properties on a 4px grid. Components MUST use Tailwind utility classes (`p-4`, `gap-6`, `my-12`) which map to these tokens. Arbitrary pixel values (e.g., `padding: 13px`, `margin: 27px`) are PROHIBITED.

Tokens: `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px), `--space-24` (96px), `--space-32` (128px).

#### Scenario: Token drives layout
- GIVEN a card component with padding
- WHEN the card is rendered
- THEN its padding equals a multiple of 4px that maps to a defined `--space-*` token
- AND no arbitrary inline style with a non-grid value is present

#### Scenario: Token available via Tailwind
- GIVEN Tailwind v4's `@theme` configuration references `--space-*` variables
- WHEN a developer writes `className="p-4"`
- THEN the rendered padding equals `1rem` / 16px (`--space-4`)

### Requirement: Typography Tokens
The system SHALL define font-family, font-size, and line-height tokens as CSS custom properties. The site MUST default to monospace font (`--font-mono`) site-wide. Sans-serif (`--font-sans`) is reserved for long-form body text only (case study paragraphs). Font sizes MUST NOT exceed `--text-3xl` (40px / 2.5rem).

Font families:
- `--font-mono: 'Geist Mono', 'JetBrains Mono', 'Menlo', monospace`
- `--font-sans: 'Geist', system-ui, -apple-system, sans-serif`

Size scale: `--text-xs` (12px) through `--text-3xl` (40px).

#### Scenario: Body defaults to monospace
- GIVEN any page of the site
- WHEN rendered with no explicit font-family class
- THEN the computed font-family of `<body>` resolves to a monospace font
- AND the fallback chain includes `'JetBrains Mono'` and a generic `monospace`

#### Scenario: Heading uses monospace
- GIVEN a heading element (`<h1>`, `<h2>`) on any page
- WHEN rendered
- THEN its font-family is monospace (not sans-serif)

#### Scenario: Case study body may use sans-serif
- GIVEN a paragraph element inside a case study MDX page
- WHEN the designer opts in via the `<article>` prose block
- THEN the paragraph's font-family may resolve to `'Geist'` (sans-serif)
- AND this is the only context where sans-serif is permitted

#### Scenario: Font size ceiling enforced
- GIVEN any component in the codebase
- WHEN inspecting font-size values
- THEN no computed font-size exceeds 40px (`--text-3xl`)

### Requirement: Motion Tokens
The system SHALL define transition duration and easing function tokens as CSS custom properties. Components MUST use these tokens — hardcoded duration values (e.g., `transition-duration: 300ms`) and forbidden easing functions (`ease-in-out`, `ease-in`, `linear`) are PROHIBITED in component stylesheets.

Duration tokens: `--duration-instant` (80ms), `--duration-fast` (120ms), `--duration-base` (160ms), `--duration-slow` (240ms), `--duration-slowest` (400ms).

Easing tokens: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)`, `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`.

#### Scenario: Fast hover transition
- GIVEN an interactive element (link, button) with a hover color change
- WHEN the user hovers over it
- THEN the transition completes in exactly `--duration-fast` (120ms)
- AND the easing function is `--ease-out-expo`

#### Scenario: Page section entrance animation
- GIVEN a page section fading into view
- WHEN the element enters the viewport
- THEN its entrance transition duration is between `--duration-base` (160ms) and `--duration-slow` (240ms)
- AND the y-axis displacement does not exceed 8px

#### Scenario: Prohibited easing rejected
- GIVEN a component attempting to use `transition: all 200ms ease-in-out`
- WHEN a code review or lint check runs
- THEN the usage is flagged as a violation of the motion token contract
- AND the recommended replacement is `transition: all var(--duration-base) var(--ease-out-expo)`

### Requirement: Reduced Motion Respect
The system SHALL respect the `prefers-reduced-motion: reduce` media query. All CSS transitions and animations MUST be suppressed to 0.01ms under reduced-motion. JavaScript animation layers using Motion library MUST check `useReducedMotion()` and render a static fallback.

#### Scenario: CSS animations suppressed
- GIVEN a user has `prefers-reduced-motion: reduce` set in OS accessibility settings
- WHEN any CSS transition or animation would play
- THEN its duration is reduced to 0.01ms
- AND the element jumps to its final state instantly

#### Scenario: Motion library respects flag
- GIVEN a component using `<motion.div>` with an `animate` prop
- WHEN `useReducedMotion()` returns `true`
- THEN the component renders in its final state without any animated transition
- AND no intermediate animation frames are scheduled

#### Scenario: Typing animation respects flag
- GIVEN a `TypeAnimation` component on the Hero section
- WHEN a user has reduced-motion enabled
- THEN the full text appears immediately without character-by-character animation

### Requirement: Light and Dark Theme via next-themes
The system SHALL use `next-themes` to manage theme state, replacing the current custom `animated-theme-toggler.tsx` implementation. Theme switching MUST be SSR-safe (no flash of unstyled content). The existing View Transitions API animation SHOULD be preserved as a progressive enhancement for browsers that support it.

#### Scenario: Server-side render matches client
- GIVEN a user with no stored theme preference
- WHEN the page is server-rendered and then hydrated
- THEN the rendered theme matches on both server and client
- AND no flash of wrong theme (FOUT) occurs during hydration

#### Scenario: Theme persists across sessions
- GIVEN a user selects light mode
- WHEN they close and reopen the browser
- THEN the site loads in light mode
- AND the `[data-theme="light"]` attribute is present on `<html>` before first paint

#### Scenario: Theme toggle with View Transitions
- GIVEN a user clicks the theme toggle button in a browser that supports `document.startViewTransition`
- WHEN the theme switches
- THEN a smooth View Transitions animation plays
- AND the theme state updates via `next-themes` (not a custom localStorage write)

#### Scenario: Theme toggle without View Transitions
- GIVEN a user clicks the theme toggle in a browser without `document.startViewTransition` support
- WHEN the theme switches
- THEN the toggle still works correctly without animation
- AND no JavaScript error is thrown
