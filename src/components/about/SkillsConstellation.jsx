import { useCallback, useMemo, useRef, useState } from "react";
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
    edges.push({ id: `edge-${hubId}`, from: CORE_ID, to: hubId, categoryIndex });

    cat.skills.forEach((skill, skillIndex) => {
      const id = `skill-${categoryIndex}-${skillIndex}`;
      skillNodes.push({ id, label: skill, type: "skill", categoryIndex, hubId });
      edges.push({ id: `edge-${id}`, from: hubId, to: id, categoryIndex });
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

export function SkillsConstellation() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { hubs, skillNodes, edges } = useMemo(buildGraph, []);
  const allNodes = useMemo(
    () => [{ id: CORE_ID, label: "Skills", type: "core", categoryIndex: null }, ...hubs, ...skillNodes],
    [hubs, skillNodes]
  );

  const [positions, setPositions] = useState(() => computeLayout(hubs, skillNodes));
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const svgRef = useRef(null);
  const dragRef = useRef(null);

  const activeId = hoveredId ?? selectedId;

  const activeCategoryIndex = useMemo(() => {
    if (!activeId) return null;
    if (activeId === CORE_ID) return "all";
    const hub = hubs.find((h) => h.id === activeId);
    if (hub) return hub.categoryIndex;
    const skill = skillNodes.find((s) => s.id === activeId);
    return skill ? skill.categoryIndex : null;
  }, [activeId, hubs, skillNodes]);

  const isDimmed = useCallback(
    (categoryIndex, nodeId) => {
      if (activeCategoryIndex === null || activeCategoryIndex === "all") return false;
      if (nodeId === CORE_ID) return false;
      return categoryIndex !== activeCategoryIndex;
    },
    [activeCategoryIndex]
  );

  const toSvgPoint = useCallback((clientX, clientY) => {
    const svgEl = svgRef.current;
    if (!svgEl) return { x: 0, y: 0 };
    const point = svgEl.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const ctm = svgEl.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const inverted = point.matrixTransform(ctm.inverse());
    return { x: inverted.x, y: inverted.y };
  }, []);

  const handlePointerDown = useCallback(
    (event, nodeId) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      const start = toSvgPoint(event.clientX, event.clientY);
      const nodePos = positions[nodeId];
      dragRef.current = {
        nodeId,
        offsetX: nodePos.x - start.x,
        offsetY: nodePos.y - start.y,
        moved: false,
      };
    },
    [positions, toSvgPoint]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!dragRef.current) return;
      const point = toSvgPoint(event.clientX, event.clientY);
      dragRef.current.moved = true;
      const { nodeId, offsetX, offsetY } = dragRef.current;
      setPositions((prev) => ({
        ...prev,
        [nodeId]: { x: point.x + offsetX, y: point.y + offsetY },
      }));
    },
    [toSvgPoint]
  );

  const handlePointerUp = useCallback((_event, nodeId) => {
    if (dragRef.current && !dragRef.current.moved) {
      setSelectedId((current) => (current === nodeId ? null : nodeId));
    }
    dragRef.current = null;
  }, []);

  const transition = prefersReducedMotion ? undefined : "opacity 200ms ease, stroke 200ms ease";

  return (
    <div className="w-full">
      <p className="mb-4 text-center font-mono text-xs text-[var(--color-fg-muted)] sm:text-left">
        {"// hover or tap a node to see connections. Drag any node to rearrange."}
      </p>
      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="Interactive graph of skills grouped by category"
          className="mx-auto block h-auto min-w-[820px] max-w-full touch-none select-none"
          onPointerMove={handlePointerMove}
          onMouseLeave={() => setHoveredId(null)}
        >
          {edges.map((edge) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            const dimmed = isDimmed(edge.categoryIndex, edge.from) && isDimmed(edge.categoryIndex, edge.to);
            return (
              <line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={dimmed ? "var(--color-border)" : "var(--color-accent)"}
                strokeWidth={dimmed ? 1 : 1.5}
                opacity={dimmed ? 0.25 : 0.6}
                style={{ transition }}
              />
            );
          })}

          {allNodes.map((node) => {
            const pos = positions[node.id];
            const dimmed = isDimmed(node.categoryIndex, node.id);
            const isCore = node.type === "core";
            const isHub = node.type === "hub";
            const radius = isCore ? 16 : isHub ? 24 : 12;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                tabIndex={0}
                role="button"
                aria-label={node.label}
                data-cursor-hover
                onPointerDown={(event) => handlePointerDown(event, node.id)}
                onPointerUp={(event) => handlePointerUp(event, node.id)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(node.id)}
                onBlur={() => setHoveredId(null)}
                style={{ cursor: "grab", opacity: dimmed ? 0.3 : 1, transition, outline: "none" }}
              >
                <circle
                  r={radius}
                  fill={isCore ? "var(--color-accent)" : "var(--color-bg-raised)"}
                  stroke={isCore ? "none" : isHub ? "var(--color-accent)" : "var(--color-accent-2)"}
                  strokeWidth={isHub ? 2 : 1.5}
                />
                <text
                  x={0}
                  y={radius + 14}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={isHub ? 13 : 11}
                  fontWeight={isHub ? 600 : 400}
                  fill={isHub ? "var(--color-accent)" : "var(--color-fg)"}
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
