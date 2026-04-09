import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SpeakerWaveIcon, 
  ExclamationTriangleIcon, 
  HeartIcon,
  StopIcon,
  PlayIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';
import { Button, CircularProgress } from '@mui/material';

export default function EmotionTherapy() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [emotionState, setEmotionState] = useState('Neutral'); // Neutral, Stressed, Joyful
  const [cognitiveLoad, setCognitiveLoad] = useState('Low'); // Low, High
  const [aiMessage, setAiMessage] = useState("Ready to start Emotion Tracking.");
  const timerRef = useRef(null);

  // Mocking AI Emotion Therapy Process
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      // Simulated Events
      const event1 = setTimeout(() => {
        setEmotionState('Calm');
        setCognitiveLoad('Low');
        setAiMessage("Your facial tension is low. Let's begin some mild cognitive tasks.");
      }, 3000);

      const event2 = setTimeout(() => {
        setEmotionState('Stressed');
        setCognitiveLoad('High');
        setAiMessage("I'm detecting elevated stress and high cognitive load. Let's pause and take deep breaths.");
      }, 9000);

      const event3 = setTimeout(() => {
        setEmotionState('Joyful');
        setCognitiveLoad('Low');
        setAiMessage("Great recovery! Your emotional state is back to optimal. You're doing excellent.");
      }, 16000);

      return () => {
        clearInterval(timerRef.current);
        clearTimeout(event1);
        clearTimeout(event2);
        clearTimeout(event3);
      };
    } else {
      clearInterval(timerRef.current);
      setEmotionState('Neutral');
      setCognitiveLoad('Low');
    }
  }, [isActive]);

  const toggleSession = () => {
    setIsActive(!isActive);
    if (isActive) {
      setAiMessage("Session paused. Emotion sensors deactivated.");
    } else {
      setAiMessage("Initializing Facial Emotion Recogition and Vitals...");
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getEmotionColor = () => {
    switch (emotionState) {
      case 'Calm': return '#00e5ff';
      case 'Stressed': return '#ff1744';
      case 'Joyful': return '#00e676';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col items-center bg-[#050505]">
      
      {/* Header Section */}
      <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-inter text-transparent bg-clip-text bg-gradient-to-r from-[#ff1744] to-[#b000ff]">Emotion Therapy</h1>
          <p className="text-gray-400 font-inter text-sm">Real-time Emotion, Stress & Cognitive Load Tracking</p>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Camera Layer */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border-2 border-white/10 bg-black shadow-2xl flex items-center justify-center min-h-[450px]">
          <Webcam 
            audio={false}
            className="w-full h-full object-cover opacity-70"
            mirrored={true}
          />
          
          {/* Overlay UI */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Tag */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-[#ff1744]' : 'bg-gray-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-[#ff1744]' : 'bg-gray-500'}`}></span>
            </span>
            <span className="text-white font-inter text-sm tracking-widest font-bold">EMO-SENSOR</span>
          </div>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="text-white font-inter text-lg font-mono">{formatTime(timer)}</span>
          </div>

          {/* Dynamic Tracker Overlay */}
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute pointer-events-none border-2 border-dashed rounded-lg w-56 h-56 flex items-center justify-center p-2"
              style={{ borderColor: getEmotionColor() }}
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            >
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: getEmotionColor() }}></div>
               <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: getEmotionColor() }}></div>
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: getEmotionColor() }}></div>
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: getEmotionColor() }}></div>
               <span className="text-xs font-mono font-bold tracking-widest bg-black/70 px-2 py-1 rounded" style={{ color: getEmotionColor() }}>
                 {emotionState.toUpperCase()}
               </span>
            </motion.div>
          )}

          {/* Biometrics Display */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
             {isActive && (
                <div className="flex gap-4">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-black/60 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl flex flex-col"
                  >
                    <span className="text-gray-400 text-xs font-bold tracking-wider mb-1">COGNITIVE LOAD</span>
                    <span className={`text-lg font-black ${cognitiveLoad === 'High' ? 'text-[#ff1744]' : 'text-[#00e5ff]'}`}>
                      {cognitiveLoad}
                    </span>
                  </motion.div>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black/60 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl flex flex-col"
                  >
                    <span className="text-gray-400 text-xs font-bold tracking-wider mb-1">HEART RATE (EST)</span>
                    <div className="flex items-center gap-2">
                       <HeartIcon className={`w-5 h-5 ${cognitiveLoad === 'High' ? 'text-[#ff1744] animate-bounce' : 'text-[#ff1744]'}`} />
                       <span className="text-lg font-black text-white">{emotionState === 'Stressed' ? '98 BPM' : emotionState === 'Calm' ? '68 BPM' : '82 BPM'}</span>
                    </div>
                  </motion.div>
                </div>
             )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-4">
          
          {/* AI Voice Assistant Panel */}
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#ff1744] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff1744] to-[#b000ff] flex items-center justify-center shadow-[0_0_15px_rgba(255,23,68,0.5)]">
                <SpeakerWaveIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-inter font-bold text-lg">AI Autonomous Therapist</h3>
                <p className="text-xs text-gray-400 font-inter">Adaptive emotional feedback</p>
              </div>
            </div>

            <div className="bg-black/50 rounded-xl p-4 min-h-[100px] border border-white/5 flex items-center relative z-10">
              <p className="text-white font-inter font-medium text-center w-full leading-relaxed tracking-wide italic">"{aiMessage}"</p>
            </div>
          </div>

          {/* Emotion Indicator Panel */}
          <motion.div 
            animate={{ 
              borderColor: emotionState === 'Stressed' ? '#ff1744' : emotionState === 'Joyful' ? '#00e676' : emotionState === 'Calm' ? '#00e5ff' : 'rgba(255,255,255,0.1)'
            }}
            className={`bg-[#141414] border-2 rounded-3xl p-6 flex flex-col gap-4 shadow-lg transition-colors duration-500`}
          >
            <h3 className="text-white font-inter font-bold text-lg">Emotional Resonance</h3>
            <div className="flex items-center gap-4">
              {emotionState === 'Stressed' ? (
                <div className="flex items-center gap-3 text-[#ff1744]">
                  <FaceFrownIcon className="w-8 h-8 animate-pulse" />
                  <span className="font-bold font-inter">High Stress Detected</span>
                </div>
              ) : emotionState === 'Joyful' ? (
                <div className="flex items-center gap-3 text-[#00e676]">
                  <FaceSmileIcon className="w-8 h-8" />
                  <span className="font-bold font-inter">Positive Engagement</span>
                </div>
              ) : emotionState === 'Calm' ? (
                <div className="flex items-center gap-3 text-[#00e5ff]">
                   <ChartBarIcon className="w-8 h-8" />
                   <span className="font-bold font-inter">Calm & Focused</span>
                </div>
              ) : (
                 <div className="flex items-center gap-3 text-gray-400">
                  <CircularProgress size={24} color="inherit" />
                  <span className="font-inter">Analyzing micro-expressions...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 shadow-lg mt-auto flex flex-col gap-4 relative overflow-hidden">
            <h3 className="text-white font-inter font-bold text-sm uppercase tracking-widest text-center text-gray-400 mb-2">Controls</h3>
            
            <Button 
              variant="contained" 
              fullWidth
              startIcon={isActive ? <StopIcon className="w-5" /> : <PlayIcon className="w-5" />}
              onClick={toggleSession}
              sx={{ 
                bgcolor: isActive ? '#333' : '#ff1744', 
                color: 'white',
                '&:hover': {
                  bgcolor: isActive ? '#222' : '#d50000',
                },
                py: 2,
                borderRadius: '12px',
                fontWeight: '900',
                letterSpacing: '1px'
              }}
            >
              {isActive ? 'End Session' : 'Start Emotion Tracking'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
