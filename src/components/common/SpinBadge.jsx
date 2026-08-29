import { Link } from "react-router-dom";
import { cn } from "../../lib/cn.js";

/**
 * The rotating "seal" — circular text on a spinning ring with a mark in the
 * middle. A small piece of visual signature that reads as a designed object,
 * not a component-library default. Rotation pauses on hover.
 *
 * @param {{ text?: string, to?: string, className?: string, size?: number }} props
 */
export function SpinBadge({
  text = "AVAILABLE FOR WORK · OPEN TO INTERNSHIPS · ",
  to = "/contact",
  className,
  size = 116,
}) {
  return (
    <Link
      to={to}
      aria-label="Available for work — get in touch"
      className={cn(
        "group relative grid place-items-center rounded-full text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full [animation:spin-slow_16s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
      >
        <defs>
          <path id="spin-badge-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.24em]">
          <textPath href="#spin-badge-path">{text}</textPath>
        </text>
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="relative h-4 w-4 text-[var(--color-fg)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </Link>
  );
}
