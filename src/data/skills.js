/**
 * The toolbox — skills as a connected set of drawers rather than a rated list.
 *
 * There are no numbers here on purpose: a percentage next to "Python" measures
 * nothing. What is worth showing is how the pieces hang together — Python at
 * the centre, data and ML growing straight out of it, the web and backend
 * layers meeting where the full-stack work happens, and the Java fundamentals
 * off to one side as the place the basics were built rather than a current
 * focus.
 *
 * @typedef {"primary"|"core"|"secondary"} GroupWeight
 *   primary  → Python, drawn largest and central
 *   core     → the everyday drawers
 *   secondary→ Java / fundamentals, smaller and set apart
 *
 * @typedef {Object} ToolboxGroup
 * @property {string} id
 * @property {string} label
 * @property {string} short   short all-caps token for the graph node
 * @property {GroupWeight} weight
 * @property {string} blurb
 * @property {string[]} skills
 */

/** @type {ToolboxGroup[]} */
export const toolboxGroups = [
  {
    id: "python",
    label: "Python",
    short: "PYTHON",
    weight: "primary",
    blurb:
      "The core of almost everything here — the data work, the ML, and the glue between them.",
    skills: ["Python", "Pandas", "Matplotlib", "Streamlit"],
  },
  {
    id: "data",
    label: "Data",
    short: "DATA",
    weight: "core",
    blurb: "Turning raw data into something you can actually make a decision from.",
    skills: ["Data Analysis", "Exploratory Data Analysis", "Data Visualization", "Data Structures"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    short: "ML",
    weight: "core",
    blurb: "Models that do real work inside a product — risk classification, value prediction.",
    skills: ["Machine Learning", "Artificial Intelligence", "Automatic model selection", "Gemini API"],
  },
  {
    id: "web",
    label: "Web",
    short: "WEB",
    weight: "core",
    blurb: "The interface layer — considered and responsive, not an afterthought.",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js"],
  },
  {
    id: "backend",
    label: "Backend & Data Stores",
    short: "BACKEND",
    weight: "core",
    blurb: "REST APIs on the back, relational and document stores underneath.",
    skills: ["Django", "Django REST", "REST APIs", "MongoDB", "MySQL", "DBMS", "JDBC"],
  },
  {
    id: "tooling",
    label: "Tooling & Practice",
    short: "TOOLING",
    weight: "core",
    blurb: "The workflow around the code — version control and a sense of the lifecycle.",
    skills: ["Git & GitHub", "SDLC", "OOP"],
  },
  {
    id: "fundamentals",
    label: "Java / Fundamentals",
    short: "JAVA",
    weight: "secondary",
    blurb:
      "Where the fundamentals were built — OOP, data structures and JDBC, written in Core Java.",
    skills: ["Java", "OOP", "Inheritance", "Encapsulation", "JDBC", "DSA"],
  },
];

/** Undirected edges between groups — how the toolbox actually connects. */
export const toolboxLinks = [
  ["python", "data"],
  ["python", "ml"],
  ["python", "tooling"],
  ["python", "backend"],
  ["data", "ml"],
  ["ml", "backend"],
  ["web", "backend"],
  ["backend", "fundamentals"],
];

/** Soft skills — kept out of the toolbox graph, surfaced plainly elsewhere. */
export const professionalSkills = [
  "Analytical Thinking",
  "Adaptability",
  "Communication",
  "Time Management",
  "Problem Solving",
  "Teamwork",
];
