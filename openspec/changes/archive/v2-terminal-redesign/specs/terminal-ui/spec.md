# Delta for Terminal UI

## ADDED Requirements

### Requirement: TerminalPrompt Component
The system SHALL provide a `<TerminalPrompt>` component at `components/terminal/TerminalPrompt.tsx`. It MUST accept a `symbol` prop (`'$' | '>' | '#'`, default `'$'`), a `cursor` boolean prop, and a `className` prop. The symbol MUST render in `--color-accent`. Children render as the command text.

#### Scenario: Dollar prompt renders
- GIVEN `<TerminalPrompt>whoami</TerminalPrompt>`
- WHEN rendered
- THEN a `$` symbol appears in accent color to the left of the text "whoami"
- AND the layout is a horizontal flex row with consistent gap

#### Scenario: Custom prompt symbol
- GIVEN `<TerminalPrompt symbol=">">navigate</TerminalPrompt>`
- WHEN rendered
- THEN a `>` symbol appears in accent color instead of `$`

#### Scenario: Cursor variant
- GIVEN `<TerminalPrompt cursor>executing</TerminalPrompt>`
- WHEN rendered
- THEN a blinking cursor element appears after the children text
- AND the cursor blinks using the `blink-cursor` CSS animation

#### Scenario: Keyboard accessible
- GIVEN the component is focusable (e.g., inside a `<button>`)
- WHEN navigated to via Tab
- THEN the focus ring is visible: `focus-visible:ring-2 focus-visible:ring-accent`

### Requirement: TerminalCursor Component
The system SHALL provide a `<TerminalCursor>` component at `components/terminal/TerminalCursor.tsx`. It MUST render a blinking block cursor. It MUST accept a `blink` boolean prop and a `static` boolean prop (for reduced-motion contexts). When `blink` is true and `prefers-reduced-motion` is not set, the cursor SHALL blink at approximately 1Hz. When `prefers-reduced-motion` is reduce, the cursor MUST render as a static block without animation.

#### Scenario: Blinking cursor
- GIVEN `<TerminalCursor blink />`
- WHEN rendered in a normal motion environment
- THEN the cursor element toggles between visible and hidden states approximately once per second
- AND the animation uses the `blink-cursor` keyframe

#### Scenario: Static under reduced-motion
- GIVEN `<TerminalCursor blink />` and the user has `prefers-reduced-motion: reduce`
- WHEN rendered
- THEN the cursor is permanently visible without blinking
- AND no animation frames are scheduled

#### Scenario: Static prop override
- GIVEN `<TerminalCursor static />`
- WHEN rendered regardless of motion preference
- THEN the cursor renders as a static block with no animation

### Requirement: TypeAnimation Component
The system SHALL preserve and contract-stabilize the existing `components/ui/typing-animation.tsx` as `components/terminal/TypeAnimation.tsx`. The component MUST support:
- `text: string` prop — the text to animate
- `speed?: number` prop — milliseconds per character (default 50ms)
- `onComplete?: () => void` callback — fired when animation finishes
- `cursor?: boolean` — show blinking cursor after text
- `startOnView?: boolean` — delay animation until element enters viewport (via IntersectionObserver)
- `loop?: boolean` — continuously retype the text

Under `prefers-reduced-motion: reduce`, the full text MUST appear immediately without animation.

#### Scenario: Characters appear sequentially
- GIVEN `<TypeAnimation text="shu/dev" speed={50} />`
- WHEN the component mounts (or enters viewport if `startOnView`)
- THEN characters appear one by one at 50ms intervals
- AND the full string "shu/dev" is visible after 350ms

#### Scenario: onComplete fires
- GIVEN `<TypeAnimation text="hello" onComplete={callback} />`
- WHEN the last character has been rendered
- THEN `callback` is invoked exactly once

#### Scenario: Replay on click
- GIVEN `<TypeAnimation text="shu/dev" />` wrapped in a clickable element
- WHEN the element is clicked
- THEN the animation resets to empty and replays from the first character

#### Scenario: Instant under reduced-motion
- GIVEN a user has `prefers-reduced-motion: reduce`
- WHEN `<TypeAnimation text="shu/dev" />` renders
- THEN "shu/dev" appears in full immediately
- AND `onComplete` is called synchronously

### Requirement: CommentDivider Component
The system SHALL provide a `<CommentDivider>` component at `components/terminal/CommentDivider.tsx`. It MUST render a section divider styled as `// <label>` using monospace font and `--color-fg-subtle`. It MUST accept a `className` prop for layout overrides.

#### Scenario: Comment syntax render
- GIVEN `<CommentDivider>Experience</CommentDivider>`
- WHEN rendered
- THEN the output text is `// Experience`
- AND the color resolves to `var(--color-fg-subtle)`
- AND the font is monospace

#### Scenario: Used as section heading
- GIVEN the Experience section uses `<CommentDivider>Experience</CommentDivider>` as a heading
- WHEN the page is parsed by a screen reader
- THEN the heading text includes "Experience" (the `//` prefix may be aria-hidden if decorative)

### Requirement: CodeBlock Component
The system SHALL provide a `<CodeBlock>` component at `components/terminal/CodeBlock.tsx`. It MUST accept a `language` prop (e.g., `'bash'`, `'ts'`, `'css'`), a `className` prop, and `children` as the code string. Token coloring MUST use the `--color-syntax-*` family of design tokens. Background MUST be `--color-bg-elevated`.

#### Scenario: Bash command block
- GIVEN `<CodeBlock language="bash">$ cat resume.pdf</CodeBlock>`
- WHEN rendered
- THEN the `$` prefix renders in `--color-syntax-keyword`
- AND the background is `--color-bg-elevated` (elevated surface)
- AND the font is monospace

#### Scenario: TypeScript snippet
- GIVEN `<CodeBlock language="ts">const x = 42</CodeBlock>`
- WHEN rendered
- THEN `const` keyword renders in `--color-syntax-keyword`
- AND `42` number renders in `--color-syntax-number`
- AND `x` identifier renders in `--color-fg`

#### Scenario: No language fallback
- GIVEN `<CodeBlock>some text</CodeBlock>` with no `language` prop
- WHEN rendered
- THEN the text renders with monospace font and `--color-fg` color
- AND no syntax highlighting is applied
- AND no error is thrown

### Requirement: Terminal Components Are Server-Compatible
All components in `components/terminal/` SHALL be React Server Components by default. Only `TypeAnimation` requires `'use client'` due to `useState`/`useEffect`. The others (`TerminalPrompt`, `TerminalCursor`, `CommentDivider`, `CodeBlock`) MUST NOT contain `'use client'` unless a future interactive requirement demands it.

#### Scenario: TerminalPrompt renders server-side
- GIVEN `<TerminalPrompt>whoami</TerminalPrompt>` is used inside a React Server Component
- WHEN the page is server-rendered
- THEN the prompt HTML is included in the initial SSR payload
- AND no client-side JS is required for its initial render
