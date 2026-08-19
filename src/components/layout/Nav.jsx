import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle.jsx";
import { cn } from "../../lib/cn.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/posts", label: "Posts" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <NavLink
          to="/"
          data-cursor-hover
          className="font-display text-lg font-semibold tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          SB<span className="text-[var(--color-accent)]">.</span>
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to} className="relative">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                data-cursor-hover
                className={({ isActive }) =>
                  cn(
                    "relative block px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--color-accent)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            data-cursor-hover
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-[var(--radius-sm)] p-2 text-[var(--color-fg)] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="container-page flex flex-col gap-1 border-t border-[var(--color-border)] pb-4 md:hidden"
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium",
                    isActive
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                      : "text-[var(--color-fg-muted)]"
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
