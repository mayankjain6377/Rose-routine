import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getTimetable } from '../utils/storage';

const challenges = [
  { id: '7day', label: '7 Day', sub: 'Challenge', emoji: '⚡' },
  { id: '21day', label: '21 Day', sub: 'Challenge', emoji: '🔥' },
  { id: 'custom', label: 'Custom', sub: 'Routine', emoji: '🎯' },
];

export default function Welcome() {
  const navigate = useNavigate();
  const { user, updateSettings } = useApp();

  const handleStart = (challengeId) => {
    updateSettings({ challenge: challengeId });
    if (user) {
      const timetable = getTimetable();
      navigate(timetable.length > 0 ? '/dashboard' : '/timetable');
    } else {
      navigate('/login');
    }
  };

  const handleContinue = () => {
    if (user) {
      const timetable = getTimetable();
      navigate(timetable.length > 0 ? '/dashboard' : '/timetable');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="page-container min-h-screen hero-gradient flex flex-col overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C8A2FF 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E75480 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 p-6"
      >
        <span className="text-2xl">🌸</span>
        <span className="font-black text-rose-primary text-lg tracking-tight">Rose Routine</span>
      </motion.div>

      {/* Hero Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="flex-1 flex items-center justify-center px-6"
      >
        <div className="text-center">
          {/* Illustration */}
          <div className="relative mx-auto w-52 h-52 mb-6">
            <div className="absolute inset-0 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #E75480 0%, transparent 70%)' }} />
            <div className="w-full h-full flex items-center justify-center text-8xl animate-float">
              🌸
            </div>
            {/* Floating elements */}
            <motion.div className="absolute top-4 right-4 text-3xl"
              animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }}>⭐</motion.div>
            <motion.div className="absolute bottom-6 left-4 text-2xl"
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}>💫</motion.div>
            <motion.div className="absolute top-10 left-2 text-2xl"
              animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}>✨</motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-4xl font-black leading-tight mb-3"
            style={{ color: '#E75480' }}
          >
            Plan Better.<br />Live Better.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-gray-500 text-base leading-relaxed px-4"
          >
            Create habits, follow your timetable and track progress every day.
          </motion.p>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="px-6 pb-12 space-y-4"
      >
        <button
          onClick={() => handleStart('21day')}
          className="btn-primary w-full text-base py-4"
        >
          🚀 Get Started
        </button>

        {user && (
          <button onClick={handleContinue} className="btn-secondary w-full">
            Continue my journey →
          </button>
        )}

        {/* Challenge cards */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {challenges.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStart(c.id)}
              className="glass-card p-3 flex flex-col items-center gap-1 hover:border-rose-primary/40 transition-all"
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-xs font-bold text-gray-700">{c.label}</span>
              <span className="text-xs text-gray-400">{c.sub}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
