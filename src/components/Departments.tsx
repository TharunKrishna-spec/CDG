import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Cpu, ShieldCheck, Layers, Settings, ArrowRight, X } from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { SectionHeader } from './shared';

const HexColorMap: Record<string, string> = {
  'text-neon-orange': '#FF5722',
  'text-copper-soft': '#d89a52',
  'text-white': '#FFFFFF',
};

const DeptIcon3D = ({ iconName, colorClass, isHovered, className = "w-28 h-28" }: {
  iconName: string; colorClass: string; isHovered: boolean; className?: string;
}) => {
  const getIconComp = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'ShieldCheck': return ShieldCheck;
      case 'Layers': return Layers;
      case 'Settings': return Settings;
      default: return Cpu;
    }
  };
  const Icon = getIconComp(iconName);
  const colorHex = HexColorMap[colorClass] || '#ffffff';
  
  return (
    <motion.div className={`relative ${className} [perspective:1000px]`}>
      <motion.div 
        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
        animate={{ rotateX: isHovered ? 15 : 0, rotateY: isHovered ? 15 : 0, scale: isHovered ? 1.1 : 1, z: isHovered ? 50 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-2 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/5 [transform:translateZ(-10px)]"
          style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)' }} />
        <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl transition-opacity duration-300"
          style={{ backgroundColor: colorHex, opacity: isHovered ? 0.4 : 0.2, transform: 'translateZ(-5px)' }} />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] [transform:translateZ(0px)] overflow-hidden">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 [transform:translateZ(30px)]">
          <Icon size={48} color={colorHex} className="transition-all duration-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            style={{ filter: isHovered ? `drop-shadow(0 0 15px ${colorHex})` : '' }} />
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-md [transform:translateZ(35px)] opacity-60"></div>
      </motion.div>
    </motion.div>
  );
};

export const Departments = () => {
  const [activeDept, setActiveDept] = useState<any | null>(null);
  const [hoveredDeptId, setHoveredDeptId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const orbitRadius = 260;

  return (
    <section ref={sectionRef} id="departments" className="chip-section bg-[#050505] min-h-screen flex flex-col justify-center overflow-hidden relative py-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div style={{ y: bgY1 }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-orange/5 rounded-full blur-[100px]" />
        <motion.div style={{ y: bgY2 }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8f4a1c]/8 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-4 md:px-8 xl:px-10 relative z-10 mb-20">
        <SectionHeader subtitle="Our Ecosystem" title="Specialised Departments." number="02" />
      </div>

      {isMobile ? (
        <div className="flex overflow-x-auto gap-6 p-6 pb-12 snap-x snap-mandatory z-20 mt-4 no-scrollbar scroll-smooth">
          {DEPARTMENTS.map((dept, idx) => (
            <div key={idx} onClick={() => setActiveDept(dept)}
              className="chip-surface relative min-w-[280px] w-[280px] snap-center p-8 rounded-[2rem] flex flex-col items-center text-center backdrop-blur-sm active:scale-95 transition-transform flex-shrink-0 group shadow-lg cursor-pointer"
            >
              <div className="mb-6 w-24 h-24 flex items-center justify-center">
                <DeptIcon3D iconName={dept.icon} colorClass={idx % 2 === 0 ? 'text-copper-soft' : 'text-neon-orange'} isHovered={true} className="w-full h-full" />
              </div>
              <h4 className="text-2xl font-black mb-3 text-white">{dept.name}</h4>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 h-[60px] overflow-hidden font-medium">{dept.description}</p>
              <button className="mt-8 px-6 py-2 bg-white/10 rounded-full text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-all">
                View Details <ArrowRight size={12} />
              </button>
            </div>
          ))}
          <div className="min-w-[20px] flex-shrink-0"></div>
        </div>
      ) : (
        <div className="relative h-[800px] w-full flex items-center justify-center -mt-24">
          {/* Center Hub */}
          <div className="absolute z-20 w-56 h-56 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute inset-0 rounded-full border border-white/5 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="z-10 relative w-full h-full flex items-center justify-center rounded-full overflow-hidden bg-black">
              <div className="flex flex-col items-center justify-center text-white w-full h-full relative">
                <div className="w-20 h-20 bg-white rounded-2xl rotate-45 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <div className="-rotate-45 text-black font-black text-3xl tracking-tighter">C</div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">CDG Group</span>
              </div>
            </div>
          </div>

          {/* Orbital Rings */}
          <div className="absolute w-[700px] h-[700px] rounded-full border border-white/5 border-dashed animate-spin-reverse-slow opacity-60 pointer-events-none"></div>
          <div className="absolute w-[520px] h-[520px] rounded-full border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] pointer-events-none"></div>

          {/* Orbiting Items */}
          <div className="absolute w-[520px] h-[520px] rounded-full animate-orbit-spin"
            style={{ animationPlayState: hoveredDeptId !== null || activeDept ? 'paused' : 'running' }}
          >
            {DEPARTMENTS.map((dept, index) => {
              const angle = (index / DEPARTMENTS.length) * 360;
              return (
                <div key={index} className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16"
                  style={{ transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)` }}
                >
                  <div className="w-full h-full flex items-center justify-center animate-spin-reverse-slow"
                    style={{ animation: `orbit-spin-reverse 40s linear infinite`, animationPlayState: hoveredDeptId !== null || activeDept ? 'paused' : 'running' }}
                  >
                    <button
                      onMouseEnter={() => setHoveredDeptId(index)}
                      onMouseLeave={() => setHoveredDeptId(null)}
                      onClick={() => setActiveDept(dept)}
                      className="relative z-30 group outline-none"
                    >
                      <DeptIcon3D iconName={dept.icon} colorClass={index % 2 === 0 ? 'text-copper-soft' : 'text-neon-orange'} isHovered={hoveredDeptId === index} />
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em] transition-opacity duration-300 ${hoveredDeptId === index ? 'opacity-100' : 'opacity-40'}`}>
                        {dept.name}
                      </div>
                      <div className={`absolute top-full mt-10 w-64 p-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl text-center shadow-2xl transition-all duration-300 pointer-events-none z-50 left-1/2 -translate-x-1/2 ${hoveredDeptId === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-t border-l border-white/10 rotate-45"></div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">{dept.description}</p>
                        <div className="pt-4 border-t border-white/5 flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest gap-2">
                          View Details <ArrowRight size={10} />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {activeDept && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl"
            onClick={() => setActiveDept(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="chip-surface relative w-full max-w-4xl bg-black rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActiveDept(null)} className="absolute top-6 right-6 z-50 p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <X size={24} />
              </button>
              <div className="w-full md:w-2/5 bg-gradient-to-br from-white/5 to-transparent p-12 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                <div className="absolute inset-0 opacity-10 bg-neon-orange blur-[100px]"></div>
                <div className="relative z-10 text-center">
                  <DeptIcon3D iconName={activeDept.icon} colorClass="text-white" isHovered={true} className="w-48 h-48 mx-auto" />
                  <h2 className="text-4xl font-black text-white mt-8 tracking-tighter">{activeDept.name}</h2>
                </div>
              </div>
              <div className="w-full md:w-3/5 p-12 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="mb-10">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                    Mission <span className="h-[1px] flex-1 bg-white/10"></span>
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-medium">{activeDept.description}</p>
                </div>
                <div className="mb-10">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                    Key Focus Areas <span className="h-[1px] flex-1 bg-white/10"></span>
                  </h3>
                  <ul className="space-y-4">
                    {['Collaborate on high-impact engineering projects.', 'Gain hands-on experience with industry-standard tools.', 'Mentorship from experienced department leads.'].map((role, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-400 group">
                        <span className="mt-2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors flex-shrink-0"></span>
                        <span className="font-medium">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setActiveDept(null)}
                  className="w-full py-5 bg-gradient-to-r from-neon-orange to-[#8f4a1c] text-white font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3"
                >
                  Join Department <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
