import { AnimatePresence } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import { Footer } from "./Footer.jsx";
import { PageTransition } from "./PageTransition.jsx";
import { ScrollProgress } from "./ScrollProgress.jsx";
import { CustomCursor } from "../common/CustomCursor.jsx";

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
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
