import { Link } from "react-router-dom";
import { Section } from "../components/ui/Section.jsx";
import { Button } from "../components/ui/Button.jsx";
import { RevealLines } from "../components/common/RevealLines.jsx";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col justify-center">
      <p className="label-mono text-[var(--color-fg-subtle)]">Error 404</p>

      <RevealLines
        as="h1"
        animateOnMount
        className="mt-8 text-hero font-display font-medium"
        lines={[
          "This page",
          <span key="l2">
            doesn't <span className="accent-italic text-[var(--color-accent)]">exist</span>
          </span>,
        ]}
      />

      <p className="container-prose mt-10 text-lead text-[var(--color-fg-muted)]">
        The link may be out of date, or the address slightly off. Everything else is still where
        you left it.
      </p>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button as={Link} to="/" variant="primary">
          Back to home
        </Button>
        <Button as={Link} to="/projects" variant="secondary">
          View work
        </Button>
      </div>
    </Section>
  );
}
