/**
 * JS-side mirror of the design tokens defined in src/styles/index.css.
 * Anything Tailwind classes can't reach directly (canvas drawing,
 * inline style calculations) should read from here instead of hardcoding
 * new numbers, so the whole site stays keyed to one token set.
 */

export const colorTokens = {
  accent: "#6C4CF0", // nebula violet
  accentDark: "#9C85FF",
  accent2: "#A15C07", // starlight gold
  accent2Dark: "#FFC164",
};

export const radiusTokens = {
  sm: 8,
  md: 16,
  lg: 24,
};

export const shadowTokens = {
  resting: "var(--shadow-resting)",
  raised: "var(--shadow-raised)",
  modal: "var(--shadow-modal)",
};

/** Duration tiers (ms) — micro-interactions, transitions, page-level motion. */
export const durationTokens = {
  micro: 150,
  transition: 250,
  page: 400,
};
