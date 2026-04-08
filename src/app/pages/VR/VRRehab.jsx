import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function VRRehab() {
  const [isVROn, setIsVROn] = useState(false);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-black">
      
      {!isVROn ? (
         <div className="max-w-2xl text-center flex flex-col items-center gap-6 z-10 p-8 bg-[#141414] rounded-3xl border border-white/10 shadow-2xl">
           <div className="w-20 h-20 bg-gradient-to-br from-[#00e5ff] to-[#b000ff] rounded-2xl flex items-center justify-center transform rotate-12 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white transform -rotate-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
             </svg>
           </div>
           
           <h1 className="text-3xl font-extrabold font-inter text-white">Software-Driven VR Illusion</h1>
           <p className="text-gray-400 font-inter text-sm max-w-md">
             Advanced Therapy Mode: Generates a 3D split-screen immersive environment for severe stroke patients to practice deep motor imagery, <span className="text-[#00e5ff] font-bold">without requiring dedicated hardware.</span>
           </p>

           <button 
              onClick={() => setIsVROn(true)}
              className="bg-[#00e5ff] text-black font-bold font-inter px-8 py-3 rounded-xl hover:bg-[#00b8d4] transition-colors mt-4"
           >
             Enter VR Mode
           </button>
         </div>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center gap-4 sm:gap-8 bg-black relative overflow-hidden rounded-3xl border border-white/5">
          
          <button 
             onClick={() => setIsVROn(false)}
             className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full font-inter text-sm hover:bg-red-500 transition-colors"
          >
            Exit VR
          </button>

          {/* Left Eye */}
          <div className="w-1/2 h-full bg-[#111] overflow-hidden relative flex items-center justify-center rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
             <motion.div 
               animate={{ rotateX: [0, 10, 0], rotateY: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative"
             >
                {/* Simulated 3D Hand */}
                <div className="w-40 h-64 bg-gradient-to-t from-[#00e5ff]/50 to-transparent rounded-full flex items-center border border-[#00e5ff]/50">
                   <p className="text-white/50 text-xs font-mono absolute top-2 w-full text-center tracking-widest uppercase">Target Focus L</p>
                </div>
             </motion.div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen mix-blend-overlay"></div>
          </div>

          {/* Right Eye */}
          <div className="w-1/2 h-full bg-[#111] overflow-hidden relative flex items-center justify-center rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
             <motion.div 
               animate={{ rotateX: [0, 10, 0], rotateY: [0, 10, 0] }} // slight perspective difference for stereoscopic
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
               className="relative"
             >
                {/* Simulated 3D Hand */}
                <div className="w-40 h-64 bg-gradient-to-t from-[#00e5ff]/50 to-transparent rounded-full flex items-center border border-[#00e5ff]/50">
                    <p className="text-white/50 text-xs font-mono absolute top-2 w-full text-center tracking-widest uppercase">Target Focus R</p>
                </div>
             </motion.div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen mix-blend-overlay"></div>
          </div>

          {/* Visual Crosshair for Stereoscopic alignment */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#b000ff] opacity-50 z-20 pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20m10-10H2"/></svg>
          </div>

        </div>
      )}
    </div>
  );
}
