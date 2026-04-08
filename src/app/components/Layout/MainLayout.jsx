import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatbotWidget from '../Chat/ChatbotWidget';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter selection:bg-[#00e5ff]/30 overflow-hidden flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Responsive Layout */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-73px)]">
        {/* Collapsible Sidebar */}
        <Sidebar />

        {/* Dynamic Content Area */}
        <main className="flex-1 w-full h-full overflow-y-auto relative">
          <Outlet />
        </main>
      </div>

      {/* Voice Assistant & AI Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
