export type CommandCategory = 'Navigation' | 'Actions' | 'External' | 'Easter' | 'System'

export type Command = {
  id: string
  label: string
  description?: string
  category: CommandCategory
  /** Terminal-style display label */
  hint?: string
  action: () => void
  /** If true, only visible when user types "sudo" */
  hidden?: boolean
  keywords?: string[]
}

export function buildCommands(router: { push: (href: string) => void }): Command[] {
  return [
    // Navigation
    {
      id: 'nav-home',
      label: 'cd /',
      description: 'Go to home',
      category: 'Navigation',
      keywords: ['home', 'index', 'root'],
      action: () => router.push('/'),
    },
    {
      id: 'nav-work',
      label: 'cd /work',
      description: 'View case studies',
      category: 'Navigation',
      keywords: ['work', 'cases', 'projects', 'portfolio', 'wrk'],
      action: () => router.push('/work'),
    },
    {
      id: 'nav-play',
      label: 'cd /play',
      description: 'Interactive experiments',
      category: 'Navigation',
      keywords: ['play', 'experiments', 'demos', 'interactive'],
      action: () => router.push('/play'),
    },
    {
      id: 'nav-play-ls',
      label: 'ls ./play',
      description: 'Browse experiments',
      category: 'Navigation',
      keywords: ['play', 'list', 'ls', 'experiments'],
      action: () => router.push('/play'),
    },
    {
      id: 'nav-about',
      label: 'cd /about',
      description: 'About Shuyuan',
      category: 'Navigation',
      keywords: ['about', 'bio', 'story', 'me', 'who'],
      action: () => router.push('/about'),
    },
    {
      id: 'nav-stream',
      label: 'cd /stream',
      description: 'Twitch & Discord live status',
      category: 'Navigation',
      keywords: ['stream', 'twitch', 'discord', 'live'],
      action: () => router.push('/stream'),
    },

    // Actions
    {
      id: 'action-resume',
      label: '$ cat resume.pdf',
      description: 'Download resume',
      category: 'Actions',
      keywords: ['resume', 'cv', 'download'],
      action: () => window.open('/resume.pdf', '_blank'),
    },
    {
      id: 'action-theme',
      label: '$ toggle --theme',
      description: 'Switch dark / light mode',
      category: 'Actions',
      keywords: ['theme', 'dark', 'light', 'toggle'],
      action: () => {
        const el = document.querySelector<HTMLButtonElement>('[aria-label="Toggle theme"]')
        el?.click()
      },
    },

    // External
    {
      id: 'ext-github',
      label: '$ open github',
      description: 'github.com/SHUSHU010829',
      category: 'External',
      keywords: ['github', 'code', 'repo'],
      action: () => window.open('https://github.com/SHUSHU010829', '_blank'),
    },
    {
      id: 'ext-linkedin',
      label: '$ open linkedin',
      description: 'linkedin.com/in/shuyuanchuang',
      category: 'External',
      keywords: ['linkedin', 'social'],
      action: () => window.open('https://linkedin.com/in/shuyuanchuang', '_blank'),
    },
    {
      id: 'ext-email',
      label: '$ echo $EMAIL',
      description: 'shuyuan010829@gmail.com',
      hint: 'shuyuan010829@gmail.com',
      category: 'External',
      keywords: ['email', 'contact', 'mail'],
      action: () => window.open('mailto:shuyuan010829@gmail.com'),
    },

    // System
    {
      id: 'sys-copy-url',
      label: '$ clipboard --copy-url',
      description: 'Copy current page URL',
      category: 'System',
      keywords: ['copy', 'url', 'clipboard', 'share'],
      action: () => navigator.clipboard.writeText(window.location.href),
    },

    // Easter egg
    {
      id: 'easter-sudo',
      label: '$ sudo make me a sandwich',
      description: '🥪',
      category: 'Easter',
      hidden: true,
      keywords: ['sudo', 'sandwich', 'easter'],
      action: () => alert('What? Make it yourself.'),
    },
    {
      id: 'easter-sudo-room',
      label: '$ sudo enter_space/',
      description: 'Enter the room',
      category: 'Easter',
      hidden: true,
      keywords: ['sudo', 'room', '3d', 'space', 'enter'],
      action: () => router.push('/sudo'),
    },
    {
      id: 'easter-tapi',
      label: '$ ./tapi --force',
      description: 'Where is Tapi?',
      category: 'Easter',
      hidden: true,
      keywords: ['tapi', 'dog', 'idle'],
      action: () => {
        window.dispatchEvent(new CustomEvent('tapi:force'))
      },
    },
    {
      id: 'easter-secrets',
      label: '$ ls ./secrets',
      description: 'Track discovered easter eggs',
      category: 'Easter',
      hidden: true,
      keywords: ['secrets', 'eggs', 'easter', 'discover'],
      action: () => router.push('/secret'),
    },
  ]
}
