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
  tagline: "Full-Stack Developer & AI Enthusiast",
  bio: "Motivated Computer Science student building data-driven, AI-powered applications — from full-stack platforms with machine learning at their core to console-based systems grounded in solid data structures and clean architecture.",
  email: "shreeyasbhatt@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/shreeya-bhatt-4a5715363",
  githubUrl: "https://github.com/ShreeyaBhatt",
  github: {
    bio: "Computer Science & Technology Student • Full Stack Developer • Python Developer • AI Enthusiast",
    publicRepos: 13,
    stars: 6,
    focusAreas: ["System Design", "Machine Learning", "Advanced MERN Stack", "AWS & Cloud Computing"],
  },
  // Sourced from the "Looking For" / "Fun Fact" sections of my GitHub profile README.
  lookingFor: ["Software Engineering Internships", "Python Developer Roles", "MERN Stack Developer Roles"],
  funFacts: [
    "🎤 I enjoy singing just as much as I enjoy building software.",
    "💡 I believe technology should solve real-world problems.",
    "📚 Always mid-course on something new — right now that's AWS and cloud computing.",
  ],
  // Cycled by the hero's typewriter effect.
  roles: ["Full-Stack Developer", "AI Enthusiast", "Python Developer", "Problem Solver", "Singer, off the clock 🎤"],
};
