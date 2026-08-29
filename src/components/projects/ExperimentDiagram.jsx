import { motion } from "motion/react";
import { viewportOnce } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A schematic "preview" for an experiment — there are no product screenshots in
 * this portfolio, so each project is drawn as a small architecture plate
 * instead: a labelled core with its subsystems arranged around it, thin
 * connectors, register ticks, and a single scan line that sweeps once when the
 * plate enters view.
 *
 * Driven entirely by `project.architecture` (an ordered list of subsystem
 * labels) so it stays in sync with the data with no per-project drawing code.
 *
 * @param {{ label: string, nodes: string[], className?: string }} props
 */
export function ExperimentDiagram({ label, nodes, className }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const W = 520;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 200;
  const ry = 128;

  const points = nodes.map((name, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return {
      name,
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Architecture of ${label}: a core linked to ${nodes.join(", ")}.`}
        className="w-full"
      >
        <defs>
          <clipPath id={`plate-${label.replace(/\s+/g, "")}`}>
            <rect x="1" y="1" width={W - 2} height={H - 2} />
          </clipPath>
        </defs>

        {/* register frame */}
        <rect x="1" y="1" width={W - 2} height={H - 2} fill="none" stroke="var(--color-border)" />
        {[
          [10, 10, 10, 24],
          [10, 10, 24, 10],
          [W - 10, H - 10, W - 10, H - 24],
          [W - 10, H - 10, W - 24, H - 10],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-accent)" strokeWidth="1.5" />
        ))}
        <text
          x="16"
          y="26"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.12em"
          fill="var(--color-fg-subtle)"
        >
          ARCH / {label.toUpperCase()}
        </text>

        {/* connectors */}
        {points.map((p) => (
          <line
            key={`l-${p.name}`}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="var(--color-accent-2)"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}

        {/* core */}
        <circle cx={cx} cy={cy} r="34" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="42" fill="none" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.1em"
          fill="var(--color-accent)"
        >
          CORE
        </text>

        {/* subsystem cells */}
        {points.map((p) => {
          const w = Math.max(64, p.name.length * 6.4 + 18);
          return (
            <g key={`n-${p.name}`}>
              <rect
                x={p.x - w / 2}
                y={p.y - 12}
                width={w}
                height="24"
                rx="2"
                fill="var(--color-bg-raised)"
                stroke="var(--color-border-strong)"
              />
              <text
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-mono)"
                fontSize="8.5"
                letterSpacing="0.08em"
                fill="var(--color-fg-muted)"
              >
                {p.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* one-shot scan line */}
        {!prefersReducedMotion && (
          <g clipPath={`url(#plate-${label.replace(/\s+/g, "")})`}>
            <rect x="0" y="0" width="2" height={H} fill="var(--color-accent)" opacity="0.6">
              <animate attributeName="x" from="0" to={W} dur="2.4s" begin="0.4s" fill="freeze" />
            </rect>
          </g>
        )}
      </svg>
    </motion.div>
  );
}
