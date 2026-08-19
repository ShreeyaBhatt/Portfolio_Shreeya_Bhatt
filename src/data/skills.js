/**
 * @typedef {Object} SkillCategory
 * @property {string} category
 * @property {string[]} skills
 */

/** @type {SkillCategory[]} */
export const skillCategories = [
  { category: "Languages", skills: ["Python", "Java", "JavaScript"] },
  {
    category: "Web & Frameworks",
    skills: ["React.js", "Node.js", "Express.js", "Django", "DRF", "HTML5", "CSS3"],
  },
  {
    category: "Data & ML",
    skills: ["Machine Learning", "Artificial Intelligence", "Data Analysis", "Pandas", "Data Structures"],
  },
  {
    category: "Tools & Practices",
    skills: ["Git & GitHub", "MongoDB", "DBMS", "JDBC", "REST APIs", "SDLC", "OOP", "Streamlit"],
  },
  {
    category: "Professional",
    skills: ["Analytical Thinking", "Adaptability", "Communication", "Time Management", "Problem Solving", "Teamwork"],
  },
];
