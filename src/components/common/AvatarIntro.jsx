import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeEditorial } from "../../lib/motion.js";
import { Avatar } from "./Avatar.jsx";

const SESSION_KEY = "sb-intro-seen";
const DURATION_MS = 2100;

// This screen is its own moment with its own rules — a loud, sticker-y
// front door that resolves into the calm editorial site. Its palette is
// fixed and theme-independent on purpose: it's a hand-off, not part of the
// site's surface, so it shouldn't shift with the light/dark toggle.
const INK = "#141018";
const CREAM = "#FDF7EE";
const VIOLET = "#6D4AFF";
const GOLD = "#FFC44D";

// Inline SVG film grain — the one texture that does the most to make a flat
// saturated panel feel like a designed surface rather than a colour fill.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

const SPARKS = [
  { style: { top: "-8%", left: "14%" }, size: 20, fill: GOLD, delay: 0 },
  { style: { top: "4%", right: "-10%" }, size: 30, fill: CREAM, delay: 0.5 },
  { style: { bottom: "-6%", right: "20%" }, size: 18, fill: GOLD, delay: 1 },
  { style: { bottom: "12%", left: "-10%" }, size: 24, fill: CREAM, delay: 0.3 },
  { style: { top: "46%", left: "-14%" }, size: 14, fill: GOLD, delay: 0.8 },
];

function Sparkle({ size, fill }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 0c1.2 7 4 9.8 12 12-8 2.2-10.8 5-12 12-1.2-7-4-9.8-12-12 8-2.2 10.8-5 12-12Z"
        fill={fill}
        stroke={INK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The rotating "open to work" chip — circular text on a die-cut disc. */
function SpinBadge() {
  return (
    <motion.div
      className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full border-[3px] sm:h-28 sm:w-28"
      style={{ borderColor: INK, background: CREAM, boxShadow: `6px 6px 0 ${INK}` }}
      animate={{ rotate: 360 }}
      transition={{ duration: 9, ease: "linear", repeat: Infinity }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <defs>
          <path id="sb-badge-arc" d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0" />
        </defs>
        <text fill={INK} style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "2.5px" }}>
          <textPath href="#sb-badge-arc">OPEN TO WORK ✦ OPEN TO WORK ✦</textPath>
        </text>
      </svg>
      <span aria-hidden="true" className="absolute text-lg" style={{ color: VIOLET }}>
        ✦
      </span>
    </motion.div>
  );
}

/**
 * A one-time arrival screen. The avatar springs in and waves, the name lands
 * in a rotated sticker, chips scatter in, a counter fills — then the whole
 * panel wipes up to reveal the site.
 *
 * Shown once per browser tab (sessionStorage, same key the site has always
 * used) so it never replays on in-site navigation, and skipped whole under
 * reduced motion — the panel is nothing but motion, so there's no static
 * version worth showing.
 */
export function AvatarIntro() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => !window.sessionStorage.getItem(SESSION_KEY));
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  // Drive the counter off real elapsed time, then dismiss.
  useEffect(() => {
    if (!visible) return undefined;

    if (prefersReducedMotion) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
      return undefined;
    }

    const start = performance.now();
    function tick(now) {
      const ratio = Math.min((now - start) / DURATION_MS, 1);
      setProgress(ratio);
      if (ratio < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, prefersReducedMotion]);

  // Hold the page still while the panel covers it.
  useEffect(() => {
    if (!visible) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Any tap or key skips straight to the reveal.
  useEffect(() => {
    if (!visible || prefersReducedMotion) return undefined;
    function skip() {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
    }
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible, prefersReducedMotion]);

  const pct = Math.round(progress * 100);
  const firstName = profile.name.split(" ")[0];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="avatar-intro"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: easeEditorial } }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden px-6"
          style={{ background: VIOLET, color: CREAM }}
          aria-label="Loading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: GRAIN, opacity: 0.14, mixBlendMode: "overlay" }}
          />

          <div className="relative flex w-full max-w-xl flex-col items-center text-center">
            {/* avatar + orbiting sparkles */}
            <div className="relative">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-22%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.3 },
                  rotate: { duration: 26, ease: "linear", repeat: Infinity },
                }}
              >
                {SPARKS.map((spark, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={spark.style}
                    animate={{ scale: [0.7, 1, 0.7], opacity: [0.55, 1, 0.55] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: spark.delay,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkle size={spark.size} fill={spark.fill} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="relative h-[clamp(9rem,30vw,14rem)] w-[clamp(9rem,30vw,14rem)] overflow-hidden rounded-full border-[4px]"
                style={{ borderColor: INK, background: CREAM, boxShadow: `12px 12px 0 ${INK}` }}
                initial={{ scale: 0.5, y: 24, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotate: -3, opacity: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.05 }}
              >
                <Avatar className="h-full w-full" />
              </motion.div>
            </div>

            {/* name */}
            <motion.p
              className="mt-12 font-display text-h3 font-bold uppercase tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4, ease: easeEditorial }}
            >
              Hey, I'm
            </motion.p>

            <motion.div
              className="mt-3 inline-block border-[3px] px-5 py-1"
              style={{ borderColor: INK, background: GOLD, color: INK, boxShadow: `8px 8px 0 ${INK}` }}
              initial={{ y: 26, opacity: 0, rotate: 7 }}
              animate={{ y: 0, opacity: 1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 210, damping: 13, delay: 0.45 }}
            >
              <span className="font-display text-[clamp(2.5rem,10vw,4rem)] font-bold uppercase leading-none tracking-tight">
                {firstName}
              </span>
            </motion.div>

            {/* chips */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
              }}
            >
              <motion.div
                variants={{ hidden: { scale: 0.7, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
              >
                <SpinBadge />
              </motion.div>
              {profile.disciplines.map((discipline, i) => (
                <motion.span
                  key={discipline}
                  className="rounded-full border-[3px] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider"
                  style={{ borderColor: INK, background: CREAM, color: INK, boxShadow: `4px 4px 0 ${INK}` }}
                  variants={{
                    hidden: { y: 14, scale: 0.8, opacity: 0 },
                    visible: { y: 0, scale: 1, opacity: 1, rotate: i % 2 === 0 ? -3 : 3 },
                  }}
                >
                  {discipline}
                </motion.span>
              ))}
            </motion.div>

            {/* counter */}
            <motion.div
              className="mt-12 flex w-full max-w-xs items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div
                className="relative h-3.5 flex-1 overflow-hidden rounded-full border-[3px]"
                style={{ borderColor: INK, background: CREAM }}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${pct}%`, background: GOLD }}
                />
              </div>
              <span
                className="rounded-full border-[3px] px-2.5 py-0.5 font-mono text-xs tabular-nums"
                style={{ borderColor: INK, background: CREAM, color: INK }}
              >
                {String(pct).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          <p
            className="absolute bottom-8 font-mono text-[0.7rem] uppercase tracking-[0.2em]"
            style={{ color: CREAM, opacity: 0.7 }}
          >
            Tap anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
