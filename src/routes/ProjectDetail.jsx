import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Button } from "../components/ui/Button.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { GithubIcon } from "../components/common/icons.jsx";
import { getProjectBySlug, projects } from "../data/projects.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const currentIndex = projects.findIndex((entry) => entry.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Section className="pb-0 pt-16 md:pt-20">
        <Link
          to="/projects"
          data-cursor-hover
          className="group label-mono inline-flex items-center gap-2 text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-accent)]"
        >
          <ArrowLeft
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          All work
        </Link>

        <div className="mt-10">
          {project.featured && <Badge className="mb-6">Featured</Badge>}

          <RevealLines
            as="h1"
            animateOnMount
            className="text-h1 font-display font-medium"
            lines={[project.title]}
          />

          <p className="mt-6 max-w-2xl text-lead text-[var(--color-fg-muted)]">
            {project.category}
          </p>
        </div>

        {/* Facts strip: the things someone scanning wants before the prose. */}
        <dl className="mt-14 grid gap-8 border-t border-[var(--color-border)] pt-8 sm:grid-cols-3">
          <div>
            <dt className="label-mono text-[var(--color-fg-subtle)]">Timeline</dt>
            <dd className="mt-3 font-mono text-sm">{project.period}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="label-mono text-[var(--color-fg-subtle)]">Stack</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.demoUrl && (
            <Button as="a" href={project.demoUrl} target="_blank" rel="noreferrer" variant="primary">
              <ExternalLink size={15} /> {project.demoLabel || "Live Demo"}
            </Button>
          )}
          {project.demoUrlSecondary && (
            <Button
              as="a"
              href={project.demoUrlSecondary}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              <ExternalLink size={15} /> {project.demoLabelSecondary || "Live Demo"}
            </Button>
          )}
          {project.codeUrl && (
            <Button as="a" href={project.codeUrl} target="_blank" rel="noreferrer" variant="secondary">
              <GithubIcon size={15} /> View code
            </Button>
          )}
        </div>
      </Section>

      <Section className="pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="label-mono text-[var(--color-fg-subtle)]">Overview</p>
            <div className="mt-8 space-y-6 text-lead text-[var(--color-fg-muted)]">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <p className="label-mono text-[var(--color-fg-subtle)]">What it does</p>
            <ul className="mt-8 border-t border-[var(--color-border)]">
              {project.highlights.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-6 border-b border-[var(--color-border)] py-5 text-[var(--color-fg-muted)]"
                >
                  <span className="label-mono shrink-0 pt-1 text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Next project — keeps the reader moving through the work instead of
          dead-ending at the bottom of a detail page. */}
      <Section className="pb-28 pt-0 md:pb-40">
        <Link
          to={`/projects/${nextProject.slug}`}
          data-cursor-hover
          className="group block border-t border-[var(--color-border)] pt-10"
        >
          <p className="label-mono text-[var(--color-fg-subtle)]">Next project</p>
          <div className="mt-5 flex items-end justify-between gap-6">
            <h2 className="text-h2 font-medium transition-colors group-hover:text-[var(--color-accent)]">
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
