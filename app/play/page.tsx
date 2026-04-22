import type { Metadata } from 'next'
import { getExperiments } from '@/lib/content'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { ExperimentCard } from '@/components/play/ExperimentCard'
import { Vinyl } from '@/components/experiments/Vinyl/Vinyl'

export const metadata: Metadata = {
  title: 'Play',
  description: 'Interactive experiments and live component demos by Shuyuan.',
  openGraph: {
    title: '$ ls ./play — shu/dev',
    description: 'Interactive experiments and live component demos.',
  },
}

export default async function PlayPage() {
  const experiments = await getExperiments()

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex flex-col gap-10 px-10 pb-10 pt-10">
        {/* Hero */}
        <div className="flex flex-col gap-2">
          <TerminalPrompt className="text-sm text-fg-muted">
            cd /play
          </TerminalPrompt>
          <TerminalPrompt className="text-sm text-fg-muted">
            ls -la
          </TerminalPrompt>
          <p className="mt-2 font-mono text-xs text-fg-subtle">
            {experiments.length} experiment{experiments.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {experiments.length === 0 ? (
          <p className="font-mono text-sm text-fg-muted">No experiments published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {experiments.map(exp => (
              <ExperimentCard
                key={exp.slug}
                experiment={exp}
                previewContent={
                  exp.slug === 'vinyl'
                    ? <Vinyl isPlaying size={120} />
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
