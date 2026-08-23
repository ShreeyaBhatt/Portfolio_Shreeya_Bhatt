import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { PageEyebrow } from "../components/common/PageEyebrow.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { SignalField } from "../components/hero/SignalField.jsx";
import { certifications } from "../data/certifications.js";
import { staggerContainer, getRevealVariants } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export default function Certifications() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = getRevealVariants(prefersReducedMotion);

  return (
    <>
      <div className="relative h-40 overflow-hidden md:h-52">
        <SignalField density={0.5} interactive={false} className="opacity-60" />
      </div>
      <Section className="pt-8">
        <PageEyebrow>// flight certifications</PageEyebrow>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Certifications & Credentials
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--color-fg-muted)]">
          Courses I've completed while charting this trajectory — from Python fundamentals to
          machine learning, Java data structures, and web development.
        </p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {certifications.map((cert) => (
            <motion.li key={cert.title} variants={itemVariants}>
              <Card tilt={false} className="flex h-full flex-col p-6">
                <div className="flex items-start gap-3">
                  <Award size={20} className="mt-0.5 shrink-0 text-[var(--color-accent-2)]" />
                  <div>
                    <h3 className="font-semibold leading-snug">{cert.title}</h3>
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                      {cert.issuer} · {cert.date}
                    </p>
                    {cert.credentialId && (
                      <p className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>
                {cert.skills && (
                  <div className="mt-4 flex flex-1 flex-wrap items-start gap-2">
                    {cert.skills.split(",").map((skill) => (
                      <Tag key={skill} tone="accent2">
                        {skill.trim()}
                      </Tag>
                    ))}
                  </div>
                )}
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    View credential <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="mt-4 font-mono text-xs text-[var(--color-fg-muted)]">
                    Credential link in transit
                  </p>
                )}
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </Section>
    </>
  );
}
