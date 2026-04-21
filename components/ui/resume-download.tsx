import { Download } from "lucide-react";

export function ResumeDownload() {
  return (
    <a
      href="/resume.pdf"
      download="shuyuan-chuang-resume.pdf"
      aria-label="Download resume PDF"
      className="flex shrink-0 items-center gap-2 rounded-sm p-1 font-primary text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:p-0"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">$ cat resume.pdf</span>
    </a>
  );
}
