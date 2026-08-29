import { Tag } from "../ui/Tag.jsx";
import { profile } from "../../data/profile.js";
import { GithubIcon } from "../common/icons.jsx";

/**
 * Static GitHub identity summary — intentionally not a live API fetch: it
 * avoids rate-limit risk and loading/error states on a static site. Refresh
 * these numbers by hand in src/data/profile.js occasionally.
 */
export function GithubIdentityBlock() {
  const { github, githubUrl } = profile;

  return (
    <div className="grid gap-12 border-t border-[var(--color-border)] pt-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
      <div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          className="group inline-flex items-center gap-3 text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
        >
          <GithubIcon size={20} />
          <span className="link-underline font-mono text-sm">github.com/ShreeyaBhatt</span>
        </a>

        <p className="mt-6 max-w-xl text-lead text-[var(--color-fg-muted)]">{github.bio}</p>

        <p className="label-mono mt-10 text-[var(--color-fg-subtle)]">Currently learning</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {github.focusAreas.map((area) => (
            <Tag key={area}>{area}</Tag>
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-8 self-start">
        <div>
          <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.04em]">
            {github.publicRepos}
          </dd>
          <dt className="label-mono mt-3 text-[var(--color-fg-subtle)]">Repositories</dt>
        </div>
        <div>
          <dd className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.04em]">
            {github.stars}
          </dd>
          <dt className="label-mono mt-3 text-[var(--color-fg-subtle)]">Stars earned</dt>
        </div>
      </dl>
    </div>
  );
}
