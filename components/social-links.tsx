import { Github, Linkedin, Twitter, Mail, type LucideIcon } from "lucide-react";
import resumeData from "@/data/resume.json";
import type { ResumeData } from "@/types/resume";

const data = resumeData as ResumeData;

// Map network name to icon component
const NETWORK_ICONS: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};

export default function SocialLinks() {
  const links = [
    ...data.basics.profiles.map((profile) => ({
      icon: NETWORK_ICONS[profile.network] || Mail,
      label: profile.network,
      href: profile.url,
    })),
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${data.basics.email}`,
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Social Links
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex h-10 items-center gap-3 border border-border bg-card px-5 transition-all duration-200 hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            <link.icon className="h-4 w-4 text-foreground" />
            <span className="font-secondary text-sm text-foreground">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
