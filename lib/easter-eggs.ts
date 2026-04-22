export type EasterEgg = {
  id: string
  name: string
  hint: string
  /** How to trigger it (shown only after discovery) */
  howTo: string
}

export const EASTER_EGGS: EasterEgg[] = [
  {
    id: 'console',
    name: 'DevTools Detective',
    hint: 'Open the browser console on any page.',
    howTo: 'Open DevTools → Console',
  },
  {
    id: 'konami',
    name: 'Old-School Player',
    hint: '↑↑↓↓←→←→BA',
    howTo: 'Type the Konami Code on your keyboard',
  },
  {
    id: 'logo-liquify',
    name: 'Melt the Matrix',
    hint: 'Hold the site title for a moment.',
    howTo: 'Long-press the "$ shu/dev" title on the homepage',
  },
  {
    id: 'tapi-idle',
    name: 'Found Tapi',
    hint: 'Leave the page alone. Something might show up.',
    howTo: 'Stay idle for 30 seconds on desktop',
  },
  // Placeholder slots for future eggs
  { id: 'slot-5', name: '???', hint: 'Not yet discovered.', howTo: '???' },
  { id: 'slot-6', name: '???', hint: 'Not yet discovered.', howTo: '???' },
]
