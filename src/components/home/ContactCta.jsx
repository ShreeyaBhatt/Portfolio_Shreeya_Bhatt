import { motion } from "motion/react";
import { Section } from "../ui/Section.jsx";
import { RevealLines } from "../common/RevealLines.jsx";
import { profile } from "../../data/profile.js";
import { GithubIcon, LinkedinIcon } from "../common/icons.jsx";
import { getRevealVariants, viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const social = [
  { label: "LinkedIn", href: profile.linkedinUrl, Icon: LinkedinIcon },
  { label: "GitHub", href: profile.githubUrl, Icon: GithubIcon },
];

/**
 * The closing section — the largest type on the page, and one obvious action.
 *
 * A portfolio's last screen should have exactly one job. The email is the CTA
 * here rather than a button leading to a form: it's fewer steps, it works from
 * a phone, and it's what people actually use.
 */
export function ContactCta() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <Section className="pb-28 md:pb-40">
      <hr className="hairline" aria-hidden="true" />

      <div className="mt-16 md:mt-24">
        <p className="label-mono text-[var(--color-fg-subtle)]">(04) Contact</p>

        <RevealLines
          lines={[
            "Let's build",
            <span key="l2">
              something <span className="accent-italic text-[var(--color-accent)]">good</span>
            </span>,
          ]}
          className="mt-8 text-hero font-display font-medium"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={variants}
          className="mt-14"
        >
          <p className="max-w-xl text-lead text-[var(--color-fg-muted)]">
            I'm looking for a software engineering internship or a Python developer role. If
            you're hiring — or just want to talk about a project — I'd like to hear from you.
          </p>

          <a
            href={`mailto:${profile.email}`}
            data-cursor-hover
            className="link-underline mt-10 inline-block break-all font-display text-[clamp(1.5rem,4.5vw,3rem)] font-medium leading-tight tracking-[-0.03em] transition-colors hover:text-[var(--color-accent)]"
          >
            {profile.email}
          </a>

          <ul className="mt-12 flex flex-wrap items-center gap-8">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2.5 text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                >
                  <Icon size={17} />
                  <span className="link-underline label-mono">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
