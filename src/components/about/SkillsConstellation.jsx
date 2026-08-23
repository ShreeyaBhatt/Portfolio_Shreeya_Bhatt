import { useMemo } from "react";
import { skillCategories } from "../../data/skills.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const WIDTH = 1040;
const HEIGHT = 820;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
const HUB_RADIUS = 200;
const TIER_RADII = [HUB_RADIUS + 80, HUB_RADIUS + 135, HUB_RADIUS + 195];
const CORE_ID = "core";

/**
 * Builds the graph once from skillCategories: one central "core" node, one
 * hub per category, one node per skill, edges core->hub and hub->skill.
 */
function buildGraph() {
  const hubs = skillCategories.map((cat, categoryIndex) => ({
    id: `hub-${categoryIndex}`,
    label: cat.category,
    type: "hub",
    categoryIndex,
  }));

  const skillNodes = [];
  const edges = [];

  skillCategories.forEach((cat, categoryIndex) => {
    const hubId = `hub-${categoryIndex}`;
    edges.push({ id: `edge-${hubId}`, from: CORE_ID, to: hubId, categoryIndex, isCoreEdge: true });

    cat.skills.forEach((skill, skillIndex) => {
      const id = `skill-${categoryIndex}-${skillIndex}`;
      skillNodes.push({ id, label: skill, type: "skill", categoryIndex, hubId });
      edges.push({ id: `edge-${id}`, from: hubId, to: id, categoryIndex, isCoreEdge: false });
    });
  });

  return { hubs, skillNodes, edges };
}

/** Radial layout: hubs spaced evenly around the core, skills fanned outward from each hub. */
function computeLayout(hubs, skillNodes) {
  const positions = { [CORE_ID]: { ...CENTER } };
  const hubCount = hubs.length;

  hubs.forEach((hub, i) => {
    const angleDeg = -90 + (360 / hubCount) * i;
    const angleRad = (angleDeg * Math.PI) / 180;
    positions[hub.id] = {
      x: CENTER.x + HUB_RADIUS * Math.cos(angleRad),
      y: CENTER.y + HUB_RADIUS * Math.sin(angleRad),
    };

    const siblings = skillNodes.filter((node) => node.hubId === hub.id);
    const spread = Math.min(50, siblings.length * 10);

    siblings.forEach((node, j) => {
      const offset =
        siblings.length > 1 ? (j - (siblings.length - 1) / 2) * (spread / (siblings.length - 1)) : 0;
      const nodeAngleRad = ((angleDeg + offset) * Math.PI) / 180;
      const radius = TIER_RADII[j % TIER_RADII.length];
      positions[node.id] = {
        x: CENTER.x + radius * Math.cos(nodeAngleRad),
        y: CENTER.y + radius * Math.sin(nodeAngleRad),
      };
    });
  });

  return positions;
}

/**
 * A fixed, read-only star chart of skills grouped by category — no drag, no
 * hover-to-highlight. The layout never moves; what's "alive" is the sky
 * itself: every star twinkles on its own cycle (SMIL `<animate>`, so it
 * costs nothing in JS), the core pulses like a small sun, and a point of
 * light periodically travels each core→hub line, as if signal were flowing
 * out through the constellation. All of it is skipped for reduced motion,
 * which renders one calm, static frame.
 */
export function SkillsConstellation() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { hubs, skillNodes, edges } = useMemo(buildGraph, []);
  const allNodes = useMemo(
    () => [{ id: CORE_ID, label: "Skills", type: "core", categoryIndex: null }, ...hubs, ...skillNodes],
    [hubs, skillNodes]
  );
  const positions = useMemo(() => computeLayout(hubs, skillNodes), [hubs, skillNodes]);
  const coreEdges = useMemo(() => edges.filter((edge) => edge.isCoreEdge), [edges]);

  return (
    <div className="w-full">
      <p className="mb-4 text-center font-mono text-xs text-[var(--color-fg-muted)] sm:text-left">
        {"// a fixed star chart of skills, grouped by category"}
      </p>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="Star chart of skills grouped by category"
          className="mx-auto block h-auto min-w-[820px] max-w-full select-none"
        >
          <defs>
            <filter id="starGlow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((edge, i) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            const baseOpacity = edge.isCoreEdge ? 0.6 : 0.4;
            return (
              <line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edge.isCoreEdge ? "var(--color-accent-2)" : "var(--color-accent)"}
                strokeWidth={edge.isCoreEdge ? 1.5 : 1}
                opacity={baseOpacity}
              >
                {!prefersReducedMotion && (
                  <animate
                    attributeName="opacity"
                    values={`${baseOpacity};${baseOpacity * 0.35};${baseOpacity}`}
                    dur={`${4 + (i % 5)}s`}
                    begin={`${(i % 7) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                )}
              </line>
            );
          })}

          {!prefersReducedMotion &&
            coreEdges.map((edge, i) => {
              const from = positions[edge.from];
              const to = positions[edge.to];
              return (
                <circle key={`spark-${edge.id}`} r={3} fill="var(--color-accent-2)" filter="url(#starGlow)">
                  <animateMotion
                    dur={`${3.5 + i * 0.4}s`}
                    begin={`${i * 0.6}s`}
                    repeatCount="indefinite"
                    path={`M${from.x},${from.y} L${to.x},${to.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${3.5 + i * 0.4}s`}
                    begin={`${i * 0.6}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}

          {allNodes.map((node, i) => {
            const pos = positions[node.id];
            const isCore = node.type === "core";
            const isHub = node.type === "hub";
            const radius = isCore ? 16 : isHub ? 24 : 12;
            const twinkleDur = 2.4 + ((i * 37) % 30) / 10;
            const twinkleDelay = ((i * 53) % 40) / 10;

            return (
              <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r={radius}
                  fill={isCore ? "var(--color-accent)" : "var(--color-bg-raised)"}
                  stroke={isCore ? "none" : isHub ? "var(--color-accent-2)" : "var(--color-accent)"}
                  strokeWidth={isHub ? 2 : 1.5}
                  filter={isCore || isHub ? "url(#starGlow)" : undefined}
                >
                  {!prefersReducedMotion && (
                    <animate
                      attributeName="opacity"
                      values={isCore ? "1;0.75;1" : "1;0.6;1"}
                      dur={`${isCore ? 3 : twinkleDur}s`}
                      begin={`${isCore ? 0 : twinkleDelay}s`}
                      repeatCount="indefinite"
                    />
                  )}
                  {!prefersReducedMotion && isCore && (
                    <animate attributeName="r" values={`${radius};${radius + 2};${radius}`} dur="3s" repeatCount="indefinite" />
                  )}
                </circle>
                {isCore && (
                  <circle r={4} fill="var(--color-bg-raised)" opacity={0.9} aria-hidden="true" />
                )}
                <text
                  x={0}
                  y={radius + 14}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={isHub ? 13 : 11}
                  fontWeight={isHub ? 600 : 400}
                  fill={isHub ? "var(--color-accent-2)" : "var(--color-fg)"}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
