import { Link } from "react-router-dom";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";

const social = [
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.githubUrl, Icon: GithubIcon },
];

const siteLinks = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] md:mt-32">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="eyebrow">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-4 inline-block break-all font-display text-h3 font-semibold"
            >
              {profile.email}
            </a>
            <p className="mt-4 text-sm text-[var(--color-fg-muted)]">{profile.location}</p>
            <p className="mt-6 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {profile.availability}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Site</p>
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
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
            Build {site.build} — Ahmedabad, IN
          </p>
        </div>
      </div>
    </footer>
  );
}
