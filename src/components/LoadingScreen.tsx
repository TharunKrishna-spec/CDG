import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [fabricLayer, setFabricLayer] = useState(0);

  const bootLogs = useMemo(() => [
    "BIOS CHECK.............. OK",
    "INITIALIZING CORE SYSTEMS...",
    "LOADING RTL MODULES [████████] DONE",
    "VERIFYING DESIGN CONSTRAINTS...",
    "MAPPING PHYSICAL LAYOUT...",
    "DRC CHECK............... PASS",
    "LVS CHECK............... PASS",
    "SYNCHRONIZING CLOCK DOMAINS...",
    "CALIBRATING FinFET ARRAY...",
    "BOOTING SILICON MASTERPIECE...",
  ], []);

  const fabricLayers = ['Substrate', 'Well', 'Poly', 'Metal-1', 'Via', 'Metal-2', 'Passivation'];

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
        const inc = Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 2 : 1;
        return Math.min(prev + inc, 100);
      });
    }, 45);

    logInterval = setInterval(() => {
      setLogs(prev => {
        if (prev.length >= bootLogs.length) {
          clearInterval(logInterval);
          return prev;
        }
        setShake(true);
        setTimeout(() => setShake(false), 150);
        return [...prev, bootLogs[prev.length]];
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete, bootLogs]);

  useEffect(() => {
    setFabricLayer(Math.min(Math.floor(progress / (100 / fabricLayers.length)), fabricLayers.length - 1));
  }, [progress, fabricLayers.length]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'brightness(3) blur(10px)' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center font-mono overflow-hidden"
    >
      {/* CRT Scanlines */}
      <div className="absolute inset-0 crt-scanlines z-50 pointer-events-none" />
      {/* CRT Vignette */}
      <div className="absolute inset-0 z-40 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)'
      }} />

      <motion.div 
        animate={shake ? { x: [0, -3, 3, -2, 0], y: [0, 2, -1, 1, 0] } : {}}
        transition={{ duration: 0.15 }}
        className="relative w-full max-w-2xl px-10"
      >
        {/* ASCII Logo */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neon-orange/40 text-[8px] md:text-[10px] leading-tight mb-8 select-none text-center"
          style={{ textShadow: '0 0 10px rgba(255,87,34,0.3)' }}
        >
{`  ██████╗██████╗  ██████╗ 
 ██╔════╝██╔══██╗██╔════╝ 
 ██║     ██║  ██║██║  ███╗
 ██║     ██║  ██║██║   ██║
 ╚██████╗██████╔╝╚██████╔╝
  ╚═════╝╚═════╝  ╚═════╝ `}
        </motion.pre>

        {/* Terminal Logs */}
        <div className="mb-8 h-52 overflow-hidden rounded-xl border border-neon-orange/10 bg-black/80 p-4 relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="space-y-1.5">
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.3 }}
                key={i}
                className="flex items-start gap-2 text-[10px] md:text-[11px]"
              >
                <span className="text-neon-orange/30 flex-shrink-0">{`[${String(i).padStart(3, '0')}]`}</span>
                <span className="text-neon-orange/70">{`> ${log}`}</span>
              </motion.div>
            ))}
            {progress < 100 && (
              <span className="text-neon-orange/50 text-[11px] typewriter-cursor">_</span>
            )}
          </div>
        </div>

        {/* Chip Fabrication Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold">Fabrication Layer</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-neon-orange font-black">{fabricLayers[fabricLayer]}</span>
          </div>
          <div className="relative h-8 w-full rounded-lg overflow-hidden border border-white/10 bg-white/[0.02]">
            {fabricLayers.map((layer, i) => (
              <motion.div
                key={layer}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i <= fabricLayer ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 right-0"
                style={{
                  originX: 0,
                  background: `linear-gradient(90deg, rgba(255,87,34,${0.1 + i * 0.08}) 0%, rgba(255,87,34,${0.2 + i * 0.1}) 100%)`,
                  height: `${100 / fabricLayers.length}%`,
                  top: `${(i / fabricLayers.length) * 100}%`,
                }}
              />
            ))}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-neon-orange/30 to-transparent"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-orange to-neon-red rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
            style={{ boxShadow: '0 0 20px rgba(255,87,34,0.5), 0 0 40px rgba(255,87,34,0.2)' }}
          />
        </div>
        
        <div className="mt-5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-orange font-black" style={{ textShadow: '0 0 10px rgba(255,87,34,0.5)' }}>
              System Boot
            </span>
            <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1 font-mono">CDG Kernel v4.2.0-silicon</span>
          </div>
          <div className="flex items-baseline gap-1">
            <motion.span 
              className="text-3xl font-black text-white tracking-tighter font-mono"
              key={progress}
              initial={{ y: 5, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {progress}
            </motion.span>
            <span className="text-sm font-bold text-white/40">%</span>
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 10 ? 0.3 : 0 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.5em] text-white/30 hover:text-neon-orange transition-colors py-2 px-6 border border-white/5 rounded-full hover:border-neon-orange/30"
        >
          Skip Boot
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
