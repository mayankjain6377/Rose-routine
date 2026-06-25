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

function AddTaskModal({ onClose, onAdd, editTask }) {
  const [name, setName] = useState(editTask?.name || '');
  const [icon, setIcon] = useState(editTask?.icon || '⭐');
  const [startTime, setStartTime] = useState(editTask?.startTime || '07:00');
  const [endTime, setEndTime] = useState(editTask?.endTime || '07:30');
  const [color, setColor] = useState(editTask?.color || 'rose');
  const [category, setCategory] = useState(editTask?.category || 'Morning Routine');
  const [repeatDaily, setRepeatDaily] = useState(editTask?.repeatDaily !== false);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({
      id: editTask?.id || generateId(),
      name: name.trim(), icon, startTime, endTime, color, category, repeatDaily,
    });
    onClose();
  };

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
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Start Time</label>
            <input type="time" className="input-field" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">End Time</label>
            <input type="time" className="input-field" value={endTime} onChange={e => setEndTime(e.target.value)} />
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
  const groups = tasks.reduce((acc, t) => {
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
