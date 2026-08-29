import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../lib/cn.js";
import { profile } from "../../data/profile.js";
import { useTheme } from "../../hooks/useTheme.js";
import { onLab, isTypingTarget, runLabScan, labToast } from "../../lib/labEvents.js";
import { easeSignature } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * The command centre — a lightweight developer-tool overlay.
 *
 * Opens on `/` or ⌘/Ctrl-K (never while a field is focused), or on a
 * `lab:command` event. Arrow keys move, Enter runs, Esc closes; focus returns
 * to wherever it was. Commands are navigation, the external profiles, the
 * theme toggle, and the lab scan.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const returnFocusRef = useRef(null);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    returnFocusRef.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement;
    setOpen(true);
  }, []);

  const commands = useMemo(() => {
    const go = (label, to, keywords) => ({
      label,
      hint: "GO",
      keywords,
      run: () => navigate(to),
    });
    const list = [
      go("About — the researcher", "/about", "bio education profile"),
      go("Experiments — the work", "/projects", "projects work portfolio"),
      go("Skills — the toolbox", "/about#skills", "stack technologies python"),
      go("Journal — experiment log", "/journal", "notes learning blog"),
      go("Credentials", "/certifications", "certificates courses"),
      go("Contact — open collaboration", "/contact", "email hire reach"),
      go("Home", "/", "start hero lab"),
      {
        label: "Run lab scan",
        hint: "RUN",
        keywords: "scan sweep signature",
        run: () => runLabScan(),
      },
      {
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        hint: "RUN",
        keywords: "theme dark light mode toggle",
        run: () => toggleTheme(),
      },
      {
        label: "Copy email address",
        hint: "RUN",
        keywords: "email contact copy",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => labToast("email copied to clipboard."),
            () => labToast(profile.email)
          );
        },
      },
      {
        label: "Open GitHub",
        hint: "OPEN",
        keywords: "github code source repos",
        run: () => window.open(profile.githubUrl, "_blank", "noreferrer"),
      },
      {
        label: "Open LinkedIn",
        hint: "OPEN",
        keywords: "linkedin experience",
        run: () => window.open(profile.linkedinUrl, "_blank", "noreferrer"),
      },
    ];
    return list;
  }, [navigate, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q)
    );
  }, [commands, query]);

  // Global open shortcuts.
  useEffect(() => {
    function onKey(event) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else show();
        return;
      }
      if (
        event.key === "/" &&
        !meta &&
        !event.altKey &&
        !open &&
        !isTypingTarget(document.activeElement)
      ) {
        event.preventDefault();
        show();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show, close]);

  useEffect(() => onLab("command", () => show()), [show]);

  // Focus the field when it opens; keep the active row in range.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  function onListKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => (a + 1) % Math.max(1, filtered.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const cmd = filtered[active];
      if (cmd) {
        close();
        // let the overlay unmount before navigating/opening
        window.setTimeout(() => cmd.run(), 0);
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close command centre"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-[var(--color-bg)]/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command centre"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: easeSignature }}
            onKeyDown={onListKey}
            className="panel tech-border relative w-full max-w-lg overflow-hidden shadow-[var(--shadow-modal)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
              <span className="label-mono text-[var(--color-accent)]">Command Center</span>
              <span className="label-mono text-[var(--color-fg-subtle)]">ESC</span>
            </div>

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Type a command…"
              className="w-full bg-transparent px-4 py-3.5 font-mono text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-subtle)]"
              aria-label="Command search"
              autoComplete="off"
              spellCheck="false"
            />

            <ul className="max-h-[46vh] overflow-y-auto border-t border-[var(--color-border)] py-1.5">
              {filtered.length === 0 && (
                <li className="px-4 py-3 font-mono text-xs text-[var(--color-fg-subtle)]">
                  No matching command.
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.label}>
                  <button
                    type="button"
                    onMouseMove={() => setActive(i)}
                    onClick={() => {
                      close();
                      window.setTimeout(() => cmd.run(), 0);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left font-mono text-sm transition-colors",
                      i === active
                        ? "bg-[var(--color-accent-soft)] text-[var(--color-fg)]"
                        : "text-[var(--color-fg-muted)]"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1 w-1 rounded-full",
                          i === active ? "bg-[var(--color-accent)]" : "bg-transparent"
                        )}
                      />
                      {cmd.label}
                    </span>
                    <span className="label-mono shrink-0 text-[var(--color-fg-subtle)]">
                      {cmd.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="border-t border-[var(--color-border)] px-4 py-2 font-mono text-[0.65rem] text-[var(--color-fg-subtle)]">
              ↑ ↓ to move · ↵ to run · / or ⌘K anytime
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
