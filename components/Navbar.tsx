"use client";

import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return (savedTheme as "light" | "dark") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.style.colorScheme = theme;
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Failed to persist theme:", error);
    }
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
          className="flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:bg-secondary rounded"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </nav>
  );
}
