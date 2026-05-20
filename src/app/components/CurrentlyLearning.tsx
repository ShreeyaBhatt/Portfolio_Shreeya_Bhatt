import { motion } from 'motion/react';
import { BookOpen, Brain, Rocket, TrendingUp } from 'lucide-react';
import { useInView } from './useInView';

export function CurrentlyLearning() {
  const { ref, isInView } = useInView();

  const learningPaths = [
    {
      icon: Rocket,
      title: 'Node.js & Deno.js Complete Guide',
      description: 'Master Node.js & Deno.js, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL',
      progress: 65,
      platform: 'Udemy',
      link: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
    },
    {
      icon: Brain,
      title: 'Machine Learning, Deep Learning & AI',
      description: 'Learn to build, train and deploy ML, DL and AI models in Python with practical hands-on projects',
      progress: 45,
      platform: 'Udemy',
      link: 'https://www.udemy.com/course/machinelearning/',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Django Development',
      description: 'Learning Django framework from beginner to advanced level for building scalable web applications',
      progress: 30,
      platform: 'Udemy',
      link: 'https://www.udemy.com/course/advanced-web-developer-course-beginner-to-advanced/',
    },
  ];

  return (
    <section id="learning" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Currently Learning</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Investing in continuous growth and staying ahead of the curve
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {learningPaths.map((path, index) => (
            <motion.a
              key={path.title}
              href={path.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all group block"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                  <path.icon className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2 text-slate-100 leading-tight">{path.title}</h3>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">{path.description}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm text-cyan-400">{path.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${path.progress}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-300">
                  {path.platform}
                </span>
                <span className="text-xs text-cyan-400 group-hover:text-cyan-300">View Course →</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl mb-3 text-cyan-300">Learning Philosophy</h3>
          <p className="text-slate-300 leading-relaxed max-w-3xl mx-auto">
            I dedicate 5-10 hours weekly to structured learning. My approach: deep-dive into fundamentals,
            build hands-on projects, and apply new skills to real-world scenarios. Currently expanding my
            expertise in backend development, API design, and machine learning to build more intelligent
            and scalable applications.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
