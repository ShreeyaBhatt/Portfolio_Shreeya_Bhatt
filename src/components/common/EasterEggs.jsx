import { useEffect } from "react";
import { isTypingTarget, labToast, runLabScan } from "../../lib/labEvents.js";

/**
 * Keystroke easter eggs. A rolling buffer of the last few typed characters is
 * checked against a couple of phrases — nothing here is needed to use the site.
 *
 *   sudo explore → a nudge, and the lab scan kicks off
 *   sudo scan    → just the scan
 *
 * (The command centre on `/` / ⌘K and the Lab Status dot carry the rest.)
 */
const TRIGGERS = [
  {
    phrase: "sudo explore",
    run: () => {
      labToast("access granted — the lab was never locked. here, look around.");
      window.setTimeout(runLabScan, 500);
    },
  },
  { phrase: "sudo scan", run: () => runLabScan() },
  {
    phrase: "whoami",
    run: () => labToast("shreeya — python developer, data & ai, full-stack. hi."),
  },
];

export function EasterEggs() {
  useEffect(() => {
    let buffer = "";
    function onKey(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(document.activeElement)) return;
      if (event.key === "Backspace") {
        buffer = buffer.slice(0, -1);
        return;
      }
      if (event.key.length !== 1) return;
      buffer = (buffer + event.key.toLowerCase()).slice(-24);
      const hit = TRIGGERS.find((t) => buffer.endsWith(t.phrase));
      if (hit) {
        buffer = "";
        hit.run();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
