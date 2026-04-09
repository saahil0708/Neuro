import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SpeakerWaveIcon, 
  HeartIcon,
  StopIcon,
  PlayIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';
import { Button } from '@mui/material';

export default function EmotionTherapy() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [emotionState, setEmotionState] = useState('Neutral'); // Neutral, Calm, Stressed, Focus
  const [cognitiveLoad, setCognitiveLoad] = useState(30); 
  const [heartRate, setHeartRate] = useState(72);
  const [aiMessage, setAiMessage] = useState("System Standby. Awaiting session initialization.");
  const [facialData, setFacialData] = useState({ tension: 0, symmetry: 0.98 });
  
  const timerRef = useRef(null);

  // Simulated AI Logic for Emotion Changes
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
        
        // Randomly simulate slight biometric fluctuations
        setHeartRate(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 4)));
        setCognitiveLoad(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 5)));
        setFacialData(prev => ({ 
           tension: Math.max(0, Math.min(1, prev.tension + (Math.random() - 0.5) * 0.1)),
           symmetry: 0.95 + Math.random() * 0.05
        }));
      }, 1000);

      // Programmed Event Timeline for Demo
      const timeline = [
        { time: 5, state: 'Calm', msg: "Facial tension decreasing. Neural activity stabilizing. Excellent start." },
        { time: 15, state: 'Stressed', msg: "Elevated micro-expression tension detected. Cognitive load rising. please pause and focus on your breath." },
        { time: 25, state: 'Focus', msg: "Recovery complete. Your alpha-wave state is optimal. Let's proceed with the cognitive assessment." },
        { time: 40, state: 'Calm', msg: "Session performance is above baseline. Emotional resonance is positive." }
      ];

      const timeouts = timeline.map(event => {
        return setTimeout(() => {
           if (isActive) {
              setEmotionState(event.state);
              setAiMessage(event.msg);
              speak(event.msg);
           }
        }, event.time * 1000);
      });

      return () => {
        clearInterval(timerRef.current);
        timeouts.forEach(t => clearTimeout(t));
      };
    } else {
      clearInterval(timerRef.current);
      setEmotionState('Neutral');
      setAiMessage("Session complete. Sensors deactivated.");
    }
  }, [isActive]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSession = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (newState) {
       setAiMessage("Initializing Neuro-Sync AI. Facial mapping active...");
       speak("Initializing Neuro-Sync AI. Facial mapping active.");
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getThemeColor = () => {
    switch (emotionState) {
      case 'Calm': return '#00e5ff';
      case 'Stressed': return '#ff1744';
      case 'Focus': return '#b000ff';
      case 'Neutral': return '#9e9e9e';
      default: return '#00e5ff';
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col items-center bg-[#050505] text-white">
      
      {/* Header */}
      <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#b000ff] uppercase">Emotion Sync v2.0</h1>
          <p className="text-gray-500 font-mono text-xs tracking-widest mt-1 italic">AUTONOMOUS NEURO-THERAPY MODULE</p>
        </div>
        <div className="flex gap-4">
             <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Elapsed</span>
                <span className="text-xl font-mono font-black">{formatTime(timer)}</span>
             </div>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Interface: Camera + Live Overlays */}
        <div className="lg:col-span-2 relative rounded-[40px] overflow-hidden border border-white/20 bg-black shadow-2xl min-h-[500px]">
          <Webcam 
            audio={false}
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            mirrored={true}
          />
          
          {/* Scanning Effect */}
          {isActive && (
             <motion.div 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
               className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent z-10 shadow-[0_0_15px_#00e5ff]"
             />
          )}

          {/* AR UI Elements */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             
             {/* Dynamic Face Frame */}
             <AnimatePresence>
                {isActive && (
                   <motion.div 
                      key="face-frame"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed rounded-full flex items-center justify-center transition-colors duration-500"
                      style={{ borderColor: getThemeColor() + '80' }}
                   >
                      <div className="w-[110%] h-[110%] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                      
                      {/* Emotion Label */}
                      <div 
                         className="px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-48 shadow-lg backdrop-blur-md"
                         style={{ backgroundColor: getThemeColor(), color: '#000' }}
                      >
                         {emotionState} DETECTED
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Corner Data Nodes */}
             <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-black/60 backdrop-blur-md border-l-4 border-white/20 p-3 rounded-r-xl">
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Symmetry Index</p>
                   <p className="text-lg font-mono font-bold">{(facialData.symmetry * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-black/60 backdrop-blur-md border-l-4 border-white/20 p-3 rounded-r-xl">
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Coronal Tension</p>
                   <p className="text-lg font-mono font-bold">{(facialData.tension * 100).toFixed(1)}</p>
                </div>
             </div>

             <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                <div className="bg-black/60 backdrop-blur-md border-r-4 border-[#ff1744] p-3 rounded-l-xl text-right">
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Real-time Pulse</p>
                   <div className="flex items-center gap-2">
                      <HeartIcon className={`w-4 h-4 text-[#ff1744] ${isActive ? 'animate-pulse' : ''}`} />
                      <span className="text-lg font-mono font-bold font-black">{Math.round(heartRate)} BPM</span>
                   </div>
                </div>
             </div>

             {/* Bottom Biometrics Bar */}
             <div className="absolute bottom-10 left-10 right-10 flex justify-between gap-6">
                <div className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cognitive Load</span>
                      <span className="text-xs font-black" style={{ color: getThemeColor() }}>{Math.round(cognitiveLoad)}%</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                         animate={{ width: `${cognitiveLoad}%` }}
                         className="h-full"
                         style={{ backgroundColor: getThemeColor() }}
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Controls & AI Agent */}
        <div className="flex flex-col gap-6">
          
          {/* AI Autonomous Therapist Card */}
          <div className="bg-[#141414] border border-white/10 rounded-[35px] p-8 relative overflow-hidden shadow-2xl group flex-1">
             <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#b000ff] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
             
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-tr from-[#00e5ff] to-[#b000ff] rounded-2xl flex items-center justify-center p-2 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                   <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h3 className="text-xl font-black tracking-tight">AI Therapist</h3>
                   <div className="flex items-center gap-1.5 text-[#00e5ff]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Autonomous Core Active</span>
                   </div>
                </div>
             </div>

             <div className="bg-black/40 rounded-3xl p-6 border border-white/5 min-h-[180px] flex items-center justify-center relative z-10">
                <p className="text-gray-200 font-inter text-base italic leading-relaxed text-center leading-relaxed">
                   "{aiMessage}"
                </p>
             </div>

             <div className="mt-6 flex justify-center gap-4">
                 <button className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-colors">
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-400" />
                 </button>
             </div>
          </div>

          {/* Action Panel */}
          <div className="bg-[#141414] border border-white/10 rounded-[35px] p-8 shadow-2xl flex flex-col gap-4">
             <h4 className="text-[10px] font-black text-center text-gray-500 uppercase tracking-[0.3em]">Protocol Management</h4>
             
             <Button 
                variant="contained" 
                fullWidth
                startIcon={isActive ? <StopIcon className="w-5" /> : <PlayIcon className="w-5" />}
                onClick={toggleSession}
                sx={{ 
                  bgcolor: isActive ? '#222' : '#00e5ff', 
                  color: isActive ? '#ff1744' : '#000',
                  '&:hover': {
                    bgcolor: isActive ? '#333' : '#00b8d4',
                  },
                  py: 2.5,
                  borderRadius: '20px',
                  fontWeight: '900',
                  letterSpacing: '2px',
                  fontSize: '0.75rem',
                  boxShadow: isActive ? 'none' : '0 10px 30px rgba(0,229,255,0.3)'
                }}
             >
                {isActive ? 'HALT SESSION' : 'INITIATE TRACKING'}
             </Button>

             <div className="mt-2 grid grid-cols-2 gap-3">
                <button className="bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors">
                   Calibrate
                </button>
                <button className="bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors">
                   Log Data
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
