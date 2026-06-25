// LocalStorage keys
const KEYS = {
  USER: 'rr_user',
  TIMETABLE: 'rr_timetable',
  DAILY_PROGRESS: 'rr_daily_progress',
  STREAK: 'rr_streak',
  ACHIEVEMENTS: 'rr_achievements',
  SETTINGS: 'rr_settings',
  LAST_QUOTE: 'rr_last_quote',
  REMINDER_LOG: 'rr_reminder_log',
};

// Generic get/set
const get = (key) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
};

const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
};

const remove = (key) => localStorage.removeItem(key);

// User
export const getUser = () => get(KEYS.USER);
export const setUser = (user) => set(KEYS.USER, user);
export const clearUser = () => remove(KEYS.USER);

// Timetable
export const getTimetable = () => get(KEYS.TIMETABLE) || [];
export const setTimetable = (tasks) => set(KEYS.TIMETABLE, tasks);

// Daily Progress — stored as { 'YYYY-MM-DD': { taskId: percentage, ... } }
export const getAllProgress = () => get(KEYS.DAILY_PROGRESS) || {};
export const getDayProgress = (dateStr) => {
  const all = getAllProgress();
  return all[dateStr] || {};
};
export const setDayProgress = (dateStr, progress) => {
  const all = getAllProgress();
  all[dateStr] = progress;
  set(KEYS.DAILY_PROGRESS, all);
};
export const updateTaskProgress = (dateStr, taskId, pct) => {
  const all = getAllProgress();
  if (!all[dateStr]) all[dateStr] = {};
  all[dateStr][taskId] = pct;
  set(KEYS.DAILY_PROGRESS, all);
};

// Streak
export const getStreak = () => get(KEYS.STREAK) || { current: 0, best: 0, lastDate: null };
export const setStreak = (streak) => set(KEYS.STREAK, streak);

export const recalcStreak = (allProgress, timetable) => {
  const today = todayStr();
  const streak = getStreak();
  
  if (streak.lastDate === today) return streak; // already updated today

  const avg = getDayAverage(getDayProgress(today), timetable);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = dateToStr(yesterday);

  const newStreak = { ...streak };
  if (avg >= 70) {
    // Successful day
    if (streak.lastDate === yStr || streak.lastDate === null) {
      newStreak.current = (streak.lastDate === null ? 0 : streak.current) + 1;
    } else {
      // Gap > 1 day — reset
      newStreak.current = 1;
    }
    newStreak.best = Math.max(newStreak.best, newStreak.current);
    newStreak.lastDate = today;
  }
  set(KEYS.STREAK, newStreak);
  return newStreak;
};

// Achievements
export const getAchievements = () => get(KEYS.ACHIEVEMENTS) || [];
export const unlockAchievement = (id) => {
  const current = getAchievements();
  if (!current.includes(id)) {
    const updated = [...current, id];
    set(KEYS.ACHIEVEMENTS, updated);
    return true; // newly unlocked
  }
  return false;
};

// Settings
export const getSettings = () => get(KEYS.SETTINGS) || { challenge: '21day', notifications: true };
export const setSettings = (s) => set(KEYS.SETTINGS, s);

export const getReminderLog = () => get(KEYS.REMINDER_LOG) || {};
export const setReminderLog = (log) => set(KEYS.REMINDER_LOG, log);

// Helper: today as YYYY-MM-DD
export const todayStr = () => dateToStr(new Date());
export const dateToStr = (d) => d.toISOString().split('T')[0];

// Calculate day average from progress object
export const getDayAverage = (progress, timetable) => {
  if (!timetable || timetable.length === 0) return 0;
  const total = timetable.reduce((sum, t) => sum + (progress[t.id] || 0), 0);
  return Math.round(total / timetable.length);
};

// Get weekly data
export const getWeeklyData = (allProgress, timetable) => {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = dateToStr(d);
    const dayProg = allProgress[dStr] || {};
    const avg = getDayAverage(dayProg, timetable);
    result.push({
      date: dStr,
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      avg,
    });
  }
  return result;
};

// Get monthly data
export const getMonthlyData = (allProgress, timetable) => {
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = dateToStr(d);
    const dayProg = allProgress[dStr] || {};
    const avg = getDayAverage(dayProg, timetable);
    result.push({
      date: dStr,
      day: d.getDate(),
      avg,
    });
  }
  return result;
};

// Export all data as JSON
export const exportDataAsJSON = () => {
  const data = {
    user: getUser(),
    timetable: getTimetable(),
    dailyProgress: getAllProgress(),
    streak: getStreak(),
    achievements: getAchievements(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

// Export all data as CSV
export const exportDataAsCSV = (timetable) => {
  const all = getAllProgress();
  const headers = ['Date', ...timetable.map(t => t.name), 'Daily Average'];
  const rows = Object.entries(all).sort().map(([date, progress]) => {
    const avg = getDayAverage(progress, timetable);
    const cols = timetable.map(t => progress[t.id] || 0);
    return [date, ...cols, avg];
  });
  return [headers, ...rows].map(r => r.join(',')).join('\n');
};

// Clear all data
export const clearAllData = () => {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
};

// Get total tasks completed count
export const getTotalTasksCompleted = (allProgress, timetable) => {
  let count = 0;
  Object.values(allProgress).forEach(dayProg => {
    timetable.forEach(t => {
      if ((dayProg[t.id] || 0) === 100) count++;
    });
  });
  return count;
};

// Get best day
export const getBestDay = (allProgress, timetable) => {
  let bestDate = null;
  let bestAvg = 0;
  Object.entries(allProgress).forEach(([date, progress]) => {
    const avg = getDayAverage(progress, timetable);
    if (avg > bestAvg) {
      bestAvg = avg;
      bestDate = date;
    }
  });
  return { date: bestDate, avg: bestAvg };
};
