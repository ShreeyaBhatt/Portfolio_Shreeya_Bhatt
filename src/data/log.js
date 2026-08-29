/**
 * The experiment log — a running research notebook. These are notes on what's
 * being read, tried, and learned right now, not claims of finished work.
 * Deliberately easy to edit: add an entry to the top, keep the id sequence.
 *
 * @typedef {Object} LogEntry
 * @property {string} id     zero-padded, newest highest
 * @property {string} date   YYYY.MM
 * @property {string} tag    one-word channel
 * @property {string} note
 */

/** @type {LogEntry[]} */
export const experimentLog = [
  {
    id: "005",
    date: "2026.08",
    tag: "Cloud",
    note: "Working through AWS and cloud computing — figuring out where deployment goes after a Render free tier.",
  },
  {
    id: "004",
    date: "2026.07",
    tag: "Architecture",
    note: "Reading about system design: how the parts of a larger service are meant to fit together and fail safely.",
  },
  {
    id: "003",
    date: "2026.07",
    tag: "ML Ops",
    note: "Curious about model deployment — getting a trained model out of a notebook and behind a clean endpoint.",
  },
  {
    id: "002",
    date: "2026.06",
    tag: "Frontend",
    note: "Paying closer attention to interaction design while rebuilding this portfolio as a digital lab.",
  },
  {
    id: "001",
    date: "2026.05",
    tag: "MERN",
    note: "Going deeper on the MERN stack beyond what WealthNest strictly needed to ship.",
  },
];
