"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { title: "Portfolio", href: "/" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Top full-width horizontal line */}
      <div className="absolute left-0 top-0 h-px w-full"></div>

      {/* Vertical lines for the entire header */}
      <div className="relative mx-auto h-full max-w-3xl">
        {/* Left vertical line */}
        <div className="absolute bottom-0 left-0 top-0 w-px border border-border/30" />
        {/* Right vertical line */}
        <div className="absolute bottom-0 right-0 top-0 w-px border border-border/30" />
      </div>

      {/* Top padding area */}
      <div className="relative pt-2"></div>

      {/* Horizontal line between padding and header content */}
      <div
        className="absolute left-0 h-px w-full border-t border-border/30"
        style={{ top: "0.5rem" }}
      ></div>

      <div className="relative mx-auto flex h-12 max-w-3xl items-center justify-end px-4">
        {/* Left vertical line */}
        <div className="absolute bottom-0 left-0 top-0 w-px border-l border-border/30" />
        {/* Right vertical line */}
        <div className="absolute bottom-0 right-0 top-0 w-px border-r border-border/30" />
        <button
          className="mr-2 inline-flex h-9 items-center justify-center rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Menu</span>
        </button>

        <div className="hidden items-center space-x-6 md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="h-4 w-[0.3px] border border-border/30" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="relative mx-auto grid max-w-3xl gap-6 p-6 px-4">
            {/* Left vertical line */}
            <div className="absolute bottom-0 left-0 top-0 w-px border border-border/30" />
            {/* Right vertical line */}
            <div className="absolute bottom-0 right-0 top-0 w-px border border-border/30" />
            <nav className="grid gap-6 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    "text-foreground/60"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                setIsMenuOpen(false);
              }}
              className="justify-start"
            >
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute ml-0 mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              Toggle theme
            </Button>
          </div>
        </div>
      )}

      {/* Bottom full-width horizontal line */}
      <div className="absolute bottom-0 left-0 h-px w-full border-b border-border/30"></div>
    </header>
  );
}
