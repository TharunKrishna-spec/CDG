import React, { useState, useEffect, useRef, createContext, useContext, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'motion/react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Settings, 
  Users, 
  ChevronRight, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Menu, 
  X, 
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Zap,
  Globe,
  Plus,
  Trash2,
  Edit,
  Search,
  ArrowLeft,
  MapPin,
  Mic,
  Image as ImageIcon
} from 'lucide-react';
import { STATS, DEPARTMENTS, BOARD, PROJECTS, EVENTS, OPEN_ROLES, TECH_STACK } from './constants';
import { Event } from './types';
import { Chip3D } from './components/Chip3D';

const AdminContext = createContext<{
  events: Event[];
  addEvent: (e: Omit<Event, 'id'>) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (e: Event) => void;
  user: any;
  isAdmin: boolean;
}>({
  events: [],
  addEvent: () => {},
  deleteEvent: () => {},
  updateEvent: () => {},
  user: null,
  isAdmin: false,
});

const useAdmin = () => useContext(AdminContext);

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [isAdmin, setIsAdmin] = useState(false);

  // Toggle admin for testing (in a real app, this would be auth-based)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addEvent = (e: Omit<Event, 'id'>) => {
    const newEvent = { ...e, id: Math.random().toString(36).substr(2, 9) };
    setEvents(prev => [newEvent, ...prev]);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateEvent = (e: Event) => {
    setEvents(prev => prev.map(item => item.id === e.id ? e : item));
  };

  return (
    <AdminContext.Provider value={{ events, addEvent, deleteEvent, updateEvent, user: null, isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Cpu,
    ShieldCheck,
    Layers,
    Settings,
    Users,
    Calendar,
    Zap,
    Globe,
    Mic,
    ImageIcon
  };
  return icons[iconName] || Calendar;
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Departments', href: '#departments' },
    { name: 'Board', href: '#board' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex justify-between items-center px-8 py-4 rounded-[2rem] transition-all duration-500 border ${isScrolled ? 'bg-black/40 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'}`}>
          {/* Progress Line inside Nav */}
          <motion.div 
            className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent opacity-50"
            style={{ scaleX, transformOrigin: 'left' }}
          />

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <span className="text-black font-black text-xl tracking-tighter relative z-10">C</span>
              <div className="absolute inset-0 bg-neon-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter leading-none">CDG</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 leading-none mt-1">Silicon Architects</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 mr-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">System Active</span>
            </div>
            
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-neon-orange transition-all group-hover:w-1 group-hover:h-1"></span>
              </motion.a>
            ))}
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-neon-orange hover:text-white transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
            >
              Join Club
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:hidden flex flex-col gap-8 shadow-2xl overflow-hidden z-50"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 italic">Navigation Menu</div>
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-4xl font-black tracking-tighter text-gray-400 hover:text-neon-orange transition-colors flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </motion.a>
            ))}
            <button 
              onClick={() => {
                document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="bg-white text-black px-5 py-6 rounded-[2rem] text-center font-black text-xl uppercase tracking-widest mt-4"
            >
              Join CDG
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <motion.span 
      onMouseEnter={scramble}
      className={className}
    >
      {displayText}
    </motion.span>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-orange rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-neon-orange/50 rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
};

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const background = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,87,34,0.08), transparent 80%)`
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      <motion.div 
        className="absolute inset-0"
        style={{ background }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootLogs = useMemo(() => [
    "INITIALIZING CORE SYSTEMS...",
    "LOADING RTL MODULES...",
    "VERIFYING DESIGN CONSTRAINTS...",
    "MAPPING PHYSICAL LAYOUT...",
    "SYNCHRONIZING CLOCK DOMAINS...",
    "BOOTING SILICON MASTERPIECE...",
  ], []);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let logInterval: NodeJS.Timeout;

    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Randomize increment slightly for a more "realistic" feel
        const inc = Math.random() > 0.8 ? 2 : 1;
        return Math.min(prev + inc, 100);
      });
    }, 40);

    logInterval = setInterval(() => {
      setLogs(prev => {
        if (prev.length >= bootLogs.length) {
          clearInterval(logInterval);
          return prev;
        }
        return [...prev, bootLogs[prev.length]];
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete, bootLogs]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-10 font-mono"
    >
      <div className="w-full max-w-md relative">
        {/* Decorative background elements */}
        <div className="absolute -inset-20 bg-neon-orange/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mb-12 h-48 overflow-hidden text-[10px] text-neon-orange/60 space-y-2 border-l border-neon-orange/20 pl-4">
          {logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={i}
              className="flex items-center gap-2"
            >
              <span className="text-neon-orange/30">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              {`> ${log}`}
            </motion.div>
          ))}
        </div>
        
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-neon-orange shadow-[0_0_15px_rgba(255,87,34,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
          />
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-orange font-black">System Boot</span>
            <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1">Kernel v4.2.0-silicon</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">{progress}%</span>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 10 ? 0.3 : 0 }}
          whileHover={{ opacity: 1 }}
          onClick={onComplete}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/40 hover:text-neon-orange transition-colors py-2 px-4 border border-white/10 rounded-full"
        >
          Skip Initialization
        </motion.button>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div 
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Zap size={14} className="text-neon-orange" />
              VIT Chennai's Premier VLSI Club
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 group cursor-default">
              <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: "easeOut" }}>
                <ScrambleText text="Silicon" className="block" />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: "easeOut" }}>
                <ScrambleText text="Architects." className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 block" />
              </motion.div>
            </h1>
            
            <motion.p variants={itemVariants} transition={{ duration: 0.8, ease: "easeOut" }} className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium">
              We are a community of hardware enthusiasts at VIT Chennai, dedicated to mastering VLSI design, architecture, and verification.
            </motion.p>
            
            <motion.div variants={itemVariants} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-wrap gap-5">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-10 py-5 rounded-2xl font-black flex items-center gap-3 hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
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
            variants={{
              hidden: { opacity: 0, scale: 0.8, rotate: 5 },
              visible: { opacity: 1, scale: 1, rotate: 0 }
            }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-neon-orange/20 blur-[100px] rounded-full" />
            <Chip3D />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -top-10 -right-10 bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] shadow-2xl"
            >
              <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Architecture</div>
              <div className="text-2xl font-black text-white tracking-tighter">7nm FinFET</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
              className="absolute -bottom-10 -left-10 bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] shadow-2xl"
            >
              <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Efficiency</div>
              <div className="text-2xl font-black text-neon-orange tracking-tighter">99.8%</div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 border-t border-white/5 pt-16"
        >
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left group">
              <div className="text-5xl font-black tracking-tighter mb-2 group-hover:text-white transition-colors text-gray-300">{stat.value}</div>
              <div className="text-xs text-gray-500 font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeader = ({ subtitle, title, number }: { subtitle: string, title: string, number?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-24"
    >
      {number && (
        <div className="absolute -top-8 -left-8 text-[8rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
          {number}
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-px bg-neon-orange" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-neon-orange italic">{subtitle}</h2>
      </div>
      
      <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] max-w-2xl text-white">
        <ScrambleText text={title} />
      </h3>
    </motion.div>
  );
};

interface TimelineCardProps {
  event: Event;
  index: number;
  isAdmin: boolean;
  onEdit: (e: Event) => void;
  onDelete: (id: string) => void;
  onRecap: (e: Event) => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, index, isAdmin, onEdit, onDelete, onRecap }) => {
  const isEven = index % 2 === 0;
  const Icon = getIcon(event.icon);

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12`}>
      {/* Dot */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-orange shadow-[0_0_20px_rgba(255,87,34,0.4)] z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
        <Icon size={18} className="text-white" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-neon-orange/50 transition-all duration-500 group-hover:bg-white/[0.05]`}
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-neon-orange font-black text-sm tracking-widest">{event.year}</span>
          {isAdmin && (
            <div className="flex gap-2">
              <button onClick={() => onEdit(event)} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                <Edit size={14} />
              </button>
              <button onClick={() => onDelete(event.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight">{event.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">{event.description}</p>
        
        <button 
          onClick={() => onRecap(event)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 hover:text-neon-orange transition-colors group/btn"
        >
          View Recap <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

const ArchiveView: React.FC<{ events: Event[]; onBack: () => void; onRecap: (e: Event) => void }> = ({ events, onBack, onRecap }) => {
  const [search, setSearch] = useState('');
  
  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.year.includes(search)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-[600px]"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold">
          <ArrowLeft size={20} /> Back to Timeline
        </button>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search events or years..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 w-full md:w-80 focus:outline-none focus:border-neon-orange/50 transition-colors"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <motion.div 
            key={event.id}
            layout
            className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-neon-orange/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl text-neon-orange">
                {React.createElement(getIcon(event.icon), { size: 20 })}
              </div>
              <span className="text-xs font-black text-white/30">{event.year}</span>
            </div>
            <h4 className="text-lg font-black mb-2">{event.title}</h4>
            <p className="text-sm text-gray-500 mb-6 line-clamp-2">{event.description}</p>
            <button 
              onClick={() => onRecap(event)}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-neon-orange hover:text-white transition-all"
            >
              View Recap
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RecapModal: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors">
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-full relative bg-white/5">
            {event.image ? (
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/10">
                {React.createElement(getIcon(event.icon), { size: 120 })}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-neon-orange/20 text-neon-orange text-[10px] font-black uppercase tracking-widest rounded-full">
                {event.year} Event
              </span>
            </div>
            <h2 className="text-4xl font-black mb-6 tracking-tighter">{event.title}</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed font-medium">
              <p>{event.longDescription || event.description}</p>
              <div className="pt-6 border-t border-white/5 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-neon-orange" />
                  <span className="text-xs">{event.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-neon-orange" />
                  <span className="text-xs">Campus Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Intro */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:col-span-2 md:row-span-2 p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-orange mb-8">01 / Who We Are</div>
              <h2 className="text-5xl font-black leading-none tracking-tighter uppercase mb-8">
                The Core of <br /> Innovation
              </h2>
              <p className="text-xl text-white/60 leading-relaxed max-w-md">
                Chip Design Group (CDG) is a premier student-led technical club at VIT Chennai, dedicated to the intricate world of VLSI and hardware design.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neon-orange flex items-center justify-center">
                <Zap size={20} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">Est. 2024</span>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 p-12 rounded-[3rem] bg-neon-orange text-black flex flex-col justify-between"
          >
            <div className="grid grid-cols-2 gap-8">
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-black mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-[3rem] bg-white/[0.05] border border-white/10 flex flex-col justify-center items-center text-center"
          >
            <Globe className="text-neon-orange mb-4" size={32} />
            <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Global Vision</h3>
            <p className="text-xs text-white/40">Preparing students for the global semiconductor industry.</p>
          </motion.div>

          {/* Community Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-10 rounded-[3rem] bg-white/[0.05] border border-white/10 flex flex-col justify-center items-center text-center"
          >
            <Users className="text-neon-orange mb-4" size={32} />
            <h3 className="text-lg font-bold uppercase tracking-widest mb-2">50+ Members</h3>
            <p className="text-xs text-white/40">A vibrant community of hardware enthusiasts.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HexColorMap: Record<string, string> = {
  'text-neon-orange': '#FF5722',
  'text-neon-red': '#FF3D00',
  'text-neon-amber': '#FFC107',
  'text-white': '#FFFFFF',
  'text-orange-400': '#FB923C',
  'text-yellow-200': '#FEF08A',
  'text-red-400': '#F87171',
  'text-blue-400': '#60A5FA',
};

const DeptIcon3D = ({ 
  iconName, 
  colorClass, 
  isHovered, 
  layoutId,
  className = "w-28 h-28"
}: { 
  iconName: string, 
  colorClass: string, 
  isHovered: boolean, 
  layoutId?: string,
  className?: string
}) => {
    const getIcon = (name: string) => {
      switch (name) {
        case 'Cpu': return Cpu;
        case 'ShieldCheck': return ShieldCheck;
        case 'Layers': return Layers;
        case 'Settings': return Settings;
        default: return Cpu;
      }
    };
    const Icon = getIcon(iconName);
    const colorHex = HexColorMap[colorClass] || '#ffffff';
    
    return (
        <motion.div 
            layoutId={layoutId}
            className={`relative ${className} [perspective:1000px]`}
        >
            <motion.div 
                className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
                animate={{ 
                    rotateX: isHovered ? 15 : 0, 
                    rotateY: isHovered ? 15 : 0,
                    scale: isHovered ? 1.1 : 1,
                    z: isHovered ? 50 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div 
                    className="absolute inset-2 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/5 [transform:translateZ(-10px)]"
                    style={{ boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8)` }}
                />

                <div 
                    className="absolute inset-0 rounded-3xl opacity-20 blur-xl transition-opacity duration-300"
                    style={{ 
                        backgroundColor: colorHex,
                        opacity: isHovered ? 0.4 : 0.2,
                        transform: 'translateZ(-5px)'
                    }}
                />

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] [transform:translateZ(0px)] overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 [transform:translateZ(30px)]">
                     <Icon 
                        size={48} 
                        color={colorHex} 
                        className={`transition-all duration-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]`} 
                        style={{ filter: isHovered ? `drop-shadow(0 0 15px ${colorHex})` : '' }}
                     />
                </div>
                
                <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-md [transform:translateZ(35px)] opacity-60"></div>
            </motion.div>
        </motion.div>
    );
};

const Departments = () => {
  const [activeDept, setActiveDept] = useState<any | null>(null);
  const [hoveredDeptId, setHoveredDeptId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

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
    <section ref={sectionRef} id="departments" className="bg-[#050505] min-h-screen flex flex-col justify-center overflow-hidden relative py-20">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: bgY1 }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"
          />
          <motion.div 
            style={{ y: bgY2 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]"
          />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20">
        <SectionHeader subtitle="Our Ecosystem" title="Specialised Departments." number="02" />
      </div>

      {isMobile ? (
        <div className="flex overflow-x-auto gap-6 p-6 pb-12 snap-x snap-mandatory z-20 mt-4 no-scrollbar scroll-smooth">
            {DEPARTMENTS.map((dept, idx) => (
                <div key={idx} onClick={() => setActiveDept(dept)} className="relative min-w-[280px] w-[280px] snap-center bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center backdrop-blur-sm active:scale-95 transition-transform flex-shrink-0 group shadow-lg cursor-pointer">
                    <div className="mb-6 w-24 h-24 flex items-center justify-center">
                        <DeptIcon3D 
                            iconName={dept.icon} 
                            colorClass={idx % 2 === 0 ? 'text-blue-400' : 'text-neon-orange'} 
                            isHovered={true}
                            layoutId={`dept-icon-mobile-${idx}`}
                            className="w-full h-full"
                        />
                    </div>

                    <h4 className="text-2xl font-black mb-3 text-white">{dept.name}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 h-[60px] overflow-hidden font-medium">{dept.description}</p>
                    
                    <button 
                        className="mt-8 px-6 py-2 bg-white/10 rounded-full text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-all"
                    >
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
             <div 
                className="absolute w-[520px] h-[520px] rounded-full animate-orbit-spin"
                style={{ 
                    animationPlayState: hoveredDeptId !== null || activeDept ? 'paused' : 'running'
                }}
             >
                {DEPARTMENTS.map((dept, index) => {
                    const angle = (index / DEPARTMENTS.length) * 360;
                    
                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 w-32 h-32 -ml-16 -mt-16" 
                            style={{
                                transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${angle}deg)`,
                            }}
                        >
                             <div 
                                className="w-full h-full flex items-center justify-center animate-spin-reverse-slow"
                                style={{ 
                                    animation: `orbit-spin-reverse 40s linear infinite`,
                                    animationPlayState: hoveredDeptId !== null || activeDept ? 'paused' : 'running'
                                }}
                             >
                                 <button
                                    onMouseEnter={() => setHoveredDeptId(index)}
                                    onMouseLeave={() => setHoveredDeptId(null)}
                                    onClick={() => setActiveDept(dept)}
                                    className="relative z-30 group outline-none"
                                 >
                                    <DeptIcon3D 
                                        iconName={dept.icon} 
                                        colorClass={index % 2 === 0 ? 'text-blue-400' : 'text-neon-orange'} 
                                        isHovered={hoveredDeptId === index}
                                        layoutId={`dept-icon-${index}`}
                                    />
                                    
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 text-[10px] font-black text-white uppercase tracking-[0.3em] transition-opacity duration-300 ${hoveredDeptId === index ? 'opacity-100' : 'opacity-40'}`}>
                                        {dept.name}
                                    </div>

                                    {/* Tooltip */}
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
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl"
                onClick={() => setActiveDept(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl bg-black border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]" 
                    onClick={e => e.stopPropagation()}
                >
                    <button onClick={() => setActiveDept(null)} className="absolute top-6 right-6 z-50 p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                        <X size={24} />
                    </button>

                    <div className="w-full md:w-2/5 bg-gradient-to-br from-white/5 to-transparent p-12 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
                        <div className="absolute inset-0 opacity-10 bg-blue-500 blur-[100px]"></div>
                        <div className="relative z-10 text-center">
                            <DeptIcon3D 
                                iconName={activeDept.icon} 
                                colorClass="text-white" 
                                isHovered={true}
                                layoutId={`dept-icon-active`}
                                className="w-48 h-48 mx-auto"
                            />
                            <h2 className="text-4xl font-black text-white mt-8 tracking-tighter">
                                {activeDept.name}
                            </h2>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 p-12 md:p-16 overflow-y-auto custom-scrollbar">
                        <div className="mb-10">
                          <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                              Mission <span className="h-[1px] flex-1 bg-white/10"></span>
                          </h3>
                          <p className="text-gray-400 text-lg leading-relaxed font-medium">
                              {activeDept.description}
                          </p>
                        </div>
                        
                        <div className="mb-10">
                          <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                              Key Focus Areas <span className="h-[1px] flex-1 bg-white/10"></span>
                          </h3>
                          <ul className="space-y-4">
                              {[
                                'Collaborate on high-impact engineering projects.',
                                'Gain hands-on experience with industry-standard tools.',
                                'Mentorship from experienced department leads.'
                              ].map((role, index) => (
                                  <li key={index} className="flex items-start gap-4 text-gray-400 group">
                                      <span className="mt-2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors flex-shrink-0"></span>
                                      <span className="font-medium">{role}</span>
                                  </li>
                              ))}
                          </ul>
                        </div>

                        <button 
                            onClick={() => setActiveDept(null)}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3"
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

const Board = () => {
  return (
    <section id="board" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: memIdx * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-40 h-40 bg-white/5 rounded-full mx-auto mb-8 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/40 transition-all duration-500 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Users size={64} className="text-white/10 group-hover:text-white/40 transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <h5 className="text-xl font-black tracking-tight mb-1">{member.name}</h5>
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


const ProjectCard = ({ project, index, onOpen }: { project: any, index: number, onOpen: () => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
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
      transition={{ duration: 0.2 }}
    >
      {/* Outer Glow Effect */}
      <motion.div 
        className="absolute -inset-8 rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl pointer-events-none z-0"
        style={{ background: glowBackground }}
      />

      <motion.div
        style={{ 
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
        }}
        animate={{ 
          scale: isFlipped ? 1.02 : 1,
          z: isFlipped ? 50 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 15,
          mass: 1
        }}
        className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer z-10"
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-[3rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm group-hover:border-white/20 transition-colors">
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Shine Sweep Effect */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={isFlipped ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-orange mb-4"
            >
              {project.department}
            </motion.div>
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

        {/* Back Side */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[3rem] overflow-hidden border border-neon-orange/30 bg-black p-10 flex flex-col justify-between">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-orange/20 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 italic">Project Brief</div>
            <h4 className="text-2xl font-black mb-6 tracking-tight text-neon-orange">{project.name}</h4>
            <p className="text-gray-400 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/5">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/10 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${project.name}${i}`} alt="member" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, x: 5 }}
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

const ProjectModal = ({ project, isOpen, onClose }: { project: any | null, isOpen: boolean, onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex-1 p-10 md:p-16 overflow-y-auto">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-neon-orange mb-6">{project.department}</div>
                <h2 className="text-4xl font-black mb-8 tracking-tighter leading-none">{project.name}</h2>
                
                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-white/40" />
                    <span className="text-sm font-bold text-white/60">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-orange animate-pulse" />
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">{project.status}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium">
                  {project.longDescription || project.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest"
                    >
                      <Github size={20} /> Repository
                    </motion.a>
                  )}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 border border-white/10 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
                    >
                      <ExternalLink size={20} /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Technical Specs Sidebar/Footer */}
              {project.techSpecs && (
                <div className="p-10 bg-white/[0.02] border-t border-white/10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Technical Specs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Architecture</div>
                      <div className="text-sm font-bold text-white tracking-tight">{project.techSpecs.architecture}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Tools & Languages</div>
                      <div className="flex flex-wrap gap-2">
                        {project.techSpecs.tools.map((tool: string) => (
                          <span key={tool} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-white/60">
                            {tool}
                          </span>
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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <SectionHeader subtitle="Portfolio" title="Silicon Masterpieces." number="04" />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-8"
            >
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
              <ProjectCard 
                project={project} 
                index={idx} 
                onOpen={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

const AdminModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

const EventsTimeline = () => {
  const { events, addEvent, deleteEvent, updateEvent, isAdmin } = useAdmin();
  const [view, setView] = useState<'timeline' | 'archive'>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const sortedEvents = [...events].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  const timelineEvents = sortedEvents.slice(0, 5);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get('title') as string,
      year: formData.get('year') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      longDescription: formData.get('longDescription') as string,
    };

    if (editingEvent) {
      updateEvent({ ...editingEvent, ...eventData });
    } else {
      addEvent(eventData);
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <section id="events" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <SectionHeader subtitle="Events & Workshops" title="Our Journey." number="05" />
          
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button 
                onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-neon-orange text-white rounded-2xl font-black text-sm hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all"
              >
                <Plus size={18} /> Add Event
              </button>
            )}
            <button 
              onClick={() => setView(view === 'timeline' ? 'archive' : 'timeline')}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-black text-sm hover:bg-white/10 transition-all"
            >
              {view === 'timeline' ? 'View Archive' : 'View Timeline'}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'timeline' ? (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Vertical Line */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-orange via-white/10 to-transparent" />
              
              <div className="space-y-12">
                {timelineEvents.map((event, idx) => (
                  <TimelineCard 
                    key={event.id} 
                    event={event} 
                    index={idx} 
                    isAdmin={isAdmin}
                    onEdit={(e) => { setEditingEvent(e); setIsModalOpen(true); }}
                    onDelete={deleteEvent}
                    onRecap={setSelectedEvent}
                  />
                ))}
              </div>

              <div className="mt-20 text-center">
                <button 
                  onClick={() => setView('archive')}
                  className="group inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors font-black uppercase tracking-widest text-sm"
                >
                  Explore Full Archive <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <ArchiveView 
              key="archive"
              events={events} 
              onBack={() => setView('timeline')} 
              onRecap={setSelectedEvent}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedEvent && (
          <RecapModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Event Title</label>
            <input name="title" defaultValue={editingEvent?.title} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Year</label>
              <input name="year" defaultValue={editingEvent?.year} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Icon (Lucide Name)</label>
              <input name="icon" defaultValue={editingEvent?.icon} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Short Description</label>
            <textarea name="description" defaultValue={editingEvent?.description} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none h-24" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-white/30 mb-2">Long Description (Recap)</label>
            <textarea name="longDescription" defaultValue={editingEvent?.longDescription} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-orange/50 outline-none h-32" />
          </div>
          <button type="submit" className="w-full py-4 bg-neon-orange text-white font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all">
            {editingEvent ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      </AdminModal>
    </section>
  );
};

const Recruitment = () => {
  return (
    <section id="recruitment" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Call to Action */}
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
                  href="https://forms.gle/placeholder" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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

          {/* Roles Grid */}
          <div className="grid grid-cols-1 gap-6">
            {OPEN_ROLES.map((role, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
                className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] flex flex-col justify-center"
              >
                <h4 className="text-xl font-black mb-3 tracking-tight text-white">{role.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-black font-black text-2xl tracking-tighter">C</span>
              </div>
              <span className="font-black text-2xl tracking-tight">Chip Design Group</span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg leading-relaxed font-medium">
              The premier VLSI and hardware design club at VIT Chennai. Building the next generation of silicon engineers.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-10 italic">Navigation</h5>
            <ul className="space-y-6 text-base text-gray-400 font-bold">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#departments" className="hover:text-white transition-colors">Departments</a></li>
              <li><a href="#board" className="hover:text-white transition-colors">Board Members</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#recruitment" className="hover:text-white transition-colors">Recruitment</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-10 italic">Connect</h5>
            <div className="flex gap-6">
              {[Linkedin, Github, Mail].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition-all border border-white/10"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-sm text-gray-600 font-bold tracking-widest uppercase">
            © 2026 Chip Design Group. All rights reserved.
          </div>
          <div className="flex items-center gap-10">
            <div className="text-sm text-gray-600 font-black tracking-[0.3em] uppercase">
              VIT Chennai
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <Globe size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContentReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      }}
      className="relative"
    >
      {/* Scanline Effect during reveal */}
      <motion.div
        initial={{ top: "-100%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] pointer-events-none bg-gradient-to-b from-transparent via-neon-orange/30 to-transparent h-[20vh] blur-md"
      />
      
      {/* Digital Noise Overlay */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="fixed inset-0 z-[9998] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
      />

      {/* Grid Reveal Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
        className="fixed inset-0 z-[9997] pointer-events-none bg-black"
      />

      {/* Subtle Background Expansion */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="fixed inset-0 z-[-1] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.03)_0%,transparent_70%)]" />
      </motion.div>

      {children}
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <AdminProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        ) : (
          <ContentReveal key="main-content">
            <CustomCursor />
            <InteractiveBackground />

            <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
              <Nav />
              <main>
                <Hero />
                <WhoWeAre />
                <Departments />
                <Projects />
                <Board />
                <EventsTimeline />
                <Recruitment />
              </main>
              <Footer />
            </div>
          </ContentReveal>
        )}
      </AnimatePresence>
    </AdminProvider>
  );
}
