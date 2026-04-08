import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../../features/authSlice';
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
      {/* BG elements */}
      <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-[#b000ff] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#141414]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 z-10"
      >
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold font-inter text-white mt-2">Start Recovery Today</h1>
          <p className="text-gray-400 font-inter text-sm">Create a Neuro Sync account</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-[purple]/20 border border-[#b000ff]/50 text-[#b000ff] text-sm font-bold font-inter text-center">{error}</div>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-white font-inter text-sm ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff] transition-colors font-inter"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white font-inter text-sm ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff] transition-colors font-inter"
              placeholder="patient@neurosync.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white font-inter text-sm ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#b000ff] transition-colors font-inter"
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ 
              bgcolor: '#b000ff', 
              color: 'white', 
              fontWeight: 'bold', 
              py: 1.5, 
              mt: 2,
              '&:hover': { bgcolor: '#8b00cc' },
              '&.Mui-disabled': { bgcolor: '#333', color: '#777' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Patient Profile'}
          </Button>
        </form>

        <div className="mt-6 flex justify-center border-t border-white/10 pt-4">
          <p className="text-gray-400 text-sm font-inter">
            Already have an account? <span onClick={() => navigate('/login')} className="text-[#b000ff] cursor-pointer hover:underline">Sign In</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
