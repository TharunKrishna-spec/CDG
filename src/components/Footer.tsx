import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Globe, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    const el = footerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const holoGradient = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,87,34,0.06), rgba(224,64,251,0.04), rgba(0,229,255,0.04), transparent 70%)`
  );

  return (
    <footer id="footer" ref={footerRef} className="chip-section bg-black border-t border-white/5 pt-12 pb-8 md:pt-20 md:pb-10 relative overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: holoGradient }} />

      <div className="w-full px-4 md:px-8 xl:px-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-black/40 flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.1)]"
              >
                <img src="/cdg-logo.jpeg" alt="CDG logo" className="h-full w-full object-cover" />
              </motion.div>
              <span className="font-black text-xl tracking-tight">Circuit Designers Guild</span>
            </div>
            <p className="text-gray-500 max-w-sm text-base leading-relaxed font-medium">
              The premier VLSI and hardware design club at VIT Chennai. Building the next generation of silicon engineers.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-6 italic">Navigation</h5>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Departments</a></li>
              <li><a href="#board" className="hover:text-white transition-colors">Board Members</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#recruitment" className="hover:text-white transition-colors">Recruitment</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-6 italic">Connect</h5>
            <div className="flex gap-4">
              {[Linkedin, Github, Mail].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -8, scale: 1.1, boxShadow: '0 10px 30px rgba(255,87,34,0.2)' }}
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition-all border border-white/10"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-600 font-bold tracking-widest uppercase">
            Copyright 2026 Circuit Designers Guild. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600 font-black tracking-[0.3em] uppercase">VIT Chennai</div>
            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <Globe size={14} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
