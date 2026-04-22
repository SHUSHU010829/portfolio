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
  ]
}
