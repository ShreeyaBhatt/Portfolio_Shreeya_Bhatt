import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Card } from "../ui/Card.jsx";
import { Tag } from "../ui/Tag.jsx";
import { getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export function PostCard({ post }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.li variants={variants}>
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {post.tag && <Tag>{post.tag}</Tag>}
          <p className="font-mono text-xs text-[var(--color-fg-muted)]">{formattedDate}</p>
        </div>
        <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{post.excerpt}</p>
        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            View on LinkedIn <ExternalLink size={14} />
          </a>
        )}
      </Card>
    </motion.li>
  );
}
