import { memo } from "react";
import { motion, useTransform } from "motion/react";
import { useMousePosition } from "../../hooks/useMousePosition.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The hero's "digital experiment field" — a small system diagram of the things
 * this lab is built on. Six labelled nodes wired together; the whole graph
 * responds to the cursor by drifting each node a few pixels against it (a
 * shallow parallax, depth-weighted) and letting the links breathe.
 *
 * Pure SVG, ~40 elements, one shared pointer listener via `useMousePosition`
 * (no React renders on move — only motion values update). This is the baseline
 * visual; on capable desktops <NodeField3D> fades in over the top of it, and it
 * stays as the fallback for reduced-motion, touch, and small screens.
 */
const NODES = {
  PYTHON: { x: 172, y: 188, r: 28, primary: true },
  DATA: { x: 78, y: 104, r: 19 },
  AI: { x: 246, y: 74, r: 19 },
  WEB: { x: 110, y: 280, r: 19 },
  PROJECTS: { x: 288, y: 182, r: 19 },
  EXPERIMENTS: { x: 296, y: 286, r: 19 },
};

const LINKS = [
  ["PYTHON", "DATA"],
  ["PYTHON", "AI"],
  ["PYTHON", "WEB"],
  ["PYTHON", "PROJECTS"],
  ["DATA", "AI"],
  ["AI", "PROJECTS"],
  ["WEB", "PROJECTS"],
  ["PROJECTS", "EXPERIMENTS"],
];

/** px of drift at the screen edge; primary node moves least (it's "closest"). */
const DRIFT = { PYTHON: 6, DATA: 16, AI: 14, WEB: 18, PROJECTS: 11, EXPERIMENTS: 20 };

function Node({ id, mouseX, mouseY, reduced }) {
  const node = NODES[id];
  const d = reduced ? 0 : DRIFT[id];
  const tx = useTransform(mouseX, [-1, 1], [d, -d]);
  const ty = useTransform(mouseY, [-1, 1], [d, -d]);

  return (
    <motion.g style={{ x: tx, y: ty }}>
      <circle
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill="var(--color-bg-raised)"
        stroke={node.primary ? "var(--color-accent)" : "var(--color-border-strong)"}
        strokeWidth={node.primary ? 1.5 : 1}
      />
      {node.primary && (
        <circle
          cx={node.x}
          cy={node.y}
          r={node.r + 7}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.5"
        />
      )}
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize={node.primary ? "10" : "7.5"}
        letterSpacing="0.12em"
        fill={node.primary ? "var(--color-accent)" : "var(--color-fg-muted)"}
      >
        {id}
      </text>
    </motion.g>
  );
}

function NodeFieldBase() {
  const { x, y } = useMousePosition();
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      viewBox="-8 -8 436 376"
      role="img"
      aria-label="System diagram: Python at the centre, linked to Data, AI, Web, Projects, and Experiments."
      className="h-full w-full"
      style={{ maxHeight: "min(70vh, 560px)" }}
    >
      {/* faint register frame + coordinate ticks */}
      <rect
        x="1"
        y="1"
        width="418"
        height="358"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <text x="8" y="18" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.1em" fill="var(--color-fg-subtle)">
        FIELD / 001
      </text>
      <text
        x="412"
        y="352"
        textAnchor="end"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="0.1em"
        fill="var(--color-fg-subtle)"
      >
        LIVE
      </text>

      {LINKS.map(([from, to]) => {
        const a = NODES[from];
        const b = NODES[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-accent-2)"
            strokeWidth="1"
            opacity="0.35"
          />
        );
      })}

      {Object.keys(NODES).map((id) => (
        <Node key={id} id={id} mouseX={x} mouseY={y} reduced={reduced} />
      ))}
    </svg>
  );
}

export const NodeField = memo(NodeFieldBase);
