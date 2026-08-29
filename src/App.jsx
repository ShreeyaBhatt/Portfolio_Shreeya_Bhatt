import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import Projects from "./routes/Projects.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import Contact from "./routes/Contact.jsx";
import NotFound from "./routes/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        {/* Retired routes — keep old links alive. */}
        <Route path="/work" element={<Navigate to="/projects" replace />} />
        <Route path="/journal" element={<Navigate to="/about" replace />} />
        <Route path="/certifications" element={<Navigate to="/about#credentials" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
