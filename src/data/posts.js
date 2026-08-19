/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date  ISO date string
 * @property {string} [linkedinUrl]
 * @property {string} [tag]
 */

/**
 * PLACEHOLDER ENTRIES — replace these with real LinkedIn posts/articles
 * before launch (see README "Manual Follow-ups Before Launch").
 * Each entry: give it a real linkedinUrl once you've picked the post.
 * @type {Post[]}
 */
export const posts = [
  {
    id: "placeholder-1",
    title: "Placeholder: Reflections on building WealthNest",
    excerpt:
      "Replace with a real excerpt from your LinkedIn post about building WealthNest's ML risk-prediction pipeline and Gemini integration.",
    date: "2026-07-15",
    tag: "Projects",
  },
  {
    id: "placeholder-2",
    title: "Placeholder: What shipping SpendWise twice taught me",
    excerpt:
      "Replace with a real excerpt about building the same product twice — once in Python/Streamlit, once in vanilla JS — and what changed.",
    date: "2026-02-01",
    tag: "Learning",
  },
  {
    id: "placeholder-3",
    title: "Placeholder: Notes on System Design fundamentals",
    excerpt:
      "Replace with a real excerpt from a post or article about what you're currently learning in system design.",
    date: "2026-08-01",
    tag: "System Design",
  },
];

export function getSortedPosts() {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}
