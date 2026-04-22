# Delta for Command Palette

## ADDED Requirements

### Requirement: Global Command Palette Trigger
The system SHALL mount a Command Palette accessible from every page. It MUST be registered in `app/layout.tsx` so it is available globally. The palette MUST open on:
- `⌘K` (macOS) / `Ctrl+K` (Windows/Linux)
- Backtick (`` ` ``) — except when focus is inside an `<input>`, `<textarea>`, or `contenteditable`

It MUST close on:
- `Escape`
- Clicking the backdrop overlay

#### Scenario: Keyboard shortcut opens palette
- GIVEN the user is on any page with focus not inside a text input
- WHEN the user presses `⌘K` or `Ctrl+K`
- THEN the Command Palette dialog opens with focus placed in the search input
- AND a backdrop overlay renders behind the dialog

#### Scenario: Backtick opens palette
- GIVEN the user is on any page with focus on the document body
- WHEN the user presses the backtick key (`` ` ``)
- THEN the Command Palette opens
- AND the backtick character is NOT inserted into the search input

#### Scenario: Backtick inside input is ignored
- GIVEN the user has focus inside a text `<input>` field
- WHEN the user presses the backtick key
- THEN the Command Palette does NOT open
- AND the backtick character is inserted normally into the input

#### Scenario: Escape closes palette
- GIVEN the Command Palette is open
- WHEN the user presses `Escape`
- THEN the palette closes
- AND focus returns to the element that triggered the open

#### Scenario: Available on every page
- GIVEN the user navigates to `/`, `/work`, or `/work/relianz`
- WHEN they press `⌘K`
- THEN the Command Palette opens on all of those pages
- AND the same command list is available on all pages

### Requirement: Command Groups
The system SHALL organize commands into exactly five groups: `Navigation`, `Actions`, `External`, `Easter`, `System`. Commands with `hidden: true` in the registry MUST NOT appear in the default list view but MUST appear in search results when their label is queried directly.

#### Scenario: Groups render with headers
- GIVEN the Command Palette is open with no search query
- WHEN the dialog renders
- THEN group headers "Navigation", "Actions", "External", "System" are visible as section labels
- AND the "Easter" group header is NOT shown (its commands are hidden by default)

#### Scenario: Hidden command appears via search
- GIVEN the Command Palette is open
- WHEN the user types "sudo"
- THEN the `sudo` command appears in the results despite being hidden by default

#### Scenario: Hidden command absent from default list
- GIVEN the Command Palette is open with an empty search input
- WHEN the dialog renders
- THEN no commands from the `Easter` group appear in the list

### Requirement: Fuzzy Search
The system SHALL support fuzzy matching of command labels. A query that partially matches a command label MUST surface that command. The matching MUST use cmdk's built-in scoring.

#### Scenario: Partial match surfaces command
- GIVEN the Command Palette is open
- WHEN the user types "wrk"
- THEN the command with label "cd /work" appears in the results

#### Scenario: Typo-tolerant match
- GIVEN the Command Palette is open
- WHEN the user types "gihtub"
- THEN the "open github" command MAY appear in results (fuzzy tolerance)

#### Scenario: No match shows empty state
- GIVEN the Command Palette is open
- WHEN the user types a string that matches no command (e.g., "xyzzy123")
- THEN an empty state message is shown (e.g., "No commands found.")
- AND no commands are listed

### Requirement: Keyboard Navigation
The system SHALL support full keyboard navigation within the Command Palette. Arrow keys MUST move selection. Enter MUST execute the selected command. Tab MUST NOT move focus out of the palette while it is open.

#### Scenario: Arrow key moves selection
- GIVEN the Command Palette is open with multiple commands visible
- WHEN the user presses `↓`
- THEN the next command in the list becomes highlighted
- WHEN the user presses `↑`
- THEN the previous command becomes highlighted

#### Scenario: Enter executes command
- GIVEN the user has navigated to the "cd /work" command via keyboard
- WHEN the user presses `Enter`
- THEN the palette closes
- AND the router navigates to `/work`

#### Scenario: Tab stays in palette
- GIVEN the Command Palette is open
- WHEN the user presses `Tab`
- THEN focus cycles within the palette (search input ↔ command list)
- AND focus does NOT leave the dialog

### Requirement: Mobile Sheet Variant
The system SHALL render the Command Palette as a bottom-anchored sheet on viewports narrower than 768px. The sheet MUST slide up from the bottom of the screen on open and slide down on close. The desktop center-dialog variant MUST be used on viewports ≥ 768px.

#### Scenario: Bottom sheet on mobile
- GIVEN a viewport width of 375px (iPhone-sized)
- WHEN the user opens the Command Palette
- THEN the palette slides up from the bottom of the screen
- AND occupies the bottom portion of the screen rather than centering

#### Scenario: Center dialog on desktop
- GIVEN a viewport width of 1024px (desktop-sized)
- WHEN the user opens the Command Palette
- THEN the palette appears centered in the viewport
- AND a semi-transparent backdrop covers the rest of the screen

### Requirement: Open and Close Animation
The system SHALL animate the Command Palette open/close transition. The animation MUST be a fade combined with a scale from `0.98` to `1.0` on open, and reverse on close. Duration MUST equal `--duration-base` (160ms). Easing MUST equal `--ease-out-expo`.

#### Scenario: Open animation
- GIVEN the Command Palette is closed
- WHEN the user triggers it open
- THEN the palette fades in from `opacity: 0` to `opacity: 1`
- AND scales from `transform: scale(0.98)` to `scale(1)`
- AND the transition duration is 160ms with `cubic-bezier(0.16, 1, 0.3, 1)` easing

#### Scenario: Close animation
- GIVEN the Command Palette is open
- WHEN the user closes it
- THEN the palette fades out and scales back to `0.98` using the same duration and easing
- AND the element is removed from the DOM after the animation completes

#### Scenario: Animation skipped under reduced-motion
- GIVEN `prefers-reduced-motion: reduce` is set
- WHEN the Command Palette opens or closes
- THEN it appears/disappears instantly without any scale or fade transition

### Requirement: Commands Registry
The system SHALL maintain a single source-of-truth command registry at `lib/commands.ts`. Every command entry MUST have: `id: string`, `group: 'Navigation' | 'Actions' | 'External' | 'Easter' | 'System'`, `label: string`, `action: () => void`. Optional fields: `shortcut?: string`, `hidden?: boolean`.

The initial registry MUST include at minimum:

Navigation: `cd /` (home), `cd /work` (work list), `cat resume.pdf` (open resume PDF).
Actions: `theme toggle` (toggle theme), `copy email` (copy email to clipboard).
External: `open github` (GitHub profile), `open linkedin` (LinkedIn profile).
Easter: `sudo` (navigate to `/sudo`, hidden: true).
System: `help` (show help info).

#### Scenario: Registry is the only command source
- GIVEN the Command Palette is open
- WHEN commands are displayed
- THEN all displayed commands originate exclusively from `lib/commands.ts`
- AND no command is hardcoded directly in the UI component

#### Scenario: Navigation command routes correctly
- GIVEN the user selects the "cd /work" command
- WHEN the action executes
- THEN `router.push('/work')` is called
- AND the user is navigated to the work list page

#### Scenario: Copy email action
- GIVEN the user selects the "copy email" command
- WHEN the action executes
- THEN `shuyuan010829@gmail.com` is written to the clipboard via `navigator.clipboard.writeText`
- AND a brief visual feedback (toast or status line update) confirms the copy
