import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { profile } from "../../data/profile.js";

/**
 * A short space-boot sequence shown once per session before the Command Deck.
 * Deliberately quick (~2.4s) and always skippable — never an obstacle between
 * a recruiter and the content. Under reduced motion it's a brief static hold.
 * Pure DOM/SVG, no WebGL, so it can render the instant the app mounts.
 */
const KEY = "cmd-intro-seen";

const LINES = [
  "> boot command-deck",
  "  nav ............ ONLINE",
  "  telemetry ...... ONLINE",
  "  life-support ... ONLINE",
  "  crew link ...... ONLINE",
];

export function IntroSequence() {
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState("check"); // check | run | exit | done
  const [shown, setShown] = useState(0);
  const [pct, setPct] = useState(0);
  const timers = useRef([]);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode — just don't persist */
    }
    setPhase("exit");
    timers.current.push(window.setTimeout(() => setPhase("done"), 520));
  }, []);

  useEffect(() => {
    // Only the front door gets the boot sequence — deep links go straight in.
    if (window.location.pathname !== "/") {
      setPhase("done");
      return undefined;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setPhase("done");
      return undefined;
    }

    setPhase("run");
    document.body.style.overflow = "hidden";

    if (reduce) {
      setShown(LINES.length);
      setPct(100);
      timers.current.push(window.setTimeout(finish, 650));
    } else {
      LINES.forEach((_, i) => {
        timers.current.push(window.setTimeout(() => setShown(i + 1), 160 + i * 190));
      });
      timers.current.push(window.setTimeout(() => setPct(100), 120));
      timers.current.push(window.setTimeout(finish, 2350));
    }

    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [reduce, finish]);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && phase !== "check" && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[var(--color-bg)] px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={finish}
          role="dialog"
          aria-label="Booting command deck"
        >
          {/* faint grid + corner brackets */}
          <div className="grid-overlay absolute inset-0 opacity-40" style={{ "--grid-size": "52px" }} />
          <span className="pointer-events-none absolute left-6 top-6 h-6 w-6 border-l border-t border-[var(--color-accent)] opacity-70" />
          <span className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[var(--color-accent)] opacity-70" />

          {/* rotating core silhouette */}
          <svg
            viewBox="0 0 120 120"
            className="relative mb-10 h-24 w-24 text-[var(--color-accent)] motion-reduce:animate-none"
            style={{ animation: "spin-slow 9s linear infinite" }}
          >
            <polygon
              points="60,14 100,37 100,83 60,106 20,83 20,37"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              opacity="0.8"
            />
            <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.3" strokeDasharray="3 6" />
            <circle cx="60" cy="60" r="9" fill="currentColor" opacity="0.9" />
          </svg>

          <p className="relative mb-4 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Command Deck
          </p>
          <h1 className="relative font-display text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold tracking-tight text-[var(--color-fg)]">
            {profile.name.toUpperCase()}
          </h1>

          {/* boot log */}
          <ul className="relative mt-8 min-h-[6.5rem] w-full max-w-xs space-y-1 text-left font-mono text-[0.7rem] text-[var(--color-fg-muted)]">
            {LINES.slice(0, shown).map((l) => (
              <li key={l}>
                {l}
                {l.includes("ONLINE") ? <span className="text-[var(--color-accent)]"> ●</span> : null}
              </li>
            ))}
          </ul>

          {/* progress */}
          <div className="relative mt-6 h-px w-full max-w-xs overflow-hidden bg-[var(--color-border)]">
            <div
              className="h-full bg-[var(--color-accent)] transition-[width] duration-[1900ms] ease-out"
              style={{ width: `${pct}%`, boxShadow: "0 0 10px var(--color-accent)" }}
            />
          </div>
          <p className="relative mt-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[var(--color-fg-subtle)]">
            {pct < 100 ? "Initializing…" : "Systems online"}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            className="absolute bottom-8 right-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-accent)]"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
