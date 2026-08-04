import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Defaults to /api/now-playing which the Vite proxy forwards to the Bun server.
// Override with VITE_NOW_PLAYING_API_URL for a deployed API.
const API_URL =
  import.meta.env.VITE_NOW_PLAYING_API_URL ?? "/api/now-playing";

// ─── helpers ───────────────────────────────────────────────────────────────

function YouTubeMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="np-icon">
      <circle cx="12" cy="12" r="10" fill="#FF0000" />
      <circle cx="12" cy="12" r="5.8" fill="none" stroke="white" strokeWidth="1.4" />
      <path d="M10.3 8.9v6.2l5.3-3.1-5.3-3.1Z" fill="white" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="np-icon">
      <circle cx="12" cy="12" r="10" fill="#1ED760" />
      <path
        d="M7.2 9.3c3.3-1 6.9-.7 9.7 1 .4.2.9.1 1.1-.3.2-.4.1-.9-.3-1.1-3.2-1.9-7.2-2.3-11-1.1-.4.1-.7.6-.5 1 .1.4.6.7 1 .5Zm.4 3.2c2.8-.8 5.4-.5 7.7.9.4.2.8.1 1-.2.2-.4.1-.8-.2-1-2.7-1.6-5.7-2-8.9-1-.4.1-.6.5-.5.9.1.3.5.6.9.4Zm.5 2.9c2-.6 4-.4 5.7.6.3.2.7.1.9-.2.2-.3.1-.7-.2-.9-2-1.2-4.4-1.5-6.8-.8-.3.1-.5.5-.4.8.1.4.4.6.8.5Z"
        fill="#111"
      />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="np-icon">
      <defs>
        <linearGradient id="np-apple-grad" x1="5" x2="19" y1="3" y2="21">
          <stop stopColor="#FB5C74" />
          <stop offset="1" stopColor="#FA243C" />
        </linearGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#np-apple-grad)" />
      <path
        d="M16.8 6.1v8.7c0 1.3-1 2.2-2.4 2.2-1.1 0-2-.6-2-1.5 0-1 1-1.7 2.2-1.7.3 0 .6 0 .8.1V8.6l-5.9 1.2v6.3c0 1.3-1 2.2-2.4 2.2-1.1 0-2-.6-2-1.5 0-1 1-1.7 2.2-1.7.3 0 .6 0 .8.1V8.7l8.7-1.8Z"
        fill="white"
      />
    </svg>
  );
}

function LastFmIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="np-icon">
      <circle cx="12" cy="12" r="10" fill="#D51007" />
      <path
        d="M14.6 14.9c-.5.9-1.4 1.4-2.5 1.4-1.7 0-2.9-1.3-2.9-3.1 0-1.9 1.3-3.2 3.1-3.2.7 0 1.3.2 1.8.5l.5-1.5c-.7-.4-1.5-.6-2.4-.6-2.8 0-4.7 1.9-4.7 4.8 0 2.8 1.8 4.6 4.5 4.6 1.6 0 2.9-.7 3.6-2l-1-.9Zm3.1-5.6c-1.9 0-3.2 1.1-3.7 2.7l1.3.5c.3-1 1.1-1.6 2.2-1.6.9 0 1.5.5 1.5 1.3 0 .2 0 .4-.1.6l-2.2.5c-1.7.4-2.6 1.2-2.6 2.6 0 1.6 1.2 2.6 3 2.6 1.3 0 2.4-.6 3-1.7l-1.1-.7c-.4.7-1.1 1.1-1.9 1.1-.8 0-1.3-.4-1.3-1 0-.4.2-.7.7-.8l2.4-.5c1.5-.3 2.3-1.3 2.3-2.8 0-1.7-1.3-2.8-3.5-2.8Z"
        fill="#fff"
      />
    </svg>
  );
}

/** Human-readable source label for badges */
function sourceMeta(source) {
  switch (source) {
    case "spotify":
      return {
        key: "spotify",
        label: "Spotify",
        detail: "Playing on Spotify",
        icon: <SpotifyIcon />,
      };
    case "lastfm":
      return {
        key: "lastfm",
        label: "Apple Music · YT Music",
        detail: "Via Last.fm (Apple Music, YouTube Music & more)",
        icon: <LastFmIcon />,
      };
    default:
      return {
        key: "unknown",
        label: "Music",
        detail: "Listening",
        icon: null,
      };
  }
}

/** Animated audio-wave bars */
function AudioWave() {
  return (
    <div className="np-wave" aria-hidden="true">
      {[0, 120, 80, 200, 160].map((delay, i) => (
        <span key={i} className="np-bar" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  );
}

/** Small or large album cover with blurred backdrop */
function AlbumCover({ image, size }) {
  if (!image) return null;
  const dim = size === "large" ? "np-cover-lg" : "np-cover-sm";
  return (
    <div className={`np-cover ${dim}`}>
      <div
        className="np-cover-blur"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div className="np-cover-shine" />
      <img
        src={image}
        alt=""
        className="np-cover-img"
        loading="lazy"
      />
    </div>
  );
}

/**
 * Links to streaming platforms.
 * When source is Spotify, prefer the direct track URL for Spotify.
 * For Last.fm (Apple/YT Music), search links open the track on each service.
 */
function MusicLinks({ track, compact }) {
  const q = encodeURIComponent(`${track.title} ${track.artist}`);
  const active = track.source;

  const links = [
    {
      key: "spotify",
      label: "Spotify",
      href: track.source === "spotify" && track.url
        ? track.url
        : `https://open.spotify.com/search/${q}`,
      icon: <SpotifyIcon />,
    },
    {
      key: "youtube",
      label: "YouTube Music",
      href: `https://music.youtube.com/search?q=${q}`,
      icon: <YouTubeMusicIcon />,
    },
    {
      key: "apple",
      label: "Apple Music",
      href: `https://music.apple.com/search?term=${q}`,
      icon: <AppleMusicIcon />,
    },
  ];

  return (
    <div className={compact ? "np-links-compact" : "np-links-grid"}>
      {links.map((l) => {
        // Highlight Spotify when source is Spotify; for Last.fm highlight Apple + YT
        const isActive =
          (active === "spotify" && l.key === "spotify") ||
          (active === "lastfm" && (l.key === "apple" || l.key === "youtube"));

        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            title={`Open on ${l.label}`}
            aria-label={`Open ${track.title} on ${l.label}`}
            className={`${compact ? "np-link-pill" : "np-link-btn"}${isActive ? " np-link--active" : ""}`}
            data-service={l.key}
          >
            <span className="np-link-icon">{l.icon}</span>
            {!compact && <span className="np-link-label">{l.label}</span>}
          </a>
        );
      })}
    </div>
  );
}

/** Progress bar for the modal (Spotify returns progress_ms / duration_ms) */
function ProgressBar({ progress, duration }) {
  if (!duration || progress == null) return null;
  const pct = Math.min(100, (progress / duration) * 100);
  const fmt = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };
  return (
    <div className="np-progress">
      <div className="np-progress-bar">
        <div className="np-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="np-progress-times">
        <span>{fmt(progress)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

function SourceBadge({ source, compact }) {
  const meta = sourceMeta(source);
  if (!meta) return null;
  return (
    <span
      className={compact ? "np-source-pill" : "np-modal-source"}
      data-source={meta.key}
      title={meta.detail}
    >
      {meta.icon && <span className="np-source-icon">{meta.icon}</span>}
      <span>{meta.label}</span>
    </span>
  );
}

// ─── main component ─────────────────────────────────────────────────────────

export default function NowPlaying({ apiUrl = API_URL }) {
  const [track, setTrack] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchTrack() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!cancelled) {
          setTrack(data.track ?? null);
          setLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setTrack(null);
          setLoaded(true);
        }
      }
    }

    fetchTrack();
    const id = window.setInterval(fetchTrack, 10_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [apiUrl]);

  // Card shown on the home page
  const card = (
    <AnimatePresence mode="wait">
      {loaded && (
        <motion.div
          key={track ? `track-${track.source}-${track.title}` : "idle"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className={`np-card ${track ? "np-card--active" : "np-card--idle"}`}
          data-source={track?.source || undefined}
          role={track ? "button" : undefined}
          tabIndex={track ? 0 : undefined}
          onClick={() => track && setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && track && setIsOpen(true)}
          aria-label={
            track
              ? `Now playing: ${track.title} by ${track.artist}. Click to expand.`
              : undefined
          }
        >
          {track ? (
            <>
              {track.image && (
                <img
                  src={track.image}
                  alt={track.album ?? track.title}
                  className="np-card-art"
                  loading="lazy"
                />
              )}
              <div className="np-card-text">
                <span className="np-card-label">
                  {track.isPlaying ? "I'm currently listening to" : "Last listened to"}
                </span>
                <span className="np-card-title">{track.title}</span>
                <span className="np-card-artist">{track.artist}</span>
                <SourceBadge source={track.source} compact />
              </div>
              <div className="np-card-right">
                {track.isPlaying ? (
                  <AudioWave />
                ) : (
                  <span className="np-pill-paused" aria-label="Paused">
                    ⏸
                  </span>
                )}
                <MusicLinks track={track} compact />
              </div>
            </>
          ) : (
            <span className="np-card-idle">Not listening to anything right now</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Expanded modal
  const modal = (
    <AnimatePresence>
      {isOpen && track && (
        <div className="np-overlay" onClick={() => setIsOpen(false)}>
          <motion.div
            className="np-modal"
            data-source={track.source}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {track.image && (
              <div
                className="np-modal-bg"
                style={{ backgroundImage: `url(${track.image})` }}
                aria-hidden="true"
              />
            )}

            <button
              type="button"
              className="np-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <AlbumCover image={track.image} size="large" />

            <div className="np-modal-body">
              <div className="np-modal-header">
                <p className="np-modal-label">
                  {track.isPlaying ? "I\u2019m currently listening to" : "Last listened to"}
                </p>
                {track.isPlaying ? (
                  <AudioWave />
                ) : (
                  <span className="np-modal-paused">⏸ Paused</span>
                )}
              </div>
              <h2 className="np-modal-title">{track.title}</h2>
              <p className="np-modal-artist">{track.artist}</p>
              {track.album && <p className="np-modal-album">{track.album}</p>}
              <ProgressBar progress={track.progress} duration={track.duration} />
              <SourceBadge source={track.source} />
              <MusicLinks track={track} compact={false} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {card}
      {modal}
    </>
  );
}
