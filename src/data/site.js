/**
 * Site-level configuration.
 *
 * @typedef {Object} SiteConfig
 * @property {string} build            Build stamp, e.g. "2026.08".
 * @property {string} status           Short status keyword.
 * @property {string} contactEndpoint  POST target for the contact form. While
 *                                     blank, the form drafts a pre-filled email
 *                                     and hands off to the visitor's mail client.
 */

/** @type {SiteConfig} */
export const site = {
  build: "2026.10",
  status: "ONLINE",
  contactEndpoint: "",
};
