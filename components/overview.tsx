"use client";

import { useState, useEffect } from "react";
import resumeData from "@/data/resume.json";
import type { ResumeData } from "@/types/resume";

const data = resumeData as ResumeData;

export default function Overview() {
  const [time, setTime] = useState<string | null>(null);
  const [timeDiff, setTimeDiff] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();

        const timeFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: data.basics.locationTimezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        setTime(timeFormatter.format(now));

        const userOffset = -now.getTimezoneOffset() / 60;
        const targetOffset = 8; // UTC+8 for Asia/Taipei
        const diff = targetOffset - userOffset;

        if (diff === 0) {
          setTimeDiff("// same time");
        } else if (diff > 0) {
          setTimeDiff(`// ${Math.abs(diff)}h ahead`);
        } else {
          setTimeDiff(`// ${Math.abs(diff)}h behind`);
        }
      } catch (error) {
        console.error("Failed to update time:", error);
        setTime("--:--:--");
        setTimeDiff("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex min-w-0 flex-col gap-6 border-r border-border bg-card p-4 sm:p-8">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Position
            </span>
            <span className="font-secondary text-sm font-bold text-foreground break-words">
              {data.basics.title}
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Location
            </span>
            <span className="font-secondary text-sm font-bold text-foreground break-words">
              {data.basics.location}
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Portfolio
            </span>
            <span className="font-secondary text-sm font-bold text-primary break-all">
              {data.basics.portfolio}
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-6 bg-card p-4 sm:p-8">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Email Address
            </span>
            <span className="font-secondary text-sm font-bold text-foreground break-all">
              {data.basics.email}
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Local Time
            </span>
            <div className="flex min-w-0 items-center gap-2">
              <span className="font-secondary text-sm font-bold text-foreground shrink-0">
                {time || "--:--:--"}
              </span>
              {timeDiff && (
                <span className="font-primary text-xs text-muted-foreground shrink-0">
                  {timeDiff}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
