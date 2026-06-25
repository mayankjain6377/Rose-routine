import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdNotificationsActive, MdNotificationsOff, MdNotifications, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useNotifications } from '../../hooks/useNotifications';
import { scheduleTaskNotifications } from '../../utils/notificationService';
import { formatTime } from '../../utils/helpers';

// Calculate notify time label (N mins before task start)
const notifyTimeLabel = (startTime, advanceMin = 5) => {
  if (!startTime) return '';
  const [h, m] = startTime.split(':').map(Number);
  let total = h * 60 + m - advanceMin;
  if (total < 0) total += 24 * 60;
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  const ampm = nh >= 12 ? 'PM' : 'AM';
  const h12 = nh % 12 || 12;
  return `${h12}:${String(nm).padStart(2, '0')} ${ampm}`;
};

export default function NotificationSettings({ timetable, enabled, onToggle }) {
  const { permission, scheduled, enableNotifications, disableNotifications, testNotification } =
    useNotifications(timetable, enabled);

  const [expanded, setExpanded] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isActive = enabled && permission === 'granted';
  const isDenied = permission === 'denied';
  const isUnsupported = permission === 'unsupported';

  const statusColor = isActive ? '#52C49B' : isDenied ? '#E75480' : '#F4C95D';
  const statusText = isUnsupported
    ? 'Not supported in this browser'
    : isDenied
    ? 'Blocked — allow in browser settings'
    : isActive
    ? `Active · ${timetable.length} task${timetable.length !== 1 ? 's' : ''} scheduled`
    : 'Tap to enable reminders';

  const handleToggle = async () => {
    if (isUnsupported) return;
    setLoading(true);
    if (!enabled) {
      if (permission !== 'granted') {
        const result = await enableNotifications();
        if (result === 'granted') {
          onToggle(true);
        } else if (result === 'denied') {
          alert('🔕 Notifications blocked.\n\nTo fix: click the lock/info icon in your browser address bar → Notifications → Allow → refresh the page.');
        }
      } else {
        scheduleTaskNotifications(timetable);
        onToggle(true);
      }
    } else {
      disableNotifications();
      onToggle(false);
    }
    setLoading(false);
  };

  const handleTest = () => {
    testNotification();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3500);
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${statusColor}18` }}
        >
          {isActive
            ? <MdNotificationsActive style={{ color: statusColor }} className="text-xl" />
            : isDenied
            ? <MdNotificationsOff className="text-rose-primary text-xl" />
            : <MdNotifications className="text-gray-400 text-xl" />}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800">Task Reminders</p>
          <p className="text-xs font-medium truncate" style={{ color: statusColor }}>{statusText}</p>
        </div>

        <button
          onClick={() => setExpanded(v => !v)}
          className="text-gray-300 mr-1"
        >
          {expanded ? <MdExpandLess className="text-xl" /> : <MdExpandMore className="text-xl" />}
        </button>

        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={isUnsupported || loading}
          className={`w-12 h-6 rounded-full transition-all disabled:opacity-40 flex-shrink-0 ${isActive ? 'bg-rose-primary' : 'bg-gray-300'}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Expandable panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">

              {/* Info */}
              <div className="bg-rose-50 rounded-2xl p-3 text-xs text-rose-primary/80 leading-relaxed">
                🌸 You get a <strong>smart reminder 5 minutes before</strong> each task starts.
                Messages rotate daily — <strong>no repeat for 7 days!</strong>
              </div>

              {/* Denied */}
              {isDenied && (
                <div className="bg-red-50 rounded-2xl p-3 text-xs text-red-500 space-y-1">
                  <p className="font-bold">Notifications are blocked by your browser</p>
                  <p>Click the 🔒 lock icon in the address bar → Notifications → Allow → then refresh.</p>
                </div>
              )}

              {/* Task list */}
              {timetable.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Reminder Schedule
                  </p>
                  <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                    {timetable.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 py-2 px-3 rounded-2xl bg-gray-50">
                        <span className="text-base w-6 text-center">{task.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700 truncate">{task.name}</p>
                          <p className="text-xs text-gray-400">
                            Remind at <strong>{notifyTimeLabel(task.startTime)}</strong>
                            <span className="text-gray-300"> · starts {formatTime(task.startTime)}</span>
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-green-400' : 'bg-gray-300'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test button */}
              {permission === 'granted' && (
                <button
                  onClick={handleTest}
                  className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                    testSent
                      ? 'bg-green-100 text-green-600'
                      : 'bg-white border-2 border-rose-primary/20 text-rose-primary hover:bg-rose-50'
                  }`}
                >
                  {testSent ? '✓ Check your notifications!' : '🔔 Send Test Notification'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
