"use client";

import { Upload, Link, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import resumeData from "@/data/resume.json";
import type { ResumeData, ProjectEntry } from "@/types/resume";
import { formatDateRangeCompact } from "@/types/resume";

const data = resumeData as ResumeData;

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Only show projects flagged for the website
  const projects = data.projects.filter((p) => p.showOnWebsite);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  if (projects.length === 0) return null;

  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Projects
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
  );
}

function ProjectCard({
  project,
  isExpanded,
  onToggle,
}: {
  project: ProjectEntry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 border border-border bg-card p-6">
      <div className="flex min-w-0 items-center justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Upload className="h-5 w-5 text-foreground" />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <h4 className="font-primary text-base font-semibold text-foreground break-words">
              {project.name}
            </h4>
            <span className="font-primary text-[13px] text-muted-foreground shrink-0">
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
              className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              <Link className="h-4 w-4" />
            </a>
          )}
          <button
            onClick={onToggle}
            className="cursor-pointer text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label="Toggle details"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              <p className="font-secondary text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {project.features && project.features.length > 0 && (
                <div className="flex flex-col gap-3">
                  {project.features.map((feature) => (
                    <p
                      key={feature}
                      className="font-secondary text-sm text-muted-foreground"
                    >
                      • {feature}
                    </p>
                  ))}
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-col gap-2">
                  {project.technologies.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex flex-wrap gap-2">
                      {row.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-secondary px-3 py-1.5 font-primary text-xs text-muted-foreground"
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
  );
}
