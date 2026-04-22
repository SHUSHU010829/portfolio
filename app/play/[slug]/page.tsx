import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getExperiments, getExperiment } from '@/lib/content'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'
import { MetaBar } from '@/components/play/MetaBar'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const experiments = await getExperiments()
  return experiments.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getExperiment(slug)
  if (!result) return {}
  const { meta } = result
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} — shu/dev`,
      description: meta.description,
    },
  }
}

export default async function PlayDetailPage({ params }: PageProps) {
  const { slug } = await params
  const result = await getExperiment(slug)

  if (!result) notFound()

  const { meta } = result

  let Content: React.ComponentType | null = null
  try {
    const mod = await import(`@/content/play/${slug}.mdx`)
    Content = mod.default
  } catch {
    notFound()
  }

  const allExperiments = await getExperiments()
  const idx = allExperiments.findIndex(e => e.slug === slug)
  const prev = idx > 0 ? allExperiments[idx - 1] : null
  const next = idx < allExperiments.length - 1 ? allExperiments[idx + 1] : null

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex flex-col gap-8 px-10 pb-10 pt-10">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs text-fg-subtle" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-fg transition-colors duration-fast">
            /
          </Link>
          {' > '}
          <Link href="/play" className="hover:text-fg transition-colors duration-fast">
            play
          </Link>
          {' > '}
          <span className="text-fg-muted">{slug}</span>
        </nav>

        {/* Header */}
        <TerminalPrompt className="text-sm">
          cat {slug}.mdx
        </TerminalPrompt>

        {/* Meta */}
        <div className="border-b border-border pb-6">
          <MetaBar
            difficulty={meta.difficulty}
            duration={meta.duration}
            stack={meta.stack}
          />
        </div>

        {/* MDX content */}
        <article className="prose-none max-w-none">
          {Content && <Content />}
        </article>

        {/* Closing cursor */}
        <div className="font-mono text-sm text-fg-muted mt-4">
          $ <TerminalCursor char="_" />
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav
            className="flex items-center justify-between border-t border-border pt-6 font-mono text-sm"
            aria-label="Experiment navigation"
          >
            {prev ? (
              <Link
                href={`/play/${prev.slug}`}
                className="flex flex-col gap-1 text-fg-muted hover:text-fg transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <span className="text-xs text-fg-subtle">← prev</span>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/play/${next.slug}`}
                className="flex flex-col gap-1 text-right text-fg-muted hover:text-fg transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <span className="text-xs text-fg-subtle">next →</span>
                <span>{next.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </main>
      <Footer />
    </div>
  )
}
