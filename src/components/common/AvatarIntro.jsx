import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeEditorial, easeSignature } from "../../lib/motion.js";
import { RevealLines } from "./RevealLines.jsx";
import { Avatar } from "./Avatar.jsx";

const SESSION_KEY = "sb-intro-seen";
const DURATION_MS = 2800;

// Small stars scattered around the portal — same idea as the persistent
// <SpaceBackground>, just close up, hand-placed, and each one draggable.
const STARS = [
  { style: { top: "-4%", left: "10%" }, size: 5, glyph: "✦", delay: 0 },
  { style: { top: "12%", right: "-6%" }, size: 4, delay: 0.6 },
  { style: { bottom: "0%", right: "16%" }, size: 6, glyph: "✦", delay: 1.1 },
  { style: { bottom: "18%", left: "-6%" }, size: 3, delay: 0.35 },
  { style: { top: "50%", left: "-9%" }, size: 4, delay: 0.85 },
];

const stopDrag = (event) => event.stopPropagation();

function Star({ size, glyph, delay }) {
  const shared = {
    drag: true,
    dragSnapToOrigin: true,
    dragElastic: 0.5,
    whileDrag: { scale: 1.4 },
    onPointerDown: stopDrag,
    className: "block cursor-grab touch-none active:cursor-grabbing",
  };

  if (glyph) {
    return (
      <motion.span
        {...shared}
        aria-hidden="true"
        className={`${shared.className} leading-none text-[var(--color-accent-2)]`}
        style={{ fontSize: `${size * 3}px` }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1, 0.85], rotate: [0, 15, 0] }}
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
      className={`${shared.className} rounded-full bg-[var(--color-fg-subtle)]`}
      style={{ width: size, height: size }}
      animate={{ opacity: [0.25, 0.9, 0.25] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/** The rotating "open to work" ring — a quiet observatory dial, not a sticker. */
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
 * A one-time arrival screen in the site's own visual language: deep-space
 * ground, a hairline "portal" the portrait sits inside, display type with the
 * surname in serif italic exactly as the hero sets it.
 *
 * The portrait is draggable — you can lift it out of its frame and it springs
 * back — and the loading timer pauses while you're holding it, so playing
 * with it never cuts the intro short. Tapping empty space, or any key, skips
 * to the reveal; the whole panel then wipes up.
 *
 * Shown once per browser tab (sessionStorage, the key the site has always
 * used), skipped whole under reduced motion.
 */
export function AvatarIntro() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => !window.sessionStorage.getItem(SESSION_KEY));
  const [progress, setProgress] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(0);
  const pausedMsRef = useRef(0);
  const dragStartedAtRef = useRef(0);
  const draggingRef = useRef(false);

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
      if (draggingRef.current) {
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

  function handleDragStart() {
    draggingRef.current = true;
    dragStartedAtRef.current = performance.now();
  }
  function handleDragEnd() {
    draggingRef.current = false;
    pausedMsRef.current += performance.now() - dragStartedAtRef.current;
  }

  const pct = Math.round(progress * 100);
  const dragBox = { left: -140, right: 140, top: -140, bottom: 140 };

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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 62% 46% at 50% 40%, var(--color-accent-soft), transparent 62%)",
              opacity: 0.8,
            }}
          />

          <div className="relative flex w-full max-w-xl flex-col items-center text-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-16%] rounded-full"
                style={{
                  background: "radial-gradient(circle, var(--color-accent-soft), transparent 70%)",
                }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-9%] rounded-full border border-dashed border-[var(--color-border)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 64, ease: "linear", repeat: Infinity }}
              />

              <motion.div
                drag
                dragConstraints={dragBox}
                dragElastic={0.16}
                dragSnapToOrigin
                dragTransition={{ bounceStiffness: 280, bounceDamping: 20 }}
                onPointerDown={stopDrag}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.04 }}
                className="relative h-[clamp(11rem,34vw,17rem)] w-[clamp(11rem,34vw,17rem)] cursor-grab touch-none overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] active:cursor-grabbing"
                style={{ boxShadow: "var(--shadow-glow)" }}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: easeEditorial }}
              >
                <Avatar className="h-full w-full" />
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

            <RevealLines
              as="h1"
              animateOnMount
              className="mt-3 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              lines={[
                "Shreeya",
                <span key="last" className="accent-italic text-[var(--color-accent)]">
                  Bhatt
                </span>,
              ]}
            />

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
              <div className="relative h-[2px] flex-1 bg-[var(--color-border)]">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="label-mono tabular-nums text-[var(--color-fg-subtle)]">
                {String(pct).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          <p className="label-mono absolute bottom-8 text-[var(--color-fg-subtle)]">
            Drag the portrait · tap anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
