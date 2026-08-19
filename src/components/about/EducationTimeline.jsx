import { motion } from "motion/react";
import { education } from "../../data/education.js";
import { staggerContainer, getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export function EducationTimeline() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="relative border-l border-[var(--color-border)] pl-6"
    >
      {education.map((entry) => (
        <motion.li key={entry.degree} variants={itemVariants} className="relative mb-10 last:mb-0">
          <span
            className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]"
            aria-hidden="true"
          />
          <p className="font-mono text-xs text-[var(--color-fg-muted)]">{entry.period}</p>
          <h3 className="mt-1 text-lg font-semibold">{entry.degree}</h3>
          <p className="text-sm text-[var(--color-fg-muted)]">
            {entry.institution} — {entry.location}
          </p>
          {entry.detail && <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{entry.detail}</p>}
        </motion.li>
      ))}
    </motion.ol>
  );
}
