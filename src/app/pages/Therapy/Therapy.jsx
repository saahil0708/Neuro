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
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function Therapy() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [alert, setAlert] = useState(null); // 'wrong', 'success', null
  const [aiMessage, setAiMessage] = useState("Ready to start the session.");
  const [handPos, setHandPos] = useState({ x: 50, y: 50 });
  const [isHandDetected, setIsHandDetected] = useState(false);
  
  const timerRef = useRef(null);
  const webcamRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef();

  // Initialize MediaPipe
  useEffect(() => {
    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm"
        );
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        console.log("MediaPipe HandLandmarker initialized");
      } catch (error) {
        console.error("Failed to initialize MediaPipe:", error);
      }
    };
    initMediaPipe();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Detection Loop
  const predictWebcam = () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      handLandmarkerRef.current
    ) {
      const startTimeMs = performance.now();
      if (lastVideoTimeRef.current !== webcamRef.current.video.currentTime) {
        lastVideoTimeRef.current = webcamRef.current.video.currentTime;
        const results = handLandmarkerRef.current.detectForVideo(
          webcamRef.current.video,
          startTimeMs
        );

        if (results.landmarks && results.landmarks.length > 0) {
          setIsHandDetected(true);
          const landmark = results.landmarks[0][9]; // Middle finger MCP (center-ish)
          const x = landmark.x * 100;
          const y = landmark.y * 100;
          setHandPos({ x, y });

          // Simple Logic: If hand is in the upper part, it's a "success" for this demo
          if (y < 40) {
            setAlert('success');
            setAiMessage("Excellent reach! Hold it there.");
          } else if (y > 80) {
            setAlert('wrong');
            setAiMessage("Hand too low. Try to lift higher.");
          } else {
            setAlert(null);
            setAiMessage("Keep moving upwards slowly...");
          }
        } else {
          setIsHandDetected(false);
          setAlert(null);
        }
      }
    }
    if (isActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      requestRef.current = requestAnimationFrame(predictWebcam);
    } else {
      clearInterval(timerRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      clearInterval(timerRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive]);

  const toggleSession = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setAiMessage("Initializing Real-Time Hand Tracking...");
      setAlert(null);
    } else {
      setAiMessage("Session paused.");
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col items-center bg-[#050505]">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Tracking Layer */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border-2 border-white/10 bg-black shadow-2xl flex items-center justify-center min-h-[500px]">
          <Webcam 
            ref={webcamRef}
            audio={false}
            className="w-full h-full object-cover opacity-80"
            mirrored={true}
          />
          
          {/* Overlay UI */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-[#00e5ff]' : 'bg-gray-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? 'bg-[#00e5ff]' : 'bg-gray-500'}`}></span>
            </span>
            <span className="text-white font-inter text-sm tracking-widest font-bold">REAL-TIME BCI SENSOR</span>
          </div>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="text-white font-inter text-lg font-mono">{formatTime(timer)}</span>
          </div>

          {/* Target Zone */}
          <div className="absolute top-[10%] left-[25%] w-[50%] h-[30%] border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Target Reach Zone</span>
          </div>

          {/* Dynamic Tracker Overlay */}
          {isActive && isHandDetected && (
            <motion.div 
              style={{ 
                left: `${100 - handPos.x}%`, // Mirrored
                top: `${handPos.y}%`,
                x: '-50%',
                y: '-50%'
              }}
              className="absolute pointer-events-none border-2 border-[#00e5ff] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_20px_#00e5ff]"
            >
               <div className="w-2 h-2 bg-[#00e5ff] rounded-full"></div>
               <div className="absolute -top-6 text-[#00e5ff] text-[8px] font-black uppercase tracking-tighter whitespace-nowrap">
                 Hand Detected
               </div>
            </motion.div>
          )}

          {!isHandDetected && isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
               <div className="text-center">
                 <div className="animate-pulse text-[#00e5ff] mb-2 font-black uppercase tracking-widest text-sm">Searching for Hand...</div>
                 <p className="text-white/40 text-[10px]">Place your hand in front of the camera</p>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#b000ff] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#b000ff] flex items-center justify-center">
                <SpeakerWaveIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-inter font-bold text-lg">Neuro-Sync Guide</h3>
                <p className="text-xs text-gray-400 font-inter">Live biometric feedback</p>
              </div>
            </div>

            <div className="bg-black/50 rounded-xl p-4 min-h-[100px] border border-white/5 flex items-center justify-center">
              <p className="text-[#00e5ff] font-inter font-medium text-center w-full italic">"{aiMessage}"</p>
            </div>
          </div>

          <motion.div 
            animate={{ 
              borderColor: alert === 'wrong' ? '#ff3d00' : alert === 'success' ? '#00e676' : 'rgba(255,255,255,0.1)'
            }}
            className="bg-[#141414] border-2 rounded-3xl p-6 flex flex-col gap-4 shadow-lg"
          >
            <h3 className="text-white font-inter font-bold text-sm uppercase tracking-widest text-gray-500">Session Status</h3>
            <div className="flex items-center gap-4">
              {alert === 'wrong' ? (
                <div className="flex items-center gap-3 text-[#ff3d00]">
                  <ExclamationTriangleIcon className="w-8 h-8 animate-pulse" />
                  <span className="font-black text-sm uppercase">Movement Alert</span>
                </div>
              ) : alert === 'success' ? (
                <div className="flex items-center gap-3 text-[#00e676]">
                  <CheckCircleIcon className="w-8 h-8" />
                  <span className="font-black text-sm uppercase">Goal Achieved</span>
                </div>
              ) : (
                 <div className="flex items-center gap-3 text-gray-400">
                  <CircularProgress size={20} color="inherit" />
                  <span className="font-inter text-xs">Tracking hand position...</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 shadow-lg mt-auto flex flex-col gap-4">
            <Button 
              variant="contained" 
              fullWidth
              startIcon={isActive ? <StopIcon className="w-5" /> : <PlayIcon className="w-5" />}
              onClick={toggleSession}
              sx={{ 
                bgcolor: isActive ? '#ff1744' : '#00e5ff', 
                color: 'black',
                '&:hover': {
                  bgcolor: isActive ? '#d50000' : '#00b8d4',
                },
                py: 2,
                borderRadius: '15px',
                fontWeight: '900',
                letterSpacing: '1px'
              }}
            >
              {isActive ? 'HALT TRACKING' : 'INITIATE THERAPY'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

