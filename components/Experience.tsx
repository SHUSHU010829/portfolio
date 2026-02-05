"use client";

import { Code, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      statusColor: "bg-[#3B82F6]",
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
      statusColor: "bg-[#3B82F6]",
      showStatus: false,
      technologies: [["React Native", "Redux", "React Hooks", "RESTful API"]],
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
            key={idx}
            className="flex flex-col gap-4 border border-border bg-card p-6"
          >
            {/* Company name row */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground p-1">
                <div className="relative h-full w-full">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <Link
                href={exp.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-primary font-semibold text-foreground transition-colors hover:text-primary"
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
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Code className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h5 className="font-primary text-sm font-semibold text-foreground">
                  {exp.title}
                </h5>
                <div className="flex items-center gap-2 font-secondary text-sm text-muted-foreground">
                  <span>{exp.type}</span>
                  <span>|</span>
                  <span>{exp.date}</span>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(idx)}
                className="flex-shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Toggle details"
              >
                {expandedIndex === idx ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {expandedIndex === idx && exp.responsibilities && (
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
            )}

            <div className="ml-[44px] flex flex-col gap-2">
              {Array.isArray(exp.technologies[0]) ? (
                exp.technologies.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex flex-wrap gap-2">
                    {(row as string[]).map((tech, i) => (
                      <span
                        key={i}
                        className="rounded border border-border bg-secondary px-3 py-1.5 font-primary text-xs text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(exp.technologies as string[]).map((tech, i) => (
                    <span
                      key={i}
                      className="rounded border border-border bg-secondary px-3 py-1.5 font-primary text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
