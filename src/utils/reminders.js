import { dateToStr, getReminderLog, setReminderLog } from './storage';

const REMINDER_COOLDOWN_DAYS = 7;
const REMINDER_OFFSET_MINUTES = 10;
const REMINDER_WINDOW_MS = 60 * 1000;

const buildTemplates = (prefix, messages) => messages.map((body, index) => ({
  id: `${prefix}_${index + 1}`,
  title: 'Task reminder',
  body,
}));

const TEMPLATE_POOLS = {
  study: buildTemplates('study', [
    "It's time for study. Complete your class.",
    'Study time starts now. Focus on one topic at a time.',
    'Your class is about to begin. Open your notes and get ready.',
    'Time to learn. Stay steady and give this session your full attention.',
    'Study block is here. Keep your streak moving forward.',
    'This is your learning window. Start strong and stay consistent.',
    'Class time is close. Sit down, clear distractions, and begin.',
    'Learning is waiting. Start your study session now.',
  ]),
  fitness: buildTemplates('fitness', [
    'Fitness is important. Time to move your body.',
    'Workout time. Build the habit one session at a time.',
    'Your exercise slot is here. Start with a strong first rep.',
    'Movement matters. Get up and begin your fitness routine.',
    'This is your health break. Do the workout you planned.',
    'Time to train. Small effort today creates a stronger tomorrow.',
    'Fitness check-in: start your session now and keep going.',
    'Your body will thank you. Begin your workout now.',
  ]),
  food: buildTemplates('food', [
    'Food is a necessity. Time for your meal.',
    'Meal time is here. Refuel before you continue your day.',
    'Eat now and give your body the energy it needs.',
    'Your food break is ready. Take a proper meal.',
    'Do not skip this meal. Nourishment comes first.',
    'Time to eat. Slow down, refuel, and then return stronger.',
    'A balanced meal is waiting for you. Start now.',
    'Meal reminder: eat well and keep your routine on track.',
  ]),
  generic: buildTemplates('generic', [
    'It is time for {{taskName}}.',
    'Your next task is starting now: {{taskName}}.',
    'Task time. Focus on {{taskName}} and complete it well.',
    'Reminder: begin {{taskName}} now.',
    '{{taskName}} is due now. Stay on schedule.',
    'Time for {{taskName}}. Keep the momentum going.',
    'Your routine has reached {{taskName}}. Start it now.',
    'Next up: {{taskName}}. Take action now.',
  ]),
};

const KEYWORD_RULES = [
  { group: 'study', words: ['study', 'class', 'learn', 'learning', 'reading', 'read', 'homework', 'lesson'] },
  { group: 'fitness', words: ['exercise', 'workout', 'gym', 'run', 'walk', 'yoga', 'fitness', 'train'] },
  { group: 'food', words: ['food', 'eat', 'meal', 'breakfast', 'lunch', 'dinner', 'snack', 'hydrate', 'water'] },
];

const dayMs = 24 * 60 * 60 * 1000;

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
};

const getNextOccurrence = (task, now = new Date()) => {
  const { hours, minutes } = parseTime(task.startTime || '00:00');
  const occurrence = new Date(now);
  occurrence.setHours(hours, minutes, 0, 0);

  if (occurrence.getTime() < now.getTime()) {
    occurrence.setDate(occurrence.getDate() + 1);
  }

  return occurrence;
};

const getReminderDueTime = (task, now = new Date()) => {
  const occurrence = getNextOccurrence(task, now);
  occurrence.setMinutes(occurrence.getMinutes() - REMINDER_OFFSET_MINUTES);
  return occurrence;
};

const isWithinReminderWindow = (task, now = new Date()) => {
  const due = getReminderDueTime(task, now);
  const diff = now.getTime() - due.getTime();
  return diff >= 0 && diff <= REMINDER_WINDOW_MS;
};

const getTaskGroup = (task) => {
  const haystack = `${task?.name || ''} ${task?.category || ''}`.toLowerCase();
  const match = KEYWORD_RULES.find(rule => rule.words.some(word => haystack.includes(word)));
  return match?.group || 'generic';
};

const pickTemplate = (task, now = new Date()) => {
  const group = getTaskGroup(task);
  const templates = TEMPLATE_POOLS[group] || TEMPLATE_POOLS.generic;
  const reminderLog = getReminderLog();
  const history = reminderLog[task.id] || [];
  const cutoff = now.getTime() - (REMINDER_COOLDOWN_DAYS * dayMs);
  const recentTemplateIds = new Set(
    history
      .filter(entry => new Date(entry.sentAt).getTime() >= cutoff)
      .map(entry => entry.templateId)
  );

  const available = templates.filter(template => !recentTemplateIds.has(template.id));
  const pool = available.length > 0 ? available : templates;
  const seedText = `${task.id || ''}:${task.startTime || ''}:${dateToStr(now)}`;
  let indexSeed = 0;
  for (const char of seedText) {
    indexSeed = (indexSeed + char.charCodeAt(0)) % 100000;
  }

  return pool[indexSeed % pool.length];
};

export const buildReminderPayload = (task, now = new Date()) => {
  if (!task?.id || !task?.startTime) return null;
  if (!isWithinReminderWindow(task, now)) return null;

  const occurrenceDate = dateToStr(getNextOccurrence(task, now));
  const dueId = `${occurrenceDate}:${task.id}:${task.startTime}:${REMINDER_OFFSET_MINUTES}`;
  const reminderLog = getReminderLog();
  const history = reminderLog[task.id] || [];

  if (history.some(entry => entry.dueId === dueId)) {
    return null;
  }

  const template = pickTemplate(task, now);
  if (!template) return null;

  const taskName = task.name || 'your task';
  const body = template.body.replaceAll('{{taskName}}', taskName);
  const title = `${task.icon ? `${task.icon} ` : ''}${template.title}`;

  return {
    taskId: task.id,
    dueId,
    templateId: template.id,
    title,
    body,
  };
};

export const storeReminderPayload = (payload, now = new Date()) => {
  if (!payload?.taskId || !payload?.dueId || !payload?.templateId) return;

  const reminderLog = getReminderLog();
  const nextHistory = [...(reminderLog[payload.taskId] || []), {
    dueId: payload.dueId,
    templateId: payload.templateId,
    sentAt: now.toISOString(),
  }].filter(entry => now.getTime() - new Date(entry.sentAt).getTime() <= REMINDER_COOLDOWN_DAYS * dayMs);

  reminderLog[payload.taskId] = nextHistory;
  setReminderLog(reminderLog);
};

export const sendTaskReminder = (task, now = new Date()) => {
  const payload = buildReminderPayload(task, now);
  if (!payload) return false;
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false;

  storeReminderPayload(payload, now);
  new Notification(payload.title, {
    body: payload.body,
    tag: payload.dueId,
    renotify: false,
  });
  return true;
};

export const requestReminderPermission = async () => {
  if (typeof Notification === 'undefined') return 'unsupported';
  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return Notification.permission;
  }
  return Notification.requestPermission();
};

export const runReminderScan = (tasks, now = new Date()) => {
  if (!Array.isArray(tasks) || tasks.length === 0) return [];
  return tasks.filter(task => sendTaskReminder(task, now));
};
