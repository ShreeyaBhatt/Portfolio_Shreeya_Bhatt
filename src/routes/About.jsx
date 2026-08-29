import { motion } from "motion/react";
import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { viewportOnce } from "../lib/motion.js";
import { profile } from "../data/profile.js";
import { timeline } from "../data/timeline.js";
import { toolboxGroups } from "../data/skills.js";
import { education } from "../data/education.js";
import { certifications } from "../data/certifications.js";
import { experimentLog } from "../data/log.js";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const current = experimentLog[0];

  return (
    <>
      <Section className="pb-0 pt-28 md:pt-32">
        <p className="eyebrow">About</p>

        <RevealLines
          as="h1"
          animateOnMount
          className="mt-7 text-h1 font-semibold"
          lines={["I turn messy problems", <span key="l2">into <span className="accent-italic">systems</span>.</span>]}
        />

        <p className="container-prose mt-10 text-lead text-[var(--color-fg-muted)]">{profile.bio}</p>

        {current && (
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
            <span className="text-[var(--color-accent)]">Currently</span>
            <span>{current.note}</span>
          </p>
        )}
      </Section>

      {/* 01 — Timeline */}
      <Section>
        <SectionHeader
          index="01"
          label="Timeline"
          meta="2024 — 2028"
          titleLines={["A development", "timeline"]}
          lead="Not a job history — a record of what got built and what got learned, year by year."
        />
        <div className="mt-14">
          {timeline.map((phase, i) => (
            <motion.div
              key={phase.year}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fade}
              transition={{ delay: i * 0.05 }}
              className="grid-page border-t border-[var(--color-border)] py-8 md:py-10"
            >
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-h3 font-medium text-[var(--color-accent)]">
                  {phase.year}
                </p>
                <p className="mt-1 eyebrow text-[var(--color-fg-subtle)]">{phase.title}</p>
              </div>
              <div className="col-span-12 mt-4 md:col-span-9 md:mt-0">
                <p className="text-lead text-[var(--color-fg-muted)]">{phase.summary}</p>
                {phase.built.length > 0 && (
                  <ul className="mt-5 space-y-1.5">
                    {phase.built.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-[var(--color-fg-muted)]">
                        <span aria-hidden="true" className="text-[var(--color-accent)]">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                  {phase.explored.map((e) => (
                    <li key={e} className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[var(--color-border)]" />
        </div>
      </Section>

      {/* 02 — Toolbox */}
      <Section id="skills">
        <SectionHeader
          index="02"
          label="Toolbox"
          meta={`${String(toolboxGroups.length).padStart(2, "0")} groups`}
          titleLines={["The", "toolbox"]}
          lead="Python at the centre, everything else growing out from it. No ratings — a number next to a language measures nothing."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {toolboxGroups.map((group) => (
            <div key={group.id} className="bg-[var(--color-bg)] p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-h3 font-medium">{group.label}</h3>
                <span
                  className={
                    group.weight === "primary"
                      ? "font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-accent)]"
                      : "font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]"
                  }
                >
                  {group.weight}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                {group.blurb}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {group.skills.map((s) => (
                  <li key={s} className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 03 — Education */}
      <Section>
        <SectionHeader index="03" label="Education" meta="2021 — 2028" />
        <div className="mt-14">
          {education.map((entry) => (
            <div
              key={entry.degree}
              className="grid-page border-t border-[var(--color-border)] py-8"
            >
              <p className="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-accent)] md:col-span-3">
                {entry.period}
              </p>
              <div className="col-span-12 mt-3 md:col-span-9 md:mt-0">
                <h3 className="text-h3 font-medium">{entry.degree}</h3>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  {entry.institution} — {entry.location}
                </p>
                {entry.detail && (
                  <p className="mt-3 text-sm text-[var(--color-fg-subtle)]">{entry.detail}</p>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-[var(--color-border)]" />
        </div>
      </Section>

      {/* 04 — Credentials */}
      <Section id="credentials" className="pb-28 md:pb-40">
        <SectionHeader
          index="04"
          label="Credentials"
          meta={`${String(certifications.length).padStart(2, "0")} completed`}
          lead={`${certifications.length} certifications so far — Python, machine learning, web fundamentals, Java, and version control.`}
        />
        <ul className="mt-14 border-t border-[var(--color-border)]">
          {certifications.map((cert) => (
            <li
              key={cert.credentialId ?? cert.title}
              className="grid-page items-baseline border-b border-[var(--color-border)] py-5"
            >
              <p className="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)] md:col-span-2">
                {cert.date}
              </p>
              <div className="col-span-12 mt-1 md:col-span-7 md:mt-0">
                <p className="text-[var(--color-fg)]">{cert.title}</p>
                <p className="mt-0.5 text-sm text-[var(--color-fg-subtle)]">{cert.issuer}</p>
              </div>
              <div className="col-span-12 mt-2 md:col-span-3 md:mt-0 md:text-right">
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  >
                    Verify →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
