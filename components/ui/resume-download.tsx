import { Download } from "lucide-react";

export function ResumeDownload() {
  return (
    <a
      href="/resume.pdf"
      download="shuyuan-chuang-resume.pdf"
      aria-label="Download resume PDF"
      className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-primary text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">
        $ cat resume.pdf
        <span aria-hidden="true" className="ml-0.5 animate-blink-cursor">_</span>
      </span>
    </a>
  );
}
