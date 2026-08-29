/**
 * @typedef {Object} Capability
 * @property {string} title
 * @property {string} description
 * @property {string[]} tools
 */

/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} tagline
 * @property {string} bio
 * @property {string} email
 * @property {string} location
 * @property {string} availability
 * @property {string} linkedinUrl
 * @property {string} githubUrl
 * @property {string[]} disciplines
 * @property {string[]} marquee
 * @property {Capability[]} capabilities
 * @property {{label: string, value: string}[]} stats
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
  location: "Ahmedabad, India",
  availability: "Available for internships",
  linkedinUrl: "https://www.linkedin.com/in/shreeya-bhatt-4a5715363",
  githubUrl: "https://github.com/ShreeyaBhatt",

  /** Set beneath the name on the loader and in the hero meta row. */
  disciplines: ["Python", "Machine Learning", "Full-Stack"],

  /** Scrolling band on the home page — the working vocabulary, at a glance. */
  marquee: [
    "Python",
    "Machine Learning",
    "Django REST",
    "React",
    "Pandas",
    "Node.js",
    "Java",
    "MongoDB",
    "Streamlit",
    "REST APIs",
  ],

  /** The three things this portfolio is actually arguing for. */
  capabilities: [
    {
      title: "Machine learning",
      description:
        "Training, comparing, and shipping models that do real work inside a product — risk classification, value prediction, automatic model selection.",
      tools: ["Python", "Pandas", "Scikit-learn", "Gemini API"],
    },
    {
      title: "Full-stack platforms",
      description:
        "End-to-end applications with authentication, role-based access, REST APIs, and a front end that's actually pleasant to use.",
      tools: ["Django REST", "React", "Node.js", "MongoDB"],
    },
    {
      title: "Systems & data structures",
      description:
        "Console-based systems built on clean OOP and hand-written data structures, backed by relational databases and defensive error handling.",
      tools: ["Core Java", "JDBC", "MySQL", "DSA"],
    },
  ],

  /** Compact evidence row — kept honest and easy to update by hand. */
  stats: [
    { label: "Projects shipped", value: "05" },
    { label: "Certifications", value: "07" },
    { label: "Public repositories", value: "13" },
    { label: "Graduating", value: "2028" },
  ],

  github: {
    bio: "Computer Science & Technology student · Full-stack developer · Python developer · AI enthusiast",
    publicRepos: 13,
    stars: 6,
    focusAreas: ["Machine Learning", "System Design", "AWS & Cloud Computing", "Advanced MERN Stack"],
  },

  // Sourced from the "Looking For" / "Fun Fact" sections of my GitHub profile README.
  lookingFor: ["Python Developer Roles", "Software Engineering Internships", "MERN Stack Developer Roles"],
  funFacts: [
    "I enjoy singing just as much as I enjoy building software.",
    "I believe technology should solve real-world problems.",
    "Always mid-course on something new — right now that's AWS and cloud computing.",
  ],

  // Cycled by the hero's role line.
  roles: ["Python Developer", "AI Enthusiast", "Full-Stack Developer", "Problem Solver"],
};
