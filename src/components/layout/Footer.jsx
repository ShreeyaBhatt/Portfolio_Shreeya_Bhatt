import { Link } from "react-router-dom";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";

const social = [
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.githubUrl, Icon: GithubIcon },
];

const siteLinks = [
  { to: "/projects", label: "Missions" },
  { to: "/about", label: "Crew" },
  { to: "/contact", label: "Channel" },
];

/**
 * Base plate of the console — present on every page.
 *
 * It carries its own translucent surface and a stronger top edge so it reads
 * as a distinct panel rather than leftover page, and the accent rule ties it
 * to the section-header language used everywhere else. All colour is
 * token-driven, so the same treatment renders in both themes; the small mono
 * register sits at `--color-fg-muted` (not `--color-fg-subtle`) so the
 * telemetry line stays legible on the pale light-mode ground.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-24 border-t border-[var(--color-border-strong)] md:mt-32"
      style={{ background: "color-mix(in srgb, var(--color-bg-raised) 85%, transparent)" }}
    >
      <div className="container-page py-16 md:py-20">
        <hr className="rule-accent" aria-hidden="true" />

        <div className="mt-8 grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="eyebrow text-[var(--color-accent)]">Open channel</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-4 inline-block break-all font-display text-h3 font-semibold"
            >
              {profile.email}
            </a>
            <p className="mt-4 text-sm text-[var(--color-fg-muted)]">{profile.location}</p>
            <p className="mt-6 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                style={{ boxShadow: "0 0 8px var(--color-accent)" }}
              />
              {profile.availability}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    <Icon size={15} />
                    <span className="link-underline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
            Build {site.build} · Ahmedabad, IN ·{" "}
            <span className="text-[var(--color-accent)]">System nominal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
