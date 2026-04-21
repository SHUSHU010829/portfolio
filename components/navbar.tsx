"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { NowPlaying } from "@/components/ui/now-playing";
import { ResumeDownload } from "@/components/ui/resume-download";

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between px-4 sm:px-10">
      <h1 className="shrink-0 font-primary text-base font-semibold text-primary">
        $ shu/dev
      </h1>
      <div className="flex min-w-0 items-center gap-4">
        <NowPlaying />
        <ResumeDownload />
        <AnimatedThemeToggler
          className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Toggle theme"
        />
      </div>
    </nav>
  );
}
