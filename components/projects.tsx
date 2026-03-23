"use client";

import { Upload, Link, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const projects = [
    {
      icon: Upload,
      title: "DailyVal Social",
      date: "10.2025 - ∞",
      projectLink: "https://social.dailyval.com",
      description:
        "A modern social platform designed for iOS App ecosystem with Apple CloudKit as backend storage solution. Features seamless iCloud integration, multi-language support, and responsive design.",
      features: [
        "• 🔐 Apple CloudKit Integration - Native iOS ecosystem support",
        "• 🌍 Internationalization - Multi-language interface",
        "• 🎨 Modern UI/UX - Radix UI + Tailwind CSS design system",
        "• 📱 Responsive Design - Perfect for desktop, tablet, and mobile",
        "• 🌙 Dark Mode - System-level theme switching",
        "• ⚡ Infinite Scroll - Smooth content loading experience",
      ],
      technologies: [
        ["Next.js", "TypeScript", "React", "Apple CloudKit"],
        ["Tailwind CSS", "Radix UI", "Framer Motion"],
      ],
    },
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Projects
      </h3>
      <div className="flex flex-col gap-4">
        {projects.map((project, idx) => (
          <div
            key={project.title}
            className="flex flex-col gap-6 border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <project.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-primary text-base font-semibold text-foreground">
                    {project.title}
                  </h4>
                  <span className="font-primary text-[13px] text-muted-foreground">
                    {project.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} project link`}
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  <Link className="h-4 w-4" />
                </a>
                <button
                  onClick={() => toggleExpand(idx)}
                  className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Toggle details"
                >
                  {expandedIndex === idx ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {expandedIndex === idx && project.description && (
              <>
                <p className="font-secondary text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.features && (
                  <div className="flex flex-col gap-3">
                    {project.features.map((feature) => (
                      <p
                        key={feature}
                        className="font-secondary text-sm text-muted-foreground"
                      >
                        {feature}
                      </p>
                    ))}
                  </div>
                )}
                {project.technologies && (
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
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
