import { lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { Footer } from "./Footer.jsx";
import { Spine } from "./Spine.jsx";
import { PageTransition } from "./PageTransition.jsx";
import { ScrollProgress } from "./ScrollProgress.jsx";
import { ScrollToHash } from "./ScrollToHash.jsx";
import { SpaceBackground } from "../space/SpaceBackground.jsx";
import { Grain } from "../common/Grain.jsx";
import { Spotlight } from "../common/Spotlight.jsx";
import { CustomCursor } from "../common/CustomCursor.jsx";
import { useIdleMount } from "../../hooks/useIdleMount.js";

// Non-critical chrome — loaded and mounted only once the browser is idle, so
// it never competes with first paint / time-to-interactive.
const CommandPalette = lazy(() =>
  import("../common/CommandPalette.jsx").then((m) => ({ default: m.CommandPalette }))
);
const BackToTop = lazy(() =>
  import("../common/BackToTop.jsx").then((m) => ({ default: m.BackToTop }))
);
const PageWipe = lazy(() =>
  import("../space/PageWipe.jsx").then((m) => ({ default: m.PageWipe }))
);

export function Layout() {
  const location = useLocation();
  const idle = useIdleMount();

  return (
    <div className="relative flex min-h-screen flex-col">
      <SpaceBackground />
      <Spotlight />
      <ScrollToHash />
      <ScrollProgress />
      <Nav />
      <Spine key={location.pathname} />
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <CustomCursor />
      <Grain />
      {idle && (
        <Suspense fallback={null}>
          <BackToTop />
          <CommandPalette />
          <PageWipe />
        </Suspense>
      )}
    </div>
  );
}
