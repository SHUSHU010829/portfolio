import { track } from '@vercel/analytics'

export const events = {
  commandPaletteOpen: () => track('command_palette_open'),

  easterEggTriggered: (egg: 'console' | 'konami' | 'logo-liquify' | 'tapi-idle') =>
    track('easter_egg_triggered', { egg }),

  sudoEntered: () => track('sudo_entered'),
}
