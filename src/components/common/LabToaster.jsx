import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { onLab } from "../../lib/labEvents.js";
import { easeSignature } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Transient corner messages — used by the easter eggs and the odd bit of
 * feedback. Mounted once in the layout; listens on the lab event bus.
 * Each message clears itself after a few seconds.
 */
let nextId = 0;

export function LabToaster() {
  const [items, setItems] = useState([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(
    () =>
      onLab("toast", ({ message }) => {
        const id = ++nextId;
        setItems((list) => [...list, { id, message }]);
        window.setTimeout(() => {
          setItems((list) => list.filter((it) => it.id !== id));
        }, 3600);
      }),
    []
  );

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[75] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: easeSignature }}
            className="panel tech-border max-w-md px-4 py-2.5 font-mono text-xs text-[var(--color-fg-muted)] backdrop-blur-md"
          >
            <span className="mr-2 text-[var(--color-accent)]">//</span>
            {it.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
