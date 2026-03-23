"use client";

import { Code, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences = [
    {
      logo: "/relianz.png",
      company: "Relianz 友信創新",
      companyLink: "https://relianz.tw/",
      title: "Frontend Engineer",
      type: "Full-time",
      date: "09.2023 – now",
      statusColor: "bg-status-indicator",
      showStatus: true,
      technologies: [
        "TypeScript",
        "Next.js",
        "React",
        "Go",
        "Tailwind CSS",
        "Playwright",
        "AI-driven Development",
      ],
      responsibilities: [
        "FinTech platform for automated business registration and cloud accounting systems.",
        {
          text: "Key Contributions:",
          subItems: [
            "Maintained dual product lines solo during restructuring, helping achieve profitability in 2024 (10K+ monthly vouchers, 100+ enterprise clients)",
            "Built full-stack payment system (Go + ECPay) enabling automated subscription revenue",
            "Designed precision tax calculation engine and Virtual List optimization (70%+ performance boost)",
            "Established AI-driven workflow with layered architecture (Logic/Validation/UI/Service separation)",
            "Delivered end-to-end UI/UX and testing infrastructure (Unit Tests, Playwright E2E)",
          ],
        },
      ],
    },
    {
      logo: "/softmobile.png",
      company: "SoftMobile Technology Corporation 精誠隨想",
      companyLink: "https://www.softmobile.com.tw/",
      title: "Frontend Intern",
      type: "Full-time",
      date: "07.2022 – 08.2023",
      statusColor: "bg-status-indicator",
      showStatus: false,
      technologies: ["React Native", "Redux", "React Hooks", "RESTful API"],
      responsibilities: [
        "Revamped a webpage, and developed a testing system and account management systems.",
        "Built RWD website and Android & iOS applications with React, React Native, JavaScript, CSS, MUI, Bootstrap, and more.",
        "Managed states by using Redux and React Hooks, and retrieve data from the back end using RESTful API.",
      ],
    },
  ];

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
          <div
            key={exp.company}
            className="flex flex-col gap-4 border border-border bg-card p-6"
          >
            {/* Company name row */}
            <div className="flex min-w-0 items-center gap-3">
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
              <Link
                href={exp.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 font-primary font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm break-words"
              >
                {exp.company}
              </Link>
              {exp.showStatus && (
                <div
                  className={`status-glow h-2 w-2 flex-shrink-0 rounded-full ${exp.statusColor}`}
                />
              )}
            </div>

            {/* Job title row */}
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Code className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h5 className="font-primary text-sm font-semibold text-foreground break-words">
                  {exp.title}
                </h5>
                <div className="flex min-w-0 items-center gap-2 font-secondary text-sm text-muted-foreground">
                  <span className="shrink-0">{exp.type}</span>
                  <span className="shrink-0">|</span>
                  <span className="shrink-0">{exp.date}</span>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(idx)}
                className="flex-shrink-0 cursor-pointer text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                aria-label="Toggle details"
              >
                <motion.div
                  animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {expandedIndex === idx && exp.responsibilities && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-[44px] flex flex-col gap-3 border-l-2 border-primary pl-4">
                    {exp.responsibilities.map((item, i) => {
                      if (typeof item === "string") {
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            <p className="font-secondary text-sm text-muted-foreground">
                              {item}
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div key={i} className="flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              <p className="font-secondary text-sm font-medium text-foreground">
                                {item.text}
                              </p>
                            </div>
                            <div className="ml-4 flex flex-col gap-2">
                              {item.subItems?.map((subItem, j) => (
                                <div key={j} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                                  <p className="font-secondary text-sm text-muted-foreground">
                                    {subItem}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    })}
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
        ))}
      </div>
    </section>
  );
}
