import React, { useState, useEffect } from 'react';
import { getTaskColorHex } from '../../utils/helpers';

export default function ProgressSlider({ taskId, colorId, value = 0, onChange }) {
  const [localVal, setLocalVal] = useState(value);
  const hex = getTaskColorHex(colorId);

  useEffect(() => { setLocalVal(value); }, [value]);

  const handleChange = (e) => {
    const v = parseInt(e.target.value);
    setLocalVal(v);
  };

  const handleRelease = () => {
    onChange && onChange(taskId, localVal);
  };

  const pct = localVal;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative h-2 rounded-full overflow-hidden bg-gray-100">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${hex}, ${hex}cc)` }}
          />
        </div>
        <span className="text-xs font-bold w-9 text-right" style={{ color: hex }}>{pct}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={localVal}
        onChange={handleChange}
        onMouseUp={handleRelease}
        onTouchEnd={handleRelease}
        className="w-full h-1 mt-1 appearance-none cursor-pointer rounded-full slider-thumb"
        style={{
          background: `linear-gradient(to right, ${hex} ${pct}%, #FFD6E7 ${pct}%)`,
          outline: 'none',
          border: 'none',
        }}
      />
    </div>
  );
}
