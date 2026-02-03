export default function About() {
  const fonts = [
    "JetBrains Mono - UI & Code",
    "IBM Plex Mono - Content",
    "Fira Code - Development",
  ];

  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} About
      </h3>
      <div className="flex flex-col gap-5 border border-border bg-card p-6">
        <h4 className="font-primary text-lg font-semibold text-foreground">
          $ whoami
        </h4>
        <p className="font-secondary text-sm leading-relaxed text-muted-foreground">
          Passionate developer focused on creating elegant solutions to complex
          problems. I specialize in full-stack development with a keen eye for
          design and user experience.
        </p>
        <div className="flex flex-col gap-2">
          <h5 className="font-primary text-sm font-semibold text-foreground">
            Preferred Fonts:
          </h5>
          <div className="flex flex-col gap-2">
            {fonts.map((font, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="font-primary text-sm text-primary">&gt;</span>
                <span className="font-secondary text-sm text-muted-foreground">
                  {font}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
