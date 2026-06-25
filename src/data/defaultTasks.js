export const defaultTasks = [
  {
    id: 'task_wakeup',
    name: 'Wake Up',
    icon: '☀️',
    startTime: '06:00',
    endTime: '06:15',
    color: 'gold',
    category: 'Morning Routine',
    repeatDaily: true,
  },
  {
    id: 'task_bath',
    name: 'Bath',
    icon: '🚿',
    startTime: '06:15',
    endTime: '06:45',
    color: 'blue',
    category: 'Morning Routine',
    repeatDaily: true,
  },
  {
    id: 'task_exercise',
    name: 'Exercise',
    icon: '🏋️',
    startTime: '06:45',
    endTime: '07:15',
    color: 'rose',
    category: 'Morning Routine',
    repeatDaily: true,
  },
  {
    id: 'task_study',
    name: 'Study',
    icon: '📚',
    startTime: '17:00',
    endTime: '18:00',
    color: 'lavender',
    category: 'Day Schedule',
    repeatDaily: true,
  },
  {
    id: 'task_work',
    name: 'Work',
    icon: '💼',
    startTime: '19:00',
    endTime: '20:30',
    color: 'orange',
    category: 'Day Schedule',
    repeatDaily: true,
  },
  {
    id: 'task_reading',
    name: 'Reading',
    icon: '📖',
    startTime: '21:00',
    endTime: '21:30',
    color: 'green',
    category: 'Day Schedule',
    repeatDaily: true,
  },
];

export const taskColors = [
  { id: 'rose', label: 'Rose', hex: '#E75480' },
  { id: 'orange', label: 'Orange', hex: '#FFA264' },
  { id: 'gold', label: 'Gold', hex: '#F4C95D' },
  { id: 'green', label: 'Green', hex: '#52C49B' },
  { id: 'blue', label: 'Blue', hex: '#64A2FF' },
  { id: 'lavender', label: 'Lavender', hex: '#C8A2FF' },
];

export const taskIcons = [
  '☀️', '🚿', '🏋️', '📚', '💼', '📖', '🧘', '🎵', '🍳', '🏃',
  '💪', '🎯', '💊', '🌙', '🎨', '💻', '🚴', '🧹', '🐕', '🌿',
  '📝', '🎤', '🧘‍♀️', '☕', '🥗', '📱', '🎮', '🛏️', '🌸', '⭐',
];

export const achievements = [
  { id: 'first_day', title: 'First Step', desc: 'Completed your first day', icon: '🌱', condition: 'firstDay' },
  { id: 'streak_7', title: '7-Day Streak', desc: 'Went strong for 7 days', icon: '🔥', condition: 'streak7' },
  { id: 'streak_21', title: '21-Day Habit', desc: 'Habits are forming!', icon: '💪', condition: 'streak21' },
  { id: 'perfect_day', title: 'Perfect Day', desc: 'Achieved 100% on a day', icon: '⭐', condition: 'perfectDay' },
  { id: 'productivity_90', title: '90% Achiever', desc: 'Day average above 90%', icon: '🎯', condition: 'productivity90' },
  { id: 'tasks_100', title: 'Century!', desc: 'Completed 100 tasks', icon: '🏆', condition: 'tasks100' },
];
