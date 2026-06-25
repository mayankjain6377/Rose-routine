import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#E75480', '#C8A2FF', '#F4C95D', '#52C49B'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs shadow-lg">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-rose-primary font-semibold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function WeeklyLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#B8A8B9' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#B8A8B9' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#E75480"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#E75480', stroke: 'white', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#E75480' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MonthlyBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
        <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#B8A8B9' }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#B8A8B9' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.avg >= 80 ? '#E75480' : entry.avg >= 50 ? '#F4C95D' : '#FFD6E7'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ completed, partial, missed }) {
  const total = completed + partial + missed;
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">No data yet</div>
    );
  }
  const pieData = [
    { name: 'Completed', value: completed },
    { name: 'Partial', value: partial },
    { name: 'Missed', value: missed },
  ].filter(d => d.value > 0);

  const PIE_COLORS = ['#52C49B', '#F4C95D', '#E75480'];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          paddingAngle={3}
          dataKey="value"
        >
          {pieData.map((entry, i) => (
            <Cell key={i} fill={PIE_COLORS[i]} />
          ))}
        </Pie>
        <Legend
          formatter={(value, entry) => (
            <span className="text-xs text-gray-600">
              {value} {Math.round((entry.payload.value / total) * 100)}%
            </span>
          )}
        />
        <Tooltip formatter={(val) => [`${val} tasks`, '']} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MiniBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="avg" radius={[4, 4, 0, 0]} fill="#E75480" opacity={0.7} />
      </BarChart>
    </ResponsiveContainer>
  );
}
