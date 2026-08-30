import { Component } from "react";

/**
 * Last line of defence. If anything below it throws during render, we show a
 * readable panel with the actual message instead of a blank white page — which
 * is the only symptom you get otherwise on a phone with no console attached.
 *
 * `scope="app"` is the whole-site guard mounted in main.jsx. Smaller scopes
 * (e.g. the WebGL avatar) pass their own `fallback` so a local failure degrades
 * to a static substitute without taking the page down.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Surfaced in whatever console is available (remote debugging, vConsole…).
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary${this.props.scope ? `:${this.props.scope}` : ""}]`, error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback !== undefined) return this.props.fallback;

    const detail = [error?.message, error?.stack].filter(Boolean).join("\n\n");

    return (
      <div
        role="alert"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem 1.5rem",
          background: "#030712",
          color: "#eef2f8",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#35d6f5" }}>
          System fault
        </p>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>Something crashed on load</h1>
        <p style={{ maxWidth: "34rem", fontSize: "0.85rem", lineHeight: 1.6, color: "#adb7c8" }}>
          Try reloading. If it keeps happening, the detail below is the cause — send it over.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            marginTop: "0.25rem",
            border: "1px solid #35d6f5",
            background: "rgba(53,214,245,0.1)",
            color: "#35d6f5",
            borderRadius: "0.25rem",
            padding: "0.6rem 1.4rem",
            fontFamily: "inherit",
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Reload
        </button>
        {detail && (
          <pre
            style={{
              marginTop: "1.5rem",
              maxWidth: "min(48rem, 92vw)",
              maxHeight: "40vh",
              overflow: "auto",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "0.72rem",
              lineHeight: 1.5,
              color: "#909bae",
              border: "1px solid rgba(150,180,230,0.12)",
              borderRadius: "0.5rem",
              padding: "1rem",
              background: "#070c18",
            }}
          >
            {detail}
          </pre>
        )}
      </div>
    );
  }
}
