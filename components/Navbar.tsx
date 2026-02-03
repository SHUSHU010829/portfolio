"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </nav>
  );
}
