import { motion } from "motion/react";
import { Card } from "../ui/Card.jsx";
import { Tag } from "../ui/Tag.jsx";
import { skillCategories } from "../../data/skills.js";
import { staggerContainer, getRevealVariants } from "../../lib/motion.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { cn } from "../../lib/cn.js";

const spanByCategory = {
  "Web & Frameworks": "md:col-span-3",
  "Tools & Practices": "md:col-span-3",
  Languages: "md:col-span-2",
  "Data & ML": "md:col-span-2",
  Professional: "md:col-span-2",
};

export function SkillsBento() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const cardVariants = getRevealVariants(prefersReducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-6 md:grid-cols-6"
    >
      {skillCategories.map(({ category, skills }) => (
        <motion.div
          key={category}
          variants={cardVariants}
          className={cn(spanByCategory[category] ?? "md:col-span-2")}
        >
          <Card className="h-full p-6">
            <h3 className="font-mono text-sm text-[var(--color-accent)]">{category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Tag key={skill} tone="accent2">
                  {skill}
                </Tag>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
