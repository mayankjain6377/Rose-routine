import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { formatDate, formatTime, getTaskColorHex, getAvgColor, getAvgLabel } from '../../utils/helpers';
import { getDayAverage } from '../../utils/storage';
import { MiniBarChart } from '../Charts/Charts';

export default function DayDetailModal({ dateStr, progress, timetable, onClose }) {
  const avg = getDayAverage(progress, timetable);

  const chartData = timetable.map(t => ({
    name: t.name,
    avg: progress[t.id] || 0,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-gray-800">{formatDate(dateStr)}</h3>
              <p className="text-sm font-semibold" style={{ color: getAvgColor(avg) }}>
                {avg}% — {getAvgLabel(avg)}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <MdClose />
            </button>
          </div>

          <MiniBarChart data={chartData} />

          <div className="mt-4 space-y-3">
            {timetable.map(t => {
              const pct = progress[t.id] || 0;
              const hex = getTaskColorHex(t.color);
              return (
                <div key={t.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                  <span className="text-xl">{t.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">{t.name}</span>
                      <span className="text-xs font-bold" style={{ color: hex }}>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: hex }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatTime(t.startTime)} – {formatTime(t.endTime)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
