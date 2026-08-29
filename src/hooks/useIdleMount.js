import { useEffect, useState } from "react";

/**
 * Returns false on first render, then true once the browser is idle (or after
 * a short fallback delay). Use it to keep non-critical chrome — the command
 * palette, back-to-top, the warp overlay — out of the initial main-thread
 * work so first paint and interactivity land sooner.
 *
 * @param {number} [fallbackMs]
 */
export function useIdleMount(fallbackMs = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let id;
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      id = ric(() => setReady(true), { timeout: fallbackMs });
      return () => window.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setReady(true), Math.min(fallbackMs, 300));
    return () => window.clearTimeout(id);
  }, [fallbackMs]);

  return ready;
}
