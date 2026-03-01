"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NowPlaying } from "@/components/ui/now-playing";

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between px-10">
      <h1 className="font-primary text-base font-semibold text-primary">
        $ shu/dev
      </h1>
      <div className="flex items-center gap-4">
        <NowPlaying />
        <AnimatedThemeToggler
          className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary rounded"
          aria-label="Toggle theme"
        />
      </div>
    </nav>
  );
}
