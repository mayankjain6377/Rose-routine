import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getWeeklyData, getMonthlyData, getDayAverage, getAllProgress } from '../utils/storage';
import { WeeklyLineChart, MonthlyBarChart, DonutChart } from '../components/Charts/Charts';
import BottomNav from '../components/Navbar/BottomNav';
import PageWrapper from '../components/PageWrapper';

export default function Analytics() {
  const { timetable, allProgress, todayProgress, stats } = useApp();
  const [period, setPeriod] = useState('week');

  const weekData = getWeeklyData(allProgress, timetable);
  const monthData = getMonthlyData(allProgress, timetable);

  // Donut chart data
  const total = timetable.length;
  let completed = 0, partial = 0, missed = 0;
  timetable.forEach(t => {
    const p = todayProgress[t.id] || 0;
    if (p === 100) completed++;
    else if (p > 0) partial++;
    else missed++;
  });

  const weekAvg = weekData.length > 0
    ? Math.round(weekData.reduce((s, d) => s + d.avg, 0) / weekData.filter(d => d.avg > 0).length || 0)
    : 0;

  const trend = weekData.length >= 2
    ? weekData[weekData.length - 1].avg - weekData[weekData.length - 2].avg
    : 0;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-28">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex justify-between items-center">
          <h1 className="font-black text-gray-800 text-xl">Your Progress</h1>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {['week', 'month'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  period === p ? 'bg-white text-rose-primary shadow-sm' : 'text-gray-400'
                }`}
              >
                {p === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 space-y-4">
          {/* Weekly average */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">Weekly Average</p>
                <p className="text-4xl font-black text-gray-800">{weekAvg}%</p>
              </div>
              {trend !== 0 && (
                <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                  trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                }`}>
                  {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
              )}
            </div>
            {period === 'week' ? <WeeklyLineChart data={weekData} /> : <MonthlyBarChart data={monthData} />}
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Best Streak', value: `${stats.weeklyAvg || 0}%`, emoji: '🔥' },
              { label: 'Total Done', value: stats.totalTasksCompleted, emoji: '✅' },
              { label: 'Best Score', value: `${stats.bestDay?.avg || 0}%`, emoji: '⭐' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="glass-card p-3 text-center"
              >
                <div className="text-2xl mb-1">{s.emoji}</div>
                <p className="text-lg font-black text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <p className="text-sm font-bold text-gray-800 mb-1">Today's Breakdown</p>
            <p className="text-xs text-gray-400 mb-3">How your tasks are going</p>
            <DonutChart completed={completed} partial={partial} missed={missed} />
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { label: 'Completed', count: completed, color: '#52C49B' },
                { label: 'Partial', count: partial, color: '#F4C95D' },
                { label: 'Missed', count: missed, color: '#E75480' },
              ].map(item => (
                <div key={item.label} className="text-center p-2 rounded-xl bg-gray-50">
                  <p className="text-lg font-black" style={{ color: item.color }}>{item.count}</p>
                  <p className="text-xs text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Per-task breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card p-5"
          >
            <p className="text-sm font-bold text-gray-800 mb-4">Task Performance (Week)</p>
            <div className="space-y-3">
              {timetable.map(task => {
                const weekPcts = weekData.map(d => {
                  const dp = allProgress[d.date] || {};
                  return dp[task.id] || 0;
                });
                const taskAvg = weekPcts.length > 0
                  ? Math.round(weekPcts.reduce((a, b) => a + b, 0) / weekPcts.length)
                  : 0;
                return (
                  <div key={task.id} className="flex items-center gap-3">
                    <span className="text-xl w-7">{task.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">{task.name}</span>
                        <span className="text-xs font-bold text-rose-primary">{taskAvg}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${taskAvg}%` }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="h-full rounded-full bg-rose-primary"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
