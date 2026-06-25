import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getPermissionStatus,
  requestPermission,
  scheduleTaskNotifications,
  clearAllScheduledNotifications,
  sendTestNotification,
} from '../utils/notificationService';

export const useNotifications = (timetable, enabled) => {
  const [permission, setPermission] = useState(getPermissionStatus());
  const [scheduled, setScheduled] = useState(false);
  const rescheduleRef = useRef(null);

  // Schedule / clear when enabled state or timetable changes
  useEffect(() => {
    if (enabled && permission === 'granted') {
      scheduleTaskNotifications(timetable);
      setScheduled(true);

      // Re-schedule every midnight to refresh daily timers
      const now = new Date();
      const msTillMidnight =
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

      rescheduleRef.current = setTimeout(() => {
        scheduleTaskNotifications(timetable);
        // After first midnight, re-schedule every 24h
        rescheduleRef.current = setInterval(() => {
          scheduleTaskNotifications(timetable);
        }, 24 * 60 * 60 * 1000);
      }, msTillMidnight);
    } else {
      clearAllScheduledNotifications();
      setScheduled(false);
    }

    return () => {
      clearTimeout(rescheduleRef.current);
      clearInterval(rescheduleRef.current);
    };
  }, [timetable, enabled, permission]);

  // Ask browser permission and, if granted, schedule
  const enableNotifications = useCallback(async () => {
    const result = await requestPermission();
    setPermission(result);
    if (result === 'granted') {
      scheduleTaskNotifications(timetable);
      setScheduled(true);
    }
    return result;
  }, [timetable]);

  const disableNotifications = useCallback(() => {
    clearAllScheduledNotifications();
    setScheduled(false);
  }, []);

  const testNotification = useCallback((task) => {
    sendTestNotification(task || (timetable.length > 0 ? timetable[0] : null));
  }, [timetable]);

  return { permission, scheduled, enableNotifications, disableNotifications, testNotification };
};
