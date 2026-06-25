export const formatTime = (time24) => {
  if (!time24) return '';
  const [h, m] = time24.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
};

export const getTaskColorHex = (colorId) => {
  const map = {
    rose: '#E75480',
    lavender: '#C8A2FF',
    gold: '#F4C95D',
    green: '#52C49B',
    blue: '#64A2FF',
    orange: '#FFA264',
  };
  return map[colorId] || '#E75480';
};

export const getAvgColor = (avg) => {
  if (avg >= 80) return '#52C49B';   // green
  if (avg >= 50) return '#F4C95D';   // gold
  return '#E75480';                   // rose
};

export const getAvgLabel = (avg) => {
  if (avg >= 90) return 'Excellent!';
  if (avg >= 80) return 'Great job!';
  if (avg >= 70) return 'Good progress';
  if (avg >= 50) return 'Keep going';
  return 'Just start';
};

export const getAvgBgClass = (avg) => {
  if (avg >= 80) return 'bg-emerald-100 text-emerald-700';
  if (avg >= 50) return 'bg-yellow-100 text-yellow-700';
  return 'bg-rose-100 text-rose-600';
};

export const generateId = () => `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

export const formatDateShort = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const groupTasksByCategory = (tasks) => {
  const groups = {};
  tasks.forEach(t => {
    const cat = t.category || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(t);
  });
  return groups;
};

export const getDayStatusColor = (avg) => {
  if (avg === null || avg === undefined) return null;
  if (avg >= 80) return '#52C49B';
  if (avg >= 50) return '#F4C95D';
  return '#E75480';
};
