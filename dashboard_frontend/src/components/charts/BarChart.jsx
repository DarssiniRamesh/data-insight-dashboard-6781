import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useData } from '../data/DataContext';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * PUBLIC_INTERFACE
 * BarChart renders a bar chart for xKey categories and yKey numeric values.
 */
export default function BarChart({ data, xKey, yKey, title = 'Bar Chart' }) {
  const { actions } = useData();
  const labels = useMemo(() => data.map(d => String(d[xKey])), [data, xKey]);
  const values = useMemo(() => data.map(d => Number(d[yKey]) || 0), [data, yKey]);

  const chartData = useMemo(() => ({
    labels,
    datasets: [{
      label: `${yKey} by ${xKey}`,
      data: values,
      backgroundColor: 'rgba(146,64,14,0.7)',
      borderColor: 'rgba(146,64,14,1)',
      borderWidth: 1,
    }]
  }), [labels, values, xKey, yKey]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        onClick: (_e, _legendItem) => {
          // example: clear filter on legend click
          actions.setFilter('legendToggle', Date.now());
        }
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
      <Bar data={chartData} options={options} />
    </div>
  );
}
