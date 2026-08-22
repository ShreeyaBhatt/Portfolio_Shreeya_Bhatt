/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} tagline
 * @property {string} bio
 * @property {string} email
 * @property {string} linkedinUrl
 * @property {string} githubUrl
 * @property {{bio: string, publicRepos: number, stars: number, focusAreas: string[]}} github
 * @property {string[]} lookingFor
 * @property {string[]} funFacts
 * @property {string[]} roles
 */

/** @type {Profile} */
export const profile = {
  name: "Shreeya Bhatt",
  tagline: "Python Developer & AI Enthusiast",
  bio: "Motivated Computer Science student who builds with Python at the core — data-driven, AI-powered applications with machine learning at their heart, backed by full-stack platforms and console-based systems grounded in solid data structures and clean architecture.",
  email: "shreeyasbhatt@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/shreeya-bhatt-4a5715363",
  githubUrl: "https://github.com/ShreeyaBhatt",
  github: {
    bio: "Computer Science & Technology Student • Full Stack Developer • Python Developer • AI Enthusiast",
    publicRepos: 13,
    stars: 6,
    focusAreas: ["Machine Learning", "System Design", "AWS & Cloud Computing", "Advanced MERN Stack"],
  },
  // Sourced from the "Looking For" / "Fun Fact" sections of my GitHub profile README.
  lookingFor: ["Python Developer Roles", "Software Engineering Internships", "MERN Stack Developer Roles"],
  funFacts: [
    "🎤 I enjoy singing just as much as I enjoy building software.",
    "💡 I believe technology should solve real-world problems.",
    "📚 Always mid-course on something new — right now that's AWS and cloud computing.",
  ],
  // Cycled by the hero's typewriter effect.
  roles: ["Python Developer", "AI Enthusiast", "Full-Stack Developer", "Problem Solver", "Singer, off the clock 🎤"],
};
