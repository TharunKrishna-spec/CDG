import React from 'react';
import { motion } from 'motion/react';
import { Clock, ExternalLink, Terminal } from 'lucide-react';
import { OPEN_ROLES, RECRUITMENT_CONFIG } from '../constants';
import { ScrambleText } from './shared';

export const Recruitment = () => {
  return (
    <section id="recruitment" className="chip-section py-16 px-6 relative overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="chip-surface md:col-span-2 p-8 md:p-10 rounded-[2rem] text-white flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:34px_34px] opacity-45" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-neon-orange/12 rounded-full blur-3xl -mr-24 -mt-24" />
            <div className="absolute bottom-0 left-0 h-28 w-28 border-l border-b border-[#8f4a1c]/25" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-neon-orange" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neon-orange italic">Recruitment</h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 leading-[0.92] text-white">
                <ScrambleText text="Join the Silicon Revolution." />
              </h3>
              <p className="text-base md:text-lg text-white/62 mb-8 leading-relaxed font-medium max-w-xl">
                We're looking for passionate individuals who want to push the boundaries of hardware design. Whether you're a Verilog wizard or a creative coordinator, there's a place for you.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {RECRUITMENT_CONFIG.isOpen ? (
                  <motion.a
                    href={RECRUITMENT_CONFIG.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-gradient-to-r from-neon-orange to-[#8f4a1c] text-white px-8 py-3.5 rounded-[1.25rem] font-black text-sm flex items-center justify-center gap-3 shadow-[0_16px_35px_rgba(255,87,34,0.18)]"
                  >
                    Apply Now <ExternalLink size={18} />
                  </motion.a>
                ) : (
                  <div className="w-full sm:w-auto rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-6 py-3.5 text-center text-sm font-black uppercase tracking-[0.22em] text-white/45">
                    {RECRUITMENT_CONFIG.closedLabel}
                  </div>
                )}
                <div className="flex items-center gap-3 text-white/45 font-bold uppercase tracking-widest text-xs">
                  <Clock size={16} />
                  {RECRUITMENT_CONFIG.isOpen ? 'Applications Open Now' : RECRUITMENT_CONFIG.closedNote}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal-style Roles */}
          <div className="grid grid-cols-1 gap-4">
            {OPEN_ROLES.map((role, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,87,34,0.3)' }}
                className="chip-surface p-5 rounded-[1.5rem] flex flex-col justify-center group bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={14} className="text-neon-orange/70" />
                  <h4 className="text-base font-black tracking-tight text-white/92 group-hover:text-neon-orange transition-colors">{role.title}</h4>
                </div>
                <p className="text-sm text-white/52 leading-relaxed font-medium">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
