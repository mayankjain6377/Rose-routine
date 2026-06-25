import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiCalendar, HiChartBar, HiUser } from 'react-icons/hi';
import { HiPlusCircle } from 'react-icons/hi2';

const navItems = [
  { path: '/dashboard', icon: HiHome, label: 'Home' },
  { path: '/calendar', icon: HiCalendar, label: 'Calendar' },
  { path: null, icon: HiPlusCircle, label: 'Add', isAdd: true },
  { path: '/analytics', icon: HiChartBar, label: 'Analytics' },
  { path: '/profile', icon: HiUser, label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = item.path && location.pathname === item.path;
          const Icon = item.icon;

          if (item.isAdd) {
            return (
              <motion.button
                key="add"
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/timetable')}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-primary to-rose-dark flex items-center justify-center shadow-lg shadow-rose-primary/40">
                  <Icon className="text-white text-3xl" />
                </div>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all"
            >
              <Icon
                className={`text-2xl transition-colors ${
                  isActive ? 'text-rose-primary' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-rose-primary' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="w-1 h-1 rounded-full bg-rose-primary absolute bottom-2"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
