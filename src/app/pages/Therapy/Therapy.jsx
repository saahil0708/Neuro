import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { 
  SpeakerWaveIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  StopIcon,
  PlayIcon
} from '@heroicons/react/24/solid';
import { Button, CircularProgress } from '@mui/material';

export default function Therapy() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [alert, setAlert] = useState(null); // 'wrong', 'success', null
  const [aiMessage, setAiMessage] = useState("Ready to start the session.");
  const timerRef = useRef(null);

  // Mocking AI Therapy Process
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      // Simulated Events
      const event1 = setTimeout(() => {
        setAiMessage("Raise your right hand slowly.");
        setAlert(null);
      }, 3000);

      const event2 = setTimeout(() => {
        setAlert('wrong');
        setAiMessage("Alert: Movement too fast. Please slow down.");
      }, 8000);

      const event3 = setTimeout(() => {
        setAlert('success');
        setAiMessage("Perfect. Hold that position for 5 seconds.");
      }, 12000);

      return () => {
        clearInterval(timerRef.current);
        clearTimeout(event1);
        clearTimeout(event2);
        clearTimeout(event3);
      };
    } else {
      clearInterval(timerRef.current);
    }
  }, [isActive]);

  const toggleSession = () => {
    setIsActive(!isActive);
    if (isActive) {
      setAiMessage("Session paused. Rest, then resume when ready.");
    } else {
      setAiMessage("Initializing Virtual BCI tracking...");
      setAlert(null);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main BCI / Camera Layer */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border-2 border-white/10 bg-black shadow-2xl flex items-center justify-center min-h-[400px]">
          <Webcam 
            audio={false}
            className="w-full h-full object-cover opacity-80"
            mirrored={true}
          />
          
          {/* Overlay V-BCI UI */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-[#00e5ff]' : 'bg-gray-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-[#00e5ff]' : 'bg-gray-500'}`}></span>
            </span>
            <span className="text-white font-inter text-sm tracking-widest font-bold">V-BCI SENSOR</span>
          </div>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="text-white font-inter text-lg font-mono">{formatTime(timer)}</span>
          </div>

          {/* Dynamic Tracker Overlay */}
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute pointer-events-none border-2 border-dashed border-[#00e5ff] rounded-lg w-48 h-48 flex items-center justify-center p-2"
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            >
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff]"></div>
               <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00e5ff]"></div>
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00e5ff]"></div>
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff]"></div>
               <span className="text-[#00e5ff] text-xs font-mono font-bold tracking-widest bg-black/50 px-2 rounded">TRACKING INTENT</span>
            </motion.div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-4">
          {/* AI Voice Assistant Panel */}
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#b000ff] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#b000ff] flex items-center justify-center">
                <SpeakerWaveIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-inter font-bold text-lg">AI Voice Guide</h3>
                <p className="text-xs text-gray-400 font-inter">Live instructions & feedback</p>
              </div>
            </div>

            <div className="bg-black/50 rounded-xl p-4 min-h-[100px] border border-white/5 flex items-center">
              <p className="text-[#00e5ff] font-inter font-medium text-center w-full">"{aiMessage}"</p>
            </div>
          </div>

          {/* Buzzer / Alert Panel */}
          <motion.div 
            animate={{ 
              borderColor: alert === 'wrong' ? '#ff3d00' : alert === 'success' ? '#00e676' : 'rgba(255,255,255,0.1)'
            }}
            className={`bg-[#141414] border-2 rounded-3xl p-6 flex flex-col gap-4 shadow-lg transition-colors duration-300`}
          >
            <h3 className="text-white font-inter font-bold text-lg">Session Status</h3>
            <div className="flex items-center gap-4">
              {alert === 'wrong' ? (
                <div className="flex items-center gap-3 text-[#ff3d00]">
                  <ExclamationTriangleIcon className="w-8 h-8 animate-pulse" />
                  <span className="font-bold font-inter">Improper Movement detected</span>
                </div>
              ) : alert === 'success' ? (
                <div className="flex items-center gap-3 text-[#00e676]">
                  <CheckCircleIcon className="w-8 h-8" />
                  <span className="font-bold font-inter">Target Intent Registered</span>
                </div>
              ) : (
                 <div className="flex items-center gap-3 text-gray-400">
                  <CircularProgress size={24} color="inherit" />
                  <span className="font-inter">Analyzing intent mapping...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 shadow-lg mt-auto flex flex-col gap-4">
            <h3 className="text-white font-inter font-bold text-sm uppercase tracking-widest text-center text-gray-400 mb-2">Controls</h3>
            
            <Button 
              variant="contained" 
              fullWidth
              startIcon={isActive ? <StopIcon className="w-5" /> : <PlayIcon className="w-5" />}
              onClick={toggleSession}
              sx={{ 
                bgcolor: isActive ? '#ff3d00' : '#00e5ff', 
                color: isActive ? 'white' : 'black',
                '&:hover': {
                  bgcolor: isActive ? '#d50000' : '#00b8d4',
                },
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              {isActive ? 'Stop Session' : 'Start Virtual BCI Therapy'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
