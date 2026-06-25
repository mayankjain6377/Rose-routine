import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import { getTimetable } from './utils/storage';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';
import DailyReport from './pages/DailyReport';
import AchievementToast from './components/modals/AchievementToast';

const PrivateRoute = ({ children }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const SetupRoute = ({ children }) => {
  const { user } = useApp();
  const timetable = getTimetable();
  if (!user) return <Navigate to="/login" replace />;
  if (timetable.length === 0) return <Navigate to="/timetable" replace />;
  return children;
};

export default function App() {
  const location = useLocation();
  const { newAchievement } = useApp();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<PrivateRoute><ProfileSetup /></PrivateRoute>} />
          <Route path="/timetable" element={<PrivateRoute><Timetable /></PrivateRoute>} />
          <Route path="/dashboard" element={<SetupRoute><Dashboard /></SetupRoute>} />
          <Route path="/analytics" element={<SetupRoute><Analytics /></SetupRoute>} />
          <Route path="/calendar" element={<SetupRoute><Calendar /></SetupRoute>} />
          <Route path="/profile" element={<SetupRoute><Profile /></SetupRoute>} />
          <Route path="/achievements" element={<SetupRoute><Achievements /></SetupRoute>} />
          <Route path="/daily" element={<SetupRoute><DailyReport /></SetupRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {newAchievement && <AchievementToast achievement={newAchievement} />}
    </>
  );
}
