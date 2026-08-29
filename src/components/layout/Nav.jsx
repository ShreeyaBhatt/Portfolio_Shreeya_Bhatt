import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "../common/ThemeToggle.jsx";
import { cn } from "../../lib/cn.js";
import { easeSignature, easeEditorial } from "../../lib/motion.js";
import { profile } from "../../data/profile.js";

const links = [
  { to: "/", label: "Index" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
  { to: "/certifications", label: "Credentials" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the overlay on navigation, and never leave the page locked behind it.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    function handleEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled && !menuOpen
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="container-page relative flex h-[4.5rem] items-center justify-between"
          aria-label="Primary"
        >
          <NavLink
            to="/"
            data-cursor-hover
            className="label-mono text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
          >
            Shreeya Bhatt
          </NavLink>

          {/* Desktop: one pill holding the whole nav — reads as a single
              considered object rather than five loose text links. */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-raised)]/70 p-1 backdrop-blur-xl md:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  data-cursor-hover
                  className={({ isActive }) =>
                    cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive
                        ? "text-[var(--color-bg)]"
                        : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              data-cursor-hover
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="label-mono px-3 py-2 text-[var(--color-fg)] md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile: a full-screen overlay with the links set large. A cramped
          dropdown on a site built around display type would undercut it. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="fixed inset-0 top-[4.5rem] z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-page flex flex-col pt-8">
              {links.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.4, ease: easeSignature }}
                  className="border-b border-[var(--color-border)]"
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-baseline gap-4 py-5 text-h2 font-medium transition-colors",
                        isActive ? "text-[var(--color-accent)]" : "text-[var(--color-fg)]"
                      )
                    }
                  >
                    <span className="label-mono text-[var(--color-fg-subtle)]">
                      0{index + 1}
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
