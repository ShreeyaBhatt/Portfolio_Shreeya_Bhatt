/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} tagline
 * @property {string} bio
 * @property {string} email
 * @property {string} linkedinUrl
 * @property {string} githubUrl
 * @property {string} resumePath
 * @property {string} photoPath
 * @property {{bio: string, publicRepos: number, stars: number, focusAreas: string[]}} github
 */

/** @type {Profile} */
export const profile = {
  name: "Shreeya Bhatt",
  tagline: "Full-Stack Developer & AI Enthusiast",
  bio: "Motivated Computer Science student building data-driven, AI-powered applications — from full-stack platforms with machine learning at their core to console-based systems grounded in solid data structures and clean architecture. Currently seeking a software development internship.",
  email: "shreeyasbhatt@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/shreeya-bhatt-4a5715363",
  githubUrl: "https://github.com/ShreeyaBhatt",
  // MANUAL FOLLOW-UP: add the actual file at public/resume.pdf
  resumePath: "/resume.pdf",
  // MANUAL FOLLOW-UP: add the actual file at public/profile.jpg
  photoPath: "/profile.jpg",
  github: {
    bio: "Computer Science & Technology Student • Full Stack Developer • Python Developer • AI Enthusiast",
    publicRepos: 13,
    stars: 6,
    focusAreas: ["System Design", "Machine Learning", "Advanced MERN Stack", "Cloud Fundamentals"],
  },
};
