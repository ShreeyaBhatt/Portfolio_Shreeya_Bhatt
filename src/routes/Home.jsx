import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SignalField } from "../components/hero/SignalField.jsx";
import { HeroContent } from "../components/hero/HeroContent.jsx";
import { Section } from "../components/ui/Section.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { SectionHeading } from "../components/common/SectionHeading.jsx";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";

const flagship = projects.find((project) => project.featured);

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SignalField density={1} interactive />
        </div>
        <HeroContent />
      </div>

      <Section>
        <SectionHeading
          eyebrow="// github"
          title="Building in public"
          description={`${profile.github.publicRepos} repositories, ${profile.github.stars} stars, and an ongoing focus on system design, ML, and full-stack development.`}
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <p className="font-mono text-3xl font-semibold text-[var(--color-accent)]">
              {profile.github.publicRepos}
            </p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">Repositories</p>
          </div>
          <div>
            <p className="font-mono text-3xl font-semibold text-[var(--color-accent)]">
              {profile.github.stars}
            </p>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">Stars earned</p>
          </div>
          <div className="col-span-2 sm:col-span-2">
            <p className="mb-1 text-sm text-[var(--color-fg-muted)]">Currently focused on</p>
            <div className="flex flex-wrap gap-2">
              {profile.github.focusAreas.map((area) => (
                <Tag key={area} tone="accent2">
                  {area}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {flagship && (
        <Section>
          <SectionHeading eyebrow="// flagship project" title={flagship.title} />
          <Card className="overflow-hidden p-8">
            <Badge className="mb-3 w-fit">Featured</Badge>
            <p className="text-[var(--color-fg-muted)]">{flagship.category}</p>
            <p className="mt-4 max-w-2xl">{flagship.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {flagship.tech.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <Link
              to={`/projects/${flagship.slug}`}
              data-cursor-hover
              className="mt-6 inline-flex items-center gap-1 font-medium text-[var(--color-accent)] hover:underline"
            >
              Read the full case study <ArrowUpRight size={16} />
            </Link>
          </Card>
        </Section>
      )}
    </>
  );
}
