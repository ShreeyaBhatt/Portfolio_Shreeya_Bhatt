import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "../components/ui/Section.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { ContactForm } from "../components/contact/ContactForm.jsx";
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
    cursor: "contact",
  },
  {
    label: "LinkedIn",
    value: "shreeya-bhatt",
    href: profile.linkedinUrl,
    Icon: LinkedinIcon,
    note: "Experience and background",
    cursor: "external",
  },
  {
    label: "GitHub",
    value: "ShreeyaBhatt",
    href: profile.githubUrl,
    Icon: GithubIcon,
    note: "Source for everything here",
    cursor: "external",
  },
];

export default function Contact() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getRevealVariants(prefersReducedMotion);

  return (
    <Section className="pb-28 pt-24 md:pb-40 md:pt-28">
      <p className="label-mono flex items-center gap-3 text-[var(--color-fg-subtle)]">
        <span className="text-[var(--color-accent)]">(05)</span>
        Open Collaboration
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]"
        />
        <span className="text-[var(--color-fg-subtle)]">{profile.availability}</span>
      </p>

      <RevealLines
        as="h1"
        animateOnMount
        className="mt-8 text-hero font-display font-semibold"
        lines={[
          "Have an interesting",
          <span key="l2" className="accent-italic">
            problem?
          </span>,
        ]}
      />

      <p className="container-prose mt-10 text-lead text-[var(--color-fg-muted)]">
        Let's build something useful. I'm looking for a software engineering internship or a
        Python developer role — if you're hiring, or just want to talk through a project, I'd
        like to hear from you.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="min-w-0">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="contact"
            className="link-underline inline-block break-all font-display text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-tight tracking-[-0.03em] transition-colors hover:text-[var(--color-accent)]"
          >
            {profile.email}
          </a>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-12 border-t border-[var(--color-border)]"
          >
            {channels.map(({ label, value, href, Icon, note, cursor }) => (
              <motion.li
                key={label}
                variants={variants}
                className="border-b border-[var(--color-border)]"
              >
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  data-cursor={cursor}
                  className="group grid gap-1 py-5 transition-colors sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6"
                >
                  <span className="label-mono flex items-center gap-2.5 text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-accent)]">
                    <Icon size={14} />
                    {label}
                  </span>
                  <span>
                    <span className="font-mono text-sm break-all transition-colors group-hover:text-[var(--color-accent)]">
                      {value}
                    </span>
                    <span className="coord mt-1 block">{note}</span>
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
