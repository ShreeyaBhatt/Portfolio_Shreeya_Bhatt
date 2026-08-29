import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { getLineRevealVariants, staggerLines, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The site's signature heading entrance: each line is wrapped in its own
 * clipping box and slides up out of it, one after the next.
 *
 * This is deliberately not a fade. Oversized display type that fades in reads
 * as a slideshow; type that rises out of a mask reads as typesetting, and it's
 * the single motion detail that does the most to make the layout feel
 * designed rather than assembled.
 *
 * `lines` is an array of nodes so a line can carry inline markup — the
 * serif-italic accent word, an accent-coloured span, and so on.
 *
 * @param {{
 *   lines: import("react").ReactNode[],
 *   as?: keyof JSX.IntrinsicElements,
 *   className?: string,
 *   animateOnMount?: boolean,  // hero headings fire immediately; the rest wait for scroll
 * }} props
 */
export function RevealLines({ lines, as: Tag = "h2", className, animateOnMount = false }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getLineRevealVariants(prefersReducedMotion);

  const trigger = animateOnMount
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: viewportOnce };

  return (
    <motion.div initial="hidden" variants={staggerLines} {...trigger}>
      <Tag className={cn(className)}>
        {lines.map((line, index) => (
          // Index keys are correct here: `lines` is a fixed, ordered list of
          // presentational fragments, never reordered or filtered.
          <span key={index} className="line-mask">
            <motion.span variants={variants} className="block">
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
