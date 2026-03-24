import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, PerspectiveCamera, PresentationControls, Stage, Text } from '@react-three/drei';
import * as THREE from 'three';

const DataParticles = () => {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -5 + Math.random() * 10;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial color="#FF6321" emissive="#FF6321" emissiveIntensity={5} />
    </instancedMesh>
  );
};

const ScanningEffect = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 1.4;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0.18]}>
      <planeGeometry args={[2.8, 0.05]} />
      <meshBasicMaterial color="#FF6321" transparent opacity={0.8} />
    </mesh>
  );
};

const ChipModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  
  const traces = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      const side = Math.floor(Math.random() * 4);
      let pos: [number, number, number] = [0, 0, 0.11];
      let rot: [number, number, number] = [0, 0, 0];
      let scale: [number, number, number] = [Math.random() * 1 + 0.2, 0.015, 0.015];

      if (side === 0) pos = [(Math.random() - 0.5) * 3, 1.4, 0.11], rot = [0, 0, Math.PI / 2];
      if (side === 1) pos = [(Math.random() - 0.5) * 3, -1.4, 0.11], rot = [0, 0, Math.PI / 2];
      if (side === 2) pos = [1.4, (Math.random() - 0.5) * 3, 0.11], rot = [0, 0, 0];
      if (side === 3) pos = [-1.4, (Math.random() - 0.5) * 3, 0.11], rot = [0, 0, 0];

      temp.push({ position: pos, scale, rotation: rot });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smoothly tilt towards mouse
      const targetRotationY = mouse.x * 0.5;
      const targetRotationX = -mouse.y * 0.5;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
      
      // Add a subtle constant float
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main Chip Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 3, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Silicon Wafer Pattern (Subtle) */}
      <mesh position={[0, 0, 0.105]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial 
          color="#111" 
          roughness={0.3} 
          metalness={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Center Core (The Brain) */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[1, 1, 0.08]} />
        <meshStandardMaterial color="#222" roughness={0} metalness={1} />
      </mesh>

      {/* Glowing Core Pulse */}
      <mesh position={[0, 0, 0.165]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial color="#FF6321" transparent opacity={0.6} />
      </mesh>
      
      {/* Core Text */}
      <Text
        position={[0, 0, 0.17]}
        fontSize={0.15}
        color="white"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
        anchorX="center"
        anchorY="middle"
      >
        CDG-VLSI
      </Text>

      {/* Traces */}
      {traces.map((trace, i) => (
        <mesh key={i} position={trace.position} rotation={trace.rotation} scale={trace.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#FF6321" 
            emissive="#FF6321" 
            emissiveIntensity={3} 
          />
        </mesh>
      ))}

      {/* Pins on the edges - Gold plated look */}
      {[-1.5, 1.5].map((x) => 
        Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`pin-x-${x}-${i}`} position={[x, (i - 5.5) * 0.25, 0]}>
            <boxGeometry args={[0.3, 0.08, 0.08]} />
            <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
          </mesh>
        ))
      )}
      {[-1.5, 1.5].map((y) => 
        Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`pin-y-${y}-${i}`} position={[(i - 5.5) * 0.25, y, 0]}>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
          </mesh>
        ))
      )}
      
      <DataParticles />
      <ScanningEffect />
    </group>
  );
};

export const Chip3D = () => {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FF6321" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#4444ff" />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <ChipModel />
        </PresentationControls>
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
      </Canvas>
      
      {/* Decorative Overlay */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[3rem] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-orange-500/5 via-transparent to-blue-500/5" />
        
        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-orange/30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-orange/30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-orange/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-orange/30" />
      </div>
    </div>
  );
};
