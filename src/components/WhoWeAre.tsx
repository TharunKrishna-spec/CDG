import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, Globe, Users } from 'lucide-react';
import { STATS } from '../constants';

export const WhoWeAre = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" className="chip-section py-16 px-4 md:py-32 md:px-6 relative overflow-hidden film-grain" ref={sectionRef}>
      {/* Morphing blob background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '40% 60% 70% 30% / 50% 60% 30% 60%',
              '30% 70% 70% 30% / 30% 30% 70% 70%',
            ],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-neon-orange/[0.06] via-[#8f4a1c]/[0.04] to-[#c96f28]/[0.05] blur-[80px]"
        />
      </div>

      <div className="w-full px-4 md:px-8 xl:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Editorial Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="chip-surface md:col-span-7 md:row-span-2 p-6 sm:p-12 md:p-16 rounded-[2rem] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-neon-orange/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-neon-orange/10 pointer-events-none" />
            <div>
              <div className="trace-label text-neon-orange mb-10 flex items-center gap-3">
                <div className="w-8 h-px bg-neon-orange" />
                01 / Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8">
                The Core of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-amber-400">Innovation</span>
              </h2>
              <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg font-medium">
                Circuit Designers Guild (CDG) is a premier student-led technical club at VIT Chennai, dedicated to the intricate world of VLSI and hardware design.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-orange to-neon-red flex items-center justify-center shadow-[0_0_20px_rgba(255,87,34,0.3)]">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <span className="text-sm font-black uppercase tracking-widest">Est. 2024</span>
                <div className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">VIT Chennai Campus</div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="chip-surface md:col-span-5 p-10 rounded-[2rem] bg-gradient-to-br from-[#9f4f1e] via-[#c96f28] to-[#82401a] text-white relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="grid grid-cols-2 gap-4 md:gap-8 relative z-10">
              {STATS.map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-2xl md:text-4xl font-black mb-1 group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="chip-surface md:col-span-3 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-neon-orange/20 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Globe className="text-neon-orange mb-4 relative z-10 group-hover:scale-110 transition-transform" size={36} />
            <h3 className="text-base font-black uppercase tracking-widest mb-2 relative z-10">Global Vision</h3>
            <p className="text-xs text-white/40 relative z-10 leading-relaxed">Preparing students for the global semiconductor industry.</p>
          </motion.div>

          {/* Community */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="chip-surface md:col-span-2 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-white/20 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Users className="text-[#d89a52] mb-4 relative z-10 group-hover:scale-110 transition-transform" size={36} />
            <h3 className="text-base font-black uppercase tracking-widest mb-2 relative z-10">50+ Members</h3>
            <p className="text-xs text-white/40 relative z-10 leading-relaxed">A vibrant community of hardware enthusiasts.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
