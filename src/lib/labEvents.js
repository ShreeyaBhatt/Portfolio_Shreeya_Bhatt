/**
 * A tiny window-event bus for the lab's interaction layer, so the command
 * palette, the "scan the lab" sweep, the toaster, and the easter eggs can all
 * talk to each other without prop-drilling through the router tree.
 *
 *   emitLab("scan")            → dispatches window "lab:scan"
 *   onLab("scan", fn)          → subscribes, returns an unsubscribe fn
 *
 * Plus three named shortcuts for the common cases.
 */
export function emitLab(type, detail) {
  window.dispatchEvent(new CustomEvent(`lab:${type}`, { detail }));
}

export function onLab(type, handler) {
  const wrapped = (event) => handler(event.detail);
  window.addEventListener(`lab:${type}`, wrapped);
  return () => window.removeEventListener(`lab:${type}`, wrapped);
}

/** Fire a transient corner message (picked up by <LabToaster>). */
export const labToast = (message) => emitLab("toast", { message });

/** Kick off the page scan (picked up by <LabScan>). */
export const runLabScan = () => emitLab("scan");

/** Open the command centre (picked up by <CommandPalette>). */
export const openCommandPalette = () => emitLab("command");

/** True when focus is in a field, so global keys shouldn't hijack the keystroke. */
export function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable === true
  );
}
