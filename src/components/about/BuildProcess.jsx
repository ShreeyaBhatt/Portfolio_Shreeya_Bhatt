import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "../../lib/cn.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * "How I build" — four stages with a line that draws itself between them as the
 * section scrolls through the viewport. On a wide screen the line is
 * horizontal; stacked, it runs down the left edge. Each stage node fills in as
 * the line reaches it.
 *
 * Under reduced motion the line is simply already drawn and every node lit.
 */
const STAGES = [
  {
    n: "01",
    title: "Understand",
    body: "Get the problem and the requirements straight before writing anything.",
  },
  {
    n: "02",
    title: "Design",
    body: "Plan the architecture, the data, and how the thing should feel to use.",
  },
  {
    n: "03",
    title: "Build",
    body: "Implement, test, and iterate in small steps.",
  },
  {
    n: "04",
    title: "Refine",
    body: "Optimise, polish, and deploy something people can actually use.",
  },
];

function Stage({ progress, index, total, reduced }) {
  const stage = STAGES[index];
  const at = index / (total - 1 || 1);
  // node lights when the drawn line reaches it
  const lit = useTransform(progress, [at - 0.02, at + 0.03], [0, 1]);
  const dotBg = useTransform(lit, (v) => (v > 0.5 ? "var(--color-accent)" : "var(--color-bg)"));
  const numColor = useTransform(lit, (v) =>
    v > 0.5 ? "var(--color-accent)" : "var(--color-fg-subtle)"
  );

  return (
    <li className="relative flex gap-5 md:block">
      {/* node */}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { backgroundColor: dotBg }}
        className={cn(
          "relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-[var(--color-accent)] md:mt-0",
          reduced && "bg-[var(--color-accent)]"
        )}
      />
      <div className="pb-8 md:pb-0 md:pt-6">
        <motion.p
          style={reduced ? undefined : { color: numColor }}
          className={cn("label-mono", reduced && "text-[var(--color-accent)]")}
        >
          {stage.n}
        </motion.p>
        <h3 className="mt-3 text-h3 font-semibold">{stage.title}</h3>
        <p className="mt-2 max-w-[16rem] text-sm text-[var(--color-fg-muted)]">{stage.body}</p>
      </div>
    </li>
  );
}

export function BuildProcess() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const drawn = prefersReducedMotion ? 1 : progress;

  return (
    <div ref={ref} className="relative">
      {/* rail — horizontal on desktop, vertical stacked */}
      <div
        aria-hidden="true"
        className="absolute left-[7px] top-2 h-[calc(100%-4rem)] w-px bg-[var(--color-border-strong)] md:left-0 md:top-[7px] md:h-px md:w-full"
      />
      <motion.div
        aria-hidden="true"
        style={
          prefersReducedMotion
            ? { scaleX: 1, scaleY: 1 }
            : { scaleY: drawn, scaleX: drawn }
        }
        className="absolute left-[7px] top-2 h-[calc(100%-4rem)] w-px origin-top bg-[var(--color-accent)] md:left-0 md:top-[7px] md:h-px md:w-full md:origin-left"
      />

      <ol className="relative grid gap-0 md:grid-cols-4 md:gap-8">
        {STAGES.map((_, i) => (
          <Stage
            key={i}
            index={i}
            total={STAGES.length}
            progress={progress}
            reduced={prefersReducedMotion}
          />
        ))}
      </ol>
    </div>
  );
}
