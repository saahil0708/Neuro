import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { PlayIcon, TrophyIcon, FireIcon } from '@heroicons/react/24/solid';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export default function GameRehab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [balloons, setBalloons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const lastVideoTimeRef = useRef(-1);

  // Initialize MediaPipe
  useEffect(() => {
    async function initMediaPipe() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2
        });
        setHandLandmarker(landmarker);
        setLoading(false);
      } catch (error) {
        console.error("MediaPipe initialization failed:", error);
      }
    }
    initMediaPipe();
  }, []);

  // Main Detection Loop
  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      handLandmarker &&
      isPlaying
    ) {
      const video = webcamRef.current.video;
      const startTimeMs = performance.now();
      
      if (lastVideoTimeRef.current !== video.currentTime) {
         lastVideoTimeRef.current = video.currentTime;
         const results = handLandmarker.detectForVideo(video, startTimeMs);
         
         if (results.landmarks && results.landmarks.length > 0) {
            handleCollisions(results.landmarks);
            drawTracking(results.landmarks);
         } else {
            clearCanvas();
         }
      }
    }
    requestRef.current = requestAnimationFrame(detect);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(detect);
    } else {
      cancelAnimationFrame(requestRef.current);
      clearCanvas();
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, handLandmarker]);

  // Game Logic: Balloon Spawning
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const newBalloon = {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10, // 10% to 90%
          y: 110, // start below screen
          size: Math.random() * 40 + 60,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          speed: Math.random() * 0.8 + 0.5 // slower for better rehab control
        };
        setBalloons(prev => [...prev, newBalloon]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Game Logic: Balloon Movement
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setBalloons(prev => {
          return prev
            .map(b => ({ ...b, y: b.y - b.speed }))
            .filter(b => b.y > -20); // remove if off screen
        });
      }, 16);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCollisions = (landmarks) => {
    // Landmarker 8 is the index finger tip
    landmarks.forEach(hand => {
      const tip = hand[8];
      const tipX = (1 - tip.x) * 100; // mirrored
      const tipY = tip.y * 100;

      setBalloons(prev => {
        let collided = false;
        const remaining = prev.filter(balloon => {
          const dist = Math.sqrt(Math.pow(tipX - balloon.x, 2) + Math.pow(tipY - balloon.y, 2));
          if (dist < 10) { // Collision threshold relative to balloon size
            collided = true;
            return false;
          }
          return true;
        });
        if (collided) setScore(s => s + 10);
        return remaining;
      });
    });
  };

  const drawTracking = (landmarks) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 3;

    landmarks.forEach(hand => {
      const tip = hand[8];
      const x = (1 - tip.x) * canvas.width;
      const y = tip.y * canvas.height;

      // Glow effect for finger tip
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00e5ff';
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      
      // Skeleton viz
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo((1-hand[0].x)*canvas.width, hand[0].y*canvas.height);
      [0, 5, 9, 13, 17, 0].forEach(i => {
         ctx.lineTo((1-hand[i].x)*canvas.width, hand[i].y*canvas.height);
      });
      ctx.stroke();
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col gap-6 bg-[#050505] text-white font-inter">
      {/* Header */}
      <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-2xl relative overflow-hidden">
         <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#00e5ff] rounded-full blur-[80px] opacity-10"></div>
         <div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#b000ff]">Vision Rehab: Balloon POP</h1>
            <p className="text-gray-400 text-sm mt-1">Pop the balloons using your index finger. Calibrate your hand movement.</p>
         </div>
         <div className="flex gap-4">
            <div className="bg-black/40 border border-white/10 px-6 py-2 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Score</span>
                <span className="text-2xl font-black text-[#00e5ff]">{score}</span>
            </div>
         </div>
      </div>

      <div className="flex-1 min-h-[500px] relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-inner flex">
         
         {/* Webcam Layer */}
         <div className="absolute inset-0 z-0">
            <Webcam 
               ref={webcamRef}
               audio={false} 
               className="w-full h-full object-cover opacity-60" 
               mirrored={true} 
            />
         </div>

         {/* Tracking Canvas Layer */}
         <canvas 
            ref={canvasRef}
            className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            width={1280}
            height={720}
         />

         {/* Game Layer (Floating Balloons) */}
         <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <AnimatePresence>
               {balloons.map((balloon) => (
                  <motion.div
                     key={balloon.id}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                     className="absolute rounded-full flex items-center justify-center"
                     style={{ 
                        left: `${balloon.x}%`, 
                        top: `${balloon.y}%`, 
                        width: balloon.size, 
                        height: balloon.size,
                        backgroundColor: balloon.color,
                        boxShadow: `0 0 30px ${balloon.color}`,
                        border: '2px solid rgba(255,255,255,0.4)'
                     }}
                  >
                     <div className="w-1 h-12 bg-white/20 absolute -bottom-10 rounded-full"></div>
                     <span className="text-white/20 font-black text-2xl drop-shadow-lg">POP</span>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>

         {/* HUD / Loading / Overlay */}
         <div className="absolute inset-0 z-30 flex flex-col pointer-events-none">
            {loading && (
               <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 pointer-events-auto">
                  <div className="w-12 h-12 border-4 border-[#00e5ff] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#00e5ff] font-mono tracking-widest text-sm">INITIALIZING AI VISION ENGINE...</p>
               </div>
            )}

            {!isPlaying && !loading && (
               <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     className="bg-[#141414] border border-white/20 p-10 rounded-[40px] text-center shadow-2xl flex flex-col items-center gap-6"
                  >
                     <div className="w-20 h-20 bg-[#00e5ff] rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                        <PlayIcon className="w-10 h-10 text-black" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black">Ready for Session?</h2>
                        <p className="text-gray-400 text-sm mt-2 max-w-xs">Raise your hand in front of the camera and move your index finger to pop balloons.</p>
                     </div>
                     <button 
                        onClick={() => { setIsPlaying(true); setScore(0); }}
                        className="bg-[#00e5ff] text-black font-black px-12 py-4 rounded-2xl hover:scale-105 transition-transform"
                     >
                        START REHAB
                     </button>
                  </motion.div>
               </div>
            )}

            {isPlaying && (
               <>
                  <div className="absolute top-6 left-6 bg-black/60 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                     <FireIcon className="w-5 h-5 text-orange-500 animate-pulse" />
                     <span className="text-xs font-mono tracking-tighter">AI VISION ACTIVE</span>
                  </div>
                  
                  <button 
                     onClick={() => setIsPlaying(false)}
                     className="absolute top-6 right-6 bg-red-600/20 hover:bg-red-600 border border-red-600/50 text-white px-6 py-2 rounded-full text-xs font-bold transition-colors pointer-events-auto"
                  >
                     END SESSION
                  </button>
               </>
            )}
         </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-[#00e5ff]">1</div>
            <div>
               <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Hand Stability</p>
               <p className="text-lg font-black text-white">Tracking...</p>
            </div>
         </div>
         <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl flex items-center gap-4">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-[#b000ff]">2</div>
            <div>
               <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Movement Velocity</p>
               <p className="text-lg font-black text-white">Calculating...</p>
            </div>
         </div>
         <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl flex items-center gap-4">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-green-500">3</div>
            <div>
               <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Session Goal</p>
               <p className="text-lg font-black text-white">20 Balloons</p>
            </div>
         </div>
      </div>
    </div>
  );
}
