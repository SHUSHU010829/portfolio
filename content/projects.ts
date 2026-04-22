export type Project = {
  title: string
  date: string
  description: string
  href: string
  stack: string[]
  /** Optional slug for internal case study */
  workSlug?: string
}

export const projects: Project[] = [
  {
    title: 'DailyVal Social',
    date: '10.2025 – ∞',
    description: 'Social platform for iOS ecosystem powered by Apple CloudKit',
    href: 'https://social.dailyval.com',
    workSlug: 'dailyval',
    stack: ['Next.js', 'TypeScript', 'Apple CloudKit', 'Tailwind CSS'],
  },
  {
    title: 'vinyl-component',
    date: '2024',
    description: 'Animated vinyl record React component with CSS transforms',
    href: 'https://github.com/chuangshuyuan/vinyl-component',
    stack: ['React', 'TypeScript', 'CSS'],
  },
  {
    title: 'livestream-overlay',
    date: '2023',
    description: 'Real-time OBS browser-source overlay for live music streams',
    href: 'https://github.com/chuangshuyuan/livestream-overlay',
    stack: ['Next.js', 'WebSocket', 'Spotify API'],
  },
  {
    title: 'threads-discord-bot',
    date: '2023',
    description: 'Discord bot that mirrors Threads posts into a server channel',
    href: 'https://github.com/chuangshuyuan/threads-discord-bot',
    stack: ['Node.js', 'Discord.js', 'Threads API'],
  },
  {
    title: 'design-system-relianz',
    date: '2024',
    description: 'Dual-brand design system for Relianz FinTech products',
    href: '/work/relianz',
    workSlug: 'relianz',
    stack: ['React', 'Tailwind CSS', 'Storybook', 'TypeScript'],
  },
]
