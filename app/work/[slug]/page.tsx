import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCaseStudies, getCaseStudy } from '@/lib/content'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const studies = await getCaseStudies()
  return studies.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudy(slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      images: study.coverImage ? [study.coverImage] : ['/og-image.png'],
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  if (!study) notFound()

  // Dynamically import the MDX file
  let Content: React.ComponentType | null = null
  try {
    const mod = await import(`@/content/work/${slug}.mdx`)
    Content = mod.default
  } catch {
    notFound()
  }

  // Prev / Next navigation
  const allStudies = await getCaseStudies()
  const idx = allStudies.findIndex(s => s.slug === slug)
  const prev = idx > 0 ? allStudies[idx - 1] : null
  const next = idx < allStudies.length - 1 ? allStudies[idx + 1] : null

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
          <Link href="/work" className="hover:text-fg transition-colors duration-fast">
            work
          </Link>
          {' > '}
          <span className="text-fg-muted">{slug}</span>
        </nav>

        {/* Header */}
        <TerminalPrompt className="text-sm">
          cat {slug}.md
        </TerminalPrompt>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 font-mono text-sm text-fg-muted border-b border-border pb-6">
          <span>{study.role}</span>
          <span>·</span>
          <span>{study.year}</span>
          {study.stack && (
            <>
              <span>·</span>
              <div className="flex flex-wrap gap-1">
                {study.stack.map(t => (
                  <span
                    key={t}
                    className="rounded border border-border px-1.5 py-0.5 text-[10px] text-fg-subtle"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
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
            aria-label="Case study navigation"
          >
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
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
                href={`/work/${next.slug}`}
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
