import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { Tag } from "../components/ui/Tag.jsx";
import { certifications } from "../data/certifications.js";
import { staggerContainer, getRevealVariants, viewportOnce } from "../lib/motion.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export default function Certifications() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = getRevealVariants(prefersReducedMotion);

  return (
    <Section className="pb-28 pt-16 md:pb-40 md:pt-20">
      <SectionHeader
        label="Credentials"
        meta={`${String(certifications.length).padStart(2, "0")} Completed`}
        titleLines={[
          "Courses and",
          <span key="l2" className="accent-italic text-[var(--color-accent)]">
            certifications
          </span>,
        ]}
        titleClassName="text-h1"
        lead="From Python fundamentals to machine learning, Java data structures, and web development — with verification links where they exist."
      />

      {/* A ledger, not a card grid: these are records, and records read best
          as ruled rows you can scan down in one pass. */}
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mt-16 border-t border-[var(--color-border)]"
      >
        {certifications.map((cert, index) => {
          const Row = cert.credentialUrl ? "a" : "div";
          const rowProps = cert.credentialUrl
            ? {
                href: cert.credentialUrl,
                target: "_blank",
                rel: "noreferrer",
                "data-cursor-hover": true,
              }
            : {};

          return (
            <motion.li
              key={cert.title}
              variants={itemVariants}
              className="border-b border-[var(--color-border)]"
            >
              <Row
                {...rowProps}
                className="group grid gap-4 py-8 md:grid-cols-[3rem_1fr_12rem_auto] md:items-baseline md:gap-8"
              >
                <span className="label-mono text-[var(--color-fg-subtle)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-h3 font-medium leading-snug transition-colors group-hover:text-[var(--color-accent)]">
                    {cert.title}
                  </h3>
                  {cert.skills && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cert.skills.split(",").map((skill) => (
                        <li key={skill}>
                          <Tag tone="accent2">{skill.trim()}</Tag>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <p className="text-sm text-[var(--color-fg-muted)]">{cert.issuer}</p>
                  <p className="label-mono mt-1.5 text-[var(--color-fg-subtle)]">{cert.date}</p>
                </div>

                <span className="label-mono flex items-center gap-2 text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-accent)]">
                  {cert.credentialUrl ? (
                    <>
                      Verify
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </>
                  ) : (
                    "Link pending"
                  )}
                </span>
              </Row>
            </motion.li>
          );
        })}
      </motion.ol>
    </Section>
  );
}
