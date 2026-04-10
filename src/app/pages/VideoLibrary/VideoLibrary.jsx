import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircleIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  HeartIcon,
  PuzzlePieceIcon,
  HandRaisedIcon
} from '@heroicons/react/24/solid';

const videoData = [
  { 
    id: 1, 
    title: 'Hand Recovery: Best Exercises for Stroke', 
    category: 'Cloud', 
    target: 'Hand',
    level: 'Beginner',
    duration: '12:15', 
    url: 'https://www.youtube.com/embed/i0JYsLyJEnE',
    thumbnail: 'https://img.youtube.com/vi/i0JYsLyJEnE/maxresdefault.jpg'
  },
  { 
    id: 2, 
    title: 'Leg Exercises for Better Mobility', 
    category: 'Offline', 
    target: 'Leg',
    level: 'Beginner',
    duration: '09:30', 
    url: 'https://www.youtube.com/embed/-rwby0zA6Vs',
    thumbnail: 'https://img.youtube.com/vi/-rwby0zA6Vs/maxresdefault.jpg'
  },
  { 
    id: 3, 
    title: 'Arm & Tabletop Rehab Exercises', 
    category: 'Cloud', 
    target: 'Arm',
    level: 'Intermediate',
    duration: '11:45', 
    url: 'https://www.youtube.com/embed/kuuGlz_ddOM',
    thumbnail: 'https://img.youtube.com/vi/kuuGlz_ddOM/maxresdefault.jpg'
  },
  { 
    id: 4, 
    title: 'Core & Balance: Stability Training', 
    category: 'Cloud', 
    target: 'Cognitive',
    level: 'Intermediate',
    duration: '14:20', 
    url: 'https://www.youtube.com/embed/dGBqTLtdVuA',
    thumbnail: 'https://img.youtube.com/vi/dGBqTLtdVuA/maxresdefault.jpg'
  },
  { 
    id: 5, 
    title: 'Neuroplasticity: Rewire Your Brain', 
    category: 'Offline', 
    target: 'Cognitive',
    level: 'General',
    duration: '09:45', 
    url: 'https://www.youtube.com/embed/LNHBMFCzznE',
    thumbnail: 'https://img.youtube.com/vi/LNHBMFCzznE/maxresdefault.jpg'
  },
  { 
    id: 6, 
    title: 'Understanding Stroke: Symptoms & Recovery', 
    category: 'Cloud', 
    target: 'Education',
    level: 'Beginner',
    duration: '07:55', 
    url: 'https://www.youtube.com/embed/tfAYliPoNxI',
    thumbnail: 'https://img.youtube.com/vi/tfAYliPoNxI/maxresdefault.jpg'
  },
];

export default function VideoLibrary() {
  const [filter, setFilter] = useState('All');
  const [targetFilter, setTargetFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = videoData.filter(v => {
    const matchesSource = filter === 'All' || v.category === filter;
    const matchesTarget = targetFilter === 'All' || v.target === targetFilter;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesTarget && matchesSearch;
  });

  const targets = ['All', 'Hand', 'Arm', 'Cognitive', 'Education'];

  return (
    <div className="min-h-[calc(100vh-73px)] p-6 md:p-10 flex flex-col gap-8 bg-[#0a0a0a]">
      
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div>
           <h1 className="text-4xl font-black text-white font-inter tracking-tight">Video Library</h1>
           <p className="text-gray-400 font-inter text-sm mt-1">Immersive educational content for neuro-recovery.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00e5ff] transition-colors" />
            <input 
              type="text" 
              placeholder="Search therapies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-white font-inter text-sm focus:outline-none focus:border-[#00e5ff] w-full sm:w-64 transition-all"
            />
          </div>

          <div className="flex bg-[#141414] border border-white/10 rounded-2xl p-1 overflow-hidden shrink-0">
             {['All', 'Offline', 'Cloud'].map(f => (
               <button 
                 key={f}
                 onClick={() => setFilter(f)} 
                 className={`px-4 py-2 rounded-xl font-inter text-xs font-bold transition-all ${filter === f ? 'bg-[#00e5ff] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
               >
                 {f}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Target Area Filters */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10 shrink-0">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-[#00e5ff]" />
        </div>
        {targets.map(t => (
          <button
            key={t}
            onClick={() => setTargetFilter(t)}
            className={`px-6 py-2 rounded-full font-inter text-xs font-bold shrink-0 transition-all border ${targetFilter === t ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {filtered.length > 0 ? filtered.map((video) => (
            <motion.div 
               layoutId={`video-${video.id}`}
               key={video.id} 
               onClick={() => setSelectedVideo(video)}
               whileHover={{ y: -8 }}
               className="group cursor-pointer bg-[#141414] border border-white/10 rounded-3xl overflow-hidden hover:border-[#00e5ff]/30 transition-all flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
               
               {/* Thumbnail box */}
               <div className="relative aspect-video overflow-hidden bg-[#222]">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-all duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-125 group-hover:scale-100">
                     <div className="w-16 h-16 bg-[#00e5ff] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                        <PlayCircleIcon className="w-10 h-10 text-black" />
                     </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] px-3 py-1 rounded-full border border-white/20 font-bold">
                     {video.duration}
                  </div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <div className={`px-2 py-1 rounded-lg text-[10px] font-black font-inter flex items-center gap-1 backdrop-blur-md border ${video.category === 'Cloud' ? 'bg-[#b000ff]/20 text-[#b000ff] border-[#b000ff]/30' : 'bg-[#00e676]/20 text-[#00e676] border-[#00e676]/30'}`}>
                      {video.category === 'Cloud' ? <CloudIcon className="w-3 h-3"/> : <DevicePhoneMobileIcon className="w-3 h-3"/>}
                      {video.category.toUpperCase()}
                    </div>
                  </div>
               </div>

               {/* Meta box */}
               <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{video.target}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{video.level}</span>
                  </div>
                  <h3 className="text-white font-bold font-inter text-lg leading-snug line-clamp-2 group-hover:text-[#00e5ff] transition-colors">{video.title}</h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                     <div className="flex items-center gap-2">
                        {video.target === 'Hand' ? <HandRaisedIcon className="w-4 h-4 text-gray-500" /> : video.target === 'Cognitive' ? <PuzzlePieceIcon className="w-4 h-4 text-gray-500" /> : <HeartIcon className="w-4 h-4 text-gray-500" />}
                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{video.target} Re-Sync</span>
                     </div>
                     <button className="text-[#00e5ff] text-xs font-black font-inter tracking-widest uppercase group-hover:translate-x-1 transition-transform">Play →</button>
                  </div>
               </div>

            </motion.div>
         )) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-600" />
              <p className="text-gray-400 font-inter">No videos found matching your search or filters.</p>
              <button onClick={() => { setFilter('All'); setTargetFilter('All'); setSearchQuery(''); }} className="text-[#00e5ff] text-sm font-bold underline">Clear all filters</button>
            </div>
         )}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            />
            
            <motion.div 
              layoutId={`video-${selectedVideo.id}`}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-[40px] border border-white/10 overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-red-500 transition-colors flex items-center justify-center text-white border border-white/10 backdrop-blur-md"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <iframe 
                src={`${selectedVideo.url}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              <div className="absolute left-6 bottom-6 right-6 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 pointer-events-none">
                 <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#00e5ff] text-black text-[10px] font-black uppercase">{selectedVideo.target}</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase">{selectedVideo.level}</span>
                 </div>
                 <h2 className="text-2xl font-black text-white">{selectedVideo.title}</h2>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
