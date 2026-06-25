import { getMessagesForTask, getSmartMessageIndex } from '../data/notificationMessages';

const NOTIF_ADVANCE_MINUTES = 5; // notify X minutes before task

// ─── Permission ───────────────────────────────────────────────────────────────

export const getPermissionStatus = () => {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
};

export const requestPermission = async () => {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  const result = await Notification.requestPermission();
  return result;
};

// ─── Smart message picker ─────────────────────────────────────────────────────

export const getMessageForTask = (task) => {
  const messages = getMessagesForTask(task.name);
  const idx = getSmartMessageIndex(task.id, messages);
  return messages[idx];
};

// ─── Send notification ────────────────────────────────────────────────────────

export const sendNotification = (title, body) => {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const n = new Notification(title, {
      body,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌸</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌸</text></svg>',
      tag: `rr-${Date.now()}`,
      requireInteraction: false,
    });
    // Auto-close after 6 seconds
    setTimeout(() => n.close(), 6000);
  } catch (e) {
    console.warn('Notification failed:', e);
  }
};

export const sendTestNotification = (task) => {
  if (task) {
    const msg = getMessageForTask(task);
    sendNotification(msg.title, msg.body);
  } else {
    sendNotification('🌸 Rose Routine', "Notifications are working! You'll be notified 5 mins before each task.");
  }
};

// ─── Time helpers ─────────────────────────────────────────────────────────────

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return -1;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

const msUntilMinutes = (targetMinutes) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowSeconds = now.getSeconds();
  const nowMs = now.getMilliseconds();

  let diffMinutes = targetMinutes - nowMinutes;
  if (diffMinutes <= 0) diffMinutes += 24 * 60; // push to tomorrow

  // Subtract already-elapsed seconds in current minute
  return diffMinutes * 60 * 1000 - nowSeconds * 1000 - nowMs;
};

// ─── Scheduler ────────────────────────────────────────────────────────────────

let _timers = [];

export const clearAllScheduledNotifications = () => {
  _timers.forEach(clearTimeout);
  _timers = [];
};

export const scheduleTaskNotifications = (timetable) => {
  clearAllScheduledNotifications();
  if (Notification.permission !== 'granted') return;
  if (!Array.isArray(timetable) || timetable.length === 0) return;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  timetable.forEach((task) => {
    if (!task.startTime) return;

    const taskMinutes = parseTimeToMinutes(task.startTime);
    if (taskMinutes < 0) return;

    // Notify NOTIF_ADVANCE_MINUTES before the task
    const notifyAtMinutes = taskMinutes - NOTIF_ADVANCE_MINUTES;
    const adjustedNotifyAt = notifyAtMinutes < 0 ? notifyAtMinutes + 24 * 60 : notifyAtMinutes;

    const ms = msUntilMinutes(adjustedNotifyAt);

    // Skip if would fire in more than 24h (edge case)
    if (ms > 24 * 60 * 60 * 1000) return;

    const scheduleOne = (delay) => {
      const tid = setTimeout(() => {
        const msg = getMessageForTask(task);
        sendNotification(msg.title, msg.body);
        // Reschedule for next day
        scheduleOne(24 * 60 * 60 * 1000);
      }, delay);
      _timers.push(tid);
    };

    scheduleOne(ms > 0 ? ms : ms + 24 * 60 * 60 * 1000);
  });

  console.log(`[RoseRoutine] Scheduled ${timetable.length} task notifications`);
};

export const initNotifications = async (timetable) => {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') {
    scheduleTaskNotifications(timetable);
    return 'scheduled';
  }
  return Notification.permission;
};
