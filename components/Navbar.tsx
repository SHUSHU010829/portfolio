"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between px-10">
      <h1 className="font-primary text-base font-semibold text-primary">
        $ shu/dev
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#22c55e]" />
          <span className="font-primary text-sm text-muted-foreground">
            Now Playing
          </span>
          <span className="font-primary text-sm font-medium text-primary">
            Lofi Beats
          </span>
        </div>
        <AnimatedThemeToggler
          className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary rounded"
          aria-label="Toggle theme"
        />
      </div>
    </nav>
  );
}
