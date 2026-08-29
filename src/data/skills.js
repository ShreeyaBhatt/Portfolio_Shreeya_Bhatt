/**
 * @typedef {Object} SkillCategory
 * @property {string} category
 * @property {string} blurb      one line on what this group is actually for
 * @property {"violet"|"cyan"|"amber"|"sky"|"pink"} tone
 *   Maps to a `.tone-*` class in src/styles/index.css, which supplies
 *   `--slide-accent` and `--slide-tint` for that carousel panel and flips
 *   them automatically between light and dark mode.
 * @property {string[]} skills
 */

/** @type {SkillCategory[]} */
export const skillCategories = [
  {
    category: "Languages",
    blurb: "The three I reach for first, and the ones every project here is written in.",
    tone: "violet",
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    category: "Data & ML",
    blurb: "Turning raw data into models that make a real decision inside a product.",
    tone: "cyan",
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Analysis",
      "Pandas",
      "Data Structures",
    ],
  },
  {
    category: "Web & Frameworks",
    blurb: "Full-stack delivery — REST APIs on the back, a considered interface on the front.",
    tone: "amber",
    skills: ["Django", "DRF", "React.js", "Node.js", "Express.js", "HTML5", "CSS3"],
  },
  {
    category: "Tools & Practices",
    blurb: "The workflow around the code: data, version control, and shipping discipline.",
    tone: "sky",
    skills: [
      "Streamlit",
      "Git & GitHub",
      "MongoDB",
      "DBMS",
      "JDBC",
      "REST APIs",
      "SDLC",
      "OOP",
    ],
  },
  {
    category: "Professional",
    blurb: "How I work with a team, a deadline, and a problem nobody has solved yet.",
    tone: "pink",
    skills: [
      "Analytical Thinking",
      "Adaptability",
      "Communication",
      "Time Management",
      "Problem Solving",
      "Teamwork",
    ],
  },
];
