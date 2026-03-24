import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ExternalLink, Clock, ArrowRight, Terminal } from 'lucide-react';
import { OPEN_ROLES } from '../constants';
import { ScrambleText } from './shared';

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className="font-mono">
      {displayed}
      {displayed.length < text.length && <span className="typewriter-cursor">_</span>}
    </span>
  );
};

export const Recruitment = () => {
  return (
    <section id="recruitment" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:col-span-2 p-12 md:p-20 rounded-[4rem] bg-white text-black flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-black" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40 italic">Recruitment</h2>
              </div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[0.9]">
                <ScrambleText text="Join the Silicon Revolution." />
              </h3>
              <p className="text-xl text-black/60 mb-16 leading-relaxed font-medium max-w-xl">
                We're looking for passionate individuals who want to push the boundaries of hardware design. Whether you're a Verilog wizard or a creative coordinator, there's a place for you.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <motion.a 
                  href="https://forms.gle/placeholder" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-black text-white px-12 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl"
                >
                  Apply Now <ExternalLink size={22} />
                </motion.a>
                <div className="flex items-center gap-3 text-black/40 font-bold uppercase tracking-widest text-xs">
                  <Clock size={16} />
                  Applications close April 5th
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal-style Roles */}
          <div className="grid grid-cols-1 gap-6">
            {/* Terminal header card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-6 bg-[#0a0a0a] border border-neon-orange/20 rounded-[2.5rem] relative overflow-hidden"
            >
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-[9px] font-mono text-white/20 ml-2">cdg@recruit ~ $</span>
              </div>
              <div className="font-mono text-[11px] text-neon-orange/70 space-y-1">
                <div className="text-white/30">$ search --roles --open</div>
                <div className="mt-2 text-green-400/60">{`> Found ${OPEN_ROLES.length} open positions`}</div>
              </div>
            </motion.div>

            {OPEN_ROLES.map((role, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,87,34,0.3)' }}
                className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] flex flex-col justify-center group hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={14} className="text-neon-orange/50" />
                  <h4 className="text-xl font-black tracking-tight text-white group-hover:text-neon-orange transition-colors">{role.title}</h4>
                </div>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
