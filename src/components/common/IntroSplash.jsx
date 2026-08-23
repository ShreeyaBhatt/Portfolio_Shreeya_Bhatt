import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeSignature } from "../../lib/motion.js";
import { RocketIcon } from "./icons.jsx";

const SESSION_KEY = "sb-intro-seen";

// A launch sequence, one step at a time: T-minus 4..1, ignition flash, a
// brief hold on the name, then liftoff. Total run time is intentionally
// short (~3.3s) — it's a one-time flourish, not something to sit through.
const DIGIT_MS = 480;
const TIMELINE = [
  { phase: "count", digit: 4, duration: DIGIT_MS },
  { phase: "count", digit: 3, duration: DIGIT_MS },
  { phase: "count", digit: 2, duration: DIGIT_MS },
  { phase: "count", digit: 1, duration: DIGIT_MS },
  { phase: "ignition", duration: 260 },
  { phase: "hold", duration: 700 },
  { phase: "launch", duration: 550 },
];
const RING_CIRCUMFERENCE = 2 * Math.PI * 52;

/**
 * A one-time splash shown when someone lands on the site: a T-minus
 * countdown, an ignition flash, the name appearing beside an idling rocket,
 * then liftoff — the rocket flies up and off while the text fades — right
 * as the splash itself dissolves into whatever page they arrived at. The
 * rocket's flight *is* the transition into the site. Click/tap anywhere (or
 * press any key) to skip straight to that transition.
 *
 * Shows once per browser tab session (sessionStorage-gated) so it doesn't
 * replay on every in-site navigation or refresh. Skipped entirely for
 * reduced motion.
 */
export function IntroSplash() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(
    () => !window.sessionStorage.getItem(SESSION_KEY)
  );
  const [stepIndex, setStepIndex] = useState(0);

  const finish = () => {
    window.sessionStorage.setItem(SESSION_KEY, "true");
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return undefined;

    if (prefersReducedMotion) {
      finish();
      return undefined;
    }

    document.body.style.overflow = "hidden";

    if (stepIndex >= TIMELINE.length) {
      finish();
      return undefined;
    }

    const timeout = setTimeout(() => setStepIndex((i) => i + 1), TIMELINE[stepIndex].duration);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, prefersReducedMotion, stepIndex]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  // Skip straight to the transition — click/tap anywhere, or any key.
  useEffect(() => {
    if (!visible || prefersReducedMotion) return undefined;
    function skip() {
      setStepIndex(TIMELINE.length - 1);
    }
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [visible, prefersReducedMotion]);

  const step = useMemo(() => TIMELINE[Math.min(stepIndex, TIMELINE.length - 1)], [stepIndex]);
  const isCounting = step.phase === "count";
  const isIgnition = step.phase === "ignition";
  const isLaunching = step.phase === "launch";

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-splash"
          onClick={() => setStepIndex(TIMELINE.length - 1)}
          initial={{ opacity: 1 }}
          animate={isIgnition ? { x: [0, -6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={isIgnition ? { duration: 0.26, ease: "easeOut" } : { duration: 0.2 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: easeSignature } }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[var(--color-bg)]"
        >
          {isIgnition && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{ duration: 0.26, times: [0, 0.3, 1] }}
            />
          )}

          {isCounting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <p className="mb-6 font-mono text-sm text-[var(--color-accent)]">
                {"// ignition sequence"}
              </p>
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg width="128" height="128" viewBox="0 0 120 120" className="absolute inset-0">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-border)" strokeWidth="2" />
                  <motion.circle
                    key={step.digit}
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="var(--color-accent-2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: RING_CIRCUMFERENCE }}
                    transition={{ duration: DIGIT_MS / 1000, ease: "linear" }}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={step.digit}
                    initial={{ opacity: 0, scale: 1.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.25, ease: easeSignature }}
                    className="font-mono text-6xl font-bold text-[var(--color-accent-2)]"
                  >
                    {step.digit}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {(step.phase === "hold" || isLaunching) && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={
                isLaunching
                  ? { opacity: 0.15, y: -14, scale: 0.98 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{
                duration: isLaunching ? TIMELINE[TIMELINE.length - 1].duration / 1000 : 0.35,
                ease: easeSignature,
              }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                animate={
                  isLaunching
                    ? { opacity: 0, y: -220, scale: 0.7 }
                    : { opacity: 1, y: [0, -8, 0], rotate: [-3, 3, -3] }
                }
                transition={
                  isLaunching
                    ? { duration: TIMELINE[TIMELINE.length - 1].duration / 1000, ease: [0.6, 0, 1, 0.4] }
                    : {
                        y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
                      }
                }
                style={{
                  filter: isLaunching ? "drop-shadow(0 0 12px var(--color-accent-2))" : "none",
                }}
                className="mb-2"
              >
                <RocketIcon size={44} />
              </motion.div>
              <p className="font-mono text-sm text-[var(--color-accent)]">
                {"// hello from orbit, I'm"}
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-6xl">
                {firstName} <span className="text-[var(--color-accent)]">{lastName}</span>
              </h1>
            </motion.div>
          )}

          {!isLaunching && (
            <p className="absolute bottom-8 font-mono text-xs text-[var(--color-fg-muted)] opacity-60">
              click, tap, or press any key to skip
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
