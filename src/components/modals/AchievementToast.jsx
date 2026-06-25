import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AchievementToast({ achievement }) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.9 }}
          className="fixed top-4 left-1/2 z-50 w-80"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div className="glass-card p-4 flex items-center gap-4 shadow-xl border border-yellow-200"
            style={{ background: 'linear-gradient(135deg, #fffbe6, #fff8fa)' }}>
            <div className="text-4xl">{achievement.icon}</div>
            <div>
              <p className="text-xs text-gold font-bold uppercase tracking-wider">Achievement Unlocked!</p>
              <p className="font-bold text-gray-800">{achievement.title}</p>
              <p className="text-xs text-gray-500">{achievement.desc}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
