import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ExternalLink, Calendar, X, ArrowRight, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { SectionHeader } from './shared';

const ProjectCard = ({ project, index, onOpen }: { project: any; index: number; onOpen: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative h-[400px] md:h-[430px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute -inset-6 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.22),transparent_65%)]" />
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }}
        className="chip-surface w-full h-full rounded-[2rem] overflow-hidden relative cursor-pointer z-10"
      >
        <div className="absolute inset-0">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/82 to-[#090909]/28" />
          <motion.div
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>

        <div className="relative z-20 flex h-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-neon-orange/80">{project.department}</div>
              <h4 className="max-w-[15ch] text-2xl md:text-3xl font-black tracking-tighter leading-[0.95] text-white transition-colors group-hover:text-neon-orange">
                {project.name}
              </h4>
            </div>
            <div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm">
              {project.status}
            </div>
          </div>

          <div>
            <p className="max-w-md text-sm md:text-base leading-relaxed text-white/68 font-medium mb-6">
              {project.description}
            </p>
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-white/45">{project.date}</span>
              <div className="flex items-center gap-2 rounded-full bg-neon-orange px-4 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(255,87,34,0.24)]">
                View Details <ExternalLink size={14} />
              </div>
            </div>
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
                      className="flex items-center gap-3 bg-gradient-to-r from-neon-orange to-[#8f4a1c] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest"
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
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const carouselProjects = useMemo(() => [...PROJECTS, ...PROJECTS], []);

  return (
    <section id="projects" className="chip-section relative py-32 bg-[#050505]">
      <div className="w-full px-4 md:px-8 xl:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12">
          <SectionHeader subtitle="Portfolio" title="Silicon Masterpieces." number="04" />
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <div className="text-2xl font-black text-white">10+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Active Projects</div>
            </div>
          </motion.div>
        </div>

        <div
          className="chip-surface overflow-hidden rounded-[2rem] p-3 md:p-4"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          <motion.div
            className="flex w-max gap-5 md:gap-6"
            animate={
              prefersReducedMotion || selectedProject || isCarouselPaused
                ? { x: 0 }
                : { x: ['0%', '-50%'] }
            }
            transition={
              prefersReducedMotion || selectedProject || isCarouselPaused
                ? { duration: 0 }
                : {
                    duration: 42,
                    ease: 'linear',
                    repeat: Infinity,
                  }
            }
          >
            {carouselProjects.map((project, idx) => (
              <div
                key={`${project.name}-${idx}`}
                className="w-[280px] sm:w-[310px] md:w-[340px] lg:w-[360px] shrink-0"
              >
                <ProjectCard project={project} index={idx} onOpen={() => setSelectedProject(project)} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 xl:px-10 mt-6">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          <span>Auto Carousel</span>
          <span>Open Any Card For Details</span>
        </div>
      </div>
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
