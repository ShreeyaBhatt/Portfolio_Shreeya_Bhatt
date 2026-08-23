import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { easeSignature } from "../../lib/motion.js";
import { RocketIcon } from "./icons.jsx";

const SESSION_KEY = "sb-intro-seen";
const HOLD_MS = 1100;
const LAUNCH_MS = 550;

/**
 * A one-time splash shown when someone lands on the site: the name, a rocket
 * idling beside it, then a liftoff — the rocket flies up and off while the
 * text fades — right before the splash itself dissolves into whatever page
 * they arrived at. The rocket's flight *is* the transition into the site.
 * Shows once per browser tab session (sessionStorage-gated) so it doesn't
 * replay on every in-site navigation or refresh. Skipped entirely for
 * reduced motion.
 */
export function IntroSplash() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(
    () => !window.sessionStorage.getItem(SESSION_KEY)
  );
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    if (prefersReducedMotion) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const launchTimeout = setTimeout(() => setLaunching(true), HOLD_MS);
    const hideTimeout = setTimeout(() => {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
    }, HOLD_MS + LAUNCH_MS);

    return () => {
      clearTimeout(launchTimeout);
      clearTimeout(hideTimeout);
    };
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
            animate={
              launching
                ? { opacity: 0.15, y: -14, scale: 0.98 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: easeSignature } }}
            transition={
              launching
                ? { duration: LAUNCH_MS / 1000, ease: easeSignature }
                : { duration: 0.6, ease: easeSignature }
            }
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : launching
                    ? { opacity: 0, y: -220, scale: 0.7 }
                    : { opacity: 1, y: [0, -8, 0], rotate: [-3, 3, -3] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.4 }
                  : launching
                    ? { duration: LAUNCH_MS / 1000, ease: [0.6, 0, 1, 0.4] }
                    : {
                        opacity: { duration: 0.4 },
                        y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                        rotate: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                      }
              }
              style={{
                filter: launching ? "drop-shadow(0 0 12px var(--color-accent-2))" : "none",
              }}
              className="mb-2"
            >
              <RocketIcon size={44} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-mono text-sm text-[var(--color-accent)]"
            >
              {"// hello from orbit, I'm"}
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
