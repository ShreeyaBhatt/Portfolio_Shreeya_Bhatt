import { AnimatePresence } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { Footer } from "./Footer.jsx";
import { Spine } from "./Spine.jsx";
import { PageTransition } from "./PageTransition.jsx";
import { ScrollProgress } from "./ScrollProgress.jsx";
import { ScrollToHash } from "./ScrollToHash.jsx";
import { SpaceBackground } from "../space/SpaceBackground.jsx";
import { WarpTransition } from "../space/WarpTransition.jsx";
import { Grain } from "../common/Grain.jsx";
import { Spotlight } from "../common/Spotlight.jsx";
import { BackToTop } from "../common/BackToTop.jsx";
import { CommandPalette } from "../common/CommandPalette.jsx";
import { CustomCursor } from "../common/CustomCursor.jsx";

export function Layout() {
  const location = useLocation();

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
      <BackToTop />
      <CommandPalette />
      <CustomCursor />
      <WarpTransition />
      <Grain />
    </div>
  );
}
