/**
 * Site-level configuration for "The Digital Lab".
 *
 * These are the values that dress the lab metaphor (the boot sequence, the
 * persistent status panel, the footer readout) plus two integration slots that
 * are wired but intentionally empty until real endpoints exist.
 *
 * @typedef {Object} SiteConfig
 * @property {string} labNumber          Shown as "DIGITAL LAB / 001".
 * @property {string} build              Build stamp, e.g. "2026.08".
 * @property {string} status             Availability keyword for LAB STATUS.
 * @property {string[]} currentlyExploring
 * @property {string} contactEndpoint    POST target for the contact form.
 */

/** @type {SiteConfig} */
export const site = {
  labNumber: "001",
  build: "2026.08",
  status: "AVAILABLE",
  currentlyExploring: ["Python", "AI", "Data"],

  // A Formspree / API URL for the contact form to POST to. While blank, the
  // form drafts a pre-filled email and hands off to the visitor's mail client.
  contactEndpoint: "",
};
