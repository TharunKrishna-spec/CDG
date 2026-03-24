import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Departments', href: '#departments' },
    { name: 'Board', href: '#board' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="w-full px-4 md:px-8 xl:px-10">
        <div className={`relative flex justify-between items-center px-8 py-4 rounded-[1.75rem] transition-all duration-500 border ${isScrolled ? 'chip-surface bg-black/55 backdrop-blur-2xl border-[#e18233]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'}`}>
          <motion.div 
            className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent opacity-50"
            style={{ scaleX, transformOrigin: 'left' }}
          />

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <span className="text-black font-black text-xl tracking-tighter relative z-10">C</span>
              <div className="absolute inset-0 bg-neon-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter leading-none">CDG</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 leading-none mt-1">Circuit Development Guild</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-neon-orange transition-all group-hover:w-1 group-hover:h-1"></span>
              </motion.a>
            ))}
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-neon-orange to-[#8f4a1c] text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_10px_20px_rgba(255,87,34,0.16)]"
            >
              Join Club
            </motion.button>
          </div>

          <button 
            className="md:hidden w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:hidden flex flex-col gap-8 shadow-2xl overflow-hidden z-50"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 italic">Navigation Menu</div>
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-4xl font-black tracking-tighter text-gray-400 hover:text-neon-orange transition-colors flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </motion.a>
            ))}
            <button 
              onClick={() => {
                document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="bg-gradient-to-r from-neon-orange to-[#8f4a1c] text-white px-5 py-6 rounded-[2rem] text-center font-black text-xl uppercase tracking-widest mt-4"
            >
              Join CDG
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
