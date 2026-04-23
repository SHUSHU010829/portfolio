'use client'

import { Upload, Link as LinkIcon, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import resumeData from '@/data/resume.json'
import type { ResumeData, ProjectEntry } from '@/types/resume'
import { formatDateRangeCompact } from '@/types/resume'

const data = resumeData as ResumeData

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const projects = data.projects.filter(p => p.showOnWebsite)

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  if (projects.length === 0) return null

  return (
    <section className="flex w-full flex-col gap-6">
      <h3 className="font-mono text-sm font-semibold text-accent">
        {'$ '}ls -la ./projects
      </h3>
      <div className="flex flex-col gap-4">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedIndex === idx}
            onToggle={() => toggleExpand(idx)}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  isExpanded,
  onToggle,
}: {
  project: ProjectEntry
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex flex-col gap-6 border border-border bg-bg-elevated p-6">
      <div className="flex min-w-0 items-center justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-bg-overlay">
            <Upload className="h-5 w-5 text-fg" />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <h4 className="font-mono text-base font-semibold text-fg break-words">
              {project.name}
            </h4>
            <span className="font-mono text-[13px] text-fg-subtle shrink-0">
              {formatDateRangeCompact(project.startDate, project.endDate)}
            </span>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} project link`}
              className="text-fg-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            >
              <LinkIcon className="h-4 w-4" />
            </a>
          )}
          <button
            onClick={onToggle}
            className="cursor-pointer text-fg-muted transition-colors duration-fast hover:text-fg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            aria-expanded={isExpanded}
            aria-label="Toggle details"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              <p className="font-mono text-sm leading-relaxed text-fg-muted">
                {project.description}
              </p>
              {project.features && project.features.length > 0 && (
                <div className="flex flex-col gap-3">
                  {project.features.map(feature => (
                    <p key={feature} className="font-mono text-sm text-fg-muted">
                      • {feature}
                    </p>
                  ))}
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-col gap-2">
                  {project.technologies.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex flex-wrap gap-2">
                      {row.map(tech => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-bg-overlay px-3 py-1.5 font-mono text-xs text-fg-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
