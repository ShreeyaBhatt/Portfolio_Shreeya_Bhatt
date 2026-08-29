import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { RevealLines } from "./RevealLines.jsx";
import { easeEditorial, getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The one section header used across the whole site — a hairline rule that
 * draws itself in, a mono index/label row beneath it, then an optional
 * display title and lead.
 *
 *   ─────────────────────────────────────────────────────
 *   (01) SELECTED WORK                      FIVE PROJECTS
 *
 *   Things I've
 *   built
 *
 * Numbering every section is what gives a long scroll its editorial spine:
 * the reader always knows where they are in the document.
 *
 * @param {{
 *   index?: string,                          // "01"
 *   label: string,                           // "Selected Work"
 *   meta?: string,                           // right-aligned counterweight
 *   titleLines?: import("react").ReactNode[],// display title, one entry per line
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
        transition={{ duration: 0.9, ease: easeEditorial }}
        className="hairline origin-left"
      />

      <div className="mt-4 flex items-baseline justify-between gap-6">
        <p className="label-mono flex items-baseline gap-3 text-[var(--color-fg-subtle)]">
          {index && <span className="text-[var(--color-accent)]">({index})</span>}
          <span>{label}</span>
        </p>
        {meta && (
          <p className="label-mono shrink-0 text-[var(--color-fg-subtle)]">{meta}</p>
        )}
      </div>

      {titleLines && (
        <RevealLines
          lines={titleLines}
          className={cn("mt-8 text-h2 font-medium", titleClassName)}
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
