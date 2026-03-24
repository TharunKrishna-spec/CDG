import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'motion/react';
import {
  Cpu, ShieldCheck, Layers, Settings, Calendar, Zap, Globe, Mic,
  Image as ImageIcon, ArrowRight
} from 'lucide-react';

// === Icon Map ===
export const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Cpu, ShieldCheck, Layers, Settings, Calendar, Zap, Globe, Mic, ImageIcon
  };
  return icons[iconName] || Calendar;
};

// === Scramble Text Effect ===
export const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
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
    <motion.span onMouseEnter={scramble} className={className}>
      {displayText}
    </motion.span>
  );
};

// === Section Header ===
export const SectionHeader = ({ subtitle, title, number }: { subtitle: string; title: string; number?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-24"
    >
      {number && (
        <div className="absolute -top-8 -left-4 text-[7rem] font-black text-[#e18233]/[0.08] leading-none select-none pointer-events-none">
          {number}
        </div>
      )}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-px bg-gradient-to-r from-neon-orange to-transparent" />
        <h2 className="trace-label text-neon-orange">{subtitle}</h2>
      </div>
      <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] max-w-4xl text-white uppercase">
        <ScrambleText text={title} />
      </h3>
    </motion.div>
  );
};

// === Custom Cursor ===
export const CustomCursor = () => {
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

// === Interactive Background ===
export const InteractiveBackground = () => {
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
      <motion.div className="absolute inset-0" style={{ background }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
};

// === Content Reveal ===
export const ContentReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
      }}
      className="relative"
    >
      <motion.div
        initial={{ top: "-100%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] pointer-events-none bg-gradient-to-b from-transparent via-neon-orange/30 to-transparent h-[20vh] blur-md"
      />
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="fixed inset-0 z-[9998] pointer-events-none opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.08\"/%3E%3C/svg%3E')" }}
      />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
        className="fixed inset-0 z-[9997] pointer-events-none bg-black"
      />
      {children}
    </motion.div>
  );
};

// === Rolling Number Counter ===
export const RollingNumber = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const numericPart = value.replace(/[^0-9]/g, '');
  const textSuffix = value.replace(/[0-9]/g, '') + suffix;
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const target = parseInt(numericPart) || 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayed(target);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, numericPart]);

  return (
    <div ref={ref} className="flex items-baseline">
      <motion.span className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums" key={displayed}>
        {displayed}
      </motion.span>
      <span className="text-2xl md:text-3xl font-black text-neon-orange ml-0.5">{textSuffix}</span>
    </div>
  );
};

// === Section Divider ===
export const SectionDivider = ({ variant = 'wave' }: { variant?: 'wave' | 'circuit' | 'diagonal' }) => {
  if (variant === 'circuit') {
    return (
      <div className="relative h-24 w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-orange/20 to-transparent" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-orange/30 shadow-[0_0_10px_rgba(255,87,34,0.3)]" />
        <motion.div
          animate={{ x: ['-50vw', '50vw'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 -translate-y-1/2 w-20 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent"
        />
      </div>
    );
  }

  if (variant === 'diagonal') {
    return (
      <div className="relative h-32 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </div>
    );
  }

  return (
    <div className="relative h-20 w-full overflow-hidden">
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="rgba(255,255,255,0.02)" />
      </svg>
    </div>
  );
};
