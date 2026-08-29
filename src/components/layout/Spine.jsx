import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * A fixed hairline down the left edge with the current section's index and
 * label stacked vertically against it — the editorial "spine" that tells the
 * reader where they are in a long scroll.
 *
 * Zero config at the call site: it observes every element on the page carrying
 * `data-spine="NN · Label"` and lights the one nearest the viewport centre.
 * Desktop only; it sits in the outer margin and never overlaps content.
 */
export function Spine() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-spine]"));
    if (nodes.length === 0) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.getAttribute("data-spine"));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const [index, label] = (active ?? "").split(" · ");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-0 z-30 hidden h-screen w-px bg-[var(--color-border)] xl:block"
    >
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-3"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="font-mono text-[0.7rem] tracking-[0.1em] text-[var(--color-accent)]">
              {index}
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
