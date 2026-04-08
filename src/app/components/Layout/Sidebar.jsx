import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  HomeIcon, 
  PlayCircleIcon, 
  VideoCameraIcon, 
  UserGroupIcon, 
  FilmIcon, 
  CubeTransparentIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <HomeIcon className="w-6 h-6" /> },
  { name: 'V-BCI Therapy', path: '/therapy', icon: <PlayCircleIcon className="w-6 h-6" /> },
  { name: 'Game Rehab', path: '/game', icon: <PuzzlePieceIcon className="w-6 h-6" /> },
  { name: 'VR Mode', path: '/vr', icon: <CubeTransparentIcon className="w-6 h-6" /> },
  { name: 'Tele-Rehab', path: '/tele-rehab', icon: <VideoCameraIcon className="w-6 h-6" /> },
  { name: 'Dr. Consult', path: '/doctor', icon: <UserGroupIcon className="w-6 h-6" /> },
  { name: 'Video Library', path: '/videos', icon: <FilmIcon className="w-6 h-6" /> },
];

export default function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const location = useLocation();

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.aside
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -250, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-64 h-[calc(100vh-73px)] border-r border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md flex flex-col z-40 relative flex-shrink-0"
        >
          <div className="p-6 flex-1 overflow-y-auto w-full flex flex-col gap-2">
            <h4 className="text-gray-500 font-inter text-xs uppercase tracking-widest mb-2 font-bold">Modules</h4>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-decoration-none font-inter ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00e5ff]/20 to-transparent text-[#00e5ff] border-l-4 border-[#00e5ff]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                >
                  {item.icon}
                  <span className="font-semibold text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="p-6 border-t border-white/10">
            <div className="bg-[#141414] rounded-xl p-4 border border-white/5 flex flex-col gap-2 shadow-lg">
              <span className="text-white font-inter font-bold text-sm">System Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse"></div>
                <span className="text-xs text-gray-400 font-inter">Cloud Sync Active</span>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
