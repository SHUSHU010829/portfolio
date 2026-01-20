export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planning";
}

export const PROJECTS: Project[] = [
  {
    title: "Modern Portfolio Website",
    description: "A modern developer portfolio built with Next.js 16 and Tailwind CSS v4",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://chanhdai.com",
    github: "https://github.com/yourusername/portfolio",
    image: "/projects/portfolio.png",
    featured: true,
    status: "completed",
  },
  {
    title: "Component Library",
    description: "Reusable React components built with shadcn/ui and Radix UI",
    technologies: ["React", "TypeScript", "Radix UI", "shadcn/ui"],
    github: "https://github.com/yourusername/components",
    featured: true,
    status: "in-progress",
  },
];