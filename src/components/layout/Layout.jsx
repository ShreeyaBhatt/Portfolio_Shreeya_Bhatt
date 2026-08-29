import { AnimatePresence } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { Footer } from "./Footer.jsx";
import { PageTransition } from "./PageTransition.jsx";
import { ScrollProgress } from "./ScrollProgress.jsx";
import { ScrollToHash } from "./ScrollToHash.jsx";
import { CustomCursor } from "../common/CustomCursor.jsx";
import { LabBackground } from "../common/LabBackground.jsx";
import { LabStatus } from "../common/LabStatus.jsx";
import { CommandPalette } from "../common/CommandPalette.jsx";
import { LabScan } from "../common/LabScan.jsx";
import { LabToaster } from "../common/LabToaster.jsx";
import { EasterEggs } from "../common/EasterEggs.jsx";

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <LabBackground />
      <CustomCursor />
      <ScrollToHash />
      <ScrollProgress />
      <Nav />
      <LabStatus />
      <CommandPalette />
      <LabScan />
      <LabToaster />
      <EasterEggs />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
