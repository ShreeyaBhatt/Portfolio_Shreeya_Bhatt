import { Mail } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { Card } from "../components/ui/Card.jsx";
import { GithubIcon, LinkedinIcon } from "../components/common/icons.jsx";
import { profile } from "../data/profile.js";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "shreeya-bhatt-4a5715363",
    href: profile.linkedinUrl,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "ShreeyaBhatt",
    href: profile.githubUrl,
    icon: GithubIcon,
  },
];

export default function Contact() {
  return (
    <Section className="pt-16 md:pt-20">
      <p className="font-mono text-sm text-[var(--color-accent)]">// contact</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Let's talk</h1>
      <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">
        I'm currently looking for a software development internship. Reach out via email or
        LinkedIn — I'd love to hear from you.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {contactLinks.map(({ label, value, href, icon: Icon }) => (
          <Card key={label} tilt={false} className="p-6" as="a" href={href} target="_blank" rel="noreferrer">
            <Icon size={20} className="text-[var(--color-accent)]" />
            <p className="mt-3 text-sm text-[var(--color-fg-muted)]">{label}</p>
            <p className="mt-1 break-words font-medium">{value}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
