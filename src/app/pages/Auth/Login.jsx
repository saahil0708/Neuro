import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../features/authSlice';
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
      {/* BG elements */}
      <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-[#00e5ff] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#141414]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 z-10"
      >
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#b000ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.5)]">
            <span className="text-white font-absans font-bold text-2xl">N</span>
          </div>
          <h1 className="text-2xl font-bold font-inter text-white mt-2">Welcome Back</h1>
          <p className="text-gray-400 font-inter text-sm">Sign in to sync your rehab data</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-[#ff3d00]/20 border border-[#ff3d00]/50 text-[#ff3d00] text-sm font-bold font-inter text-center">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowRightOnRectangleIcon className="w-5" />}
            sx={{ 
              bgcolor: '#00e5ff', 
              color: 'black', 
              fontWeight: 'bold', 
              py: 1.5, 
              mt: 2,
              '&:hover': { bgcolor: '#00b8d4' },
              '&.Mui-disabled': { bgcolor: '#333', color: '#777' }
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In with Cloud Sync'}
          </Button>
        </form>

        <div className="mt-6 flex justify-center border-t border-white/10 pt-4">
          <p className="text-gray-400 text-sm font-inter">
            Don't have an account? <span onClick={() => navigate('/signup')} className="text-[#00e5ff] cursor-pointer hover:underline">Sign up for Rehab</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
