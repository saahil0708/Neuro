import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  UsersIcon, 
  ChartBarIcon, 
  ClipboardDocumentCheckIcon,
  VideoCameraIcon 
} from '@heroicons/react/24/outline';
import { Button } from '@mui/material';

const data = [
  { name: 'Mon', accuracy: 65, speed: 45 },
  { name: 'Tue', accuracy: 68, speed: 50 },
  { name: 'Wed', accuracy: 75, speed: 52 },
  { name: 'Thu', accuracy: 72, speed: 58 },
  { name: 'Fri', accuracy: 82, speed: 65 },
  { name: 'Sat', accuracy: 85, speed: 70 },
  { name: 'Sun', accuracy: 88, speed: 75 },
];

export default function DoctorDashboard() {
  return (
    <div className="min-h-[calc(100vh-73px)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
            <div className="flex justify-between items-center text-gray-400">
              <span className="font-inter text-sm uppercase tracking-widest">Active Patients</span>
              <UsersIcon className="w-5 h-5 text-[#00e5ff]" />
            </div>
            <span className="text-3xl font-bold font-inter text-white">124</span>
            <span className="text-xs text-[#00e676] font-inter">+4 this week</span>
          </div>
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
             <div className="flex justify-between items-center text-gray-400">
              <span className="font-inter text-sm uppercase tracking-widest">Avg Improvement</span>
              <ChartBarIcon className="w-5 h-5 text-[#b000ff]" />
            </div>
            <span className="text-3xl font-bold font-inter text-white">22%</span>
            <span className="text-xs text-gray-500 font-inter">Last 30 days</span>
          </div>
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
            <div className="flex justify-between items-center text-gray-400">
              <span className="font-inter text-sm uppercase tracking-widest">Sessions Today</span>
              <VideoCameraIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-3xl font-bold font-inter text-white">12</span>
            <span className="text-xs text-gray-500 font-inter">4 pending</span>
          </div>
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl flex flex-col gap-2 shadow-lg">
             <div className="flex justify-between items-center text-gray-400">
              <span className="font-inter text-sm uppercase tracking-widest">Compliance</span>
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-3xl font-bold font-inter text-white">94%</span>
            <span className="text-xs text-gray-500 font-inter">High accuracy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-[#141414] border border-white/10 rounded-3xl p-6 shadow-lg">
            <h2 className="text-white font-inter font-bold text-xl mb-6">Patient Recovery Trends</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b000ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#b000ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '14px', fontFamily: 'Inter' }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#00e5ff" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" />
                  <Area type="monotone" dataKey="speed" stroke="#b000ff" strokeWidth={3} fillOpacity={1} fill="url(#colorSpeed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient List */}
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 shadow-lg flex flex-col">
             <h2 className="text-white font-inter font-bold text-xl mb-6">Live Monitoring</h2>
             
             <div className="flex flex-col gap-4 overflow-y-auto pr-2">
                
                {/* User Row 1 */}
                <div className="bg-black/50 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex justify-center items-center font-bold text-white">MR</div>
                    <div>
                      <h4 className="text-white font-bold text-sm font-inter">Michael R.</h4>
                      <p className="text-xs text-[#00e5ff] font-inter">Stroke Recovery</p>
                    </div>
                  </div>
                  <Button variant="outlined" size="small" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>View</Button>
                </div>

                {/* User Row 2 */}
                <div className="bg-black/50 border border-white/5 rounded-xl p-4 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-900 flex justify-center items-center font-bold text-white">SK</div>
                    <div>
                      <h4 className="text-white font-bold text-sm font-inter">Sarah K.</h4>
                      <p className="text-xs text-[#b000ff] font-inter">Motor Imagery</p>
                    </div>
                  </div>
                   <Button variant="contained" size="small" sx={{ bgcolor: '#b000ff' }}>Join Live</Button>
                </div>

                {/* User Row 3 */}
                <div className="bg-black/50 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex justify-center items-center font-bold text-white relative">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" className="rounded-full w-full h-full object-cover" alt="Patient" />
                       <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#141414]"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm font-inter">David W.</h4>
                      <p className="text-xs text-red-500 font-inter">Missed session</p>
                    </div>
                  </div>
                  <Button variant="outlined" size="small" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Ping</Button>
                </div>

             </div>

          </div>

        </div>
      </div>
    </div>
  );
}
