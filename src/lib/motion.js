import { motion } from "motion/react";
import { durationTokens } from "./tokens.js";

const customMotionComponentCache = new Map();

/**
 * Resolves an `as` prop to a motion-capable component. `motion[tagName]` only
 * works for plain DOM tag strings ("a", "button", ...) — for a custom
 * component (e.g. react-router's `Link`) it must go through `motion.create`,
 * otherwise the proxy stringifies the component reference into an invalid
 * DOM tag name and React throws. Results are cached per component reference
 * so repeated renders don't recreate (and remount) the wrapped component.
 */
export function getMotionComponent(as) {
  if (typeof as === "string") {
    return motion[as] ?? motion.div;
  }
  if (!customMotionComponentCache.has(as)) {
    customMotionComponentCache.set(as, motion.create(as));
  }
  return customMotionComponentCache.get(as);
}

/** The one signature ease curve used everywhere — buttons, reveals, page transitions. */
export const easeSignature = [0.22, 1, 0.36, 1];

/** A slower, heavier curve for large type and full-section reveals. */
export const easeEditorial = [0.16, 1, 0.3, 1];

export const durations = {
  micro: durationTokens.micro / 1000,
  transition: durationTokens.transition / 1000,
  page: durationTokens.page / 1000,
};

/** Shared viewport config so every scroll reveal on the site fires alike. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" };

/**
 * Masked line reveal — the element slides up from beneath its own clipping
 * wrapper (`.line-mask`) instead of fading in. This is the site's primary
 * heading entrance: type rises into place, which reads far more deliberate
 * than opacity alone.
 */
export const lineRevealVariants = {
  // 135%, not 100%: `.line-mask` carries padding-bottom for descenders, so
  // the resting box is taller than the line itself. At 100% the line would
  // still be showing inside that padding before it animates.
  hidden: { y: "135%" },
  visible: {
    y: "0%",
    transition: { duration: durations.page, ease: easeEditorial },
  },
};

/** Fade + slide entrance, used for body copy and cards. */
export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.transition, ease: easeSignature },
  },
};

/** Stagger wrapper for lists, grids, and multi-line headings. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Tighter stagger for the individual lines of a single heading. */
export const staggerLines = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/** Page-level transition applied to each route's root element. */
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.transition, ease: easeSignature },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: durations.micro, ease: "easeIn" },
  },
};

/**
 * Reduced-motion-safe variants: same shape, no offset/duration, so a single
 * substitution point disables motion everywhere it's consumed.
 */
export const staticVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const staticLineVariants = {
  hidden: { y: "0%" },
  visible: { y: "0%" },
};

export const staticPageTransitionVariants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};

export function getRevealVariants(prefersReducedMotion) {
  return prefersReducedMotion ? staticVariants : revealVariants;
}

export function getLineRevealVariants(prefersReducedMotion) {
  return prefersReducedMotion ? staticLineVariants : lineRevealVariants;
}

export function getPageTransitionVariants(prefersReducedMotion) {
  return prefersReducedMotion ? staticPageTransitionVariants : pageTransitionVariants;
}
