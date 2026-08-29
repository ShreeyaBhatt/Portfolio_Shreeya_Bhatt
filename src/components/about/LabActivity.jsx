import { motion } from "motion/react";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";
import { projects } from "../../data/projects.js";
import { certifications } from "../../data/certifications.js";
import { GithubIcon } from "../common/icons.jsx";
import { viewportOnce } from "../../lib/motion.js";

/**
 * Lab activity — a static telemetry panel, not a live GitHub feed.
 *
 * The numbers are the hand-maintained ones in profile.js; the month strip is
 * built from real dates already on the site (project periods + certification
 * completion dates), so it reflects genuine output without pretending to be a
 * live contribution graph. The "STATIC SNAPSHOT" stamp makes that explicit.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const START = { y: 2024, m: 8 }; // Aug 2024 — first record on the site
const END = { y: 2026, m: 8 };

function keyOf(y, m) {
  return `${y}-${String(m).padStart(2, "0")}`;
}

/** "Jun 2026" -> {y,m} */
function parseCertDate(text) {
  const [mon, yr] = text.split(" ");
  return { y: Number(yr), m: MONTHS.indexOf(mon) + 1 };
}

/** "06/2026 – 07/2026" -> end {y,m} */
function parsePeriodEnd(period) {
  const end = period.split("–").pop().trim();
  const [m, y] = end.split("/");
  return { y: Number(y), m: Number(m) };
}

function buildStrip() {
  const events = new Map(); // key -> [labels]
  const add = (pt, label) => {
    const k = keyOf(pt.y, pt.m);
    events.set(k, [...(events.get(k) ?? []), label]);
  };
  projects.forEach((p) => add(parsePeriodEnd(p.period), `${p.title} shipped`));
  certifications.forEach((c) => add(parseCertDate(c.date), `${c.title} (${c.issuer})`));

  const cells = [];
  let y = START.y;
  let m = START.m;
  while (y < END.y || (y === END.y && m <= END.m)) {
    const k = keyOf(y, m);
    cells.push({ k, y, m, hits: events.get(k) ?? [] });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return cells;
}

const STRIP = buildStrip();

export function LabActivity() {
  const { github, githubUrl } = profile;
  const tiles = [
    { value: github.publicRepos, label: "Repositories" },
    { value: github.stars, label: "Stars" },
    { value: String(certifications.length).padStart(2, "0"), label: "Certifications" },
    { value: String(projects.length).padStart(2, "0"), label: "Experiments" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5 }}
      className="border-t border-[var(--color-border)] pt-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="external"
          className="group inline-flex items-center gap-3 text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
        >
          <GithubIcon size={18} />
          <span className="link-underline font-mono text-sm">github.com/ShreeyaBhatt</span>
        </a>
        <span className="label-mono text-[var(--color-fg-subtle)]">
          Static snapshot · {site.build}
        </span>
      </div>

      <p className="mt-6 max-w-xl text-lead text-[var(--color-fg-muted)]">{github.bio}</p>

      {/* readout tiles */}
      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="bg-[var(--color-bg-raised)] p-5">
            <dd className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.04em]">
              {t.value}
            </dd>
            <dt className="coord mt-3">{t.label}</dt>
          </div>
        ))}
      </dl>

      {/* month strip — real dates only */}
      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="coord">Output by month</p>
          <p className="coord">Shipped projects &amp; completed certifications</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {STRIP.map((cell) => (
            <span
              key={cell.k}
              title={
                cell.hits.length
                  ? `${MONTHS[cell.m - 1]} ${cell.y}: ${cell.hits.join("; ")}`
                  : `${MONTHS[cell.m - 1]} ${cell.y}`
              }
              className="h-4 w-4 rounded-[3px] border"
              style={{
                borderColor: cell.hits.length
                  ? "var(--color-accent)"
                  : "var(--color-border-strong)",
                background: cell.hits.length
                  ? `color-mix(in srgb, var(--color-accent) ${Math.min(
                      30 + cell.hits.length * 30,
                      90
                    )}%, transparent)`
                  : "transparent",
              }}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
          {MONTHS[START.m - 1]} {START.y} → {MONTHS[END.m - 1]} {END.y}
        </p>
      </div>

      {/* channels */}
      <p className="label-mono mt-10 text-[var(--color-fg-subtle)]">Currently learning</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {github.focusAreas.map((area) => (
          <span
            key={area}
            className="rounded-full border border-[var(--color-border-strong)] px-3 py-1 font-mono text-xs text-[var(--color-fg-muted)]"
          >
            {area}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
