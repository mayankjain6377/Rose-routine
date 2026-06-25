// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { MdNotificationsNone } from 'react-icons/md';
// import { FaFire } from 'react-icons/fa';
// import { useApp } from '../context/AppContext';
// import { getTimeBasedGreeting } from '../data/quotes';
// import { getAvgLabel, getAvgColor } from '../utils/helpers';
// import ProgressRing from '../components/Charts/ProgressRing';
// import QuoteCard from '../components/QuoteCard/QuoteCard';
// import TaskCard from '../components/TaskCard/TaskCard';
// import BottomNav from '../components/Navbar/BottomNav';
// import PageWrapper from '../components/PageWrapper';
// import { groupTasksByCategory } from '../utils/helpers';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, timetable, todayProgress, todayAvg, streak, quote, updateProgress } = useApp();

//   const grouped = groupTasksByCategory(timetable);
//   const completedCount = timetable.filter(t => (todayProgress[t.id] || 0) === 100).length;

//   const statCards = [
//     { label: 'Total Tasks', value: timetable.length, emoji: '📋' },
//     { label: 'Completed', value: completedCount, emoji: '✅' },
//     { label: 'Day Average', value: `${todayAvg}%`, emoji: '📊' },
//   ];

//   return (
//     <PageWrapper>
//       <div className="min-h-screen bg-bg pb-28">
//         {/* Header */}
//         <div className="px-5 pt-6 pb-4">
//           <div className="flex items-center justify-between mb-1">
//             <div>
//               <p className="text-xs text-gray-400 font-medium">{getTimeBasedGreeting()}</p>
//               <h1 className="text-2xl font-black text-gray-800">
//                 {user?.name?.split(' ')[0] || 'Hello'} 👋
//               </h1>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
//                 <FaFire className="text-orange-500" />
//                 <span className="text-xs font-bold text-orange-600">{streak.current}</span>
//               </div>
//               <button
//                 onClick={() => navigate('/profile')}
//                 className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-primary/30"
//               >
//                 {user?.profileImage ? (
//                   <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-br from-rose-primary to-lavender flex items-center justify-center text-white font-bold text-sm">
//                     {user?.name?.[0]?.toUpperCase() || '?'}
//                   </div>
//                 )}
//               </button>
//             </div>
//           </div>
//           <p className="text-xs text-gray-400">
//             {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
//           </p>
//         </div>

//         <div className="px-5 space-y-4">
//           {/* Progress + Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="glass-card p-5"
//           >
//             <p className="text-xs font-bold text-gray-500 mb-4">Today's Progress</p>
//             <div className="flex items-center gap-6">
//               <ProgressRing value={todayAvg} size={110} strokeWidth={10} />
//               <div className="flex-1">
//                 <p className="text-lg font-black" style={{ color: getAvgColor(todayAvg) }}>
//                   {getAvgLabel(todayAvg)}
//                 </p>
//                 <p className="text-xs text-gray-400 mb-3">Keep it up!</p>
//                 <div className="space-y-1">
//                   {timetable.slice(0, 3).map(t => (
//                     <div key={t.id} className="flex items-center gap-2">
//                       <span className="text-xs">{t.icon}</span>
//                       <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
//                         <div
//                           className="h-full rounded-full bg-rose-primary"
//                           style={{ width: `${todayProgress[t.id] || 0}%` }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Quote */}
//           <QuoteCard quote={quote} />

//           {/* Stat cards */}
//           <div className="grid grid-cols-3 gap-3">
//             {statCards.map((s, i) => (
//               <motion.div
//                 key={s.label}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.07 }}
//                 className="glass-card p-4 text-center"
//               >
//                 <div className="text-2xl mb-1">{s.emoji}</div>
//                 <p className="text-xl font-black text-gray-800">{s.value}</p>
//                 <p className="text-xs text-gray-400 font-medium">{s.label}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Today's tasks */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="font-black text-gray-800">Today's Overview</h2>
//               <button
//                 onClick={() => navigate('/daily')}
//                 className="text-xs text-rose-primary font-semibold"
//               >
//                 View all →
//               </button>
//             </div>

//             {Object.entries(grouped).map(([cat, tasks]) => (
//               <div key={cat} className="mb-4">
//                 <p className="text-xs font-bold text-rose-primary mb-2 flex items-center gap-1">
//                   {cat === 'Morning Routine' ? '☀️' : cat === 'Night Routine' ? '🌙' : '🌤️'} {cat}
//                 </p>
//                 {tasks.map(task => (
//                   <TaskCard
//                     key={task.id}
//                     task={task}
//                     progress={todayProgress[task.id] || 0}
//                     onProgressChange={updateProgress}
//                   />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <BottomNav />
//     </PageWrapper>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFire } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { getTimeBasedGreeting } from '../data/quotes';
import { getAvgLabel, getAvgColor, groupTasksByCategory } from '../utils/helpers';
import { getPermissionStatus } from '../utils/notificationService';
import ProgressRing from '../components/Charts/ProgressRing';
import QuoteCard from '../components/QuoteCard/QuoteCard';
import TaskCard from '../components/TaskCard/TaskCard';
import BottomNav from '../components/Navbar/BottomNav';
import NotificationBanner from '../components/NotificationSettings/NotificationBanner';
import PageWrapper from '../components/PageWrapper';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, timetable, todayProgress, todayAvg, streak, quote, updateProgress, settings, updateSettings } = useApp();

  // Show banner if permission not yet decided AND notifications not explicitly disabled
  const [showBanner, setShowBanner] = useState(
    () => getPermissionStatus() === 'default' && settings?.notifications !== false
  );

  const grouped = groupTasksByCategory(timetable);
  const completedCount = timetable.filter(t => (todayProgress[t.id] || 0) === 100).length;

  const statCards = [
    { label: 'Total Tasks', value: timetable.length, emoji: '📋' },
    { label: 'Completed', value: completedCount, emoji: '✅' },
    { label: 'Day Average', value: `${todayAvg}%`, emoji: '📊' },
  ];

  const handleBannerGranted = () => {
    updateSettings({ notifications: true });
    setShowBanner(false);
  };

  const handleBannerDismiss = () => {
    setShowBanner(false);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-28">
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-xs text-gray-400 font-medium">{getTimeBasedGreeting()}</p>
              <h1 className="text-2xl font-black text-gray-800">
                {user?.name?.split(' ')[0] || 'Hello'} 👋
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {streak.current > 0 && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                  <FaFire className="text-orange-500 text-sm" />
                  <span className="text-xs font-bold text-orange-600">{streak.current}</span>
                </div>
              )}
              <button
                onClick={() => navigate('/profile')}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-primary/30"
              >
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-primary to-lavender flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Notification banner */}
        <AnimatePresence>
          {showBanner && (
            <NotificationBanner
              timetable={timetable}
              onDismiss={handleBannerDismiss}
              onGranted={handleBannerGranted}
            />
          )}
        </AnimatePresence>

        <div className="px-5 space-y-4">
          {/* Progress ring + mini task bars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5"
          >
            <p className="text-xs font-bold text-gray-500 mb-4">Today's Progress</p>
            <div className="flex items-center gap-6">
              <ProgressRing value={todayAvg} size={110} strokeWidth={10} />
              <div className="flex-1">
                <p className="text-lg font-black" style={{ color: getAvgColor(todayAvg) }}>
                  {getAvgLabel(todayAvg)}
                </p>
                <p className="text-xs text-gray-400 mb-3">Keep it up!</p>
                <div className="space-y-1.5">
                  {timetable.slice(0, 4).map(t => (
                    <div key={t.id} className="flex items-center gap-2">
                      <span className="text-xs w-4">{t.icon}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${todayProgress[t.id] || 0}%`, background: '#E75480' }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">
                        {todayProgress[t.id] || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <QuoteCard quote={quote} />

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl mb-1">{s.emoji}</div>
                <p className="text-xl font-black text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-gray-800">Today's Overview</h2>
              <button onClick={() => navigate('/daily')} className="text-xs text-rose-primary font-semibold">
                View all →
              </button>
            </div>
            {Object.entries(grouped).map(([cat, tasks]) => (
              <div key={cat} className="mb-4">
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
      </div>
      <BottomNav />
    </PageWrapper>
  );
}
