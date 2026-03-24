import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';
import { STATS } from '../constants';
import { Chip3D } from './Chip3D';
import { ScrambleText, RollingNumber } from './shared';

const HUDElement = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className={`bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: textY }}>
            <motion.div variants={itemVariants} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-sm"
            >
              <div className="relative">
                <Zap size={14} className="text-neon-orange" />
                <div className="absolute inset-0 animate-ping"><Zap size={14} className="text-neon-orange/30" /></div>
              </div>
              VIT Chennai's Premier VLSI Club
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 cursor-default">
              <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
                <ScrambleText text="Silicon" className="block" />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-orange-300 to-amber-400 block">
                  <ScrambleText text="Architects." />
                </span>
              </motion.div>
            </h1>
            
            <motion.p variants={itemVariants} transition={{ duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-lg leading-relaxed font-medium"
            >
              We are a community of hardware enthusiasts at VIT Chennai, dedicated to mastering VLSI design, architecture, and verification.
            </motion.p>
            
            <motion.div variants={itemVariants} transition={{ duration: 0.8 }} className="flex flex-wrap gap-5">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,87,34,0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-neon-orange to-neon-red text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(255,87,34,0.2)]"
              >
                Join CDG <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/20 px-10 py-5 rounded-2xl font-black transition-all backdrop-blur-sm"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Projects
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: chipY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-neon-orange/10 blur-[100px] rounded-full scale-150" />
            <Chip3D />
            
            <HUDElement className="absolute -top-6 -right-6 p-5 rounded-[1.5rem]" delay={1.5}>
              <div className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-1">Architecture</div>
              <div className="text-xl font-black text-white tracking-tighter">7nm FinFET</div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[8px] text-green-400/70 font-bold uppercase tracking-wider">Active</span>
              </div>
            </HUDElement>
            <HUDElement className="absolute -bottom-6 -left-6 p-5 rounded-[1.5rem]" delay={1.7}>
              <div className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-1">Coverage</div>
              <div className="text-xl font-black text-neon-orange tracking-tighter">99.8%</div>
              <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '99.8%' }} transition={{ delay: 2.2, duration: 1.5 }} className="h-full bg-neon-orange rounded-full" />
              </div>
            </HUDElement>
            <HUDElement className="absolute top-1/2 -right-16 -translate-y-1/2 p-3 rounded-xl hidden xl:block" delay={2.0}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[8px] text-white/40 font-mono">CLK: 100MHz</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[8px] text-white/40 font-mono">PWR: 0.8V</span>
              </div>
            </HUDElement>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: statsOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 border-t border-white/5 pt-16"
        >
          {STATS.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 + idx * 0.15 }}
              className="text-center md:text-left group"
            >
              <RollingNumber value={stat.value} />
              <div className="text-xs text-gray-500 font-black uppercase tracking-widest mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
