import { Download } from "lucide-react";
import { Button } from "../ui/Button.jsx";
import { profile } from "../../data/profile.js";

/**
 * TODO: place resume.pdf in /public before launch — this always renders;
 * a missing file just 404s on click, which is self-explanatory to a visitor.
 */
export function ResumeButton({ variant = "primary", className }) {
  return (
    <Button as="a" href={profile.resumePath} download variant={variant} className={className}>
      <Download size={16} /> Download Resume
    </Button>
  );
}
