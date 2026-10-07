/**
 * Professional experience — only what's on my LinkedIn profile. No invented
 * responsibilities, stack, or metrics: if it isn't listed there, it isn't here.
 *
 * @typedef {Object} ExperienceEntry
 * @property {string} role
 * @property {string} company
 * @property {string} type       employment type, e.g. "Internship"
 * @property {string} period
 * @property {string} location
 * @property {boolean} [current]
 * @property {string} summary
 */

/** @type {ExperienceEntry[]} */
export const experience = [
  {
    role: "Intern",
    company: "Anblicks",
    type: "Internship",
    period: "2026 – Present",
    location: "Ahmedabad, Gujarat, India · On-site",
    current: true,
    summary:
      "Gaining hands-on exposure to software development in an enterprise technology environment — building technical skills through practical tasks, training, and real-world project exposure, and sharpening problem-solving along the way.",
  },
];
