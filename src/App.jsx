import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import { IntroSequence } from "./components/space/IntroSequence.jsx";
import Home from "./routes/Home.jsx";

// Home ships in the main bundle (it's the entry point); the rest are split
// out so the first load stays lean.
const About = lazy(() => import("./routes/About.jsx"));
const Projects = lazy(() => import("./routes/Projects.jsx"));
const ProjectDetail = lazy(() => import("./routes/ProjectDetail.jsx"));
const Contact = lazy(() => import("./routes/Contact.jsx"));
const NotFound = lazy(() => import("./routes/NotFound.jsx"));

function Deferred({ children }) {
  return (
    <Suspense
      fallback={
        <div className="container-page flex min-h-[60vh] items-center pt-32">
          <span className="coord animate-pulse">Loading channel…</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <IntroSequence />
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Deferred><About /></Deferred>} />
        <Route path="/projects" element={<Deferred><Projects /></Deferred>} />
        <Route path="/projects/:slug" element={<Deferred><ProjectDetail /></Deferred>} />
        {/* Retired routes — keep old links alive. */}
        <Route path="/work" element={<Navigate to="/projects" replace />} />
        <Route path="/journal" element={<Navigate to="/about" replace />} />
        <Route path="/certifications" element={<Navigate to="/about#credentials" replace />} />
        <Route path="/contact" element={<Deferred><Contact /></Deferred>} />
        <Route path="*" element={<Deferred><NotFound /></Deferred>} />
      </Route>
      </Routes>
    </>
  );
}
