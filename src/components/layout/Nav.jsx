import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "../common/ThemeToggle.jsx";
import { cn } from "../../lib/cn.js";
import { easeSignature, easeEditorial } from "../../lib/motion.js";
import { openCommandPalette } from "../../lib/labEvents.js";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";

/**
 * The lab's control panel — a floating, numbered navigation rail rather than a
 * conventional navbar.
 *
 * Desktop: a single bordered strip holding the whole nav, centred at the top.
 * On scroll it compresses (padding tightens, the brand collapses to "SB", a
 * blurred ground fades in) so it reads as an instrument that's been minimised,
 * not a bar that changed colour.
 *
 * Mobile: a compact top strip + a full-screen overlay with the links set large.
 * While the overlay is open the layout carries `data-nav-open` on <body> so the
 * corner LabStatus readout gets out of the way.
 */
const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Experiments" },
  { to: "/about", label: "Skills", hash: "#skills" },
  { to: "/journal", label: "Journal" },
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.removeAttribute("data-nav-open");
      return undefined;
    }
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-nav-open", "");
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-nav-open");
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto mt-3 flex items-center gap-4 rounded-full border transition-all duration-300 md:mt-4",
            scrolled && !menuOpen
              ? "border-[var(--color-border)] bg-[var(--color-bg)]/80 px-3 py-1.5 backdrop-blur-xl"
              : "border-[var(--color-border)]/70 bg-[var(--color-bg-raised)]/50 px-4 py-2 backdrop-blur-md"
          )}
        >
          <NavLink
            to="/"
            data-cursor-hover
            className="flex shrink-0 items-center gap-2 leading-none"
            aria-label="Shreeya Bhatt — home"
          >
            <span className="label-mono text-[var(--color-fg)]">
              {scrolled ? "SB" : "Shreeya Bhatt"}
            </span>
            {!scrolled && (
              <span className="label-mono hidden text-[var(--color-fg-subtle)] sm:inline">
                / Digital Lab
              </span>
            )}
          </NavLink>

          {/* Desktop: numbered control items */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((link, index) => (
              <li key={link.label}>
                <NavLink
                  to={`${link.to}${link.hash ?? ""}`}
                  data-cursor-hover
                  className={({ isActive }) =>
                    cn(
                      "relative flex items-baseline gap-1.5 rounded-full px-2.5 py-1.5 transition-colors duration-300",
                      isActive && !link.hash
                        ? "text-[var(--color-fg)]"
                        : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && !link.hash && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-[var(--color-accent-soft)] ring-1 ring-[var(--color-accent)]/30"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10 font-mono text-[0.625rem] text-[var(--color-accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="relative z-10 text-sm">{link.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              data-cursor-hover
              onClick={openCommandPalette}
              aria-label="Open command centre"
              title="Command centre — press / or ⌘K"
              className="label-mono hidden rounded-full border border-[var(--color-border-strong)] px-2 py-1 text-[var(--color-fg-subtle)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:block"
            >
              ⌘K
            </button>
            <span
              aria-hidden="true"
              className="mx-1 hidden h-1 w-1 rounded-full bg-[var(--color-success)] lg:block"
              title="System online"
            />
            <ThemeToggle />
            <button
              type="button"
              data-cursor-hover
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="label-mono px-2 py-1 text-[var(--color-fg)] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
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
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/97 pt-24 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col">
              {links.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4, ease: easeSignature }}
                  className="border-b border-[var(--color-border)]"
                >
                  <NavLink
                    to={`${link.to}${link.hash ?? ""}`}
                    className="flex items-baseline gap-4 py-5 text-h2 font-medium text-[var(--color-fg)]"
                  >
                    <span className="label-mono text-[var(--color-accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <p className="container-page mt-10 font-mono text-sm text-[var(--color-fg-muted)]">
              {profile.email}
            </p>
            <p className="container-page mt-2 label-mono text-[var(--color-fg-subtle)]">
              Build {site.build} — System online
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
