import { Link } from "react-router-dom";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";
import { runLabScan } from "../../lib/labEvents.js";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";

const social = [
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.githubUrl, Icon: GithubIcon },
];

const siteLinks = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Experiments" },
  { to: "/journal", label: "Journal" },
  { to: "/certifications", label: "Credentials" },
  { to: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="label-mono text-[var(--color-fg-subtle)]">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="contact"
              className="link-underline mt-4 inline-block text-h3 font-display font-medium break-all"
            >
              {profile.email}
            </a>
            <p className="mt-4 text-sm text-[var(--color-fg-muted)]">{profile.location}</p>
            <p className="label-mono mt-6 text-[var(--color-fg-subtle)]">
              Building • Learning • Experimenting
            </p>
            <button
              type="button"
              data-cursor-hover
              onClick={runLabScan}
              className="label-mono mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-3.5 py-1.5 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Scan the lab →
            </button>
          </div>

          <nav aria-label="Footer">
            <p className="label-mono text-[var(--color-fg-subtle)]">Site</p>
            <ul className="mt-4 space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-cursor-hover
                    className="link-underline text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono text-[var(--color-fg-subtle)]">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="external"
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

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-[var(--color-fg-subtle)]">
            © {year} {profile.name} — Digital Lab / {site.labNumber}
          </p>
          <p className="label-mono flex items-center gap-2 text-[var(--color-fg-subtle)]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]"
            />
            System online — build {site.build}
          </p>
        </div>
      </div>
    </footer>
  );
}
