import { motion, useScroll, useSpring } from "motion/react";

/** Thin progress bar under the Nav that fills as a long page scrolls — real scroll-linked motion. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      // Above the sticky nav (z-50), below the custom cursor (z-60) — the
      // nav's blurred background would otherwise paint straight over it.
      className="fixed left-0 right-0 top-0 z-[55] h-0.5 origin-left bg-[var(--color-accent)]"
    />
  );
}
