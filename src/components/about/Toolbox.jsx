import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { toolboxGroups, toolboxLinks } from "../../data/skills.js";
import { viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The toolbox — a relationship graph of skill groups, driven by a row of tabs.
 *
 * Python sits at the centre, drawn largest; the everyday drawers ring it; the
 * Java / fundamentals group is smaller and set to one side. Selecting a group
 * (tabs are the control, nodes are also clickable) lights its node, its edges,
 * and the groups it connects to, and swaps in that group's blurb and skills.
 *
 * No ratings anywhere — the point is how the pieces connect, not a score.
 */
const POS = {
  python: { x: 220, y: 178, r: 33 },
  data: { x: 112, y: 82, r: 21 },
  ml: { x: 322, y: 82, r: 21 },
  tooling: { x: 86, y: 210, r: 21 },
  web: { x: 336, y: 208, r: 21 },
  backend: { x: 222, y: 296, r: 21 },
  fundamentals: { x: 350, y: 314, r: 16 },
};

export function Toolbox() {
  const [activeId, setActiveId] = useState("python");
  const prefersReducedMotion = usePrefersReducedMotion();

  const active = toolboxGroups.find((g) => g.id === activeId) ?? toolboxGroups[0];
  const connected = new Set(
    toolboxLinks
      .filter(([a, b]) => a === activeId || b === activeId)
      .flatMap(([a, b]) => [a, b])
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
      {/* ---- graph ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
        className="panel tech-border min-w-0 self-start p-3"
      >
        <svg
          viewBox="0 0 440 360"
          className="w-full"
          role="img"
          aria-label={`Skill map. ${active.label} selected, connected to ${[...connected]
            .filter((id) => id !== activeId)
            .map((id) => toolboxGroups.find((g) => g.id === id)?.label)
            .join(", ")}.`}
        >
          <text
            x="14"
            y="24"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.12em"
            fill="var(--color-fg-subtle)"
          >
            TOOLBOX / MAP
          </text>

          {/* edges */}
          {toolboxLinks.map(([a, b]) => {
            const on = a === activeId || b === activeId;
            return (
              <line
                key={`${a}-${b}`}
                x1={POS[a].x}
                y1={POS[a].y}
                x2={POS[b].x}
                y2={POS[b].y}
                stroke={on ? "var(--color-accent)" : "var(--color-accent-2)"}
                strokeWidth={on ? 1.5 : 1}
                opacity={on ? 0.9 : 0.3}
              />
            );
          })}

          {/* nodes */}
          {toolboxGroups.map((g) => {
            const p = POS[g.id];
            const isActive = g.id === activeId;
            const isLinked = connected.has(g.id) && !isActive;
            const dim = !isActive && !isLinked;
            return (
              <g
                key={g.id}
                role="button"
                tabIndex={0}
                aria-label={`Show ${g.label}`}
                aria-pressed={isActive}
                onClick={() => setActiveId(g.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(g.id);
                  }
                }}
                className="cursor-pointer focus:outline-none [&>circle]:focus-visible:stroke-[var(--color-accent)]"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r}
                  fill="var(--color-bg-elevated)"
                  stroke={
                    isActive || isLinked ? "var(--color-accent)" : "var(--color-border-strong)"
                  }
                  strokeWidth={isActive ? 2 : 1}
                  opacity={dim ? 0.72 : 1}
                />
                {isActive && !prefersReducedMotion && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r + 6}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    opacity="0.6"
                  />
                )}
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize={g.weight === "primary" ? "10" : g.weight === "secondary" ? "7" : "8"}
                  letterSpacing="0.06em"
                  fill={
                    isActive
                      ? "var(--color-accent)"
                      : dim
                        ? "var(--color-fg-subtle)"
                        : "var(--color-fg-muted)"
                  }
                >
                  {g.short}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* ---- tabs + detail ---- */}
      <div>
        <div className="flex flex-wrap gap-2">
          {toolboxGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              data-cursor-hover
              onClick={() => setActiveId(g.id)}
              aria-pressed={g.id === activeId}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors duration-200",
                g.id === activeId
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                  : "border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                g.weight === "secondary" && g.id !== activeId && "opacity-70"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        <motion.div
          key={active.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 border-t border-[var(--color-border)] pt-6"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-h3 font-semibold">{active.label}</h3>
            <span className="label-mono text-[var(--color-fg-subtle)]">
              {active.weight === "primary"
                ? "Primary"
                : active.weight === "secondary"
                  ? "Fundamentals"
                  : "Core"}
            </span>
          </div>
          <p className="mt-3 text-[var(--color-fg-muted)]">{active.blurb}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {active.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] px-3 py-1.5 font-mono text-xs text-[var(--color-accent)]"
              >
                {skill}
              </li>
            ))}
          </ul>

          <p className="coord mt-6">
            Connects to{" "}
            {[...connected]
              .filter((id) => id !== activeId)
              .map((id) => toolboxGroups.find((g) => g.id === id)?.label)
              .join(" · ") || "—"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
