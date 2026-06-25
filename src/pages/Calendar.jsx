import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useApp } from '../context/AppContext';
import { getDayAverage, dateToStr } from '../utils/storage';
import { getDayStatusColor } from '../utils/helpers';
import DayDetailModal from '../components/modals/DayDetailModal';
import BottomNav from '../components/Navbar/BottomNav';
import PageWrapper from '../components/PageWrapper';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar() {
  const { timetable, allProgress } = useApp();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon = 0

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const getDayData = (day) => {
    const d = new Date(year, month, day);
    const dStr = dateToStr(d);
    const prog = allProgress[dStr];
    const avg = prog ? getDayAverage(prog, timetable) : null;
    return { dStr, avg, prog };
  };

  const today = dateToStr(new Date());

  // Build calendar grid
  const totalCells = startOffset + lastDay.getDate();
  const rows = Math.ceil(totalCells / 7);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-28">
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <h1 className="font-black text-gray-800 text-xl mb-4">Calendar</h1>

          {/* Month nav */}
          <div className="flex items-center justify-between glass-card p-3">
            <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
              <MdChevronLeft className="text-rose-primary" />
            </button>
            <span className="font-bold text-gray-800">
              {viewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
              <MdChevronRight className="text-rose-primary" />
            </button>
          </div>
        </div>

        <div className="px-5">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs font-bold text-gray-400 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="glass-card p-4">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: rows * 7 }).map((_, i) => {
                const day = i - startOffset + 1;
                const isValid = day >= 1 && day <= lastDay.getDate();
                if (!isValid) return <div key={i} />;

                const { dStr, avg } = getDayData(day);
                const isToday = dStr === today;
                const statusColor = getDayStatusColor(avg);
                const isFuture = dStr > today;

                return (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !isFuture && setSelectedDate(dStr)}
                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all ${
                      isToday
                        ? 'ring-2 ring-rose-primary bg-rose-50'
                        : isFuture
                        ? 'opacity-40 cursor-default'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <span className={isToday ? 'text-rose-primary' : 'text-gray-700'}>{day}</span>
                    {statusColor && !isFuture && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: statusColor }}
                      >
                        <span className="text-white text-xs font-black" style={{ fontSize: '8px' }}>
                          {avg}
                        </span>
                      </div>
                    )}
                    {!statusColor && !isFuture && avg === null && dStr <= today && (
                      <div className="w-1 h-1 rounded-full bg-gray-200 mt-1" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            {[
              { color: '#52C49B', label: '80%+' },
              { color: '#F4C95D', label: '50–79%' },
              { color: '#E75480', label: 'Below 50%' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: l.color }} />
                <span className="text-xs text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Recent days list */}
          <div className="mt-5">
            <h3 className="font-bold text-gray-800 mb-3">Recent Days</h3>
            <div className="space-y-2">
              {Object.entries(allProgress)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .slice(0, 7)
                .map(([date, prog]) => {
                  const avg = getDayAverage(prog, timetable);
                  const color = getDayStatusColor(avg);
                  const d = new Date(date + 'T00:00:00');
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className="w-full glass-card p-3 flex items-center gap-3 hover:bg-rose-50/50 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                        style={{ background: color || '#ddd' }}>
                        {d.getDate()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">
                          {d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </p>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                          <div className="h-full rounded-full" style={{ width: `${avg}%`, background: color }} />
                        </div>
                      </div>
                      <span className="text-sm font-black" style={{ color }}>{avg}%</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <DayDetailModal
            dateStr={selectedDate}
            progress={allProgress[selectedDate] || {}}
            timetable={timetable}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </AnimatePresence>

      <BottomNav />
    </PageWrapper>
  );
}
