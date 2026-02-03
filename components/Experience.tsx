import { Sparkles, Flame, Code, ChevronsUpDown } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      icon: Sparkles,
      iconColor: "text-foreground",
      company: "Shadcraft",
      title: "Design Engineer",
      type: "Part-time",
      date: "01.2026 – ∞",
      statusColor: "bg-[#3B82F6]",
      technologies: [
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "shadcn/registry",
        "Figma",
      ],
    },
    {
      icon: Flame,
      iconColor: "text-[#F97316]",
      company: "Simplamo Enterprise JSC",
      title: "Senior Frontend Developer",
      type: "Full-time",
      date: "10.2022 – ∞",
      statusColor: "bg-[#3B82F6]",
      technologies: [
        ["TypeScript", "Next.js", "React Native", "MobX", "MobX-State-Tree", "Tailwind CSS", "Dify"],
        ["Zalo Mini App", "Agile", "Teamwork", "Research", "Problem-solving"],
      ],
    },
  ];

  return (
    <section className="flex w-full flex-col gap-6">
      <h3 className="font-primary text-[32px] font-semibold text-foreground">
        Experience
      </h3>
      <div className="flex flex-col gap-4">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 border border-border bg-card p-6"
          >
            <div className="flex w-full items-center gap-2">
              <exp.icon className={`h-5 w-5 ${exp.iconColor}`} />
              <h4 className="font-primary text-lg font-semibold text-foreground">
                {exp.company}
              </h4>
              <div className={`h-2 w-2 rounded-full ${exp.statusColor}`} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                <Code className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h5 className="font-primary text-base font-medium text-foreground">
                  {exp.title}
                </h5>
                <div className="flex items-center gap-2 font-secondary text-sm text-muted-foreground">
                  <span>{exp.type}</span>
                  <span>|</span>
                  <span>{exp.date}</span>
                </div>
              </div>
              <ChevronsUpDown className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
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
