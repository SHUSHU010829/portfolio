export interface TechCategory {
  category: string;
  technologies: {
    name: string;
    icon?: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
  }[];
}

export const TECH_STACK: TechCategory[] = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "TypeScript", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "JavaScript", level: "expert" },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", level: "advanced" },
      { name: "Express", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
    ],
  },
  {
    category: "Tools & Others",
    technologies: [
      { name: "Git", level: "advanced" },
      { name: "Docker", level: "intermediate" },
      { name: "Vercel", level: "advanced" },
      { name: "Figma", level: "intermediate" },
    ],
  },
];