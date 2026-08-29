import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeEditorial } from "../../lib/motion.js";

const SESSION_KEY = "sb-intro-seen";
const DURATION_MS = 900;

/**
 * A brief arrival screen: the name set in large display type above a hairline
 * rule that fills left-to-right with a counter, then the whole panel wipes
 * upward to reveal the page beneath it.
 *
 * Deliberately short (~900ms) and skippable. A loader earns its place by
 * giving the first paint a moment of composure — not by making anyone wait,
 * which is why there is no countdown and no animation to sit through.
 *
 * Shown once per browser tab (sessionStorage-gated) so it doesn't replay on
 * in-site navigation or refresh, and skipped entirely under reduced motion.
 */
export function Loader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(
    () => !window.sessionStorage.getItem(SESSION_KEY)
  );
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  // Drive the counter, then dismiss. rAF rather than a timer chain so the
  // number tracks real elapsed time on a slow first paint.
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

  // Hold the scroll position while the panel covers the page.
  useEffect(() => {
    if (!visible) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Any click or keypress skips straight to the reveal.
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

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: easeEditorial } }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col justify-end bg-[var(--color-bg)]"
        >
          <div className="container-page pb-[12vh]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeEditorial }}
            >
              <h1 className="text-hero font-display font-medium">
                {firstName}{" "}
                <span className="accent-italic text-[var(--color-accent)]">{lastName}</span>
              </h1>
              <p className="label-mono mt-5 text-[var(--color-fg-subtle)]">
                {profile.disciplines.join("  ·  ")}
              </p>
            </motion.div>

            <div className="mt-10 flex items-center gap-5">
              <div className="relative h-px flex-1 overflow-hidden bg-[var(--color-border)]">
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="label-mono w-10 shrink-0 text-right text-[var(--color-fg-subtle)] tabular-nums">
                {Math.round(progress * 100)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
