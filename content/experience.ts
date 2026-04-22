export type ResponsibilityItem =
  | string
  | { text: string; subItems: string[] }

export type Experience = {
  logo: string
  company: string
  companyLink: string
  title: string
  type: string
  date: string
  statusColor?: string
  showStatus?: boolean
  technologies: string[]
  responsibilities: ResponsibilityItem[]
  /** Optional slug for linking to a case study at /work/[slug] */
  workSlug?: string
}

export const experience: Experience[] = [
  {
    logo: '/relianz.png',
    company: 'Relianz 友信創新',
    companyLink: 'https://relianz.tw/',
    title: 'Frontend Engineer',
    type: 'Full-time',
    date: '09.2023 – now',
    statusColor: 'bg-status-indicator',
    showStatus: true,
    workSlug: 'relianz',
    technologies: [
      'TypeScript',
      'Next.js',
      'React',
      'Go',
      'Tailwind CSS',
      'Playwright',
      'AI-driven Development',
    ],
    responsibilities: [
      'FinTech platform for automated business registration and cloud accounting systems.',
      {
        text: 'Key Contributions:',
        subItems: [
          'Maintained dual product lines solo during restructuring, helping achieve profitability in 2024 (10K+ monthly vouchers, 100+ enterprise clients)',
          'Built full-stack payment system (Go + ECPay) enabling automated subscription revenue',
          'Designed precision tax calculation engine and Virtual List optimization (70%+ performance boost)',
          'Established AI-driven workflow with layered architecture (Logic/Validation/UI/Service separation)',
          'Delivered end-to-end UI/UX and testing infrastructure (Unit Tests, Playwright E2E)',
        ],
      },
    ],
  },
  {
    logo: '/softmobile.png',
    company: 'SoftMobile Technology Corporation 精誠隨想',
    companyLink: 'https://www.softmobile.com.tw/',
    title: 'Frontend Intern',
    type: 'Full-time',
    date: '07.2022 – 08.2023',
    statusColor: 'bg-status-indicator',
    showStatus: false,
    workSlug: 'softmobile',
    technologies: ['React Native', 'Redux', 'React Hooks', 'RESTful API'],
    responsibilities: [
      'Revamped a webpage, and developed a testing system and account management systems.',
      'Built RWD website and Android & iOS applications with React, React Native, JavaScript, CSS, MUI, Bootstrap, and more.',
      'Managed states by using Redux and React Hooks, and retrieve data from the back end using RESTful API.',
    ],
  },
]
