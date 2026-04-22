'use client'

import { Code, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { experience } from '@/content/experience'

export default function Experience() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const toggleExpand = (idx: number) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <h3 className="font-mono text-sm font-semibold text-accent">
        {'// '}Experience
      </h3>
      <div className="flex flex-col gap-4">
        {experience.map((exp, idx) => (
          <div
            key={exp.company}
            className="flex flex-col gap-4 border border-border bg-bg-elevated p-6"
          >
            {/* Company row */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-elevated border border-border p-1">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={24}
                  height={24}
                  loading="lazy"
                  className="object-contain"
                />
              </div>
              <Link
                href={exp.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 font-mono font-semibold text-fg transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm break-words"
              >
                {exp.company}
              </Link>
              {exp.showStatus && (
                <div className={`status-glow h-2 w-2 flex-shrink-0 rounded-full bg-status-indicator`} />
              )}
            </div>

            {/* Title row */}
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-bg-overlay">
                <Code className="h-4 w-4 text-fg-muted" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h5 className="font-mono text-sm font-semibold text-fg break-words">
                  {exp.title}
                </h5>
                <div className="flex min-w-0 items-center gap-2 font-mono text-sm text-fg-muted">
                  <span className="shrink-0">{exp.type}</span>
                  <span className="shrink-0">|</span>
                  <span className="shrink-0">{exp.date}</span>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(idx)}
                className="flex-shrink-0 cursor-pointer text-fg-muted transition-colors duration-fast hover:text-fg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
                aria-expanded={expanded.has(idx)}
                aria-label="Toggle details"
              >
                <motion.div
                  animate={{ rotate: expanded.has(idx) ? 180 : 0 }}
                  transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {expanded.has(idx) && exp.responsibilities && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-[44px] flex flex-col gap-3 border-l-2 border-accent pl-4">
                    {exp.responsibilities.map((item, i) =>
                      typeof item === 'string' ? (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          <p className="font-mono text-sm text-fg-muted">{item}</p>
                        </div>
                      ) : (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <p className="font-mono text-sm font-medium text-fg">{item.text}</p>
                          </div>
                          <div className="ml-4 flex flex-col gap-2">
                            {item.subItems.map((sub, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-fg-muted" />
                                <p className="font-mono text-sm text-fg-muted">{sub}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                    )}

                    {/* Case study link */}
                    {exp.workSlug && (
                      <div className="mt-1">
                        <Link
                          href={`/work/${exp.workSlug}`}
                          className="font-mono text-sm text-accent hover:text-accent-hover transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                        >
                          → Read full case: /work/{exp.workSlug}
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="ml-[44px] flex flex-wrap gap-2">
              {exp.technologies.map(tech => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-bg-overlay px-3 py-1.5 font-mono text-xs text-fg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
