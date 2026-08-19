import { motion } from "motion/react";
import { Section } from "../components/ui/Section.jsx";
import { SignalField } from "../components/hero/SignalField.jsx";
import { PostCard } from "../components/posts/PostCard.jsx";
import { getSortedPosts } from "../data/posts.js";
import { staggerContainer } from "../lib/motion.js";

export default function Posts() {
  const posts = getSortedPosts();

  return (
    <>
      <div className="relative h-40 overflow-hidden md:h-52">
        <SignalField density={0.5} interactive={false} className="opacity-60" />
      </div>
      <Section className="pt-8">
        <p className="font-mono text-sm text-[var(--color-accent)]">// posts & articles</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Posts & Articles
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">
          A curated selection of what I've shared on LinkedIn — thoughts on projects,
          learning, and building. This list is hand-picked, not a live feed.
        </p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.ul>
      </Section>
    </>
  );
}
