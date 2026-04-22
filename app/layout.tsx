import type { Metadata } from 'next'
import { JetBrains_Mono, Geist_Mono, Geist } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { CommandPaletteProvider } from '@/components/command/CommandPalette'
import { ConsoleMessage } from '@/components/EasterEgg/ConsoleMessage'
import { GlitchMode } from '@/components/EasterEgg/GlitchMode'
import { TapiIdle } from '@/components/EasterEgg/TapiIdle'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | shu/dev',
    default: 'shu/dev',
  },
  description: 'Frontend Engineer — shuyuan.tw',
  metadataBase: new URL('https://shuyuan.tw'),
  openGraph: {
    title: 'shu/dev',
    description: 'Frontend Engineer — shuyuan.tw',
    url: 'https://shuyuan.tw',
    siteName: 'shu/dev',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'shu/dev',
    description: 'Frontend Engineer — shuyuan.tw',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shuyuan Chuang',
  url: 'https://shuyuan.tw',
  jobTitle: 'Frontend Engineer',
  sameAs: [
    'https://github.com/SHUSHU010829',
    'https://linkedin.com/in/shuyuanchuang',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${geistMono.variable} ${geist.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          disableTransitionOnChange={false}
        >
          <CommandPaletteProvider>
            <div className="mx-auto max-w-[768px]">{children}</div>
          </CommandPaletteProvider>
          <ConsoleMessage />
          <GlitchMode />
          <TapiIdle />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
