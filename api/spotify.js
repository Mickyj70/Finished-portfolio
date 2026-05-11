/**
 * api/spotify.js  –  tiny Bun server
 *
 * Endpoints
 *   GET  /api/now-playing   →  { track: Track | null }
 *   GET  /health            →  200 OK
 *
 * Run:
 *   bun run api/spotify.js
 */

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const PORT          = Number(process.env.API_PORT ?? 3001);

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error(
    "Missing env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN"
  );
  process.exit(1);
}

// ─── token cache ─────────────────────────────────────────────────────────────

let cachedToken   = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 30_000) return cachedToken;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken    = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;
  return cachedToken;
}

// ─── fetch currently playing ─────────────────────────────────────────────────

async function fetchCurrentlyPlaying() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // 204 = nothing playing
  if (res.status === 204 || res.status === 404) return null;

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify API error (${res.status}): ${text}`);
  }

  const data = await res.json();

  // Only return actual tracks (skip podcasts / local files)
  if (data.currently_playing_type !== "track" || !data.item) return null;

  const item   = data.item;
  const album  = item.album;
  const artist = item.artists.map((a) => a.name).join(", ");
  const image  = album.images?.[0]?.url ?? null;

  return {
    title:      item.name,
    artist,
    album:      album.name,
    image,
    url:        item.external_urls?.spotify ?? null,
    isPlaying:  data.is_playing,
    progress:   data.progress_ms,
    duration:   item.duration_ms,
    source:     "spotify",
  };
}

// ─── CORS helper ─────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// ─── server ──────────────────────────────────────────────────────────────────

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (url.pathname === "/health") {
      return new Response("OK", { status: 200 });
    }

    if (url.pathname === "/api/now-playing") {
      try {
        const track = await fetchCurrentlyPlaying();
        return json({ track });
      } catch (err) {
        console.error("[spotify api]", err.message);
        return json({ track: null, error: err.message }, 500);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🎵 Spotify now-playing API listening on http://localhost:${PORT}`);
