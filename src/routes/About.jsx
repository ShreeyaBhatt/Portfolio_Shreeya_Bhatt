import { motion } from "motion/react";
import { Section } from "../components/ui/Section.jsx";
import { SectionHeader } from "../components/common/SectionHeader.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";
import { HudLabel } from "../components/space/HudLabel.jsx";
import { SystemGraph } from "../components/about/SystemGraph.jsx";
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
      {/* CREW PROFILE */}
      <Section className="pb-0 pt-28 md:pt-32">
        <p className="eyebrow">
          <span className="text-[var(--color-accent)]">01</span>
          <span className="mx-2 text-[var(--color-fg-subtle)]">/</span>Crew Profile
        </p>

        <RevealLines
          as="h1"
          animateOnMount
          className="mt-6 text-h1 font-bold"
          lines={["I turn messy problems", <span key="l2">into <span className="accent-italic">systems</span>.</span>]}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          {/* identification */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="hud relative overflow-hidden p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--color-accent)]/20 to-transparent"
              style={{ animation: "scanline 2.4s ease-in-out 0.3s" }}
            />
            <p className="coord text-[var(--color-accent)]">CREW MEMBER</p>
            <p className="mt-1 font-display text-h3 font-bold">{profile.name}</p>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
              <HudLabel k="Role" v="Python Dev" />
              <HudLabel k="Clearance" v="Student" />
              <HudLabel k="Location" v="Ahmedabad, IN" />
              <HudLabel k="Status" v={profile.availability} live />
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-5">
              {profile.disciplines.map((d) => (
                <li key={d} className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-fg-muted)]">
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* about text */}
          <div>
            <p className="text-lead text-[var(--color-fg-muted)]">{profile.bio}</p>
            {current && (
              <div className="mt-8 corner-frame p-5">
                <p className="coord text-[var(--color-accent)]">CURRENT MISSION</p>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{current.note}</p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {profile.disciplines.concat(["AWS"]).map((f) => (
                    <span key={f} className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
                      {f}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* MISSION LOG */}
      <Section id="log">
        <SectionHeader
          index="02"
          label="Mission Log"
          meta="2024 — 2028"
          titleLines={["A development", "timeline"]}
          lead="Not a job history — a record of what got built and what got learned, year by year."
        />
        <div className="mt-12">
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
                <p className="font-mono text-h3 font-bold text-[var(--color-accent)]">{phase.year}</p>
                <p className="mt-1 eyebrow text-[var(--color-fg-subtle)]">
                  {phase.title}
                  {phase.open && <span className="ml-2 text-[var(--color-accent)]">· ACTIVE</span>}
                </p>
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

      {/* SYSTEMS */}
      <Section id="skills">
        <SectionHeader
          index="03"
          label="Systems"
          meta={`${String(toolboxGroups.length).padStart(2, "0")} subsystems`}
          titleLines={["System", "architecture"]}
          lead="Python is the reactor at the centre; every other system is wired to it. Hover a node to trace its connections."
        />
        <div className="mt-12">
          <SystemGraph />
        </div>
      </Section>

      {/* EDUCATION */}
      <Section>
        <SectionHeader index="04" label="Training Record" meta="2021 — 2028" />
        <div className="mt-12">
          {education.map((entry) => (
            <div key={entry.degree} className="grid-page border-t border-[var(--color-border)] py-8">
              <p className="col-span-12 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-accent)] md:col-span-3">
                {entry.period}
              </p>
              <div className="col-span-12 mt-3 md:col-span-9 md:mt-0">
                <h3 className="text-h3 font-medium">{entry.degree}</h3>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                  {entry.institution} — {entry.location}
                </p>
                {entry.detail && <p className="mt-3 text-sm text-[var(--color-fg-subtle)]">{entry.detail}</p>}
              </div>
            </div>
          ))}
          <div className="border-t border-[var(--color-border)]" />
        </div>
      </Section>

      {/* CREDENTIALS */}
      <Section id="credentials" className="pb-28 md:pb-40">
        <SectionHeader
          index="05"
          label="Credentials"
          meta={`${String(certifications.length).padStart(2, "0")} verified`}
          lead={`${certifications.length} certifications so far — Python, machine learning, web fundamentals, Java, and version control.`}
        />
        <ul className="mt-12 border-t border-[var(--color-border)]">
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
                    data-cursor="external"
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
