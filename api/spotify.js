/**
 * api/spotify.js  –  multi-source "now playing" Bun server
 *
 * Sources
 *   1. Spotify  – live currently-playing (needs SPOTIFY_* env)
 *   2. Last.fm  – scrobbles from YouTube Music on Android via Pano Scrobbler
 *                 (needs LASTFM_API_KEY + LASTFM_USER)
 *
 * Merge priority
 *   1. Spotify if actively playing
 *   2. Last.fm if now-playing (covers YouTube Music scrobbles)
 *   3. Spotify paused session
 *   4. Last.fm most recent track
 *
 * Endpoints
 *   GET  /api/now-playing   →  { track: Track | null }
 *   GET  /api/blog          →  Hashnode proxy
 *   GET  /health            →  200 OK
 *
 * Run:
 *   bun run api/spotify.js
 *   # or: bun run api:dev
 */

const SPOTIFY_CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID?.trim();
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET?.trim();
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN?.trim();
const LASTFM_API_KEY        = process.env.LASTFM_API_KEY?.trim();
const LASTFM_USER           = process.env.LASTFM_USER?.trim();
const PORT                  = Number(process.env.API_PORT ?? 3001);
const HASHNODE_HOST         = process.env.VITE_HASHNODE_HOST || "mikesnrdev.hashnode.dev";
const HASHNODE_TOKEN        = process.env.HASHNODE_TOKEN || "";

const hasSpotify = Boolean(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET && SPOTIFY_REFRESH_TOKEN);
const hasLastFm  = Boolean(LASTFM_API_KEY && LASTFM_USER);

if (!hasSpotify && !hasLastFm) {
  console.error(`
Missing music sources. Configure at least one of:

  Spotify (live player):
    SPOTIFY_CLIENT_ID
    SPOTIFY_CLIENT_SECRET
    SPOTIFY_REFRESH_TOKEN

  Last.fm (YouTube Music on Android via Pano Scrobbler):
    LASTFM_API_KEY   – https://www.last.fm/api/account/create
    LASTFM_USER      – your Last.fm username
`);
  process.exit(1);
}

// ─── Spotify token cache ─────────────────────────────────────────────────────

let cachedToken    = null;
let tokenExpiresAt = 0;

async function getSpotifyAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt - 30_000) return cachedToken;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token refresh failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken    = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;
  return cachedToken;
}

// ─── Spotify currently playing ───────────────────────────────────────────────

async function fetchSpotify() {
  if (!hasSpotify) return null;

  const token = await getSpotifyAccessToken();
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${token}` } },
  );

  // 204 = nothing in the player
  if (res.status === 204 || res.status === 404) return null;

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify API error (${res.status}): ${text}`);
  }

  const data = await res.json();

  // Only actual tracks (skip podcasts / local files)
  if (data.currently_playing_type !== "track" || !data.item) return null;

  const item   = data.item;
  const album  = item.album;
  const artist = item.artists.map((a) => a.name).join(", ");
  const image  = album.images?.[0]?.url ?? null;

  return {
    title:     item.name,
    artist,
    album:     album.name,
    image,
    url:       item.external_urls?.spotify ?? null,
    isPlaying: Boolean(data.is_playing),
    progress:  data.progress_ms ?? null,
    duration:  item.duration_ms ?? null,
    source:    "spotify",
  };
}

// ─── Last.fm (YouTube Music via Pano Scrobbler) ────────────────

// Pano sends Android playback to Last.fm. Read it via user.getRecentTracks.
async function fetchLastFm() {
  if (!hasLastFm) return null;

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", LASTFM_USER);
  url.searchParams.set("api_key", LASTFM_API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Last.fm API error (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(`Last.fm API error: ${data.message || data.error}`);
  }

  const raw = data.recenttracks?.track;
  if (!raw) return null;

  // API returns an object for 1 track, or an array when limit > 1 / nowplaying
  const t = Array.isArray(raw) ? raw[0] : raw;
  if (!t?.name) return null;

  const nowPlaying = t["@attr"]?.nowplaying === "true";
  const artist =
    typeof t.artist === "string"
      ? t.artist
      : t.artist?.["#text"] || t.artist?.name || "Unknown artist";
  const album =
    typeof t.album === "string"
      ? t.album
      : t.album?.["#text"] || null;

  const images = Array.isArray(t.image) ? t.image : [];
  const pickImage = (...sizes) => {
    for (const size of sizes) {
      const hit = images.find((img) => img.size === size)?.["#text"];
      if (hit) return hit;
    }
    // fall back to largest non-empty
    for (let i = images.length - 1; i >= 0; i--) {
      if (images[i]?.["#text"]) return images[i]["#text"];
    }
    return null;
  };

  return {
    title:     t.name,
    artist,
    album:     album || null,
    image:     pickImage("extralarge", "large", "medium"),
    url:       t.url || null,
    isPlaying: nowPlaying,
    progress:  null,
    duration:  null,
    // Last.fm does not identify the original playback app.
    source:    "lastfm",
  };
}

// ─── merge sources ───────────────────────────────────────────────────────────

async function fetchNowPlaying() {
  const results = await Promise.allSettled([
    hasSpotify ? fetchSpotify() : Promise.resolve(null),
    hasLastFm  ? fetchLastFm()  : Promise.resolve(null),
  ]);

  const spotify =
    results[0].status === "fulfilled" ? results[0].value : null;
  const lastfm =
    results[1].status === "fulfilled" ? results[1].value : null;

  if (results[0].status === "rejected") {
    console.error("[spotify]", results[0].reason?.message || results[0].reason);
  }
  if (results[1].status === "rejected") {
    console.error("[lastfm]", results[1].reason?.message || results[1].reason);
  }

  // Prefer live playback, then any session, then history
  if (spotify?.isPlaying) return spotify;
  if (lastfm?.isPlaying)  return lastfm;
  if (spotify)            return spotify;
  if (lastfm)             return lastfm;
  return null;
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
        const track = await fetchNowPlaying();
        return json({
          track,
          sources: {
            spotify: hasSpotify,
            lastfm:  hasLastFm,
          },
        });
      } catch (err) {
        console.error("[now-playing]", err.message);
        return json({ track: null, error: err.message }, 500);
      }
    }

    if (url.pathname === "/api/blog") {
      try {
        const headers = { "Content-Type": "application/json" };
        if (HASHNODE_TOKEN) headers["Authorization"] = HASHNODE_TOKEN;

        const response = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
              query Publication {
                publication(host: "${HASHNODE_HOST}") {
                  posts(first: 10) {
                    edges {
                      node {
                        title
                        brief
                        slug
                        coverImage { url }
                        publishedAt
                        url
                      }
                    }
                  }
                }
              }
            `,
          }),
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Hashnode API error (${response.status}): ${text.slice(0, 200)}`);
        }
        const data = await response.json();
        return json(data);
      } catch (err) {
        console.error("[blog api proxy]", err.message);
        return json({ error: err.message }, 500);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

const enabled = [
  hasSpotify && "Spotify",
  hasLastFm  && "Last.fm (YouTube Music via Pano)",
].filter(Boolean);

console.log(`🎵 Now-playing API on http://localhost:${PORT}`);
console.log(`   Sources: ${enabled.join(" · ")}`);
