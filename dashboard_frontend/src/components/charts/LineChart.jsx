import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useData } from '../data/DataContext';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * PUBLIC_INTERFACE
 * LineChart renders line chart for xKey vs yKey.
 */
export default function LineChart({ data, xKey, yKey, title = 'Line Chart' }) {
  const { actions } = useData();
  const labels = useMemo(() => data.map(d => String(d[xKey])), [data, xKey]);
  const values = useMemo(() => data.map(d => Number(d[yKey]) || 0), [data, yKey]);

  const chartData = useMemo(() => ({
    labels,
    datasets: [{
      label: `${yKey} by ${xKey}`,
      data: values,
      fill: false,
      borderColor: 'rgba(5,150,105,1)',
      backgroundColor: 'rgba(5,150,105,0.2)',
      tension: 0.2,
    }]
  }), [labels, values, xKey, yKey]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        onClick: () => actions.setFilter('legendToggle', Date.now())
      },
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') } },
      y: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') } }
    }
  }), [actions]);

  return (
    <div className="card" aria-label={title}>
      <h4 style={{marginTop:0}}>{title}</h4>
      <Line data={chartData} options={options} />
    </div>
  );
}
