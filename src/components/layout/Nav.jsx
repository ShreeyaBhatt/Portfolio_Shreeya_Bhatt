import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "../common/ThemeToggle.jsx";
import { cn } from "../../lib/cn.js";
import { easeSignature, easeEditorial } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

/**
 * A quiet editorial top bar: the name set in display type on the left, three
 * mono links on the right with a mint marker under the active one. On scroll a
 * hairline and a blurred ground fade in so it reads as settling, not changing.
 * Mobile collapses to a Menu button and a full-screen overlay.
 */
const links = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex items-center justify-between py-4 md:py-5"
        >
          <NavLink
            to="/"
            aria-label="Shreeya Bhatt — home"
            className="font-display text-[0.95rem] font-semibold tracking-tight text-[var(--color-fg)]"
          >
            Shreeya&nbsp;Bhatt
          </NavLink>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "relative block px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors",
                      isActive
                        ? "text-[var(--color-fg)]"
                        : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--color-accent)]"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
            <li className="ml-2">
              <ThemeToggle />
            </li>
          </ul>

          <div className="flex items-center gap-1 md:hidden">
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
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/97 pt-24 backdrop-blur-xl md:hidden"
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
                  <NavLink
                    to={link.to}
                    className="flex items-baseline gap-4 py-5 text-h2 font-semibold text-[var(--color-fg)]"
                  >
                    <span className="font-mono text-[0.7rem] text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <p className="container-page mt-10 font-mono text-sm text-[var(--color-fg-muted)]">
              {profile.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
