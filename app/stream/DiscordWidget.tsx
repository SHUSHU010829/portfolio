'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type DiscordMember = {
  id: string
  username: string
  avatar_url: string
  status: string
}

type DiscordData = {
  presence_count: number
  members: DiscordMember[]
}

type DiscordWidgetProps = {
  inviteUrl: string
}

export function DiscordWidget({ inviteUrl }: DiscordWidgetProps) {
  const [data, setData] = useState<DiscordData | null>(null)
  const [error, setError] = useState(false)
  const guildId = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID

  useEffect(() => {
    if (!guildId) {
      setError(true)
      return
    }

    async function fetchWidget() {
      try {
        const res = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
        if (!res.ok) throw new Error('widget disabled')
        const json = (await res.json()) as DiscordData
        setData(json)
      } catch {
        setError(true)
      }
    }

    fetchWidget()
    const interval = setInterval(fetchWidget, 60_000)
    return () => clearInterval(interval)
  }, [guildId])

  return (
    <div className="flex items-start gap-4 border border-border bg-bg-elevated p-6">
      <div className="mt-0.5">
        <span
          className={cn(
            'block h-2.5 w-2.5 rounded-full',
            !error && data ? 'bg-[var(--color-status-indicator)]' : 'bg-fg-subtle',
          )}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-sm font-semibold text-fg">Discord Community</p>
          {!error && data ? (
            <p className="font-mono text-xs text-fg-muted">
              {data.presence_count} online
            </p>
          ) : (
            <p className="font-mono text-xs text-fg-subtle">community server</p>
          )}
        </div>

        {/* Avatar row */}
        {!error && data && data.members.length > 0 && (
          <div className="flex -space-x-2">
            {data.members.slice(0, 6).map(member => (
              <img
                key={member.id}
                src={member.avatar_url}
                alt={member.username}
                title={member.username}
                className="h-6 w-6 rounded-full border border-bg"
                width={24}
                height={24}
              />
            ))}
            {data.members.length > 6 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-bg bg-bg-overlay font-mono text-[9px] text-fg-subtle">
                +{data.members.length - 6}
              </div>
            )}
          </div>
        )}

        <a
          href={inviteUrl === '#' ? 'https://discord.gg/' : inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-accent hover:text-accent-hover transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-bg"
        >
          Join server →
        </a>
      </div>
    </div>
  )
}
