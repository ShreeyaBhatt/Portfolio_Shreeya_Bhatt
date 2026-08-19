import { motion } from "motion/react";
import { ProjectCard } from "./ProjectCard.jsx";
import { staggerContainer } from "../../lib/motion.js";

/** Asymmetric bento grid: WealthNest gets the large featured tile, the rest fill in around it. */
const spanBySlug = {
  wealthnest: "md:col-span-4 md:row-span-2",
  spendwise: "md:col-span-2",
  careerise: "md:col-span-2",
  smartcart: "md:col-span-3",
  "payroll-management-system": "md:col-span-3",
};

export function ProjectGrid({ projects }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[minmax(220px,auto)]"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          spanClassName={spanBySlug[project.slug] ?? "md:col-span-3"}
        />
      ))}
    </motion.div>
  );
}
