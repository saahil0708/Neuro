import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { 
  CubeTransparentIcon, 
  ArrowLeftIcon,
  CpuChipIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// A simple 3D Neural Scene to demonstrate VR visuals
function NeuralScene({ eye = 'left' }) {
  const meshRef = useRef();
  const spheres = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        size: Math.random() * 0.2 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b000ff" />
      
      <group ref={meshRef}>
        <mesh>
          <torusKnotGeometry args={[2, 0.5, 128, 32]} />
          <MeshDistortMaterial 
            color="#00e5ff" 
            speed={2} 
            distort={0.4} 
            emissive="#00e5ff" 
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {spheres.map((s, i) => (
          <mesh key={i} position={s.position}>
            <sphereGeometry args={[s.size, 16, 16]} />
            <meshStandardMaterial color="#b000ff" emissive="#b000ff" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export default function VRRehab() {
  const [isVROn, setIsVROn] = useState(false);

  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00e5ff] rounded-full blur-[180px] opacity-10"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#b000ff] rounded-full blur-[150px] opacity-10"></div>
      </div>

      <AnimatePresence mode="wait">
        {!isVROn ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl w-full px-6 z-10"
          >
            <div className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent"></div>
              
              <div className="flex flex-col items-center text-center gap-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#00e5ff] to-[#b000ff] rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.3)] animate-pulse">
                  <CubeTransparentIcon className="w-12 h-12 text-black" />
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black text-white font-inter tracking-tight">
                    Stereoscopic <span className="text-[#00e5ff]">VR Mode</span>
                  </h1>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto font-medium">
                    An immersive, software-driven 3D environment designed for motor imagery and cognitive rehabilitation. 
                    <span className="block mt-2 text-white/60 text-sm font-semibold">Works with any smartphone VR headset (Cardboard, etc.)</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {[
                    { icon: <CpuChipIcon />, title: "Neural Sync", desc: "Intent tracking" },
                    { icon: <CubeTransparentIcon />, title: "3D Depth", desc: "Realistic volume" },
                    { icon: <InformationCircleIcon />, title: "Immersive", desc: "Full concentration" },
                  ].map((feat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                      <div className="w-8 h-8 text-[#00e5ff]">{feat.icon}</div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{feat.title}</span>
                      <span className="text-[10px] text-gray-500">{feat.desc}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsVROn(true)}
                  className="group relative px-12 py-5 bg-[#00e5ff] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative text-black font-black text-lg tracking-widest uppercase">Launch Environment</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="vr-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-row"
          >
            {/* Split Screen Control */}
            <button 
              onClick={() => setIsVROn(false)}
              className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] bg-white/10 hover:bg-red-500/80 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 group"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              EXIT VR DEMO
            </button>

            {/* Center Alignment Line */}
            <div className="absolute top-0 left-1/2 bottom-0 w-[2px] bg-white/10 z-[60]"></div>

            {/* Left Eye */}
            <div className="w-1/2 h-full relative border-r border-white/5">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <NeuralScene eye="left" />
              </Canvas>
              
              {/* Overlay HUD - Left */}
              <div className="absolute inset-x-8 bottom-12 flex flex-col items-start gap-4 pointer-events-none">
                <div className="px-4 py-2 bg-[#00e5ff]/20 border border-[#00e5ff]/40 rounded-full">
                  <span className="text-[#00e5ff] font-mono text-[10px] tracking-[0.2em] font-bold">CALIBRATING NEURAL LINK [L]</span>
                </div>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-[#00e5ff]"
                  />
                </div>
              </div>

              {/* VR Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-50">
                <div className="absolute inset-0 border border-[#00e5ff] rounded-full scale-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-1 h-1 bg-[#00e5ff] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right Eye */}
            <div className="w-1/2 h-full relative border-l border-white/5">
              <Canvas>
                {/* Slight x-offset for stereoscopic depth effect */}
                <PerspectiveCamera makeDefault position={[0.2, 0, 8]} fov={50} />
                <NeuralScene eye="right" />
              </Canvas>

              {/* Overlay HUD - Right */}
              <div className="absolute inset-x-8 bottom-12 flex flex-col items-start gap-4 pointer-events-none">
                <div className="px-4 py-2 bg-[#00e5ff]/20 border border-[#00e5ff]/40 rounded-full">
                  <span className="text-[#00e5ff] font-mono text-[10px] tracking-[0.2em] font-bold">CALIBRATING NEURAL LINK [R]</span>
                </div>
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-[#00e5ff]"
                  />
                </div>
              </div>

              {/* VR Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-50">
                <div className="absolute inset-0 border border-[#00e5ff] rounded-full scale-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-1 h-1 bg-[#00e5ff] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Stereoscopic Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
