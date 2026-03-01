"use client";

import { useEffect, useState } from "react";

type NowPlayingData =
  | { isPlaying: true; title: string; artist: string; songUrl: string }
  | { isPlaying: false };

const POLL_INTERVAL_MS = 30_000;

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error("fetch failed");
        const json: NowPlayingData = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ isPlaying: false });
      }
    }

    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Loading state — keep same layout width to avoid shift
  if (data === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse" />
        <span className="font-primary text-sm text-muted-foreground">
          Loading…
        </span>
      </div>
    );
  }

  if (!data.isPlaying) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
        <span className="font-primary text-sm text-muted-foreground">
          Not Playing
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-[#22c55e]" />
      <span className="font-primary text-sm text-muted-foreground">
        Now Playing
      </span>
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-primary text-sm font-medium text-primary hover:underline"
      >
        {data.title}
      </a>
      <span className="font-primary text-sm text-muted-foreground">
        — {data.artist}
      </span>
    </div>
  );
}
