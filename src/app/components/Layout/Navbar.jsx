import React, { useState } from 'react';
import { 
  Bars3Icon, 
  UserCircleIcon, 
  LanguageIcon, 
  BellIcon,
  SpeakerWaveIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { IconButton, Menu, MenuItem, Tooltip, Button, Avatar, Divider, Typography } from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/uiSlice';
import { logout } from '../../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const { language, setLanguage, t } = useAppContext();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const isSidebarOpen = useSelector(state => state.ui.isSidebarOpen);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  
  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  const handleLangOpen = (event) => setLangAnchorEl(event.currentTarget);
  const handleLangClose = (lang) => {
    if (typeof lang === 'string') setLanguage(lang);
    setLangAnchorEl(null);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Hamburger Trigger */}
        <IconButton size="small" className="text-white" onClick={() => dispatch(toggleSidebar())}>
          {isSidebarOpen ? <XMarkIcon className="w-6 h-6 text-[#00e5ff]" /> : <Bars3Icon className="w-6 h-6 text-white" />}
        </IconButton>
        <Link to="/" className="flex items-center gap-2 text-decoration-none">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#b000ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.5)]">
            <span className="text-white font-absans font-bold text-lg">N</span>
          </div>
          <span className="text-white font-absans text-xl tracking-wider font-bold hidden sm:block">Neuro Sync</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Tooltip title="Voice Guide / Text Support">
          <IconButton onClick={() => {}} className="text-[#00e5ff] hover:bg-[#00e5ff]/20 transition-all">
            <SpeakerWaveIcon className="w-6 h-6" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Alerts">
          <IconButton className="text-white hover:text-[#b000ff] transition-all">
            <BellIcon className="w-6 h-6" />
          </IconButton>
        </Tooltip>

        <div className="hidden sm:flex items-center">
          <IconButton onClick={handleLangOpen} className="text-white hover:bg-white/10 rounded-full px-3 py-1.5 flex gap-2">
            <LanguageIcon className="w-5 h-5" />
            <span className="text-sm font-inter">{language}</span>
          </IconButton>
          <Menu
            anchorEl={langAnchorEl}
            open={Boolean(langAnchorEl)}
            onClose={handleLangClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              sx: {
                bgcolor: '#141414',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)'
              }
            }}
          >
            <MenuItem onClick={() => handleLangClose('English')} className="font-inter">English</MenuItem>
            <MenuItem onClick={() => handleLangClose('Hindi')} className="font-inter">Hindi (हिंदी)</MenuItem>
            <MenuItem onClick={() => handleLangClose('Punjabi')} className="font-inter">Punjabi (ਪੰਜਾਬੀ)</MenuItem>
          </Menu>
        </div>

        <div className="flex items-center ml-2">
          <IconButton onClick={handleProfileOpen} className="text-white hover:bg-white/10 p-1">
            {isAuthenticated ? (
               <Avatar sx={{ bgcolor: '#00e5ff', color: 'black', width: 36, height: 36, fontWeight: 'bold' }}>
                 {user?.name?.charAt(0) || 'U'}
               </Avatar>
            ) : (
               <UserCircleIcon className="w-9 h-9 text-gray-400" />
            )}
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                bgcolor: '#141414',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                minWidth: '200px',
                mt: 1.5,
                borderRadius: '12px'
              }
            }}
          >
            {isAuthenticated ? [
               <div key="info" className="px-4 py-3 flex flex-col gap-1">
                 <Typography variant="body1" className="font-inter font-bold text-[#00e5ff]">{user?.name}</Typography>
                 <Typography variant="body2" className="font-inter text-gray-400 text-xs">{user?.email}</Typography>
                 <div className="mt-2 bg-[#00e676]/20 text-[#00e676] px-2 py-0.5 rounded text-[10px] w-fit font-bold tracking-widest uppercase">Sync Active</div>
               </div>,
               <Divider key="div" sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />,
               <MenuItem key="dash" onClick={() => { navigate('/dashboard'); handleProfileClose(); }} className="font-inter py-3 text-sm">My Dashboard</MenuItem>,
               <MenuItem key="logout" onClick={() => { dispatch(logout()); handleProfileClose(); }} className="font-inter py-3 text-sm text-red-400 hover:text-red-300">
                 <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                 {t("logout")}
               </MenuItem>
            ] : [
               <div key="info" className="px-4 py-3 pb-2 flex flex-col gap-1">
                 <Typography variant="body1" className="font-inter font-bold text-gray-300">{t("guestMode")}</Typography>
                 <Typography variant="body2" className="font-inter text-gray-500 text-xs leading-tight mt-1">Data will not be saved to cloud. Login to sync progress.</Typography>
               </div>,
               <Divider key="div" sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />,
               <MenuItem key="login" onClick={() => { navigate('/login'); handleProfileClose(); }} className="font-inter font-bold text-[#00e5ff] py-2 mx-2 rounded hover:bg-[#00e5ff]/10">
                 {t("loginToSync")}
               </MenuItem>,
               <MenuItem key="reg" onClick={() => { navigate('/signup'); handleProfileClose(); }} className="font-inter text-gray-300 py-2 mx-2 rounded hover:bg-white/5">
                 Create Profile
               </MenuItem>
            ]}
          </Menu>
        </div>
      </div>
    </nav>
  );
}
