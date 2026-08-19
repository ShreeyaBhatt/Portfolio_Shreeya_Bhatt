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

/** The one signature ease curve used everywhere — buttons, cards, page transitions. */
export const easeSignature = [0.22, 1, 0.36, 1];

export const durations = {
  micro: durationTokens.micro / 1000,
  transition: durationTokens.transition / 1000,
  page: durationTokens.page / 1000,
};

/** Fade + slide entrance, used for whileInView reveals across pages. */
export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.transition, ease: easeSignature },
  },
};

/** Stagger wrapper for lists/grids of cards. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Page-level transition applied to each route's root element. */
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.page, ease: easeSignature },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: durations.transition, ease: easeSignature },
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

export const staticPageTransitionVariants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};

export function getRevealVariants(prefersReducedMotion) {
  return prefersReducedMotion ? staticVariants : revealVariants;
}

export function getPageTransitionVariants(prefersReducedMotion) {
  return prefersReducedMotion ? staticPageTransitionVariants : pageTransitionVariants;
}
