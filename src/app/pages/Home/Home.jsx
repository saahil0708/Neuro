import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ShieldCheckIcon,
  MicrophoneIcon,
  ChatBubbleBottomCenterTextIcon,
  BellAlertIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { t } = useAppContext();

  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-x-hidden flex flex-col items-center">
      
      {/* Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-[#00e5ff] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#b000ff] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-6 z-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 w-fit">
            <ShieldCheckIcon className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-sm text-gray-300 font-inter">Hospital-grade therapy through your smartphone</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold font-inter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight">
            Neuro Sync <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#b000ff] text-4xl md:text-5xl">AI, Illusion & Cloud-Based Platform</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-inter leading-relaxed max-w-2xl">
            Empowering patients with Virtual BCI, gamified motor imagery, and seamless cloud tracking. Experience clinical-level rehabilitation from anywhere.
          </p>

          <div className="flex gap-4 mt-4">
            <Button 
              variant="contained" 
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
              sx={{ bgcolor: '#00e5ff', color: 'black', fontWeight: 'bold', px: 4, py: 1.5, '&:hover': { bgcolor: '#00b8d4' } }}
            >
              {isAuthenticated ? 'Dashboard' : t("getStarted")}
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', px: 4, py: 1.5 }}
            >
              {t("learnMore")}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full bg-[#111] border-y border-white/10 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold font-inter text-white mb-12">{t("homeBuiltFor")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4 items-start">
              <MicrophoneIcon className="w-10 h-10 text-[#00e5ff]" />
              <h3 className="text-xl font-bold font-inter text-white">Voice Guide System</h3>
              <p className="text-gray-400 text-sm">Multilingual AI voice instructions ("Raise your hand") supporting English, Hindi, and Punjabi.</p>
            </div>
            
            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4 items-start">
              <ChatBubbleBottomCenterTextIcon className="w-10 h-10 text-[#b000ff]" />
              <h3 className="text-xl font-bold font-inter text-white">AI Chatbot</h3>
              <p className="text-gray-400 text-sm">Ask questions dynamically to learn improvements and recommended therapy exercises.</p>
            </div>

            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4 items-start">
              <BellAlertIcon className="w-10 h-10 text-[#00e676]" />
              <h3 className="text-xl font-bold font-inter text-white">Buzzer Alerts</h3>
              <p className="text-gray-400 text-sm">Real-time alerts tracking wrong movements, session completions, and rest reminders.</p>
            </div>

            <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4 items-start">
              <ChartBarIcon className="w-10 h-10 text-[#ffb300]" />
              <h3 className="text-xl font-bold font-inter text-white">Progress Graph</h3>
              <p className="text-gray-400 text-sm">Doctor and Patient analytics tracking daily range of motion, speed, and accuracy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold font-inter text-center text-white mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00e5ff] to-blue-500 mb-4 flex items-center justify-center text-2xl font-bold text-black font-absans">F</div>
            <h3 className="text-xl font-bold text-white font-inter">Founder</h3>
            <p className="text-[#00e5ff] text-sm mt-1">Visionary & Strategy</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#b000ff] to-purple-500 mb-4 flex items-center justify-center text-2xl font-bold text-black font-absans">C</div>
            <h3 className="text-xl font-bold text-white font-inter">Co-Founder</h3>
            <p className="text-[#b000ff] text-sm mt-1">Medical Research</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00e676] to-emerald-500 mb-4 flex items-center justify-center text-2xl font-bold text-black font-absans">T</div>
            <h3 className="text-xl font-bold text-white font-inter">Tech Expert</h3>
            <p className="text-[#00e676] text-sm mt-1">Software Architecture</p>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
