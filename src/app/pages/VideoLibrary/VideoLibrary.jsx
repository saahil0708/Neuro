import React, { useState } from 'react';
import { PlayCircleIcon, CloudIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid';

const videoData = [
  { id: 1, title: 'Upper Limb Mobility pt. 1', category: 'Offline', duration: '12:00', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Lower Limb Strengthening', category: 'Cloud', duration: '08:45', url: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Stroke Recovery: Fine Motor', category: 'Cloud', duration: '15:20', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Deep Tissue Release Techniques', category: 'Offline', duration: '10:00', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400' },
];

export default function VideoLibrary() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? videoData : videoData.filter(v => v.category === filter);

  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col gap-6">
      
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-white/10 pb-6">
        <div>
           <h1 className="text-white font-inter font-bold text-3xl">Video Library</h1>
           <p className="text-gray-400 font-inter text-sm mt-1">Access preloaded offline methods or cloud-updated therapies.</p>
        </div>
        
        <div className="flex bg-[#141414] border border-white/10 rounded-lg overflow-hidden">
           <button onClick={() => setFilter('All')} className={`px-4 py-2 font-inter text-sm flex-1 ${filter === 'All' ? 'bg-[#00e5ff] text-black font-bold' : 'text-gray-400 hover:text-white'}`}>All</button>
           <button onClick={() => setFilter('Offline')} className={`px-4 py-2 font-inter text-sm flex-1 flex items-center gap-1 ${filter === 'Offline' ? 'bg-[#00e5ff] text-black font-bold' : 'text-gray-400 hover:text-white'}`}>
             <DevicePhoneMobileIcon className="w-4 h-4"/> Offline
           </button>
           <button onClick={() => setFilter('Cloud')} className={`px-4 py-2 font-inter text-sm flex-1 flex items-center gap-1 ${filter === 'Cloud' ? 'bg-[#00e5ff] text-black font-bold' : 'text-gray-400 hover:text-white'}`}>
             <CloudIcon className="w-4 h-4"/> Cloud
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {filtered.map((video) => (
            <div key={video.id} className="group cursor-pointer bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00e5ff]/50 transition-all flex flex-col shadow-lg">
               
               {/* Thumbnail box */}
               <div className="relative h-48 overflow-hidden bg-[#222]">
                  <img src={video.url} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-xs px-2 py-1 rounded border border-white/10">
                     {video.duration}
                  </div>
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold font-inter flex items-center gap-1 ${video.category === 'Cloud' ? 'bg-[#b000ff] text-white' : 'bg-gray-200 text-black'}`}>
                     {video.category === 'Cloud' ? <CloudIcon className="w-3 h-3"/> : <DevicePhoneMobileIcon className="w-3 h-3"/>}
                     {video.category}
                  </div>
               </div>

               {/* Meta box */}
               <div className="p-4 flex-1">
                  <h3 className="text-white font-bold font-inter text-base line-clamp-2 group-hover:text-[#00e5ff] transition-colors">{video.title}</h3>
                  <div className="mt-4 flex items-center justify-between">
                     <span className="text-gray-500 text-xs font-inter uppercase tracking-widest">Disease Specific</span>
                     <button className="text-[#00e5ff] text-sm font-bold font-inter">View →</button>
                  </div>
               </div>

            </div>
         ))}
      </div>

    </div>
  );
}
