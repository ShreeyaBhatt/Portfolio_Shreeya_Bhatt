import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { EngineeringPhilosophy } from './components/EngineeringPhilosophy';
import { CurrentlyLearning } from './components/CurrentlyLearning';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <ParticleBackground />

      <Navigation scrolled={scrolled} />

      <main className="relative z-10">
        <Hero />
        <EngineeringPhilosophy />
        <CurrentlyLearning />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Shreeya Bhatt. Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
