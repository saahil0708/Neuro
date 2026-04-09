import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ShieldCheckIcon,
  MicrophoneIcon,
  ChatBubbleBottomCenterTextIcon,
  BellAlertIcon,
  ChartBarIcon,
  HeartIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  BoltIcon,
  GlobeAltIcon,
  ChartPieIcon,
  ArrowsRightLeftIcon,
  CloudIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const nextGenFeatures = [
  {
    icon: <HeartIcon className="w-8 h-8 text-[#ff1744]" />,
    title: "1. Emotion-Intelligent Healthcare",
    description: "Systems continuously monitor emotional state, cognitive load, and stress levels. Therapy becomes self-adjusting and personalized every second.",
    shift: "Shift: From “one treatment fits all” → emotion-driven care"
  },
  {
    icon: <CpuChipIcon className="w-8 h-8 text-[#00e5ff]" />,
    title: "2. Brain–Computer Interface (BCI)",
    description: "Direct brain signal interaction (EEG-based or simulated cloud models) to detect intent, attention, and neural recovery patterns.",
    shift: "Patients can control therapy with thoughts and recover even with minimal movement"
  },
  {
    icon: <DocumentDuplicateIcon className="w-8 h-8 text-[#b000ff]" />,
    title: "3. Digital Twin Healthcare",
    description: "Each patient has a virtual replica (digital twin) that simulates disease progression and therapy outcomes.",
    shift: "Doctors can test treatments before applying to real patient"
  },
  {
    icon: <SparklesIcon className="w-8 h-8 text-[#ffeb3b]" />,
    title: "4. Immersive XR (VR + AR + MR) Therapy",
    description: "Next-level engagement in rehabilitation combining Virtual Reality, Augmented Reality, and Mixed Reality.",
    shift: "Creates a fully immersive therapeutic environment"
  },
  {
    icon: <BoltIcon className="w-8 h-8 text-[#ff9100]" />,
    title: "5. AI Autonomous Therapist",
    description: "24/7 AI therapist talks to patient, motivates, adjusts therapy, and learns continuously from patient behavior.",
    shift: "Reduces dependency on constant human supervision"
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8 text-[#00e676]" />,
    title: "6. Hyper-Connected Tele-Healthcare",
    description: "Real-time global connectivity. Doctors can monitor patients remotely and intervene instantly.",
    shift: "Especially powerful for rural healthcare & low-resource settings"
  },
  {
    icon: <ChartPieIcon className="w-8 h-8 text-[#f50057]" />,
    title: "7. Predictive & Preventive Medicine",
    description: "AI predicts disease onset, relapse risk, and emotional burnout.",
    shift: "Proactive interventions rather than reactive care"
  },
  {
    icon: <ArrowsRightLeftIcon className="w-8 h-8 text-[#2979ff]" />,
    title: "8. Continuous Feedback Loop",
    description: "Dynamic adjustments based on continuous biometric and emotional tracking.",
    shift: "Real-time feedback loop between: Body ↔ AI ↔ Therapy"
  },
  {
    icon: <CloudIcon className="w-8 h-8 text-[#00b0ff]" />,
    title: "9. Cloud-Based Global Ecosystem",
    description: "Unified health records and AI-driven analytics across populations, scalable globally.",
    shift: "Enables data-driven healthcare policies & personalized treatment worldwide"
  },
  {
    icon: <UserIcon className="w-8 h-8 text-[#1de9b6]" />,
    title: "10. Human-Centered Healing Model",
    description: "Combines physical health, mental health, and emotional well-being.",
    shift: "Holistic care model"
  }
];

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

      {/* Next-Gen Healthcare Section */}
      <div className="w-full bg-[#0a0a0a] py-24 px-6 border-y border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#00e5ff] rounded-full blur-[120px] opacity-10"></div>
           <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#b000ff] rounded-full blur-[120px] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black font-inter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#00e5ff] mb-6">
              Next-Gen Healthcare
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-wide">
              Emotion-Aware Smart Therapy System (EASTS)
            </h3>
            <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-[#00e5ff]/50 to-[#b000ff]/50 max-w-4xl mx-auto text-left md:text-center shadow-[0_0_30px_rgba(0,229,255,0.15)] flex justify-center">
              <div className="bg-black/90 rounded-2xl p-6 md:p-8 backdrop-blur-sm w-full">
                <p className="text-lg md:text-xl text-gray-200 font-medium italic leading-relaxed text-center">
                  "Healthcare that doesn’t just treat symptoms—but understands, predicts, and adapts to human emotions, behavior, and biology in real time."
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {nextGenFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-start gap-4"
              >
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
                {feature.shift && (
                  <div className="w-full mt-4 p-3 bg-gradient-to-r from-white/[0.05] to-transparent rounded-lg border-l-2 border-[#00e5ff]">
                    <p className="text-xs font-semibold text-[#00e5ff]">👉 {feature.shift}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center flex justify-center w-full">
             <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-white/20 via-white/5 to-white/20 w-full max-w-4xl">
               <div className="bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-2xl w-full outline outline-1 outline-white/5">
                 <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-relaxed text-center">
                   Emotion-Aware Smart Therapy System is a foundational step toward next-generation healthcare, where AI understands human emotions and delivers adaptive, intelligent, and immersive therapy.
                 </p>
               </div>
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
