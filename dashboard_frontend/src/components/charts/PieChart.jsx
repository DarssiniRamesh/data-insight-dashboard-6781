import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useData } from '../data/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * PUBLIC_INTERFACE
 * PieChart renders pie chart for categories of xKey with values yKey (sum per category).
 */
export default function PieChart({ data, xKey, yKey, title = 'Pie Chart' }) {
  const { actions } = useData();
  const grouped = useMemo(() => {
    const m = new Map();
    for (const row of data) {
      const k = String(row[xKey]);
      const v = Number(row[yKey]) || 0;
      m.set(k, (m.get(k) || 0) + v);
    }
    return Array.from(m.entries());
  }, [data, xKey, yKey]);

  const labels = grouped.map(([k]) => k);
  const values = grouped.map(([, v]) => v);

  const palette = [
    'rgba(146,64,14,0.85)', 'rgba(254,243,199,0.85)', 'rgba(5,150,105,0.85)',
    'rgba(220,38,38,0.85)', 'rgba(17,24,39,0.85)'
  ];

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: labels.map((_, i) => palette[i % palette.length]),
      borderColor: '#ffffff',
      borderWidth: 1
    }]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        onClick: () => actions.setFilter('legendToggle', Date.now())
      },
      tooltip: { enabled: true }
    }
  };

  return (
    <div className="card" aria-label={title}>
      <h4 style={{marginTop:0}}>{title}</h4>
      <Pie data={chartData} options={options} />
    </div>
  );
}
