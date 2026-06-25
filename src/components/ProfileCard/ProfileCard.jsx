import React from 'react';
import { motion } from 'framer-motion';

export default function ProfileCard({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 glass-card"
    >
      <div className="relative">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-rose-primary"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-primary to-lavender flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 text-base">🌸</div>
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">Welcome back</p>
        <h2 className="font-bold text-gray-800 text-base">{user?.name || 'User'}</h2>
        <p className="text-xs text-gray-400">{user?.email || ''}</p>
      </div>
    </motion.div>
  );
}
