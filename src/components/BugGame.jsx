import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Bug01Icon, Cancel01Icon, ComputerTerminal01Icon } from "@hugeicons/core-free-icons";

const ROUND_SECONDS = 15;
const TARGET_SCORE = 12;

function nextCell(previous) {
  return (previous + 1 + Math.floor(Math.random() * 11)) % 12;
}

export default function BugGame({ onClose }) {
  const dialog = useRef(null);
  const [deadline, setDeadline] = useState(null);
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [cell, setCell] = useState(5);
  const playing = deadline !== null && seconds > 0;
  const finished = seconds === 0;
  const passed = score >= TARGET_SCORE;

  useEffect(() => {
    dialog.current.showModal();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const clock = setInterval(() => {
      setSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    }, 100);
    const movement = setInterval(() => setCell(nextCell), 900);
    return () => {
      clearInterval(clock);
      clearInterval(movement);
    };
  }, [deadline, playing]);

  function start() {
    setScore(0);
    setSeconds(ROUND_SECONDS);
    setCell(nextCell);
    setDeadline(Date.now() + ROUND_SECONDS * 1000);
  }

  function catchBug() {
    if (!playing || Date.now() >= deadline) return;
    setScore((value) => value + 1);
    setCell(nextCell);
  }

  return (
    <dialog ref={dialog} aria-labelledby="bug-title" onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-lg overflow-auto rounded-2xl border border-emerald-900 bg-[#101815] p-0 font-mono text-emerald-50 shadow-2xl backdrop:bg-black/70">
      <div className="flex items-center justify-between border-b border-emerald-900 px-5 py-3">
        <span className="flex items-center gap-2 text-xs text-emerald-300">
          <HugeiconsIcon icon={ComputerTerminal01Icon} size={18} aria-hidden="true" />
          mike.dev / debug console
        </span>
        <form method="dialog">
          <button aria-label="Close game" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-emerald-900">
            <HugeiconsIcon icon={Cancel01Icon} size={18} aria-hidden="true" />
          </button>
        </form>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-300">Secret level / 01</p>
          <h2 id="bug-title" className="mt-1 text-2xl font-bold">Catch the Bug</h2>
          <p className="mt-2 text-sm text-emerald-100/75">Catch {TARGET_SCORE} bugs in {ROUND_SECONDS} seconds to pass the build.</p>
        </div>
        <div className="flex justify-between rounded-lg bg-black/30 px-3 py-2 text-xs tabular-nums text-emerald-200">
          <span>BUGS {String(score).padStart(2, "0")}/{TARGET_SCORE}</span>
          <span>TIME {String(seconds).padStart(2, "0")}s</span>
        </div>
        <div className="relative grid grid-cols-4 gap-2 rounded-xl border border-emerald-900 bg-black/25 p-2">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} aria-hidden="true" className="h-12 rounded-md border border-emerald-900/70 bg-emerald-950/40" />
          ))}
          <div className="pointer-events-none absolute inset-2 grid grid-cols-4 grid-rows-3 gap-2">
            <button type="button" aria-label="Catch bug" disabled={!playing}
              onClick={catchBug}
              style={{ gridColumn: (cell % 4) + 1, gridRow: Math.floor(cell / 4) + 1 }}
              className="pointer-events-auto grid place-items-center rounded-md bg-emerald-300 text-emerald-950 shadow-[0_0_16px_#6ee7b766] hover:bg-emerald-200 disabled:pointer-events-none disabled:opacity-40">
              <HugeiconsIcon icon={Bug01Icon} aria-hidden="true" />
            </button>
          </div>
        </div>
        {finished && (
          <div role="status" className="rounded-lg border border-emerald-900 p-3 text-sm">
            <p className={passed ? "text-emerald-300" : "text-amber-200"}>{passed ? "BUILD PASSED" : "BUILD FAILED"}</p>
            {passed && <p className="mt-2 text-emerald-100/75">Debug note unlocked: The music widget once went quiet even though the phone showed the song. The fix was to grant the scrobbler notification access again.</p>}
          </div>
        )}
        <button type="button" onClick={start} disabled={playing}
          className="min-h-[44px] w-full rounded-lg bg-emerald-300 px-4 text-sm font-bold text-emerald-950 hover:bg-emerald-200 disabled:bg-emerald-950 disabled:text-emerald-200">
          {playing ? "Debugging…" : finished ? "Run again" : "Start debug run"}
        </button>
      </div>
    </dialog>
  );
}
