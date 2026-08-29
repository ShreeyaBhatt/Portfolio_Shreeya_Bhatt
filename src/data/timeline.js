/**
 * The development timeline — a factual journey, assembled only from this
 * portfolio's own records (see education.js, certifications.js, projects.js).
 * It is deliberately NOT an employment history: every line is a thing built or
 * a technology picked up, dated from the material already on the site.
 *
 * @typedef {Object} TimelinePhase
 * @property {string} year
 * @property {string} title
 * @property {string} summary
 * @property {string[]} built     shipped projects and coursework
 * @property {string[]} explored  technologies taken on
 * @property {boolean} [open]     the still-unfolding entry
 */

/** @type {TimelinePhase[]} */
export const timeline = [
  {
    year: "2024",
    title: "Foundation",
    summary: "Started a Computer Science degree and went deep on Python from day one.",
    built: [
      "Began B.E. Computer Science & Technology at L.J. Institute (Sep 2024)",
      "Completed The Complete Python Bootcamp",
    ],
    explored: ["Python", "Programming fundamentals"],
  },
  {
    year: "2025",
    title: "Exploration",
    summary:
      "A year of Core Java systems and the fundamentals underneath them — OOP, data structures, JDBC — with a first pass at the web.",
    built: [
      "SmartCart — supermarket & inventory system",
      "Payroll Management System — a salary engine with search and sort",
      "CareeRise — a job portal with a hand-built linked-node queue",
    ],
    explored: [
      "Core Java",
      "OOP",
      "Data Structures",
      "JDBC / MySQL",
      "HTML, CSS & JavaScript",
    ],
  },
  {
    year: "2026",
    title: "Building",
    summary:
      "Shifted to full-stack and machine learning — shipping data apps and an ML-driven platform end to end.",
    built: [
      "SpendWise — an expense tracker shipped in two stacks",
      "WealthNest — a full-stack investment platform with ML risk models and a Gemini assistant",
    ],
    explored: [
      "Django REST",
      "React",
      "Node.js",
      "MongoDB",
      "Machine Learning",
      "Pandas & EDA",
    ],
  },
  {
    year: "2026 +",
    title: "Next experiment",
    summary: "Mid-course on cloud, heading toward graduation in 2028, and open to internships.",
    built: [],
    explored: ["AWS & Cloud Computing", "System Design", "Advanced MERN"],
    open: true,
  },
];
