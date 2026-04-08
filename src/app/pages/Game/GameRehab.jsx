import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function GameRehab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(50); // percentage

  // Mocking movement detection via BCI/Camera
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        // Mock intent detection (jumping randomly between 20% and 80%)
        const intentDetected = Math.random() > 0.5;
        if (intentDetected) {
          setPlayerY((prev) => Math.max(20, prev - 15));
          setScore((s) => s + 10);
        } else {
          setPlayerY((prev) => Math.min(80, prev + 15));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col gap-6">
      <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-lg">
         <div>
            <h1 className="text-white font-inter font-bold text-2xl">BCI Game Integration</h1>
            <p className="text-gray-400 font-inter text-sm">Patient thinks to move → Camera detects micro-motion → Game responds.</p>
         </div>
         <div className="bg-[#00e5ff]/10 border border-[#00e5ff]/30 px-6 py-2 rounded-xl text-center">
            <p className="text-xs text-[#00e5ff] uppercase tracking-widest font-bold">Score</p>
            <p className="text-2xl font-bold font-inter text-white">{score}</p>
         </div>
      </div>

      <div className="flex-1 min-h-[500px] relative rounded-3xl overflow-hidden border border-white/20 bg-[#0a0a0a] flex">
         
         {/* Live webcam feed showing tracking */}
         <div className="absolute top-4 right-4 w-48 h-32 rounded-xl overflow-hidden border-2 border-[#b000ff] z-20 shadow-2xl">
            <Webcam audio={false} className="w-full h-full object-cover" mirrored={true} />
            <div className="absolute bottom-1 left-1 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#00e676]' : 'bg-red-500'} animate-pulse`}></span>
              INTENT SENSOR
            </div>
         </div>

         {/* Game Environment */}
         <div className="flex-1 relative bg-gradient-to-br from-[#050505] to-[#111]">
            {/* Grid lines */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50 backdrop-blur-sm">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="bg-white text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <PlayIcon className="w-6 h-6" /> Start Intention Game
                </button>
              </div>
            ) : (
                <div className="absolute inset-0 pointer-events-none">
                    {/* The Player Object */}
                    <motion.div 
                       animate={{ top: `${playerY}%` }}
                       className="absolute left-[10%] w-16 h-16 bg-[#00e5ff] rounded-full shadow-[0_0_30px_rgba(0,229,255,0.8)] border border-white flex items-center justify-center transform -translate-y-1/2"
                    >
                       <span className="text-black font-bold font-inter text-xs">YOU</span>
                    </motion.div>

                    {/* Simulating passed targets */}
                    <div className="absolute right-[20%] top-[40%] w-8 h-8 rounded-full border-2 border-[#b000ff] animate-ping"></div>
                    <div className="absolute right-[40%] top-[70%] w-8 h-8 flex items-center justify-center text-[#ff3d00] font-bold text-xs">+10</div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}
