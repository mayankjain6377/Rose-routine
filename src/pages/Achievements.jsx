import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { achievements as achievementDefs } from '../data/defaultTasks';
import BottomNav from '../components/Navbar/BottomNav';
import PageWrapper from '../components/PageWrapper';

export default function Achievements() {
  const navigate = useNavigate();
  const { unlockedAchievements } = useApp();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-28">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500">
            ←
          </button>
          <div>
            <h1 className="font-black text-gray-800 text-xl">Achievements</h1>
            <p className="text-xs text-gray-400">{unlockedAchievements.length}/{achievementDefs.length} unlocked</p>
          </div>
        </div>

        <div className="px-5 space-y-3">
          {/* Progress bar */}
          <div className="glass-card p-4">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
              <span>Progress</span>
              <span className="text-rose-primary">{unlockedAchievements.length}/{achievementDefs.length}</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedAchievements.length / achievementDefs.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-rose-primary to-lavender"
              />
            </div>
          </div>

          {/* Achievement cards */}
          {achievementDefs.map((a, i) => {
            const isUnlocked = unlockedAchievements.includes(a.id);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`glass-card p-4 flex items-center gap-4 transition-all ${
                  !isUnlocked ? 'opacity-40 grayscale' : ''
                }`}
                style={isUnlocked ? {
                  background: 'linear-gradient(135deg, rgba(244,201,93,0.1) 0%, rgba(231,84,128,0.05) 100%)',
                  borderColor: 'rgba(244,201,93,0.3)',
                } : {}}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                  isUnlocked ? 'bg-gradient-to-br from-yellow-50 to-rose-50 shadow-inner' : 'bg-gray-100'
                }`}>
                  {a.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                </div>
                {isUnlocked ? (
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500 text-sm">✓</span>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-300 text-sm">🔒</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
