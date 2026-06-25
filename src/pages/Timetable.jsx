import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdDelete, MdDragIndicator, MdCheck } from 'react-icons/md';
import { useApp } from '../context/AppContext';
import { taskColors, taskIcons, defaultTasks } from '../data/defaultTasks';
import { generateId } from '../utils/helpers';
import { formatTime, getTaskColorHex } from '../utils/helpers';
import PageWrapper from '../components/PageWrapper';

const CATEGORIES = ['Morning Routine', 'Day Schedule', 'Evening Routine', 'Night Routine', 'Other'];

const MINUTE_STEPS = Array.from({ length: 12 }, (_, index) => index * 5);

const padTimePart = (value) => String(value).padStart(2, '0');

const parseTime = (timeValue) => {
  const [hour, minute] = (timeValue || '00:00').split(':').map(Number);
  return {
    hour: Number.isFinite(hour) ? hour : 0,
    minute: Number.isFinite(minute) ? minute : 0,
  };
};

const formatClockTime = (hour, minute) => `${padTimePart(hour)}:${padTimePart(minute)}`;

const toMinutes = (timeValue) => {
  const { hour, minute } = parseTime(timeValue);
  return hour * 60 + minute;
};

const compareTasksByTime = (left, right) => {
  const startDiff = toMinutes(left.startTime) - toMinutes(right.startTime);
  if (startDiff !== 0) return startDiff;

  const endDiff = toMinutes(left.endTime) - toMinutes(right.endTime);
  if (endDiff !== 0) return endDiff;

  return (left.name || '').localeCompare(right.name || '');
};

const getDurationText = (startTime, endTime) => {
  if (!startTime || !endTime) return 'Pick both times to see total duration';

  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);
  const diff = endMinutes - startMinutes;

  if (diff < 0) return 'End time must be after start time';

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (hours === 0 && minutes === 0) return '0 min';
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
};

const polarStyle = (index, total, radius) => {
  const angle = ((index / total) * 360) - 90;
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;

  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: 'translate(-50%, -50%)',
  };
};

function ClockPickerModal({ title, value, mode, setMode, onChange, onClose }) {
  const { hour, minute } = parseTime(value);
  const hourOuter = Array.from({ length: 12 }, (_, index) => index + 1);
  const hourInner = Array.from({ length: 12 }, (_, index) => index + 13);

  const setHour = (nextHour) => {
    onChange(formatClockTime(nextHour, minute));
    setMode('minute');
  };

  const setMinute = (nextMinute) => {
    onChange(formatClockTime(hour, nextMinute));
    onClose();
  };

  const selectedHour = hour === 0 ? 12 : hour;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/40 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-[430px] bg-white rounded-t-3xl p-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
            <h3 className="text-lg font-black text-gray-800">Clock Picker</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 text-gray-500">✕</button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setMode('hour')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'hour' ? 'bg-rose-primary text-white shadow-sm' : 'bg-rose-50 text-rose-primary'}`}
          >
            Hour
          </button>
          <button
            onClick={() => setMode('minute')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'minute' ? 'bg-rose-primary text-white shadow-sm' : 'bg-rose-50 text-rose-primary'}`}
          >
            Minute
          </button>
        </div>

        <div className="flex items-center justify-center mb-5">
          <div className="w-28 h-28 rounded-full bg-rose-50 border-4 border-white shadow-[0_10px_30px_rgba(231,84,128,0.14)] flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-gray-800">{padTimePart(hour)}</span>
            <span className="text-xs text-gray-400 font-semibold">{padTimePart(minute)}</span>
          </div>
        </div>

        <div className="relative mx-auto w-[290px] h-[290px] rounded-full bg-gradient-to-br from-rose-50 via-white to-pink-50 border border-rose-primary/10 shadow-inner overflow-hidden">
          <div className="absolute inset-8 rounded-full border border-dashed border-rose-primary/15" />
          <div className="absolute inset-[88px] rounded-full bg-white shadow-[0_8px_25px_rgba(231,84,128,0.08)] border border-rose-primary/10" />

          {mode === 'hour' ? (
            <>
              {hourOuter.map((item, index) => {
                const active = selectedHour === item && hour < 13;
                return (
                  <button
                    key={`outer-${item}`}
                    type="button"
                    onClick={() => setHour(item)}
                    className={`absolute w-10 h-10 rounded-full text-sm font-bold transition-all ${active ? 'bg-rose-primary text-white shadow-lg scale-110' : 'bg-white text-gray-600 border border-rose-primary/10 hover:border-rose-primary/30'}`}
                    style={polarStyle(index, hourOuter.length, 104)}
                  >
                    {item}
                  </button>
                );
              })}
              {hourInner.map((item, index) => {
                const active = hour === item;
                return (
                  <button
                    key={`inner-${item}`}
                    type="button"
                    onClick={() => setHour(item)}
                    className={`absolute w-9 h-9 rounded-full text-xs font-bold transition-all ${active ? 'bg-rose-primary text-white shadow-lg scale-110' : 'bg-rose-50 text-gray-500 border border-rose-primary/10 hover:border-rose-primary/30'}`}
                    style={polarStyle(index, hourInner.length, 62)}
                  >
                    {item}
                  </button>
                );
              })}
            </>
          ) : (
            MINUTE_STEPS.map((item, index) => {
              const active = minute === item;
              return (
                <button
                  key={`minute-${item}`}
                  type="button"
                  onClick={() => setMinute(item)}
                  className={`absolute w-11 h-11 rounded-full text-sm font-bold transition-all ${active ? 'bg-rose-primary text-white shadow-lg scale-110' : 'bg-white text-gray-600 border border-rose-primary/10 hover:border-rose-primary/30'}`}
                  style={polarStyle(index, MINUTE_STEPS.length, 104)}
                >
                  {padTimePart(item)}
                </button>
              );
            })
          )}

          <button
            type="button"
            onClick={() => setMode(mode === 'hour' ? 'minute' : 'hour')}
            className="absolute inset-[120px] rounded-full bg-white border border-rose-primary/10 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{mode}</span>
            <span className="text-sm font-bold text-gray-800">Tap to switch</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          {mode === 'hour' ? 'Choose the hour first, then set minutes.' : 'Minutes move in 5-minute steps.'}
        </p>
      </motion.div>
    </motion.div>
  );
}

function ClockField({ label, value, hint, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-rose-primary/15 bg-white px-4 py-4 shadow-[0_4px_18px_rgba(231,84,128,0.05)] transition-all hover:border-rose-primary/30 hover:bg-rose-50/30"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
          <p className="text-2xl font-black text-gray-800 mt-1">{formatTime(value)}</p>
          <p className="text-xs text-gray-400 mt-1">{hint}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-primary text-xl">
          🕒
        </div>
      </div>
    </button>
  );
}

function AddTaskModal({ onClose, onAdd, editTask }) {
  const [name, setName] = useState(editTask?.name || '');
  const [icon, setIcon] = useState(editTask?.icon || '⭐');
  const [startTime, setStartTime] = useState(editTask?.startTime || '07:00');
  const [endTime, setEndTime] = useState(editTask?.endTime || '07:30');
  const [color, setColor] = useState(editTask?.color || 'rose');
  const [category, setCategory] = useState(editTask?.category || 'Morning Routine');
  const [repeatDaily, setRepeatDaily] = useState(editTask?.repeatDaily !== false);
  const [timePicker, setTimePicker] = useState(null);
  const [pickerMode, setPickerMode] = useState('hour');

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({
      id: editTask?.id || generateId(),
      name: name.trim(), icon, startTime, endTime, color, category, repeatDaily,
    });
    onClose();
  };

  const durationText = getDurationText(startTime, endTime);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-[430px] bg-white rounded-t-3xl p-5 max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <h2 className="font-black text-gray-800 text-xl mb-5">
          {editTask ? 'Edit Task' : 'Add Custom Task'}
        </h2>

        {/* Icon picker */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 mb-2">Task Icon</p>
          <div className="text-center mb-3">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-4xl mx-auto border-2 border-rose-primary/30">
              {icon}
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1 max-h-28 overflow-y-auto">
            {taskIcons.map(ic => (
              <button
                key={ic}
                onClick={() => setIcon(ic)}
                className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-all ${
                  icon === ic ? 'bg-rose-primary shadow-sm scale-110' : 'hover:bg-rose-50'
                }`}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* Task name */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Task Name</label>
          <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Guitar Practice" />
        </div>

        {/* Times */}
        <div className="space-y-3 mb-4">
          <ClockField
            label="Start Time"
            value={startTime}
            hint="Tap the clock to choose a start time"
            onClick={() => { setTimePicker('start'); setPickerMode('hour'); }}
          />
          <ClockField
            label="End Time"
            value={endTime}
            hint="Tap the clock to choose an end time"
            onClick={() => { setTimePicker('end'); setPickerMode('hour'); }}
          />
          <div className="rounded-2xl border border-rose-primary/15 bg-rose-50/60 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Time</p>
            <p className={`text-lg font-black mt-1 ${durationText === 'End time must be after start time' ? 'text-rose-primary' : 'text-gray-800'}`}>
              {durationText}
            </p>
          </div>
        </div>

        {/* Color */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Color</label>
          <div className="flex gap-3">
            {taskColors.map(c => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: c.hex }}
              >
                {color === c.id && <MdCheck className="text-white text-sm" />}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Category</label>
          <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Repeat Daily */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-2xl">
          <div>
            <p className="text-sm font-semibold text-gray-700">Repeat Daily</p>
            <p className="text-xs text-gray-400">Auto-appears every day</p>
          </div>
          <button
            onClick={() => setRepeatDaily(!repeatDaily)}
            className={`w-12 h-6 rounded-full transition-all ${repeatDaily ? 'bg-rose-primary' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mx-0.5 ${repeatDaily ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <button onClick={handleAdd} className="btn-primary w-full" disabled={!name.trim()}>
          {editTask ? 'Save Changes' : 'Add Task'}
        </button>
      </motion.div>

      <AnimatePresence>
        {timePicker && (
          <ClockPickerModal
            title={timePicker === 'start' ? 'Start Time' : 'End Time'}
            value={timePicker === 'start' ? startTime : endTime}
            mode={pickerMode}
            setMode={setPickerMode}
            onChange={(nextValue) => {
              if (timePicker === 'start') {
                setStartTime(nextValue);
              } else {
                setEndTime(nextValue);
              }
            }}
            onClose={() => setTimePicker(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Timetable() {
  const navigate = useNavigate();
  const { timetable, updateTimetable } = useApp();
  const [tasks, setTasks] = useState(timetable.length > 0 ? timetable : defaultTasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleAdd = (task) => {
    if (editTask) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } else {
      setTasks(prev => [...prev, task]);
    }
    setEditTask(null);
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSave = () => {
    updateTimetable(tasks);
    navigate('/dashboard');
  };

  // Group by category
  const sortedTasks = [...tasks].sort(compareTasksByTime);
  const groups = sortedTasks.reduce((acc, t) => {
    const cat = t.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(t);
    return acc;
  }, {});

  return (
    <PageWrapper>
      <div className="min-h-screen bg-bg pb-32">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur-sm px-5 py-4 flex justify-between items-center border-b border-rose-primary/10">
          <div>
            <h1 className="font-black text-gray-800 text-xl">Edit Timetable</h1>
            <p className="text-xs text-gray-400">{tasks.length} tasks · repeats daily</p>
          </div>
          <button className="p-2 rounded-xl hover:bg-rose-50">
            <span className="text-gray-400 text-xl">⋮</span>
          </button>
        </div>

        <div className="px-5 pt-4 space-y-4">
          {Object.entries(groups).map(([cat, catTasks]) => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-rose-primary flex items-center gap-1">
                  {cat === 'Morning Routine' ? '☀️' : cat === 'Night Routine' ? '🌙' : '🌤️'} {cat}
                </p>
                <button
                  onClick={() => { setEditTask(null); setShowModal(true); }}
                  className="text-xs text-rose-primary font-semibold flex items-center gap-1"
                >
                  <MdAdd /> Add Task
                </button>
              </div>

              <div className="space-y-2">
                {catTasks.map((task) => {
                  const hex = getTaskColorHex(task.color);
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-3 flex items-center gap-3"
                      style={{ borderLeft: `4px solid ${hex}` }}
                    >
                      <MdDragIndicator className="text-gray-300 flex-shrink-0" />
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: `${hex}20` }}
                      >
                        {task.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{task.name}</p>
                        <p className="text-xs text-gray-400">{formatTime(task.startTime)} – {formatTime(task.endTime)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditTask(task); setShowModal(true); }}
                          className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs hover:bg-rose-50"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-400"
                        >
                          <MdDelete className="text-sm" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Add task FAB area */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { setEditTask(null); setShowModal(true); }}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-rose-primary/30 text-rose-primary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-rose-50 transition-all"
          >
            <MdAdd className="text-xl" /> Add Custom Task
          </motion.button>
        </div>

        {/* Save bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/90 backdrop-blur-sm p-4 border-t border-rose-primary/10">
          <button onClick={handleSave} className="btn-primary w-full">
            Save Changes ✓
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <AddTaskModal
            onClose={() => { setShowModal(false); setEditTask(null); }}
            onAdd={handleAdd}
            editTask={editTask}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
