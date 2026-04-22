import type { Metadata } from 'next'
import { JetBrains_Mono, Geist_Mono, Geist } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { CommandPaletteProvider } from '@/components/command/CommandPalette'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
