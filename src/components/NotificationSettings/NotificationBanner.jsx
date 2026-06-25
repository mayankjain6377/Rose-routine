import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdNotificationsActive } from 'react-icons/md';
import { requestPermission, scheduleTaskNotifications } from '../../utils/notificationService';

export default function NotificationBanner({ timetable, onDismiss, onGranted }) {
  const [loading, setLoading] = useState(false);

  const handleEnable = async () => {
    setLoading(true);
    const result = await requestPermission();
    setLoading(false);
    if (result === 'granted') {
      scheduleTaskNotifications(timetable);
      onGranted && onGranted();
    } else {
      onDismiss && onDismiss();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="mx-5 mb-3 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E75480, #C23B6A)' }}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <MdNotificationsActive className="text-white text-xl" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">Enable Task Reminders</p>
          <p className="text-white/75 text-xs">Get notified 5 mins before each task — smart messages, no repeats!</p>
        </div>
        <button onClick={onDismiss} className="text-white/60 hover:text-white ml-1">
          <MdClose className="text-xl" />
        </button>
      </div>
      <div className="flex gap-2 px-4 pb-3">
        <button
          onClick={onDismiss}
          className="flex-1 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
        >
          Not now
        </button>
        <button
          onClick={handleEnable}
          disabled={loading}
          className="flex-1 py-2 rounded-xl bg-white text-rose-primary text-xs font-bold disabled:opacity-60"
        >
          {loading ? 'Enabling…' : '🔔 Enable'}
        </button>
      </div>
    </motion.div>
  );
}
