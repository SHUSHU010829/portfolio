import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 204 = nothing playing, 404 = no active device
    if (res.status === 204 || res.status === 404) {
      return NextResponse.json(
        { isPlaying: false },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.status}`);
    }

    const data = await res.json();

    // Only handle track type (not podcast episodes)
    if (!data.is_playing || data.currently_playing_type !== "track") {
      return NextResponse.json(
        { isPlaying: false },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const track = data.item;

    return NextResponse.json(
      {
        isPlaying: true,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        albumImageUrl: track.album.images[0]?.url ?? null,
        songUrl: track.external_urls.spotify,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[Spotify API]", error);
    return NextResponse.json(
      { isPlaying: false },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
