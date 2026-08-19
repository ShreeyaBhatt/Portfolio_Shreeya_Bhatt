import { Mail } from "lucide-react";
import { profile } from "../../data/profile.js";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="container-page flex flex-col items-center gap-4 text-sm text-[var(--color-fg-muted)] sm:flex-row sm:justify-between">
        <p>
          © {year} {profile.name}. Built with React, Vite & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            data-cursor-hover
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            <Mail size={18} />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            data-cursor-hover
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            data-cursor-hover
            className="transition-colors hover:text-[var(--color-accent)]"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
