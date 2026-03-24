import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';
import { Chip3D } from './Chip3D';
import { ScrambleText } from './shared';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={containerRef} className="chip-section relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full px-4 md:px-8 xl:px-10 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div>
            <motion.div variants={itemVariants} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full chip-surface text-gray-400 text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-sm"
            >
              <Zap size={14} className="text-neon-orange" />
              VIT Chennai's Premier VLSI Club
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 cursor-default">
              <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
                <ScrambleText text="Circuit" className="block" />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-orange-300 to-amber-400 block">
                  <ScrambleText text="Development Guild." />
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.45 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-neon-orange/8 blur-[72px] rounded-full scale-125" />
            <Chip3D />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
