import { motion } from 'motion/react';
import { useInView } from './useInView';

export function Skills() {
  const { ref, isInView } = useInView();

  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Java', 'Python', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      category: 'Frameworks & Libraries',
      skills: ['React', 'Node.js', 'Express.js', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'JDBC', 'MySQL', 'PostgreSQL'],
    },
    {
      category: 'Core Concepts / Subjects',
      skills: ['Core Java', 'OOP', 'Data Structures', 'DBMS'],
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'GitHub'],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Technical Skills</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Technologies and tools I work with to build scalable applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl mb-4 text-blue-300">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-200 text-sm hover:bg-slate-600/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
