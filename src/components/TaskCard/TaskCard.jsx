import React from 'react';
import { motion } from 'framer-motion';
import { formatTime, getTaskColorHex } from '../../utils/helpers';
import ProgressSlider from '../ProgressSlider/ProgressSlider';

export default function TaskCard({ task, progress = 0, onProgressChange, showSlider = true }) {
  const hex = getTaskColorHex(task.color);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-4 mb-3"
      style={{ borderLeft: `4px solid ${hex}` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${hex}20` }}
        >
          {task.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm">{task.name}</h3>
          <p className="text-xs text-gray-400">
            {formatTime(task.startTime)} – {formatTime(task.endTime)}
          </p>
        </div>
        <div
          className="text-xs font-bold px-2 py-1 rounded-full"
          style={{ background: `${hex}15`, color: hex }}
        >
          {progress}%
        </div>
      </div>
      {showSlider && (
        <ProgressSlider
          taskId={task.id}
          colorId={task.color}
          value={progress}
          onChange={onProgressChange}
        />
      )}
    </motion.div>
  );
}
