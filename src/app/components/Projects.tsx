import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from './useInView';

export function Projects() {
  const { ref, isInView } = useInView();

  const projects = [
    {
      title: 'Expense Tracker System (Python)',
      description:
        'A command-line expense tracking application built with Python. Allows users to add, view, categorize, and summarize expenses with data stored using file handling. Includes expense visualization and analysis using Pandas and Matplotlib.',
      techStack: ['Python', 'Pandas', 'Matplotlib', 'File Handling'],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Expense Tracker System (Full Stack)',
      description:
        'A full stack expense tracker built using HTML, CSS, and JavaScript. Features a clean and responsive UI for adding, categorizing, and deleting expenses with localStorage-based data persistence.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'CareeRise: Job Portal System',
      description:
        'A comprehensive job portal system developed using Java, JDBC, and Data Structures. Supports job posting, applicant management, search and filter functionality, and role-based access for recruiters and job seekers.',
      techStack: ['Java', 'JDBC', 'Data Structures', 'OOP'],
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'Payroll Management System',
      description:
        'A CLI-based payroll management system built with Core Java. Handles employee records, salary calculations, tax deductions, and payslip generation through an interactive command-line interface.',
      techStack: ['Core Java', 'OOP', 'CLI', 'File Handling'],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'SmartCart: Supermarket System',
      description:
        'A supermarket management system developed in Core Java. Features product inventory management, billing, discount handling, cart operations, and stock management using object-oriented programming principles.',
      techStack: ['Core Java', 'OOP', 'Data Structures', 'CLI'],
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Real-world applications showcasing full-stack development and system design
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all group"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

              <div className="p-6">
                <h3 className="text-xl md:text-2xl text-slate-100 mb-3">{project.title}</h3>

                <p className="text-slate-300 mb-6 leading-relaxed text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/ShreeyaBhatt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-blue-500 transition-all text-slate-100"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
