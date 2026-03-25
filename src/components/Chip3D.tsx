import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ChipModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const traces = useMemo(() => {
    const temp = [];
    const offsets = [-0.9, -0.3, 0.3, 0.9];
    offsets.forEach((offset) => {
      temp.push({
        position: [offset, 1.02, 0.11] as [number, number, number],
        rotation: [0, 0, Math.PI / 2] as [number, number, number],
        scale: [0.85, 0.018, 0.018] as [number, number, number],
      });
      temp.push({
        position: [offset, -1.02, 0.11] as [number, number, number],
        rotation: [0, 0, Math.PI / 2] as [number, number, number],
        scale: [0.85, 0.018, 0.018] as [number, number, number],
      });
      temp.push({
        position: [1.02, offset, 0.11] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        scale: [0.85, 0.018, 0.018] as [number, number, number],
      });
      temp.push({
        position: [-1.02, offset, 0.11] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        scale: [0.85, 0.018, 0.018] as [number, number, number],
      });
    });

    [[0, 0.45], [0, -0.45], [0.45, 0], [-0.45, 0]].forEach(([x, y]) => {
      temp.push({
        position: [x, y, 0.11] as [number, number, number],
        rotation: [0, 0, Math.abs(x) > 0 ? 0 : Math.PI / 2] as [number, number, number],
        scale: [0.65, 0.014, 0.014] as [number, number, number],
      });
    });

    return temp;
  }, []);

  const pins = useMemo(
    () => Array.from({ length: 9 }, (_, index) => (index - 4) * 0.28),
    [],
  );

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.z = Math.sin(time * 0.18) * 0.05;
      meshRef.current.rotation.x = -0.22 + Math.cos(time * 0.14) * 0.015;
      meshRef.current.rotation.y = 0.18 + Math.sin(time * 0.16) * 0.02;
    }

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.16 + ((Math.sin(state.clock.elapsedTime * 1.4) + 1) / 2) * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[2.5, 2.5, 0.16]} />
        <meshStandardMaterial color="#101010" roughness={0.32} metalness={0.7} />
      </mesh>

      <mesh position={[0, 0, 0.105]}>
        <planeGeometry args={[2.14, 2.14]} />
        <meshStandardMaterial 
          color="#161616" 
          roughness={0.58} 
          metalness={0.28}
          transparent
          opacity={0.94}
        />
      </mesh>

      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.72, 0.72, 0.05]} />
        <meshStandardMaterial color="#8c4817" roughness={0.4} metalness={0.55} />
      </mesh>

      <mesh ref={glowRef} position={[0, 0, 0.155]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial color="#ff7a2f" transparent opacity={0.18} />
      </mesh>
      
      {traces.map((trace, i) => (
        <mesh key={i} position={trace.position} rotation={trace.rotation} scale={trace.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#f7be69"
            emissive="#d18329"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {[-1.25, 1.25].map((x) =>
        pins.map((y) => (
          <mesh key={`pin-x-${x}-${y}`} position={[x, y, 0]}>
            <boxGeometry args={[0.2, 0.06, 0.06]} />
            <meshStandardMaterial color="#e4ae49" metalness={0.95} roughness={0.22} />
          </mesh>
        ))
      )}
      {[-1.25, 1.25].map((y) =>
        pins.map((x) => (
          <mesh key={`pin-y-${y}-${x}`} position={[x, y, 0]}>
            <boxGeometry args={[0.06, 0.2, 0.06]} />
            <meshStandardMaterial color="#e4ae49" metalness={0.95} roughness={0.22} />
          </mesh>
        ))
      )}
    </group>
  );
};

export const Chip3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasKey, setCanvasKey] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const node = containerRef.current;
    if (!node) return;

    let frame = 0;
    let observer: ResizeObserver | null = null;
    const syncCanvas = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCanvasKey((current) => current + 1);
      });
    };

    syncCanvas();

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        syncCanvas();
      });

      observer.observe(node);
    }

    window.addEventListener('load', syncCanvas);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('load', syncCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[320px] md:h-[520px] min-h-[320px] md:min-h-[520px]">
      <div key={canvasKey} className="h-full w-full [&>canvas]:!h-full [&>canvas]:!w-full [&>canvas]:!block">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 4.6], fov: 34 }}
      >
        <color attach="background" args={['#120d0a']} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 6]} intensity={1.6} color="#ffd2a2" />
        <pointLight position={[-3, -2, 3]} intensity={0.5} color="#ff7a2f" />
        <ChipModel />
      </Canvas>
      </div>
      
      <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] overflow-hidden border border-white/6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-orange/30 to-transparent" />
        <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-neon-orange/20" />
        <div className="absolute right-6 bottom-6 h-8 w-8 border-r border-b border-neon-orange/20" />
      </div>
    </div>
  );
};
