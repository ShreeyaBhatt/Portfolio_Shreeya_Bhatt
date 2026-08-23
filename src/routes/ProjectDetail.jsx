import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Button } from "../components/ui/Button.jsx";
import { GithubIcon } from "../components/common/icons.jsx";
import { getProjectBySlug } from "../data/projects.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  return (
    <Section className="pt-16 md:pt-20">
      <Link
        to="/projects"
        data-cursor-hover
        className="inline-flex items-center gap-1 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]"
      >
        <ArrowLeft size={16} /> Back to launch log
      </Link>

      <div className="mt-6">
        {project.featured && <Badge className="mb-3 w-fit">Featured</Badge>}
        <p className="font-mono text-sm text-[var(--color-accent)]">{project.period}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
        <p className="mt-2 text-lg text-[var(--color-fg-muted)]">{project.category}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.codeUrl && (
            <Button as="a" href={project.codeUrl} target="_blank" rel="noreferrer" variant="secondary">
              <GithubIcon size={16} /> View Code
            </Button>
          )}
          {project.demoUrl && (
            <Button as="a" href={project.demoUrl} target="_blank" rel="noreferrer" variant="primary">
              <ExternalLink size={16} /> {project.demoLabel || "Live Demo"}
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
              <ExternalLink size={16} /> {project.demoLabelSecondary || "Live Demo"}
            </Button>
          )}
        </div>

        <div className="mt-12 max-w-3xl space-y-4 text-[var(--color-fg-muted)]">
          {project.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">Mission highlights</h2>
          <ul className="mt-4 space-y-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[var(--color-fg-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
