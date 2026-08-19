import { motion } from "motion/react";
import { getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export function SectionHeading({ eyebrow, title, description }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className="mb-10 max-w-2xl"
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-sm text-[var(--color-accent)]">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-[var(--color-fg-muted)]">{description}</p>
      )}
    </motion.div>
  );
}
