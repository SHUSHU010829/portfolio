import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function SocialLinks() {
  const links = [
    { icon: Github, label: "GitHub", href: "https://github.com/SHUSHU010829" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shuyuanchuang",
    },
    { icon: Twitter, label: "Twitter", href: "https://x.com/shuyuan010829" },
    { icon: Mail, label: "Email", href: "mailto:shuyuan010829@gmail.com" },
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
            className="flex h-10 items-center gap-3 border border-border bg-card px-5 transition-colors hover:bg-secondary"
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
