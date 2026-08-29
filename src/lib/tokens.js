/**
 * The JS-reachable slice of the design tokens defined in src/styles/index.css.
 *
 * Only motion durations live here. Colours, radii, and shadows deliberately do
 * not: everything that needs them either uses a Tailwind class or reads the
 * live CSS custom property (see SpaceBackground's `readThemeColors`), which
 * keeps those values correct across a light/dark toggle without a second copy
 * in JS that could silently drift out of sync with the stylesheet.
 */

/** Duration tiers (ms) — micro-interactions, transitions, page-level motion. */
export const durationTokens = {
  micro: 200,
  transition: 400,
  page: 700,
};
