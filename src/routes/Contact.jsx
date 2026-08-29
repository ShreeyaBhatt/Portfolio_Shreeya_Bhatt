import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "../components/ui/Section.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { GithubIcon, LinkedinIcon } from "../components/common/icons.jsx";
import { profile } from "../data/profile.js";
import { getRevealVariants, staggerContainer, viewportOnce } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
    note: "Fastest way to reach me",
  },
  {
    label: "LinkedIn",
    value: "shreeya-bhatt",
    href: profile.linkedinUrl,
    Icon: LinkedinIcon,
    note: "Experience and background",
  },
  {
    label: "GitHub",
    value: "ShreeyaBhatt",
    href: profile.githubUrl,
    Icon: GithubIcon,
    note: "Source for everything here",
  },
];

export default function Contact() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <Section className="pb-28 pt-16 md:pb-40 md:pt-20">
      <p className="label-mono flex items-center gap-3 text-[var(--color-fg-subtle)]">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]"
        />
        {profile.availability}
      </p>

      <RevealLines
        as="h1"
        animateOnMount
        className="mt-8 text-hero font-display font-medium"
        lines={[
          "Let's build",
          <span key="l2">
            something <span className="accent-italic text-[var(--color-accent)]">good</span>
          </span>,
        ]}
      />

      <p className="container-prose mt-10 text-lead text-[var(--color-fg-muted)]">
        I'm looking for a software engineering internship or a Python developer role. If you're
        hiring — or just want to talk about a project — I'd like to hear from you.
      </p>

      <a
        href={`mailto:${profile.email}`}
        data-cursor-hover
        className="link-underline mt-12 inline-block break-all font-display text-[clamp(1.5rem,4.5vw,3rem)] font-medium leading-tight tracking-[-0.03em] transition-colors hover:text-[var(--color-accent)]"
      >
        {profile.email}
      </a>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mt-20 border-t border-[var(--color-border)]"
      >
        {channels.map(({ label, value, href, Icon, note }) => (
          <motion.li key={label} variants={variants} className="border-b border-[var(--color-border)]">
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              data-cursor-hover
              className="group grid gap-2 py-7 transition-colors md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="label-mono flex items-center gap-3 text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-accent)]">
                <Icon size={15} />
                {label}
              </span>
              <span className="font-mono text-lead break-all transition-colors group-hover:text-[var(--color-accent)]">
                {value}
              </span>
              <span className="label-mono text-[var(--color-fg-subtle)]">{note}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
