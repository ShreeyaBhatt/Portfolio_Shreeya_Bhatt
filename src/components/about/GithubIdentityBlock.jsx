import { Card } from "../ui/Card.jsx";
import { Tag } from "../ui/Tag.jsx";
import { profile } from "../../data/profile.js";
import { GithubIcon } from "../common/icons.jsx";

/**
 * Static GitHub identity summary — intentionally not a live API fetch (see
 * plan §6): avoids rate-limit risk and loading/error states on a static site.
 * Refresh these numbers by hand in src/data/profile.js occasionally.
 */
export function GithubIdentityBlock() {
  const { github, githubUrl } = profile;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <GithubIcon size={20} />
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          className="font-mono text-sm text-[var(--color-accent)] hover:underline"
        >
          github.com/ShreeyaBhatt
        </a>
      </div>
      <p className="mt-4 text-[var(--color-fg-muted)]">{github.bio}</p>

      <div className="mt-6 flex gap-8 font-mono">
        <div>
          <p className="text-2xl font-semibold">{github.publicRepos}</p>
          <p className="text-xs text-[var(--color-fg-muted)]">repositories</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{github.stars}</p>
          <p className="text-xs text-[var(--color-fg-muted)]">stars earned</p>
        </div>
      </div>

      <p className="mt-6 mb-2 text-xs uppercase tracking-wide text-[var(--color-fg-muted)]">
        Currently orbiting
      </p>
      <div className="flex flex-wrap gap-2">
        {github.focusAreas.map((area) => (
          <Tag key={area}>{area}</Tag>
        ))}
      </div>
    </Card>
  );
}
