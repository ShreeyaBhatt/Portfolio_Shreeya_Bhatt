import { motion } from "motion/react";
import { experimentLog } from "../../data/log.js";
import { staggerContainer, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The experiment log as ruled notebook rows — a mono index and channel on the
 * left, the note on the right. Reads top-down like a lab book.
 */
export function ExperimentLog() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className="border-t border-[var(--color-border)]"
    >
      {experimentLog.map((entry) => (
        <motion.li
          key={entry.id}
          variants={variants}
          className="grid gap-2 border-b border-[var(--color-border)] py-7 md:grid-cols-[5rem_8rem_1fr] md:gap-8 md:py-8"
        >
          <span className="label-mono text-[var(--color-accent)]">[{entry.id}]</span>
          <span className="label-mono flex gap-x-2 gap-y-1 text-[var(--color-fg-subtle)] max-md:flex-row md:flex-col">
            <span>{entry.date}</span>
            <span className="text-[var(--color-fg-muted)]">{entry.tag}</span>
          </span>
          <p className="max-w-2xl text-[var(--color-fg-muted)]">{entry.note}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
