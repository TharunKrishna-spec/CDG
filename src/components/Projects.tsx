import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ExternalLink, Calendar, X, ArrowRight, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionHeader } from './shared';

const ProjectCard = ({ project, index, onOpen }: { project: any; index: number; onOpen: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowBackground = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,87,34,0.25), transparent 40%)`
  );
  const rotateX = useTransform(springY, [0, 450], [5, -5]);
  const rotateY = useTransform(springX, [0, 400], [-5, 5]);

  return (
    <motion.div 
      className="relative h-[450px] [perspective:1500px] group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onMouseMove={handleMouseMove}
      onClick={onOpen}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div className="absolute -inset-8 rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none z-0"
        style={{ background: glowBackground }} />
      <motion.div
        style={{ rotateX: isFlipped ? 0 : rotateX, rotateY: isFlipped ? 180 : rotateY }}
        animate={{ scale: isFlipped ? 1.02 : 1, z: isFlipped ? 50 : 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }}
        className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer z-10"
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[3rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm group-hover:border-white/20 transition-colors">
          <div className="absolute inset-0">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <motion.div initial={{ x: '-100%' }} animate={isFlipped ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-orange mb-4">{project.department}</div>
            <h4 className="text-3xl font-black mb-4 tracking-tighter leading-none group-hover:text-neon-orange transition-colors">{project.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/40">{project.date}</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{project.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[3rem] overflow-hidden border border-neon-orange/30 bg-black p-10 flex flex-col justify-between">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-orange/20 via-transparent to-transparent" />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 italic">Project Brief</div>
            <h4 className="text-2xl font-black mb-6 tracking-tight text-neon-orange">{project.name}</h4>
            <p className="text-gray-400 leading-relaxed font-medium">{project.description}</p>
          </div>
          <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/5">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/10 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${project.name}${i}`} alt="member" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-neon-orange flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,87,34,0.3)]"
            >
              <ExternalLink size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectModal = ({ project, isOpen, onClose }: { project: any | null; isOpen: boolean; onClose: () => void }) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
          >
            <button onClick={onClose}
              className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <X size={24} />
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex-1 p-10 md:p-16 overflow-y-auto">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-neon-orange mb-6">{project.department}</div>
                <h2 className="text-4xl font-black mb-8 tracking-tighter leading-none">{project.name}</h2>
                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-white/40" /><span className="text-sm font-bold text-white/60">{project.date}</span></div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-orange animate-pulse" /><span className="text-sm font-bold text-white/60 uppercase tracking-widest">{project.status}</span></div>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium">{project.longDescription || project.description}</p>
                <div className="flex flex-wrap gap-4 mb-12">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest"
                    >
                      <Github size={20} /> Repository
                    </motion.a>
                  )}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <motion.a href={project.demoUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 border border-white/10 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
                    >
                      <ExternalLink size={20} /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
              {project.techSpecs && (
                <div className="p-10 bg-white/[0.02] border-t border-white/10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Technical Specs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Architecture</div>
                      <div className="text-sm font-bold text-white tracking-tight">{project.techSpecs.architecture}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Tools</div>
                      <div className="flex flex-wrap gap-2">
                        {project.techSpecs.tools.map((tool: string) => (
                          <span key={tool} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-white/60">{tool}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Performance</div>
                      <div className="text-sm font-bold text-white tracking-tight">{project.techSpecs.performance}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <SectionHeader subtitle="Portfolio" title="Silicon Masterpieces." number="04" />
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-black text-white">10+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Active Projects</div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div style={{ x }} className="flex gap-10 px-6">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="min-w-[400px] md:min-w-[500px]">
              <ProjectCard project={project} index={idx} onOpen={() => setSelectedProject(project)} />
            </div>
          ))}
        </motion.div>
      </div>
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
