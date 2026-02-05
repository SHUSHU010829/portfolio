"use client";

import { useState, useEffect } from "react";

export default function Overview() {
  const [time, setTime] = useState<string | null>(null);
  const [timeDiff, setTimeDiff] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();

        // Calculate UTC+8 time (Asia/Taipei)
        const utc8Time = new Date(now.getTime() + 8 * 60 * 60 * 1000);
        const hours = String(utc8Time.getUTCHours()).padStart(2, "0");
        const minutes = String(utc8Time.getUTCMinutes()).padStart(2, "0");
        const seconds = String(utc8Time.getUTCSeconds()).padStart(2, "0");

        setTime(`${hours}:${minutes}:${seconds}`);

        // Calculate time difference
        const userOffset = -now.getTimezoneOffset() / 60; // User's timezone offset in hours
        const targetOffset = 8; // UTC+8
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
        <div className="flex flex-col gap-6 border-r border-border bg-card p-8">
          <div className="flex flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Position
            </span>
            <span className="font-secondary text-sm font-bold text-foreground">
              Frontend Developer
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Location
            </span>
            <span className="font-secondary text-sm font-bold text-foreground">
              Taipei, Taiwan
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Portfolio
            </span>
            <span className="font-secondary text-sm font-bold text-primary">
              https://shuyuan.dev
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-card p-8">
          <div className="flex flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Email Address
            </span>
            <span className="font-secondary text-sm font-bold text-foreground">
              shuyuan010829@gmail.com
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-primary text-[10px] uppercase tracking-wide text-muted-foreground">
              $ Local Time
            </span>
            <div className="flex items-center gap-2">
              <span className="font-secondary text-sm font-bold text-foreground">
                {time || "--:--:--"}
              </span>
              {timeDiff && (
                <span className="font-primary text-xs text-muted-foreground">
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
