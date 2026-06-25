import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { todayStr } from '../utils/storage';
import { getAvgColor, getAvgLabel, groupTasksByCategory } from '../utils/helpers';
import TaskCard from '../components/TaskCard/TaskCard';
import ProgressRing from '../components/Charts/ProgressRing';
import BottomNav from '../components/Navbar/BottomNav';
import PageWrapper from '../components/PageWrapper';
import { MiniBarChart } from '../components/Charts/Charts';

export default function DailyReport() {
  const navigate = useNavigate();
  const { timetable, todayProgress, todayAvg, updateProgress, allProgress } = useApp();
  const today = todayStr();

  const grouped = groupTasksByCategory(timetable);

  const chartData = timetable.map(t => ({
    name: t.name,
    avg: todayProgress[t.id] || 0,
  }));

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-28">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500">
            ←
          </button>
          <div className="flex-1">
            <h1 className="font-black text-gray-800">Daily Report</h1>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <button className="text-gray-400 text-xl">⋮</button>
        </div>

        <div className="px-5 space-y-4">
          {/* Day average card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5"
            style={{ background: 'linear-gradient(135deg, rgba(231,84,128,0.08) 0%, rgba(200,162,255,0.08) 100%)' }}
          >
            <div className="flex items-center gap-5">
              <ProgressRing value={todayAvg} size={100} strokeWidth={9} />
              <div>
                <p className="text-xs text-gray-400 font-medium">Day Average</p>
                <p className="text-3xl font-black text-gray-800">{todayAvg}%</p>
                <p className="text-sm font-semibold mt-1" style={{ color: getAvgColor(todayAvg) }}>
                  {getAvgLabel(todayAvg)}
                </p>
                <p className="text-xs text-gray-400">Keep going.</p>
              </div>
            </div>
            <div className="mt-4">
              <MiniBarChart data={chartData} />
            </div>
          </motion.div>

          {/* Tasks by category */}
          {Object.entries(grouped).map(([cat, tasks]) => (
            <div key={cat}>
              <p className="text-xs font-bold text-rose-primary mb-2 flex items-center gap-1">
                {cat === 'Morning Routine' ? '☀️' : cat === 'Night Routine' ? '🌙' : '🌤️'} {cat}
              </p>
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  progress={todayProgress[task.id] || 0}
                  onProgressChange={updateProgress}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
