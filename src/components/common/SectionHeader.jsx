import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { RevealLines } from "./RevealLines.jsx";
import { easeEditorial, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The one section header used across the whole site — a short mint rule that
 * draws itself in, a mono index/label row, then an optional display title and
 * lead. Numbering every section gives a long scroll an editorial spine: the
 * reader always knows where they are.
 *
 *   ──
 *   01 / SELECTED WORK                         FIVE PROJECTS
 *
 *   Things I've
 *   built
 *
 * @param {{
 *   index?: string,
 *   label: string,
 *   meta?: string,
 *   titleLines?: import("react").ReactNode[],
 *   lead?: import("react").ReactNode,
 *   className?: string,
 *   titleClassName?: string,
 * }} props
 */
export function SectionHeader({
  index,
  label,
  meta,
  titleLines,
  lead,
  className,
  titleClassName,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reveal = getRevealVariants(prefersReducedMotion);

  return (
    <div className={cn(className)}>
      <motion.hr
        aria-hidden="true"
        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: easeEditorial }}
        className="rule-accent origin-left"
      />

      <div className="mt-5 flex items-baseline justify-between gap-6">
        <p className="eyebrow flex items-baseline gap-2.5">
          {index && <span className="text-[var(--color-accent)]">{index}</span>}
          {index && <span className="text-[var(--color-fg-subtle)]">/</span>}
          <span>{label}</span>
        </p>
        {meta && <p className="eyebrow shrink-0 text-[var(--color-fg-subtle)]">{meta}</p>}
      </div>

      {titleLines && (
        <RevealLines
          lines={titleLines}
          className={cn("mt-7 text-h2 font-semibold", titleClassName)}
        />
      )}

      {lead && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reveal}
          className="container-prose mt-6 text-lead text-[var(--color-fg-muted)]"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
