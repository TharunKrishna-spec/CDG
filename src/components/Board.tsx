import React from 'react';
import { motion } from 'motion/react';
import { BOARD } from '../constants';
import { SectionHeader } from './shared';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export const Board = () => {
  return (
    <section id="board" className="chip-section py-32 bg-black relative overflow-hidden">
      {/* Spotlight background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-orange/[0.02] blur-[150px] rounded-full" />
      </div>

      <div className="w-full px-4 md:px-8 xl:px-10 relative z-10">
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
                  className="chip-surface w-[260px] rounded-[2rem] p-6 text-center group cursor-default"
                >
                  <div className="relative mb-6">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-[#e18233]/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 group-hover:border-neon-orange/45 group-hover:shadow-[0_0_30px_rgba(255,87,34,0.18)]">
                      <div className="text-4xl font-black tracking-[-0.08em] text-white group-hover:text-neon-orange transition-colors duration-500">
                        {getInitials(member.name)}
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-orange/0 blur-2xl transition-all duration-500 group-hover:bg-neon-orange/8" />
                  </div>
                  <div className="mb-3 trace-label text-neon-orange/70">{category.category}</div>
                  <h5 className="text-xl font-black tracking-tight mb-2 group-hover:text-neon-orange transition-colors">{member.name}</h5>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.22em]">{member.role}</p>
                  {member.department && (
                    <div className="mt-5 flex items-center justify-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-orange" />
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/32 font-black">{member.department}</p>
                    </div>
                  )}
                  {!member.department && (
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
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
