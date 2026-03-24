import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { BOARD } from '../constants';
import { SectionHeader } from './shared';

export const Board = () => {
  return (
    <section id="board" className="py-32 bg-black relative overflow-hidden">
      {/* Spotlight background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-orange/[0.02] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="Board & Leads" title="The Visionaries." number="03" />

        {BOARD.map((category, catIdx) => (
          <div key={catIdx} className="mb-32 last:mb-0">
            <motion.h4 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.5em] text-white/20 mb-16 text-center flex items-center justify-center gap-8"
            >
              <span className="h-px w-24 bg-white/10"></span>
              {category.category}
              <span className="h-px w-24 bg-white/10"></span>
            </motion.h4>
            <div className="flex flex-wrap justify-center gap-12">
              {category.members.map((member, memIdx) => (
                <motion.div 
                  key={memIdx} 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: memIdx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="text-center group cursor-default"
                >
                  <div className="relative w-40 h-40 mx-auto mb-8">
                    {/* Spotlight ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-neon-orange/30 transition-all duration-500 scale-110 group-hover:scale-100" />
                    <div className="absolute inset-0 rounded-full bg-neon-orange/0 group-hover:bg-neon-orange/5 transition-all duration-500 blur-xl" />
                    <div className="w-full h-full bg-white/5 rounded-full border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/30 transition-all duration-500 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-neon-orange/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Users size={64} className="text-white/10 group-hover:text-white/40 transition-all duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  <h5 className="text-xl font-black tracking-tight mb-1 group-hover:text-neon-orange transition-colors">{member.name}</h5>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{member.role}</p>
                  {member.department && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 font-black">{member.department}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
