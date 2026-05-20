import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import profileImage from '../../imports/image.png';

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <img
              src={profileImage}
              alt="Shreeya Bhatt"
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-blue-500/20"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl md:text-7xl mb-4"
          >
            Shreeya Bhatt
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 mb-6"
          >
            Full Stack Developer focused on{' '}
            <span className="text-blue-400">data-driven systems</span> and{' '}
            <span className="text-cyan-400">backend engineering</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto mb-8"
          >
            Building scalable systems with clean architecture. Passionate about performance optimization,
            database design, and creating robust APIs that power real-world applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <a
              href="https://github.com/ShreeyaBhatt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/shreeya-bhatt-4a5715363"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:shreeyasbhatt@gmail.com"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Mail size={24} />
            </a>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={() => scrollToSection('#philosophy')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors animate-bounce"
          >
            <span>Explore my work</span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
