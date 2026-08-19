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
      <h2 className="relative inline-block text-3xl font-bold tracking-tight md:text-4xl">
        {title}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
        />
      </h2>
      {description && (
        <p className="mt-3 text-[var(--color-fg-muted)]">{description}</p>
      )}
    </motion.div>
  );
}
