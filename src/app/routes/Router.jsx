import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import MainLayout from '../components/Layout/MainLayout';
import Home from '../pages/Home/Home';
import PatientDashboard from '../pages/Dashboard/PatientDashboard';
import Therapy from '../pages/Therapy/Therapy';
import DoctorDashboard from '../pages/DoctorDashboard/DoctorDashboard';
import TeleRehab from '../pages/TeleRehab/TeleRehab';
import VRRehab from '../pages/VR/VRRehab';
import GameRehab from '../pages/Game/GameRehab';
import VideoLibrary from '../pages/VideoLibrary/VideoLibrary';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import EmotionTherapy from '../pages/EmotionTherapy/EmotionTherapy';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        {/* Landing Page open to everyone */}
        <Route index element={<Home />} />
        
        {/* Protected Features */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="therapy" element={<Therapy />} />
          <Route path="emotion-therapy" element={<EmotionTherapy />} />
          <Route path="doctor" element={<DoctorDashboard />} />
          <Route path="tele-rehab" element={<TeleRehab />} />
          <Route path="vr" element={<VRRehab />} />
          <Route path="game" element={<GameRehab />} />
          <Route path="videos" element={<VideoLibrary />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </>
  )
);

export default router;
