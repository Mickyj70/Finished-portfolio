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

/** Links to streaming platforms */
function MusicLinks({ track, compact }) {
  const q = encodeURIComponent(`${track.title} ${track.artist}`);
  const links = [
    {
      label: "Spotify",
      // Prefer the direct track URL from the API, fall back to search
      href: track.url ?? `https://open.spotify.com/search/${q}`,
      icon: <SpotifyIcon />,
    },
    {
      label: "YouTube Music",
      href: `https://music.youtube.com/search?q=${q}`,
      icon: <YouTubeMusicIcon />,
    },
    {
      label: "Apple Music",
      href: `https://music.apple.com/search?term=${q}`,
      icon: <AppleMusicIcon />,
    },
  ];

  return (
    <div className={compact ? "np-links-compact" : "np-links-grid"}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          title={`Open on ${l.label}`}
          aria-label={`Open ${track.title} on ${l.label}`}
          className={compact ? "np-link-pill" : "np-link-btn"}
        >
          <span className="np-link-icon">{l.icon}</span>
          {!compact && <span className="np-link-label">{l.label}</span>}
        </a>
      ))}
    </div>
  );
}

/** Progress bar for the modal (Spotify returns progress_ms / duration_ms) */
function ProgressBar({ progress, duration }) {
  if (!duration) return null;
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

  // Card shown on the home page (matches reference design)
  const card = (
    <AnimatePresence mode="wait">
      {loaded && (
        <motion.div
          key={track ? "track" : "idle"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className={`np-card ${track ? "np-card--active" : "np-card--idle"}`}
          role={track ? "button" : undefined}
          tabIndex={track ? 0 : undefined}
          onClick={() => track && setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && track && setIsOpen(true)}
          aria-label={track ? `Now playing: ${track.title} by ${track.artist}. Click to expand.` : undefined}
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
                <span className="np-card-label">I&apos;m currently listening to</span>
                <span className="np-card-title">{track.title}</span>
                <span className="np-card-artist">{track.artist}</span>
              </div>
              <div className="np-card-right">
                {track.isPlaying ? <AudioWave /> : (
                  <span className="np-pill-paused" aria-label="Paused">⏸</span>
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
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* blurred album art backdrop */}
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
                {track.isPlaying ? <AudioWave /> : (
                  <span className="np-modal-paused">⏸ Paused</span>
                )}
              </div>
              <h2 className="np-modal-title">{track.title}</h2>
              <p className="np-modal-artist">{track.artist}</p>
              {track.album && <p className="np-modal-album">{track.album}</p>}
              <ProgressBar progress={track.progress} duration={track.duration} />
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
