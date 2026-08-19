import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeSignature } from "../../lib/motion.js";

const SESSION_KEY = "sb-intro-seen";
const HOLD_MS = 1400;

/**
 * A one-time splash shown when someone lands on the site: just the name,
 * then a transition into whatever page they arrived at. Shows once per
 * browser tab session (sessionStorage-gated) so it doesn't replay on every
 * in-site navigation or refresh. Skipped entirely for reduced motion.
 */
export function IntroSplash() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(
    () => !window.sessionStorage.getItem(SESSION_KEY)
  );

  useEffect(() => {
    if (!visible) return undefined;

    if (prefersReducedMotion) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const timeout = setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
    }, HOLD_MS);

    return () => clearTimeout(timeout);
  }, [visible, prefersReducedMotion]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: easeSignature } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: easeSignature } }}
            transition={{ duration: 0.6, ease: easeSignature }}
            className="flex flex-col items-center text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-mono text-sm text-[var(--color-accent)]"
            >
              {"// hello, I'm"}
            </motion.p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              {firstName} <span className="text-[var(--color-accent)]">{lastName}</span>
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
