import { Link } from "react-router-dom";
import { Section } from "../components/ui/Section.jsx";
import { Button } from "../components/ui/Button.jsx";
import { PageEyebrow } from "../components/common/PageEyebrow.jsx";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <PageEyebrow>// 404</PageEyebrow>
      <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">Lost signal</h1>
      <p className="mt-4 max-w-md text-[var(--color-fg-muted)]">
        This coordinate doesn't exist in this galaxy. Let's chart a course back home.
      </p>
      <Button as={Link} to="/" variant="primary" className="mt-8">
        Return to base
      </Button>
    </Section>
  );
}
