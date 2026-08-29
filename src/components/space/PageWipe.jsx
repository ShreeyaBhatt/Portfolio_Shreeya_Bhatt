import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A bulkhead wipe between routes: a dark panel with a faint grid and a glowing
 * cyan leading edge sweeps across, covers briefly, then clears to reveal the
 * new page. Calmer than a hyperspace burst — reads as moving through the ship.
 * `pointer-events-none`; skipped under reduced motion (PageTransition's fade
 * covers that) and on first load.
 */
const EASE = [0.83, 0, 0.17, 1];

export function PageWipe() {
  const { pathname } = useLocation();
  const reduce = usePrefersReducedMotion();
  const first = useRef(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (reduce) return;
    if (first.current) {
      first.current = false;
      return;
    }
    setToken(pathname + ":" + Date.now());
  }, [pathname, reduce]);

  return (
    <AnimatePresence>
      {token && (
        <motion.div
          key={token}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[68] flex items-center justify-center overflow-hidden bg-[var(--color-bg)]"
          initial={{ x: "-101%" }}
          animate={{ x: "0%" }}
          exit={{ x: "101%" }}
          transition={{ duration: 0.42, ease: EASE }}
          onAnimationComplete={(def) => {
            // once it has fully covered, hold a beat then let it exit
            if (def && def.x === "0%") window.setTimeout(() => setToken(null), 110);
          }}
        >
          <div className="grid-overlay absolute inset-0 opacity-60" style={{ "--grid-size": "48px" }} />
          {/* glowing leading edge */}
          <span
            className="absolute inset-y-0 right-0 w-[3px] bg-[var(--color-accent)]"
            style={{ boxShadow: "0 0 28px 2px var(--color-accent)" }}
          />
          <motion.span
            className="coord relative text-[var(--color-accent)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.64, times: [0, 0.25, 0.7, 1], ease: "linear" }}
          >
            // Relocating
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
