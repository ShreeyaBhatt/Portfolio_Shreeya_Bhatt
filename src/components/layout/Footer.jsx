import { Link } from "react-router-dom";
import { profile } from "../../data/profile.js";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";

const social = [
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.githubUrl, Icon: GithubIcon },
];

const siteLinks = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
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
              data-cursor-hover
              className="link-underline mt-4 inline-block text-h3 font-display font-medium break-all"
            >
              {profile.email}
            </a>
            <p className="mt-4 text-sm text-[var(--color-fg-muted)]">{profile.location}</p>
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
                    data-cursor-hover
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
            © {year} {profile.name}
          </p>
          <p className="label-mono text-[var(--color-fg-subtle)]">
            Built with React, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
