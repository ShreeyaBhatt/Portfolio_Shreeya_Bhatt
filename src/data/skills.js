/**
 * @typedef {Object} SkillCategory
 * @property {string} category
 * @property {string[]} skills
 */

/** @type {SkillCategory[]} */
export const skillCategories = [
  { category: "Languages", skills: ["Python", "Java", "JavaScript"] },
  {
    category: "Data & ML",
    skills: ["Machine Learning", "Artificial Intelligence", "Data Analysis", "Pandas", "Data Structures"],
  },
  {
    category: "Web & Frameworks",
    skills: ["Django", "DRF", "React.js", "Node.js", "Express.js", "HTML5", "CSS3"],
  },
  {
    category: "Tools & Practices",
    skills: ["Streamlit", "Git & GitHub", "MongoDB", "DBMS", "JDBC", "REST APIs", "SDLC", "OOP"],
  },
  {
    category: "Professional",
    skills: ["Analytical Thinking", "Adaptability", "Communication", "Time Management", "Problem Solving", "Teamwork"],
  },
];
