import { motion } from "motion/react";
import { getPageTransitionVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/** Wraps each route's page content so page changes share one consistent transition. */
export function PageTransition({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getPageTransitionVariants(prefersReducedMotion);

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
