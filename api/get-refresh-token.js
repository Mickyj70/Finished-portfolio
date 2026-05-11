/**
 * api/get-refresh-token.js
 *
 * One-time script to get your Spotify refresh token.
 *
 * BEFORE running:
 *   1. Go to https://developer.spotify.com/dashboard and open your app
 *   2. Click "Edit Settings" → Redirect URIs → add:
 *        http://localhost:5174/callback
 *      then click Save.
 *   3. Fill in .env.local:
 *        SPOTIFY_CLIENT_ID=<your client id>
 *        SPOTIFY_CLIENT_SECRET=<your client secret>
 *
 * Then run:
 *   bun run api:token
 */

import { createServer } from "http";

// Bun automatically loads .env.local when you use `bun run`
const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID?.trim();
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET?.trim();
const REDIRECT_URI  = "http://127.0.0.1:5174/callback";
const SCOPE         = "user-read-currently-playing user-read-playback-state";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(`
❌  Missing Spotify credentials.

    Edit .env.local and fill in:
      SPOTIFY_CLIENT_ID=<your client id from developer.spotify.com>
      SPOTIFY_CLIENT_SECRET=<your client secret>

    Then re-run: bun run api:token
`);
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id:     CLIENT_ID,
    scope:         SCOPE,
    redirect_uri:  REDIRECT_URI,
  });

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Spotify OAuth – get your refresh token
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Make sure this redirect URI is saved in your
     Spotify app dashboard (Edit Settings → Redirect URIs):

     ${REDIRECT_URI}

1️⃣  Open this URL in your browser:

   ${authUrl}

2️⃣  Click "Agree" / "Authorise" – you'll be redirected
     back automatically and this script will print your
     refresh token.
`);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:5174`);

  if (url.pathname !== "/callback") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Waiting for Spotify OAuth callback…");
    return;
  }

  const code  = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    const msg = error ?? "no code returned";
    console.error(`\n❌  Spotify returned an error: ${msg}\n`);
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`<h2>Error: ${msg}</h2><p>Check the terminal.</p>`);
    server.close();
    return;
  }

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type:   "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await tokenRes.json();

    if (data.refresh_token) {
      console.log(`
✅  Got your refresh token! Add this line to .env.local:

   SPOTIFY_REFRESH_TOKEN=${data.refresh_token}

Then start the API server: bun run api:dev
`);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        "<h2 style='font-family:sans-serif;color:green'>✅ Success!</h2>" +
        "<p style='font-family:monospace'>Your refresh token is in the terminal.<br>" +
        "Copy the <code>SPOTIFY_REFRESH_TOKEN=…</code> line into <code>.env.local</code>.</p>"
      );
    } else {
      console.error("\n❌  Token exchange failed:", JSON.stringify(data, null, 2), "\n");
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h2>Token exchange failed</h2><p>Check the terminal for details.</p>");
    }
  } catch (err) {
    console.error("\n❌  Request error:", err.message, "\n");
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h2>Request error</h2><p>" + err.message + "</p>");
  } finally {
    server.close();
    process.exit(0);
  }
});

server.listen(5174, "127.0.0.1", () => {
  console.log("   (Listening on http://127.0.0.1:5174 for the Spotify redirect…)\n");
});
