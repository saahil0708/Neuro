import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { useSelector } from 'react-redux';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useAppContext();
  const { isAuthenticated } = useSelector(state => state.auth);

  const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/auth', '/chat') : 'http://localhost:3000/api/chat';

  // Prevent rendering if not logged in
  if (!isAuthenticated) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll whenever messages change
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Initial greeting
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: 'assistant', content: t("Hello! I am NeuroBot, your AI rehab assistant. How can I help you today?") || "Hello! I am NeuroBot, your AI rehab assistant. How can I help you today?" }
      ]);
    }
  }, [t, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send history up to last 10 messages so token context isn't huge
        body: JSON.stringify({ messages: newMessages.slice(-10) }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to AI. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 max-h-[500px] h-full flex flex-col bg-[#141414] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#00e5ff] to-[#b000ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center">
                  <span className="text-white font-absans font-bold text-sm">NB</span>
                </div>
                <div>
                  <h3 className="text-white font-bold font-inter leading-none">NeuroBot</h3>
                  <p className="text-white/70 text-[10px] font-inter uppercase tracking-widest mt-0.5">Online</p>
                </div>
              </div>
              <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                <XMarkIcon className="w-5 h-5" />
              </IconButton>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#0a0a0a]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 font-inter text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#b000ff] text-white rounded-br-none' 
                        : 'bg-[#1e1e1e] border border-white/5 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1e1e1e] border border-white/5 rounded-2xl rounded-bl-none px-4 py-2 text-gray-400">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#141414] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about your rehab..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent text-white font-inter text-sm px-3 py-2 outline-none border border-white/10 rounded-full focus:border-[#00e5ff] transition-colors"
              />
              <IconButton 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                sx={{ 
                  bgcolor: input.trim() ? '#00e5ff' : 'rgba(255,255,255,0.1)', 
                  color: 'black', 
                  '&:hover': { bgcolor: '#00b8d4' },
                  '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)' }
                }}
              >
                <PaperAirplaneIcon className="w-4 h-4 -rotate-45 ml-0.5" />
              </IconButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#b000ff] shadow-[0_0_20px_rgba(176,0,255,0.4)] flex items-center justify-center z-50 group hover:shadow-[0_0_30px_rgba(176,0,255,0.6)] transition-all"
      >
        <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
      </motion.button>
    </>
  );
}
