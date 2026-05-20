import { motion } from 'motion/react';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { useInView } from './useInView';

export function Contact() {
  const { ref, isInView } = useInView();

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shreeyasbhatt@gmail.com',
      href: 'mailto:shreeyasbhatt@gmail.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/ShreeyaBhatt',
      href: 'https://github.com/ShreeyaBhatt',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/shreeya-bhatt',
      href: 'https://www.linkedin.com/in/shreeya-bhatt-4a5715363',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Open to Remote',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Let's Connect</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            I'm actively seeking opportunities to contribute to impactful projects. Let's build something great together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {contactLinks.map((contact, index) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {contact.href ? (
                <a
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/60 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <contact.icon className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{contact.label}</p>
                    <p className="text-slate-100">{contact.value}</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <contact.icon className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{contact.label}</p>
                    <p className="text-slate-100">{contact.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl mb-3 text-blue-300">Open to Opportunities</h3>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            I'm currently looking for full-time roles where I can apply my backend engineering skills,
            contribute to scalable systems, and continue growing as an engineer. If you're building
            something exciting, I'd love to hear from you.
          </p>
          <a
            href="mailto:shreeyasbhatt@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <Mail size={20} />
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
