import { USER } from "@/features/portfolio/data/user";

export function Footer() {
  return (
    <footer className="relative py-4">
      {/* Top full-width horizontal line extending to screen edges */}
      <div className="absolute top-0 left-1/2 h-px w-[100vw] -translate-x-1/2 border-t border-border/30"></div>
      {/* Bottom full-width horizontal line extending to screen edges */}
      <div className="absolute bottom-0 left-1/2 h-px w-[100vw] -translate-x-1/2 border-b border-border/30"></div>

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        {/* Left vertical line - extends beyond the py-4 padding */}
        <div className="absolute bottom-[-1rem] left-0 top-[-1rem] w-px border-l border-border/30" />
        {/* Right vertical line - extends beyond the py-4 padding */}
        <div className="absolute bottom-[-1rem] right-0 top-[-1rem] w-px border-r border-border/30" />
        <p className="text-xs text-muted-foreground">
          Built by {USER.displayName}.
        </p>
      </div>
    </footer>
  );
}