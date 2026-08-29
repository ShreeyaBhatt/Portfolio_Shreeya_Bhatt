import { useMemo, useState } from "react";
import { cn } from "../../lib/cn.js";
import { toolboxGroups, toolboxLinks } from "../../data/skills.js";

/**
 * SYSTEMS — the technologies as a spacecraft system-architecture diagram.
 * Python is the reactor at the centre; everything else is wired to it. Hover
 * or focus a node to light its connections and read what's inside it. No fake
 * proficiency numbers — just how the pieces relate.
 */
const POS = {
  python: { x: 300, y: 205 },
  data: { x: 132, y: 96 },
  ml: { x: 300, y: 52 },
  backend: { x: 470, y: 104 },
  web: { x: 500, y: 300 },
  tooling: { x: 118, y: 316 },
  fundamentals: { x: 300, y: 372 },
};

export function SystemGraph() {
  const [active, setActive] = useState("python");

  const byId = useMemo(() => Object.fromEntries(toolboxGroups.map((g) => [g.id, g])), []);
  const connected = useMemo(() => {
    const set = new Set([active]);
    toolboxLinks.forEach(([a, b]) => {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    });
    return set;
  }, [active]);

  const activeGroup = byId[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
      <div className="hud relative overflow-hidden p-2">
        <span className="coord absolute left-3 top-3 z-10">SYS · ARCHITECTURE</span>
        <svg viewBox="0 0 600 420" className="w-full" role="img" aria-label="Technology system architecture">
          {toolboxLinks.map(([a, b]) => {
            const on = a === active || b === active;
            return (
              <line
                key={`${a}-${b}`}
                x1={POS[a].x}
                y1={POS[a].y}
                x2={POS[b].x}
                y2={POS[b].y}
                stroke={on ? "var(--color-accent)" : "var(--color-border-strong)"}
                strokeWidth={on ? 1.5 : 1}
                strokeOpacity={on ? 0.9 : 0.4}
              />
            );
          })}
          {toolboxGroups.map((g) => {
            const p = POS[g.id];
            const isActive = g.id === active;
            const near = connected.has(g.id);
            const r = g.weight === "primary" ? 30 : g.weight === "secondary" ? 17 : 22;
            return (
              <g
                key={g.id}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                className="cursor-pointer outline-none"
                data-cursor="select"
                onMouseEnter={() => setActive(g.id)}
                onFocus={() => setActive(g.id)}
                onClick={() => setActive(g.id)}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r + 8}
                  fill="var(--color-accent)"
                  opacity={isActive ? 0.12 : 0}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="var(--color-bg-elevated)"
                  stroke={near ? "var(--color-accent)" : "var(--color-border-strong)"}
                  strokeWidth={isActive ? 2 : 1}
                  style={near ? { filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 60%, transparent))" } : undefined}
                />
                <text
                  x={p.x}
                  y={p.y + 3.5}
                  textAnchor="middle"
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-[0.12em]",
                    near ? "fill-[var(--color-fg)]" : "fill-[var(--color-fg-subtle)]"
                  )}
                >
                  {g.short}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <p className="eyebrow">
          <span className="text-[var(--color-accent)]">SYS</span>
          <span className="mx-2 text-[var(--color-fg-subtle)]">/</span>
          {activeGroup.label}
        </p>
        <p className="mt-4 text-lead text-[var(--color-fg-muted)]">{activeGroup.blurb}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {activeGroup.skills.map((s) => (
            <li
              key={s}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3 py-1 font-mono text-[0.7rem] text-[var(--color-fg-muted)]"
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="coord mt-6">
          Weight — {activeGroup.weight === "primary" ? "reactor / core system" : activeGroup.weight === "secondary" ? "foundations, offline" : "active subsystem"}
        </p>
      </div>
    </div>
  );
}
