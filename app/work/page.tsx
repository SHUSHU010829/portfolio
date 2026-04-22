import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getCaseStudies } from '@/lib/content'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies and engineering work by Shuyuan.',
}

export default async function WorkPage() {
  const studies = await getCaseStudies()

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex flex-col gap-10 px-10 pb-10 pt-10">
        <TerminalPrompt className="text-sm text-fg-muted">
          ls ./case-studies
        </TerminalPrompt>

        {studies.length === 0 ? (
          <p className="font-mono text-sm text-fg-muted">No case studies published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {studies.map(study => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col gap-4 border border-border bg-bg-elevated p-6 hover:border-border-hover transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Cover image */}
                {study.coverImage && (
                  <div className="relative aspect-video w-full overflow-hidden bg-bg-overlay">
                    <Image
                      src={study.coverImage}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <h2 className="font-mono text-base font-semibold text-fg group-hover:text-accent transition-colors duration-fast">
                    {study.title}
                  </h2>
                  {study.subtitle && (
                    <p className="font-mono text-sm text-fg-muted">{study.subtitle}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-fg-subtle">
                    {study.role && <span>{study.role}</span>}
                    {study.year && (
                      <>
                        <span>·</span>
                        <span>{study.year}</span>
                      </>
                    )}
                  </div>
                  {study.stack && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {study.stack.map(t => (
                        <span
                          key={t}
                          className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
