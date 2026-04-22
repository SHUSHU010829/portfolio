'use client'

import Link from 'next/link'
import { projects } from '@/content/projects'
import { cn } from '@/lib/utils'

export default function Projects() {
  return (
    <section className="flex w-full flex-col gap-6">
      <h3 className="font-mono text-sm font-semibold text-accent">
        {'$ '}ls -la ./projects
      </h3>

      {/* Desktop: ls-style table */}
      <div className="hidden md:flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-x-6 px-3 py-1 font-mono text-xs text-fg-subtle select-none border-b border-border">
          <span>name</span>
          <span>description</span>
          <span>stack</span>
        </div>

        {projects.map(project => {
          const isInternal = project.href.startsWith('/')
          return (
            <Link
              key={project.title}
              href={project.href}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className={cn(
                'group relative grid grid-cols-[auto_1fr_auto] gap-x-6 px-3 py-2',
                'font-mono text-sm text-fg-muted',
                'border-b border-border',
                'hover:bg-accent-dim hover:text-fg',
                'transition-colors duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
              )}
            >
              {/* > left indicator */}
              <span className="invisible text-accent text-xs group-hover:visible select-none w-3">
                &gt;
              </span>
              <div className="flex min-w-0 items-baseline gap-4">
                <span className="shrink-0 font-semibold text-fg group-hover:text-accent transition-colors duration-fast">
                  {project.title}
                </span>
                <span className="hidden lg:block text-fg-subtle text-xs truncate">
                  {project.date}
                </span>
                <span className="truncate text-fg-muted">{project.description}</span>
              </div>
              <div className="flex shrink-0 flex-wrap gap-1 justify-end">
                {project.stack.slice(0, 3).map(t => (
                  <span
                    key={t}
                    className="rounded border border-border px-1.5 py-0.5 text-[10px] text-fg-subtle"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Mobile: card fallback */}
      <div className="flex flex-col gap-3 md:hidden">
        {projects.map(project => {
          const isInternal = project.href.startsWith('/')
          return (
            <Link
              key={project.title}
              href={project.href}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className={cn(
                'flex flex-col gap-2 border border-border bg-bg-elevated p-4',
                'hover:border-border-hover hover:bg-accent-dim',
                'transition-colors duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-fg">{project.title}</span>
                <span className="shrink-0 font-mono text-xs text-fg-subtle">{project.date}</span>
              </div>
              <p className="font-mono text-xs text-fg-muted">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.stack.map(t => (
                  <span
                    key={t}
                    className="rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-fg-subtle"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
