import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "../common/ThemeToggle.jsx";
import { cn } from "../../lib/cn.js";
import { easeSignature, easeEditorial } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";
import { openCommandPalette } from "../../lib/commandBus.js";

/**
 * The floating command bar — a spacecraft control strip pinned to the top. A
 * live status readout on the left, the section channels on the right, and a
 * ⌘K entry to the command palette. On scroll it settles onto a translucent
 * plate. Mobile collapses to a full-screen channel list.
 */
const links = [
  { to: "/about", index: "01", label: "Crew", meta: "Profile" },
  { to: "/projects", index: "02", label: "Missions", meta: "Projects" },
  { to: "/contact", index: "03", label: "Channel", meta: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled && !menuOpen
            ? "border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex items-center justify-between py-3.5 md:py-4"
        >
          <NavLink to="/" aria-label="Shreeya Bhatt — command deck" className="flex items-center gap-3">
            <span className="font-display text-[0.9rem] font-bold tracking-tight text-[var(--color-fg)]">
              SHREEYA&nbsp;BHATT
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                style={{ animation: "lab-pulse 2.2s ease-in-out infinite", boxShadow: "0 0 8px var(--color-accent)" }}
              />
              <span className="coord">System online</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-baseline gap-1.5 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors",
                        isActive
                          ? "text-[var(--color-fg)]"
                          : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="text-[var(--color-accent)]">{link.index}</span>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--color-accent)]"
                            style={{ boxShadow: "0 0 8px var(--color-accent)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              title="Command palette — ⌘K"
              className="ml-2 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-2 py-1 font-mono text-[0.65rem] tracking-[0.1em] text-[var(--color-fg-subtle)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              ⌘K
            </button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-2 py-1 font-mono text-[0.65rem] text-[var(--color-fg-subtle)]"
            >
              ⌘K
            </button>
            <ThemeToggle />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-fg)]"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeEditorial }}
            className="fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--color-bg)_96%,transparent)] pt-24 backdrop-blur-xl md:hidden"
          >
            <ul className="container-page flex flex-col">
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: easeSignature }}
                  className="border-b border-[var(--color-border)]"
                >
                  <NavLink to={link.to} className="flex items-baseline gap-4 py-5 text-h2 font-semibold text-[var(--color-fg)]">
                    <span className="font-mono text-[0.7rem] text-[var(--color-accent)]">{link.index}</span>
                    {link.label}
                    <span className="coord ml-auto self-center">{link.meta}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <p className="container-page mt-10 font-mono text-sm text-[var(--color-fg-muted)]">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
