export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  location: string;
  type: "work" | "education";
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Your Company",
    position: "Senior Frontend Developer",
    duration: "2023 - Present",
    description: [
      "Led frontend development team of 5 developers",
      "Implemented modern React applications with Next.js",
      "Improved application performance by 40%",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    location: "Remote",
    type: "work",
  },
  {
    company: "University Name",
    position: "Computer Science Degree",
    duration: "2019 - 2023",
    description: [
      "Bachelor's degree in Computer Science",
      "Focus on web development and software engineering",
      "Graduated with honors",
    ],
    technologies: ["Java", "Python", "JavaScript", "React"],
    location: "Taiwan",
    type: "education",
  },
];