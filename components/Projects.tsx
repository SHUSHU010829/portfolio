import { Upload, Infinity, Link, ChevronDown, X } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      icon: Upload,
      title: "React Wheel Picker",
      date: "05.2025 - ∞",
      description:
        "iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support. / Backed by ▲Vercel OSS Program",
      features: [
        "• 📱 Natural touch scrolling with smooth inertia effect",
        "• 🖱 Mouse drag and scroll support for desktop",
        "• 🔄 Infinite loop scrolling",
        "• 🎨 Unstyled components for complete style customization",
        "• ⚡ Easy installation via shadcn CLI",
      ],
      technologies: [
        ["Open Source", "React", "TypeScript", "Monorepo", "Turborepo", "pnpm-workspace", "Package Publishing"],
        ["NPM Registry", "GitHub Actions"],
      ],
      expanded: true,
    },
    {
      icon: Infinity,
      title: "chanhdai.com",
      date: "01.2025 - ∞",
      expanded: false,
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-end gap-1">
        <h3 className="font-primary text-[32px] font-bold text-foreground">
          Projects
        </h3>
        <span className="font-primary text-lg text-muted-foreground">(12)</span>
      </div>
      <div className="flex flex-col gap-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
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
                <Link className="h-5 w-5 text-muted-foreground" />
                {project.expanded ? (
                  <X className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            {project.expanded && project.description && (
              <>
                <p className="font-secondary text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.features && (
                  <div className="flex flex-col gap-3">
                    {project.features.map((feature, i) => (
                      <p
                        key={i}
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
                        {row.map((tech, i) => (
                          <span
                            key={i}
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
