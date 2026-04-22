export const revalidate = 60

type TwitchTokenResponse = {
  access_token: string
  expires_in: number
}

type TwitchStreamResponse = {
  data: Array<{
    id: string
    user_login: string
    user_name: string
    game_name: string
    title: string
    viewer_count: number
    started_at: string
    thumbnail_url: string
  }>
}

// In-memory token cache (valid for server lifetime / redeployment)
let cachedToken: { token: string; expiresAt: number } | null = null

async function getAppAccessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET

  if (!clientId || !clientSecret) return null

  try {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: 'POST' },
    )
    const data = (await res.json()) as TwitchTokenResponse
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000 - 60_000,
    }
    return data.access_token
  } catch {
    return null
  }
}

export async function GET() {
  const clientId = process.env.TWITCH_CLIENT_ID
  const twitchLogin = process.env.TWITCH_LOGIN ?? 'shuyuandev'

  if (!clientId) {
    return Response.json({ isLive: false, stream: null })
  }

  const token = await getAppAccessToken()
  if (!token) {
    return Response.json({ isLive: false, stream: null })
  }

  try {
    const res = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${twitchLogin}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      },
    )
    const data = (await res.json()) as TwitchStreamResponse
    const stream = data.data[0] ?? null
    return Response.json({ isLive: stream !== null, stream })
  } catch {
    return Response.json({ isLive: false, stream: null })
  }
}
