import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';
import { useInView } from './useInView';

export function Certifications() {
  const { ref, isInView } = useInView();

  const certifications = [
    {
      title: 'Data Analysis with Pandas and Python',
      issuer: 'Udemy',
      skills: 'Pandas, Python, Data Cleaning, Data Analysis',
      link: 'https://www.udemy.com/certificate/UC-fc56136e-dd36-4124-b0a9-de6d33b21544/',
    },
    {
      title: 'Git & GitHub – The Practical Guide',
      issuer: 'Udemy',
      skills: 'Git, GitHub, Version Control, Branching',
      link: 'https://www.udemy.com/certificate/UC-d6033849-c5ca-4294-8f96-a29f0c522c64/',
    },
    {
      title: 'The Complete Python Bootcamp From Zero to Hero in Python',
      issuer: 'Udemy',
      skills: 'Python, OOP, File Handling, Problem Solving',
      link: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-862cc4d4-8928-445f-8c4f-1331a4298f67.pdf',
    },
    {
      title: 'Introduction to HTML, CSS, & JavaScript',
      issuer: 'IBM',
      skills: 'HTML, CSS, JavaScript, Web Basics',
      link: 'https://www.coursera.org/account/accomplishments/verify/GEMBD6Y8KW5L',
    },
    {
      title: 'Inheritance and Data Structures in Java',
      issuer: 'IBM',
      skills: 'Java, Inheritance, Data Structures, OOP',
      link: 'https://www.coursera.org/account/accomplishments/verify/VBEPYCMM0JZC',
    },
    {
      title: 'Oracle Java Foundations',
      issuer: 'Oracle',
      skills: 'Java, OOP, Exception Handling, Core APIs',
      link: 'https://www.coursera.org/account/accomplishments/verify/W9ITK42CONM0',
    },
  ];

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Certifications</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Professional credentials and continuous education
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Award className="text-blue-400" size={20} />
                </div>
                <ExternalLink className="text-slate-500 group-hover:text-blue-400 transition-colors" size={16} />
              </div>
              <h3 className="text-base mb-2 text-slate-100 leading-tight">{cert.title}</h3>
              <p className="text-sm text-blue-300 mb-3">{cert.issuer}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{cert.skills}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
