import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { DiscordWidget } from './DiscordWidget'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Stream',
  description: 'Twitch live status and Discord community for Shuyuan.',
  openGraph: {
    title: '$ cd /stream — shu/dev',
    description: 'Live stream status and Discord community.',
  },
}

type TwitchData = {
  isLive: boolean
  stream: {
    title: string
    game_name: string
    viewer_count: number
    started_at: string
    thumbnail_url: string
  } | null
}

async function getTwitchStatus(): Promise<TwitchData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://shuyuan.tw'}/api/twitch`, {
      next: { revalidate: 60 },
    })
    return res.json()
  } catch {
    return { isLive: false, stream: null }
  }
}

export default async function StreamPage() {
  const twitch = await getTwitchStatus()
  const discordInvite = process.env.DISCORD_INVITE_URL ?? '#'

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex flex-col gap-10 px-10 pb-10 pt-10">
        <TerminalPrompt className="text-sm text-fg-muted">
          cd /stream
        </TerminalPrompt>

        {/* Twitch section */}
        <section aria-label="Twitch live status" className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-fg-subtle">// twitch</h2>

          <div className="flex items-start gap-4 border border-border bg-bg-elevated p-6">
            {/* Status dot */}
            <div className="mt-0.5">
              <span
                className={cn(
                  'block h-2.5 w-2.5 rounded-full',
                  twitch.isLive
                    ? 'bg-accent animate-pulse'
                    : 'bg-fg-subtle',
                )}
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-mono text-sm font-semibold text-fg">
                {twitch.isLive ? 'LIVE on Twitch' : 'Offline'}
              </p>

              {twitch.isLive && twitch.stream ? (
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-xs text-fg-muted">{twitch.stream.title}</p>
                  <p className="font-mono text-xs text-fg-subtle">
                    {twitch.stream.game_name} · {twitch.stream.viewer_count} viewers
                  </p>
                </div>
              ) : (
                <p className="font-mono text-xs text-fg-subtle">
                  Not streaming right now.
                </p>
              )}

              <a
                href="https://twitch.tv/shuyuandev"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 font-mono text-xs text-accent hover:text-accent-hover transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
              >
                twitch.tv/shuyuandev →
              </a>
            </div>
          </div>
        </section>

        {/* Discord section */}
        <section aria-label="Discord community" className="flex flex-col gap-4">
          <h2 className="font-mono text-xs text-fg-subtle">// discord</h2>
          <DiscordWidget inviteUrl={discordInvite} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
