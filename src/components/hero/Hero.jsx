import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { RevealLines } from "../common/RevealLines.jsx";
import { NodeField } from "./NodeField.jsx";
import { LabInit, shouldRunLabInit, markLabInitDone } from "./LabInit.jsx";
import { profile } from "../../data/profile.js";
import { site } from "../../data/site.js";
import { easeSignature, staggerContainer } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { useMousePosition } from "../../hooks/useMousePosition.js";

const NodeField3D = lazy(() => import("./NodeField3D.jsx"));

const [firstName, ...restOfName] = profile.name.split(" ");
const lastName = restOfName.join(" ");
const ROLES = ["Python Developer", "Data & AI Enthusiast", "Full-Stack Builder"];

/**
 * The hero — "Lab Initialization".
 *
 * A boot sequence (<LabInit>, once per tab, skipped under reduced motion) sits
 * over the hero and wipes away to reveal the identity beneath: name at display
 * scale, the three roles this portfolio argues for, one honest sentence, and
 * two ways in. The "digital experiment field" (<NodeField>) sits alongside as a
 * live system diagram; on capable desktops a lazy three.js depth layer fades in
 * behind it.
 *
 * Robustness rule: the identity content is ALWAYS rendered and readable — its
 * entrance is a stagger-in enhancement only, and the boot panel covering it can
 * only ever delay the reveal, never withhold it (a hard fallback timer forces
 * the panel away).
 */
export function Hero() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Opacity stays at 1 in every state — the entrance only slides the block up a
  // few pixels. If motion never runs, the content is still fully visible.
  const reveal = {
    hidden: { opacity: 1, y: prefersReducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSignature } },
  };

  const [booting, setBooting] = useState(() => !prefersReducedMotion && shouldRunLabInit());
  const [show3D, setShow3D] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0]);

  const mouse = useMousePosition();
  const nameX = useTransform(mouse.x, [-1, 1], [10, -10]);
  const nameY = useTransform(mouse.y, [-1, 1], [7, -7]);

  const finishBoot = () => {
    markLabInitDone();
    setBooting(false);
  };

  // Safety net: whatever happens inside <LabInit>, never leave the panel up.
  useEffect(() => {
    if (!booting) return undefined;
    const t = setTimeout(finishBoot, 2600);
    return () => clearTimeout(t);
  }, [booting]);

  // Decide whether the three.js depth layer is worth mounting — capable
  // desktop, fine pointer, motion welcome — and only after the page is idle.
  useEffect(() => {
    if (prefersReducedMotion || booting) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.innerWidth < 1024) return undefined;

    const idle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 400));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => setShow3D(true));
    return () => cancelIdle(handle);
  }, [prefersReducedMotion, booting]);

  // Cycle the role line once the hero has settled.
  useEffect(() => {
    if (booting || prefersReducedMotion) return undefined;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [booting, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      id="lab-top"
      className="relative flex min-h-[82vh] flex-col overflow-hidden pb-10 pt-[13vh] md:pt-[15vh]"
    >
      {booting && <LabInit onDone={finishBoot} />}

      <motion.div style={{ y, opacity }} className="container-page">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
        >
          {/* ---- identity ---- */}
          <div className="min-w-0">
            <motion.p
              variants={reveal}
              className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[var(--color-fg-subtle)]"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                style={
                  prefersReducedMotion
                    ? undefined
                    : { animation: "lab-pulse 2.4s ease-in-out infinite" }
                }
              />
              <span>Digital Lab / {site.labNumber}</span>
              <span className="hidden text-[var(--color-border-strong)] sm:inline">—</span>
              <span className="hidden sm:inline">{profile.availability}</span>
            </motion.p>

            <motion.div style={{ x: nameX, y: nameY }}>
              <RevealLines
                as="h1"
                animateOnMount
                className="mt-7 text-display font-display font-semibold"
                lines={[
                  firstName,
                  <span key="last" className="accent-italic">
                    {lastName}
                  </span>,
                ]}
              />
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {ROLES.map((role, i) => (
                <span
                  key={role}
                  className={
                    "label-mono transition-colors duration-500 " +
                    (i === roleIndex ? "text-[var(--color-fg)]" : "text-[var(--color-fg-subtle)]")
                  }
                >
                  {role}
                  {i < ROLES.length - 1 && (
                    <span className="ml-3 text-[var(--color-border-strong)]">/</span>
                  )}
                </span>
              ))}
            </div>

            <motion.p
              variants={reveal}
              className="mt-7 max-w-md text-[var(--color-fg-muted)]"
            >
              I build <span className="text-[var(--color-fg)]">AI-powered</span> and{" "}
              <span className="text-[var(--color-fg)]">data-driven</span> applications — models,
              APIs, and interfaces — end to end.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button as="a" href="#experiments" variant="primary">
                Explore the lab
              </Button>
              <Button as={Link} to="/contact" variant="secondary">
                Get in touch
              </Button>
            </motion.div>
          </div>

          {/* ---- digital experiment field ---- */}
          <div className="relative mx-auto aspect-[420/360] w-full min-w-0 max-w-[30rem] lg:mx-0">
            {show3D && (
              <Suspense fallback={null}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: easeSignature }}
                  className="absolute inset-0"
                >
                  <NodeField3D className="!absolute inset-0" />
                </motion.div>
              </Suspense>
            )}
            <div className="absolute inset-0">
              <NodeField />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* meta strip along the bottom edge */}
      <div className="container-page mt-auto pt-16">
        <hr className="hairline" aria-hidden="true" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <p className="label-mono text-[var(--color-fg-subtle)]">
            {profile.disciplines.join("  /  ")}
          </p>
          <p className="label-mono text-[var(--color-fg-subtle)]">{profile.location}</p>
          <p className="label-mono flex items-center gap-2 text-[var(--color-fg-subtle)]">
            Scroll
            <ArrowDown
              size={13}
              className={prefersReducedMotion ? "" : "animate-bounce"}
              aria-hidden="true"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
