import { motion } from 'motion/react';
import { Code2, Database, Lightbulb, Target } from 'lucide-react';
import { useInView } from './useInView';

export function EngineeringPhilosophy() {
  const { ref, isInView } = useInView();

  const principles = [
    {
      icon: Code2,
      title: 'Clean Code First',
      description:
        'I believe in writing code that humans read first and machines execute second. Clean architecture and meaningful abstractions reduce cognitive load and enable teams to move faster.',
    },
    {
      icon: Database,
      title: 'Data-Driven Decisions',
      description:
        'Every optimization should be backed by metrics. I profile before optimizing, benchmark before deploying, and measure impact with observable data rather than assumptions.',
    },
    {
      icon: Target,
      title: 'Solve Root Problems',
      description:
        'Quick fixes create technical debt. I invest time upfront to understand the underlying problem, ensuring solutions are robust, scalable, and address the actual need.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description:
        'Technology evolves rapidly. I stay curious, experiment with new tools, and apply lessons learned to improve my craft. Every project is an opportunity to level up.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Engineering Philosophy</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            The principles that guide my approach to building software
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/60 transition-all hover:border-blue-500/50 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <principle.icon className="text-blue-400" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2 text-slate-100">{principle.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{principle.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl mb-4 text-blue-300">My Approach</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            I approach engineering challenges systematically: understand the problem deeply, research existing
            solutions, design with scalability in mind, implement with clean patterns, test thoroughly, and
            iterate based on real-world feedback.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Whether it's optimizing database queries, designing RESTful APIs, or building responsive UIs, I
            focus on creating solutions that are maintainable, performant, and deliver real value to users.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
