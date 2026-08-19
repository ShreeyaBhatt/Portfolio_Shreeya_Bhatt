import clsx from "clsx";

/**
 * Tiny conditional className joiner. Kept as a one-line wrapper so call
 * sites read `cn(...)` consistently instead of importing clsx directly
 * everywhere — swap the implementation here if merging logic is ever needed.
 */
export function cn(...inputs) {
  return clsx(...inputs);
}
