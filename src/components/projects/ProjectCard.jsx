import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Card } from "../ui/Card.jsx";
import { Tag } from "../ui/Tag.jsx";
import { Badge } from "../ui/Badge.jsx";
import { GithubIcon } from "../common/icons.jsx";
import { getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { cn } from "../../lib/cn.js";

export function ProjectCard({ project, spanClassName }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  const hasLinks = project.codeUrl || project.demoUrl;

  return (
    <motion.div variants={variants} className={cn(spanClassName)}>
      <Card className="flex h-full flex-col p-6">
        {project.featured && <Badge className="mb-3 w-fit">Featured</Badge>}

        <Link to={`/projects/${project.slug}`} data-cursor-hover className="group">
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-[var(--color-accent)]">
            {project.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{project.category}</p>
        <p className="mt-4 text-sm text-[var(--color-fg-muted)]">{project.summary}</p>

        {project.featured && (
          <ul className="mt-5 flex-1 space-y-2">
            {project.highlights.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {!project.featured && <div className="flex-1" />}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
          <Link
            to={`/projects/${project.slug}`}
            data-cursor-hover
            className="font-medium text-[var(--color-accent)] hover:underline"
          >
            View details →
          </Link>
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="flex items-center gap-1 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              <GithubIcon size={15} /> Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="flex items-center gap-1 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              <ExternalLink size={15} /> {project.demoLabel || "Live Demo"}
            </a>
          )}
          {project.demoUrlSecondary && (
            <a
              href={project.demoUrlSecondary}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="flex items-center gap-1 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              <ExternalLink size={15} /> {project.demoLabelSecondary || "Live Demo"}
            </a>
          )}
        </div>
        {!hasLinks && (
          <p className="mt-6 font-mono text-xs text-[var(--color-fg-muted)]">
            Code / demo link coming soon
          </p>
        )}
      </Card>
    </motion.div>
  );
}
