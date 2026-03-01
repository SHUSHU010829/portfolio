"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : true;
    setIsDark(dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newIsDark = !isDark;

    if (!document.startViewTransition) {
      flushSync(() => {
        setIsDark(newIsDark);
        document.documentElement.style.colorScheme = newIsDark
          ? "dark"
          : "light";
        localStorage.setItem("theme", newIsDark ? "dark" : "light");
      });
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(newIsDark);
        document.documentElement.style.colorScheme = newIsDark
          ? "dark"
          : "light";
        localStorage.setItem("theme", newIsDark ? "dark" : "light");
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, duration]);

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={className} {...props}>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
