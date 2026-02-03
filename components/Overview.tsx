export default function Overview() {
  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Overview
      </h3>
      <div className="grid gap-0 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:grid-cols-2">
        <div className="flex flex-col gap-6 bg-card p-8">
          <div className="flex flex-col gap-1">
            <span className="font-primary text-xs uppercase tracking-wide text-muted-foreground">
              $ Position
            </span>
            <span className="font-secondary text-base font-bold text-foreground">
              Frontend Developer
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-primary text-xs uppercase tracking-wide text-muted-foreground">
              $ Location
            </span>
            <span className="font-secondary text-base font-bold text-foreground">
              Taipei, Taiwan
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-secondary text-base font-bold text-primary">
              https://yoursite.dev
            </span>
            <span className="font-primary text-xs uppercase tracking-wide text-muted-foreground">
              $ Portfolio
            </span>
          </div>
        </div>
        <div className="h-px bg-border md:h-auto md:w-px" />
        <div className="flex flex-col gap-6 bg-card p-8">
          <div className="flex flex-col gap-1">
            <span className="font-primary text-xs uppercase tracking-wide text-muted-foreground">
              $ Email Address
            </span>
            <span className="font-secondary text-base font-bold text-foreground">
              dev@example.com
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-primary text-xs uppercase tracking-wide text-muted-foreground">
              $ Local Time
            </span>
            <span className="font-secondary text-base font-bold text-foreground">
              UTC+8 [GMT+8]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-primary text-sm font-bold text-primary">
              &gt;&gt;
            </span>
            <span className="font-primary text-sm font-bold text-primary">
              online
            </span>
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
