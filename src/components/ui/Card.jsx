import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "../../lib/cn.js";
import { getMotionComponent } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Shared card primitive with a subtle mouse-driven tilt. Elevation and radius
 * come from the design tokens so every card in the site reads as one system.
 */
export function Card({ className, children, tilt = true, as = "div", ...props }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const active = tilt && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 20 });

  function handleMouseMove(event) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Component = getMotionComponent(as);

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={active ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-raised)]",
        "shadow-[var(--shadow-resting)] hover:shadow-[var(--shadow-raised)] transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
