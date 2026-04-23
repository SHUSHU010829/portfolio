/**
 * Type definitions for resume.json
 * Single source of truth shared between the website and the Typst PDF template.
 */

export interface Profile {
  network: "GitHub" | "LinkedIn" | "Twitter" | "Email" | string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  nameZh?: string;
  nickname?: string;
  title: string;
  location: string;
  locationTimezone: string;
  email: string;
  portfolio: string;
  profiles: Profile[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyZh?: string;
  companyUrl?: string;
  logo?: string | null;
  role: string;
  employmentType:
    | "Full-time"
    | "Contract"
    | "Internship"
    | "Part-time"
    | string;
  /** ISO format YYYY-MM */
  startDate: string;
  /** ISO format YYYY-MM, or null for current positions */
  endDate: string | null;
  location?: string;
  showStatus?: boolean;
  subtitle?: string | null;
  highlights: string[];
  technologies: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  url?: string;
  /** ISO format YYYY-MM */
  startDate: string;
  endDate: string | null;
  tagline?: string;
  description: string;
  features?: string[];
  /** 2D array: each inner array is a row of tech tags */
  technologies: string[][];
  showOnWebsite: boolean;
  showOnResume: boolean;
  relatedExperienceId?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  institutionZh?: string;
  degree: string;
  /** ISO format YYYY-MM */
  startDate: string;
  endDate: string;
  location?: string;
  highlights: string[];
}

export interface ResumeData {
  meta: {
    version: string;
    lastUpdated: string;
    note?: string;
  };
  basics: Basics;
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
}

// ---------- Helper utilities ----------

/**
 * Format an ISO date (YYYY-MM) into a human-readable display string.
 * @example formatDate("2023-09") => "Sep 2023"
 * @example formatDate(null) => "Present"
 */
export function formatDate(isoDate: string | null): string {
  if (!isoDate) return "Present";
  const [year, month] = isoDate.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIdx = parseInt(month, 10) - 1;
  return `${monthNames[monthIdx]} ${year}`;
}

/**
 * Format a date range.
 * @example formatDateRange("2023-09", null) => "Sep 2023 – Present"
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null
): string {
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

/**
 * Format a date range in the compact style used by the website's cards.
 * @example formatDateRangeCompact("2023-09", null) => "09.2023 – now"
 */
export function formatDateRangeCompact(
  startDate: string,
  endDate: string | null
): string {
  const compact = (d: string) => {
    const [year, month] = d.split("-");
    return `${month}.${year}`;
  };
  const end = endDate ? compact(endDate) : "now";
  return `${compact(startDate)} – ${end}`;
}
