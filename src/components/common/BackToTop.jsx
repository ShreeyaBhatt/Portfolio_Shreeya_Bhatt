import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** A mono pill that fades in once you're a screen or so down the page. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
          }
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]/80 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-fg-muted)] backdrop-blur-md transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <span aria-hidden="true">↑</span> Top
        </motion.button>
      )}
    </AnimatePresence>
  );
}
