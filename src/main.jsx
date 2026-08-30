import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/common/ErrorBoundary.jsx";
import "./styles/index.css";

// A note for anyone who opens the console.
if (typeof window !== "undefined") {
  const brand = "color:#5ef2b0;font-weight:700";
  const dim = "color:#9ba1ac";
  // eslint-disable-next-line no-console
  console.log(
    "%cShreeya Bhatt%c\n%cPython · ML · full-stack. Built with React 19, Vite, Tailwind v4, Motion.\nPoke around — source is on GitHub. Hiring? shreeyasbhatt@gmail.com  👋",
    brand,
    "",
    dim
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary scope="app">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
