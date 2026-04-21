"use client";

import { Code, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import resumeData from "@/data/resume.json";
import type { ResumeData, ExperienceEntry } from "@/types/resume";
import { formatDateRangeCompact } from "@/types/resume";

const data = resumeData as ResumeData;

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const experiences = data.experience;

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section className="flex w-full flex-col gap-6">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Experience
      </h3>
      <div className="flex flex-col gap-4">
        {experiences.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            isExpanded={expandedIndex === idx}
            onToggle={() => toggleExpand(idx)}
          />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  isExpanded,
  onToggle,
}: {
  exp: ExperienceEntry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  // Compose the display name: "Company 中文名" if both exist, otherwise just company
  const displayCompany = exp.companyZh
    ? `${exp.company} ${exp.companyZh}`
    : exp.company;

  return (
    <div className="flex flex-col gap-4 border border-border bg-card p-6">
      {/* Company name row */}
      <div className="flex min-w-0 items-center gap-3">
        {exp.logo && (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-card border border-border p-1">
            <Image
              src={exp.logo}
              alt={`${exp.company} logo`}
              width={24}
              height={24}
              loading="lazy"
              className="object-contain"
            />
          </div>
        )}
        {exp.companyUrl ? (
          <Link
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 font-primary font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm break-words"
          >
            {displayCompany}
          </Link>
        ) : (
          <span className="min-w-0 font-primary font-semibold text-foreground break-words">
            {displayCompany}
          </span>
        )}
        {exp.showStatus && !exp.endDate && (
          <div className="status-glow h-2 w-2 flex-shrink-0 rounded-full bg-status-indicator" />
        )}
      </div>

      {/* Job title row */}
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Code className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h5 className="font-primary text-sm font-semibold text-foreground break-words">
            {exp.role}
          </h5>
          <div className="flex min-w-0 items-center gap-2 font-secondary text-sm text-muted-foreground">
            <span className="shrink-0">{exp.employmentType}</span>
            <span className="shrink-0">|</span>
            <span className="shrink-0">
              {formatDateRangeCompact(exp.startDate, exp.endDate)}
            </span>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="flex-shrink-0 cursor-pointer text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          aria-label="Toggle details"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>
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
            <div className="ml-[44px] flex flex-col gap-3 border-l-2 border-primary pl-4">
              {exp.subtitle && (
                <p className="font-secondary text-sm italic text-muted-foreground">
                  {exp.subtitle}
                </p>
              )}
              {exp.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <p className="font-secondary text-sm text-muted-foreground">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ml-[44px] flex flex-wrap gap-2">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border bg-secondary px-3 py-1.5 font-primary text-xs text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
