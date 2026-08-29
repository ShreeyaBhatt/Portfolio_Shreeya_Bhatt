/**
 * A one-line window-event bus for opening the command palette from anywhere
 * (the nav button, a keyboard shortcut, a link in the footer).
 */
const EVENT = "command:open";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onCommandPalette(handler) {
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
