import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdEdit, MdFileDownload, MdLogout, MdDeleteForever, MdCameraAlt, MdNotifications } from 'react-icons/md';
import { FaTrophy, FaFire, FaStar } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { clearAllData, exportDataAsJSON, exportDataAsCSV } from '../utils/storage';
import BottomNav from '../components/Navbar/BottomNav';
import PageWrapper from '../components/PageWrapper';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser, timetable, streak, stats, todayAvg, settings, updateSettings, logout } = useApp();
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateUser({ profileImage: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleExportJSON = () => {
    const json = exportDataAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'rose-routine-data.json'; a.click();
  };

  const handleExportCSV = () => {
    const csv = exportDataAsCSV(timetable);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'rose-routine-data.csv'; a.click();
  };

  const handleReset = () => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      clearAllData();
      window.location.href = '/';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const statCards = [
    { label: 'Day Streak', value: streak.current, icon: <FaFire className="text-orange-500" />, sub: `Best: ${streak.best}` },
    { label: 'Avg Score', value: `${stats.weeklyAvg}%`, icon: <FaStar className="text-gold" />, sub: 'This week' },
    { label: 'Tasks Done', value: stats.totalTasksCompleted, icon: <FaTrophy className="text-rose-primary" />, sub: 'Total completed' },
  ];

  const menuItems = [
    { label: 'Edit Profile', icon: '👤', action: () => navigate('/setup') },
    { label: 'Edit Timetable', icon: '📋', action: () => navigate('/timetable') },
    { label: 'Achievements', icon: '🏆', action: () => navigate('/achievements') },
    { label: 'Export as JSON', icon: '📦', action: handleExportJSON },
    { label: 'Export as CSV', icon: '📊', action: handleExportCSV },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-28">
        {/* Hero */}
        <div
          className="px-5 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(180deg, rgba(231,84,128,0.12) 0%, transparent 100%)' }}
        >
          <div className="relative inline-block mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-rose-primary shadow-lg mx-auto">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-rose-primary to-lavender flex items-center justify-center text-3xl font-black text-white">
                  {user?.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-rose-primary text-white flex items-center justify-center shadow-md"
            >
              <MdCameraAlt className="text-sm" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <h2 className="font-black text-gray-800 text-xl">{user?.name || 'User'}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <span className="tag-pill mt-2 inline-block">
            {settings?.challenge === '7day' ? '⚡ 7 Day' : settings?.challenge === '21day' ? '🔥 21 Day' : '🎯 Custom'} Challenge
          </span>
        </div>

        <div className="px-5 space-y-4">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="glass-card p-3 text-center"
              >
                <div className="flex justify-center mb-1 text-xl">{s.icon}</div>
                <p className="text-xl font-black text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-500 font-semibold">{s.label}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Account section */}
          <div className="glass-card overflow-hidden">
            <p className="text-xs font-bold text-gray-400 px-4 pt-4 pb-2 uppercase tracking-wider">Account</p>
            {menuItems.map((item, i) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-rose-50 transition-all border-t border-gray-50 text-left"
              >
                <span className="text-xl w-7">{item.icon}</span>
                <span className="flex-1 text-sm font-semibold text-gray-700">{item.label}</span>
                <span className="text-gray-300 text-lg">›</span>
              </button>
            ))}

            {/* Notifications toggle */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-t border-gray-50">
              <span className="text-xl w-7">🔔</span>
              <span className="flex-1 text-sm font-semibold text-gray-700">Notifications</span>
              <button
                onClick={() => updateSettings({ notifications: !settings?.notifications })}
                className={`w-12 h-6 rounded-full transition-all ${settings?.notifications ? 'bg-rose-primary' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mx-0.5 ${settings?.notifications ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={handleReset}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 transition-all"
            >
              <MdDeleteForever className="text-red-400 text-xl" />
              <span className="text-sm font-semibold text-red-400">Reset All Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 border-t border-gray-50 transition-all"
            >
              <MdLogout className="text-gray-400 text-xl" />
              <span className="text-sm font-semibold text-gray-500">Logout</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-300 pb-2">Rose Routine v1.0 · Made with ❤️</p>
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
