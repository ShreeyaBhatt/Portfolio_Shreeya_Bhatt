import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "../components/ui/Section.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { Button } from "../components/ui/Button.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { GithubIcon } from "../components/common/icons.jsx";
import { getProjectBySlug, projects } from "../data/projects.js";
import { getRevealVariants, viewportOnce } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import NotFound from "./NotFound.jsx";

/**
 * A project opened as a full case-study read: numbered chapters rather than a
 * modal. Every chapter is built from a field already on the project record
 * (see src/data/projects.js) and is skipped if that field is empty.
 */
function Chapter({ n, label, children, id }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <section id={id} className="border-t border-[var(--color-border)] py-11 md:py-14">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.7rem] text-[var(--color-accent)]">{n}</span>
        <span className="eyebrow text-[var(--color-fg-subtle)]">{label}</span>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={variants}
        className="mt-7"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const currentIndex = projects.findIndex((entry) => entry.slug === slug);
  const number = String(currentIndex + 1).padStart(2, "0");
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const links = [
    project.demoUrl && { href: project.demoUrl, label: project.demoLabel || "Live demo", primary: true },
    project.demoUrlSecondary && {
      href: project.demoUrlSecondary,
      label: project.demoLabelSecondary || "Live demo",
    },
    project.codeUrl && { href: project.codeUrl, label: "View code", code: true },
  ].filter(Boolean);

  return (
    <>
      <Section className="pb-0 pt-28 md:pt-32">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-fg)]"
        >
          <ArrowLeft
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          All work
        </Link>

        <div className="mt-10">
          <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
            <span className="text-[var(--color-accent)]">{number}</span>
            <span>·</span>
            <span>{project.status}</span>
          </p>

          <RevealLines
            as="h1"
            animateOnMount
            className="mt-6 text-h1 font-semibold"
            lines={[project.title]}
          />

          <p className="mt-6 max-w-2xl accent-italic text-lead text-[var(--color-fg-muted)]">
            {project.summary}
          </p>
        </div>

        <dl className="mt-14 grid gap-8 border-t border-[var(--color-border)] pt-8 sm:grid-cols-3">
          <div>
            <dt className="coord">Timeline</dt>
            <dd className="mt-2 font-mono text-sm">{project.period}</dd>
          </div>
          <div>
            <dt className="coord">System</dt>
            <dd className="mt-2 font-mono text-sm">{project.system}</dd>
          </div>
          <div>
            <dt className="coord">Category</dt>
            <dd className="mt-2 font-mono text-sm text-[var(--color-fg-muted)]">
              {project.category}
            </dd>
          </div>
        </dl>
      </Section>

      <Section className="pt-2">
        <Chapter n="01" label="Overview" id="chapter-overview">
          <div className="space-y-6 text-lead text-[var(--color-fg-muted)] md:max-w-3xl">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Chapter>

        {project.problem && (
          <Chapter n="02" label="The problem" id="chapter-problem">
            <p className="text-h3 font-display font-medium leading-[1.3] md:max-w-3xl">
              {project.problem}
            </p>
          </Chapter>
        )}

        {project.approach && (
          <Chapter n="03" label="The approach" id="chapter-approach">
            <p className="text-lead text-[var(--color-fg-muted)] md:max-w-3xl">
              {project.approach}
            </p>
          </Chapter>
        )}

        {project.architecture?.length > 0 && (
          <Chapter n="04" label="Architecture" id="chapter-architecture">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 md:max-w-2xl md:grid-cols-3">
              {project.architecture.map((node, i) => (
                <li key={node} className="flex items-baseline gap-2.5 border-t border-[var(--color-border)] pt-3">
                  <span className="font-mono text-[0.6rem] text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-fg-muted)]">{node}</span>
                </li>
              ))}
            </ul>
          </Chapter>
        )}

        <Chapter n="05" label="Implementation" id="chapter-implementation">
          <ul className="border-t border-[var(--color-border)] md:max-w-3xl">
            {project.highlights.map((item, index) => (
              <li
                key={item}
                className="flex gap-6 border-b border-[var(--color-border)] py-5 text-[var(--color-fg-muted)]"
              >
                <span className="shrink-0 pt-1 font-mono text-[0.7rem] text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
          {project.contribution && (
            <div className="panel tech-border mt-10 p-6 md:max-w-3xl">
              <p className="coord">Key technical decision</p>
              <p className="mt-3 text-[var(--color-fg-muted)]">{project.contribution}</p>
            </div>
          )}
        </Chapter>

        {project.learned && (
          <Chapter n="06" label="What I learned" id="chapter-result">
            <p className="text-lead text-[var(--color-fg-muted)] md:max-w-3xl">{project.learned}</p>
          </Chapter>
        )}

        <Chapter n="07" label="Stack" id="chapter-technologies">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter n="08" label="Links" id="chapter-live">
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <Button
                  key={link.href}
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  variant={link.primary ? "primary" : link.code ? "ghost" : "secondary"}
                >
                  {link.code ? <GithubIcon size={14} /> : <ExternalLink size={14} />} {link.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="font-mono text-sm text-[var(--color-fg-subtle)]">
              No public link for this one.
            </p>
          )}
        </Chapter>
      </Section>

      <Section className="pb-28 pt-0 md:pb-40">
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group block border-t border-[var(--color-border)] pt-10"
        >
          <p className="eyebrow text-[var(--color-fg-subtle)]">Next project</p>
          <div className="mt-5 flex items-end justify-between gap-6">
            <h2 className="text-h2 font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
              {nextProject.title}
            </h2>
            <ArrowUpRight
              size={32}
              strokeWidth={1.5}
              aria-hidden="true"
              className="shrink-0 text-[var(--color-fg-subtle)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
            />
          </div>
        </Link>
      </Section>
    </>
  );
}
