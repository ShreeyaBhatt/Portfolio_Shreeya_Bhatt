import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeEditorial, easeSignature } from "../../lib/motion.js";
import { RevealLines } from "./RevealLines.jsx";
import { Avatar } from "./Avatar.jsx";

// The 3D scene (three + r3f + drei) is its own chunk, pulled in only when the
// intro actually renders — once per browser tab. The SVG <Avatar> shows in
// the meantime and if the chunk ever fails to load.
const Avatar3D = lazy(() => import("./Avatar3D.jsx"));

const SESSION_KEY = "sb-intro-seen";
const DURATION_MS = 2800;

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const STARS = [
  { style: { top: "-5%", left: "8%" }, size: 6, glyph: "✦", delay: 0 },
  { style: { top: "10%", right: "-8%" }, size: 4, delay: 0.6 },
  { style: { bottom: "-2%", right: "14%" }, size: 7, glyph: "✦", delay: 1.1 },
  { style: { bottom: "16%", left: "-8%" }, size: 3, delay: 0.35 },
  { style: { top: "48%", left: "-11%" }, size: 5, glyph: "✦", delay: 0.85 },
  { style: { top: "30%", right: "-4%" }, size: 3, delay: 1.4 },
];

const stopDrag = (event) => event.stopPropagation();

function Star({ size, glyph, delay }) {
  const shared = {
    drag: true,
    dragSnapToOrigin: true,
    dragElastic: 0.5,
    whileDrag: { scale: 1.5 },
    onPointerDown: stopDrag,
    className: "block cursor-grab touch-none active:cursor-grabbing",
  };

  if (glyph) {
    return (
      <motion.span
        {...shared}
        aria-hidden="true"
        className={`${shared.className} leading-none text-[var(--color-accent-2)] [text-shadow:0_0_16px_var(--color-accent-2)]`}
        style={{ fontSize: `${size * 3}px` }}
        animate={{ opacity: [0.45, 1, 0.45], scale: [0.85, 1, 0.85], rotate: [0, 18, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
      >
        {glyph}
      </motion.span>
    );
  }
  return (
    <motion.span
      {...shared}
      aria-hidden="true"
      className={`${shared.className} rounded-full bg-[var(--color-accent)] [box-shadow:0_0_10px_var(--color-accent)]`}
      style={{ width: size, height: size }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/** The rotating "open to work" ring. */
function SpinBadge() {
  return (
    <motion.div
      className="relative grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)]"
      animate={{ rotate: 360 }}
      transition={{ duration: 14, ease: "linear", repeat: Infinity }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <defs>
          <path id="sb-arc" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
        </defs>
        <text
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8.5px",
            letterSpacing: "3px",
            fill: "var(--color-fg-subtle)",
          }}
        >
          <textPath href="#sb-arc">OPEN TO WORK · OPEN TO WORK · </textPath>
        </text>
      </svg>
      <span aria-hidden="true" className="absolute text-[0.7rem] text-[var(--color-accent)]">
        ✦
      </span>
    </motion.div>
  );
}

/**
 * A one-time arrival screen. A real-time 3D portrait sits inside a glowing,
 * rotating portal against a slow aurora; the surname is set in serif italic
 * with a soft violet bloom, exactly the contrast the hero uses. A counter
 * fills a hairline, then the whole panel wipes up to reveal the page.
 *
 * The portrait is drag-to-rotate and springs back; the loading timer pauses
 * while it's held, so playing with it never cuts the intro short. Tapping
 * empty space, or any key, skips to the reveal.
 *
 * Shown once per browser tab (sessionStorage), skipped whole under reduced
 * motion.
 */
export function AvatarIntro() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => !window.sessionStorage.getItem(SESSION_KEY));
  const [progress, setProgress] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(0);
  const pausedMsRef = useRef(0);
  const holdStartedAtRef = useRef(0);
  const holdingRef = useRef(false);

  function finish() {
    window.sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(false);
  }

  useEffect(() => {
    if (!visible) return undefined;
    if (prefersReducedMotion) {
      finish();
      return undefined;
    }

    startRef.current = performance.now();
    function tick(now) {
      if (holdingRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const ratio = Math.min((now - startRef.current - pausedMsRef.current) / DURATION_MS, 1);
      setProgress(ratio);
      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      finish();
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, prefersReducedMotion]);

  useEffect(() => {
    if (!visible) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || prefersReducedMotion) return undefined;
    function onKey() {
      finish();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, prefersReducedMotion]);

  // Pause the countdown while the portrait is being dragged.
  function handleHoldStart(event) {
    stopDrag(event);
    if (holdingRef.current) return;
    holdingRef.current = true;
    holdStartedAtRef.current = performance.now();
  }
  function handleHoldEnd() {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    pausedMsRef.current += performance.now() - holdStartedAtRef.current;
  }

  const pct = Math.round(progress * 100);
  const fallbackPortrait = <Avatar className="h-full w-full" />;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="avatar-intro"
          onPointerDown={finish}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: easeEditorial } }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] px-6"
          aria-label="Loading"
        >
          {/* slow aurora wash */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-25%] blur-3xl"
            style={{
              background:
                "radial-gradient(38% 38% at 28% 30%, var(--color-accent-soft), transparent), radial-gradient(34% 34% at 74% 68%, var(--color-accent-2-soft), transparent), radial-gradient(30% 30% at 60% 20%, rgba(99,198,255,0.12), transparent)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
            {/* portal + portrait */}
            <div className="relative">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-36%] rounded-full blur-3xl"
                style={{
                  background:
                    "conic-gradient(from 120deg, var(--color-accent), #63c6ff, var(--color-accent-2), var(--color-accent))",
                  opacity: 0.3,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 46, ease: "linear", repeat: Infinity }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-5px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--color-accent), var(--color-accent-2), transparent 58%, var(--color-accent))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 7, ease: "linear", repeat: Infinity }}
              />

              <motion.div
                onPointerDown={handleHoldStart}
                onPointerUp={handleHoldEnd}
                onPointerLeave={handleHoldEnd}
                className="relative h-[clamp(12rem,36vw,18rem)] w-[clamp(12rem,36vw,18rem)] cursor-grab touch-none overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] active:cursor-grabbing"
                style={{ boxShadow: "var(--shadow-glow)" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: easeEditorial }}
              >
                <SceneBoundary fallback={fallbackPortrait}>
                  <Suspense fallback={fallbackPortrait}>
                    <Avatar3D className="!absolute inset-0" />
                  </Suspense>
                </SceneBoundary>
              </motion.div>

              {STARS.map((star, i) => (
                <span key={i} className="absolute" style={star.style}>
                  <Star size={star.size} glyph={star.glyph} delay={star.delay} />
                </span>
              ))}
            </div>

            <motion.p
              className="label-mono mt-12 text-[var(--color-fg-subtle)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: easeSignature }}
            >
              Hi, I'm
            </motion.p>

            <div style={{ filter: "drop-shadow(0 10px 44px rgba(155,140,255,0.28))" }}>
              <RevealLines
                as="h1"
                animateOnMount
                className="mt-3 font-display text-[clamp(2.75rem,9vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.035em]"
                lines={[
                  "Shreeya",
                  <span key="last" className="accent-italic text-[var(--color-accent)]">
                    Bhatt
                  </span>,
                ]}
              />
            </div>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } },
              }}
            >
              <motion.div
                variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
              >
                <SpinBadge />
              </motion.div>
              {profile.disciplines.map((discipline) => (
                <motion.span
                  key={discipline}
                  className="rounded-full border border-[var(--color-border-strong)] px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-[var(--color-fg-muted)]"
                  variants={{ hidden: { y: 12, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                >
                  {discipline}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="mt-14 flex w-full max-w-xs items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div className="relative h-[3px] flex-1 rounded-full bg-[var(--color-border)]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)]"
                  style={{ width: `${pct}%`, boxShadow: "0 0 14px var(--color-accent)" }}
                />
              </div>
              <span className="font-mono text-sm tabular-nums text-[var(--color-fg)]">
                {String(pct).padStart(3, "0")}
              </span>
            </motion.div>
          </div>

          <p className="label-mono absolute bottom-8 text-[var(--color-fg-subtle)]">
            Drag to rotate · tap anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
