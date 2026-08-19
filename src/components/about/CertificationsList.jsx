import { motion } from "motion/react";
import { Award } from "lucide-react";
import { Card } from "../ui/Card.jsx";
import { certifications } from "../../data/certifications.js";
import { staggerContainer, getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

export function CertificationsList() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemVariants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {certifications.map((cert) => (
        <motion.li key={cert.title} variants={itemVariants}>
          <Card tilt={false} className="flex items-start gap-3 p-5">
            <Award size={18} className="mt-0.5 shrink-0 text-[var(--color-accent-2)]" />
            <div>
              <p className="font-medium leading-snug">{cert.title}</p>
              <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          </Card>
        </motion.li>
      ))}
    </motion.ul>
  );
}
