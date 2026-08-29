import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { onCommandPalette } from "../../lib/commandBus.js";
import { useTheme } from "../../hooks/useTheme.js";
import { profile } from "../../data/profile.js";

/**
 * ⌘K / Ctrl-K (or "/") opens a spacecraft command palette: jump to a section,
 * open the resume, hit a social link, toggle the theme. Normal navigation
 * still works without it — this is a shortcut, not a requirement.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  const commands = useMemo(
    () => [
      { label: "Go to Command Deck", hint: "Home", run: () => navigate("/") },
      { label: "Go to Crew Profile", hint: "About", run: () => navigate("/about") },
      { label: "Open Systems", hint: "Skills", run: () => navigate("/about#skills") },
      { label: "Open Mission Log", hint: "Timeline", run: () => navigate("/about#log") },
      { label: "View Missions", hint: "Projects", run: () => navigate("/projects") },
      { label: "Open Channel", hint: "Contact", run: () => navigate("/contact") },
      { label: "Transmit email", hint: profile.email, run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: "Open GitHub", hint: "External", run: () => window.open(profile.githubUrl, "_blank", "noreferrer") },
      { label: "Open LinkedIn", hint: "External", run: () => window.open(profile.linkedinUrl, "_blank", "noreferrer") },
      { label: "Toggle theme", hint: "Display", run: () => toggleTheme() },
    ],
    [navigate, toggleTheme]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q));
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => onCommandPalette(() => setOpen(true)), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !open && !isTyping(e.target))) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={close}
        >
          <div className="absolute inset-0 bg-[rgba(2,4,10,0.6)] backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="hud relative w-full max-w-lg overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => (a + 1) % filtered.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => (a - 1 + filtered.length) % filtered.length);
              } else if (e.key === "Enter" && filtered[active]) {
                e.preventDefault();
                filtered[active].run();
                close();
              }
            }}
          >
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
              <span className="coord text-[var(--color-accent)]">CMD</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Command center…"
                className="w-full bg-transparent font-mono text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:outline-none"
              />
              <kbd className="coord rounded border border-[var(--color-border)] px-1.5 py-0.5">ESC</kbd>
            </div>
            <ul className="max-h-[46vh] overflow-y-auto py-1.5">
              {filtered.length === 0 && (
                <li className="px-4 py-3 font-mono text-xs text-[var(--color-fg-subtle)]">No matching command.</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      c.run();
                      close();
                    }}
                    className={
                      "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left font-mono text-[0.8rem] transition-colors " +
                      (i === active ? "bg-[var(--color-accent-soft)] text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]")
                    }
                  >
                    <span>{c.label}</span>
                    <span className="coord shrink-0">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function isTyping(el) {
  const t = el?.tagName;
  return t === "INPUT" || t === "TEXTAREA" || el?.isContentEditable;
}
