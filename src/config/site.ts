import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: "SHU.舒",
  url: process.env.APP_URL || "https://shuyuan.dev",
  ogImage: "/og.png",
  description: "Modern developer portfolio and component library",
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript"],
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Components",
    href: "/components",
  },
];

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
