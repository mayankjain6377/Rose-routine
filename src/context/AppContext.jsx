import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getUser, setUser as saveUser,
  getTimetable, setTimetable as saveTimetable,
  getAllProgress, getDayProgress, updateTaskProgress,
  getStreak, setStreak,
  getAchievements, unlockAchievement,
  getSettings, setSettings as saveSettings,
  getDayAverage, todayStr, getTotalTasksCompleted, getBestDay,
} from '../utils/storage';
import { achievements as achievementDefs } from '../data/defaultTasks';
import { getRandomQuote } from '../data/quotes';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [timetable, setTimetableState] = useState(getTimetable());
  const [allProgress, setAllProgressState] = useState(getAllProgress());
  const [streak, setStreakState] = useState(getStreak());
  const [unlockedAchievements, setUnlockedAchievements] = useState(getAchievements());
  const [settings, setSettingsState] = useState(getSettings());
  const [todayProgress, setTodayProgress] = useState(getDayProgress(todayStr()));
  const [quote, setQuote] = useState(getRandomQuote());
  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const todayAvg = getDayAverage(todayProgress, timetable);

  const updateUser = useCallback((data) => {
    const updated = { ...getUser(), ...data };
    saveUser(updated);
    setUserState(updated);
  }, []);

  const updateTimetable = useCallback((tasks) => {
    saveTimetable(tasks);
    setTimetableState(tasks);
  }, []);

  const checkAchievementsInternal = useCallback((progress, currentTimetable, currentStreak) => {
    const avg = getDayAverage(progress, currentTimetable);
    const all = getAllProgress();
    const total = getTotalTasksCompleted(all, currentTimetable);

    const checks = {
      firstDay: Object.keys(all).length >= 1,
      streak7: currentStreak.current >= 7,
      streak21: currentStreak.current >= 21,
      perfectDay: avg === 100,
      productivity90: avg >= 90,
      tasks100: total >= 100,
    };

    achievementDefs.forEach(a => {
      if (checks[a.condition]) {
        const isNew = unlockAchievement(a.id);
        if (isNew) {
          setUnlockedAchievements(getAchievements());
          setNewAchievement(a);
          setTimeout(() => setNewAchievement(null), 4000);
        }
      }
    });
  }, []);

  const updateProgress = useCallback((taskId, pct) => {
    const today = todayStr();
    updateTaskProgress(today, taskId, pct);
    const updated = getDayProgress(today);
    setTodayProgress(updated);
    const newAllProgress = getAllProgress();
    setAllProgressState(newAllProgress);

    // Update streak
    const avg = getDayAverage(updated, timetable);
    const currentStreak = getStreak();
    if (avg >= 70 && currentStreak.lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split('T')[0];
      let newCurrent = 1;
      if (currentStreak.lastDate === yStr) {
        newCurrent = currentStreak.current + 1;
      } else if (currentStreak.lastDate === null) {
        newCurrent = 1;
      }
      const newStreak = {
        current: newCurrent,
        best: Math.max(currentStreak.best, newCurrent),
        lastDate: today,
      };
      setStreak(newStreak);
      setStreakState(newStreak);
      checkAchievementsInternal(updated, timetable, newStreak);
    } else {
      checkAchievementsInternal(updated, timetable, currentStreak);
    }
  }, [timetable, checkAchievementsInternal]);

  const updateSettings = useCallback((data) => {
    const updated = { ...getSettings(), ...data };
    saveSettings(updated);
    setSettingsState(updated);
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
  }, []);

  const refreshData = useCallback(() => {
    setAllProgressState(getAllProgress());
    setTodayProgress(getDayProgress(todayStr()));
    setStreakState(getStreak());
    setUnlockedAchievements(getAchievements());
    setTimetableState(getTimetable());
  }, []);

  const stats = {
    totalTasksCompleted: getTotalTasksCompleted(allProgress, timetable),
    bestDay: getBestDay(allProgress, timetable),
    weeklyAvg: (() => {
      let total = 0, count = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const dStr = d.toISOString().split('T')[0];
        const prog = allProgress[dStr];
        if (prog && Object.keys(prog).length > 0) {
          total += getDayAverage(prog, timetable);
          count++;
        }
      }
      return count > 0 ? Math.round(total / count) : 0;
    })(),
  };

  return (
    <AppContext.Provider value={{
      user, updateUser,
      timetable, updateTimetable,
      allProgress,
      todayProgress, updateProgress,
      todayAvg,
      streak,
      unlockedAchievements,
      settings, updateSettings,
      quote, refreshQuote: () => setQuote(getRandomQuote()),
      newAchievement,
      stats,
      logout,
      refreshData,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
