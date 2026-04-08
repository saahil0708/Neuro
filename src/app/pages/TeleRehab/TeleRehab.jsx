import React from 'react';
import { 
  PhoneIcon, 
  VideoCameraIcon, 
  MicrophoneIcon, 
  ArrowsPointingOutIcon 
} from '@heroicons/react/24/solid';
import { IconButton } from '@mui/material';

export default function TeleRehab() {
  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Video Feed */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl relative min-h-[500px]">
          {/* Doctor Video Mock */}
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
            {/* Embedded image to simulate doctor */}
            <img 
               src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000" 
               alt="Doctor Consultation" 
               className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Self Video (Small overlay) */}
          <div className="absolute bottom-6 right-6 w-48 h-64 bg-black rounded-xl border border-white/20 overflow-hidden shadow-2xl">
            <img 
               src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=400" 
               alt="Patient Feed" 
               className="w-full h-full object-cover opacity-80"
            />
          </div>

          <div className="absolute top-6 left-6 bg-red-600 px-3 py-1 rounded-md flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-white text-xs font-bold tracking-widest">LIVE</span>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <IconButton className="bg-white/10 text-white hover:bg-white/20">
              <MicrophoneIcon className="w-6 h-6" />
            </IconButton>
            <IconButton className="bg-white/10 text-white hover:bg-white/20">
             <VideoCameraIcon className="w-6 h-6" />
            </IconButton>
            <IconButton className="bg-red-600 text-white hover:bg-red-700 mx-2">
              <PhoneIcon className="w-6 h-6" />
            </IconButton>
            <IconButton className="bg-white/10 text-white hover:bg-white/20">
              <ArrowsPointingOutIcon className="w-6 h-6" />
            </IconButton>
          </div>
        </div>

        {/* Right Side: Chat and Info */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#141414] rounded-3xl p-6 border border-white/10 shadow-lg flex flex-col gap-2">
            <h2 className="text-xl font-bold font-inter text-white">Dr. Sarah Jenkins</h2>
            <p className="text-[#00e5ff] text-sm font-inter">Neurologist & Rehab Specialist</p>
            <div className="mt-4 p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
              <p className="text-xs text-gray-400 font-inter uppercase tracking-widest mb-1">Current Protocol</p>
              <p className="text-white font-inter text-sm">Upper Limb Mobility - Phase 2</p>
            </div>
            <div className="mt-2 p-4 rounded-xl bg-[#1a1a1a] border border-white/5">
              <p className="text-xs text-gray-400 font-inter uppercase tracking-widest mb-1">Session Goal</p>
              <p className="text-white font-inter text-sm">Improve right arm extension by 15%</p>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-3xl flex-col flex flex-1 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white/10 bg-[#1a1a1a]">
              <h3 className="text-white font-bold font-inter">Live Chat</h3>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3 min-h-[200px]">
              <div className="bg-[#00e5ff]/20 border border-[#00e5ff]/30 p-3 rounded-lg rounded-tl-none self-start max-w-[90%]">
                <p className="text-white text-sm font-inter">Let's try that movement one more time, follow my lead.</p>
              </div>
              <div className="bg-white/10 border border-white/5 p-3 rounded-lg rounded-tr-none self-end max-w-[90%]">
                <p className="text-white text-sm font-inter">Okay, starting now.</p>
              </div>
            </div>
            <div className="p-4 border-t border-white/10 bg-[#1a1a1a] flex gap-2">
              <input type="text" placeholder="Type a message..." className="bg-black border border-white/20 rounded-full px-4 py-2 w-full text-white text-sm outline-none focus:border-[#00e5ff] font-inter" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
