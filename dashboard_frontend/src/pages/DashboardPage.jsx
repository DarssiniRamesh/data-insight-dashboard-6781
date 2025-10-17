import React, { useMemo, useState } from 'react';
import { useData } from '../components/data/DataContext';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import DataLoader from '../components/data/DataLoader';

/**
 * PUBLIC_INTERFACE
 * DashboardPage displays summary cards, field selectors, charts, and DataLoader trigger for quick start.
 */
export default function DashboardPage() {
  const { state } = useData();
  const [open, setOpen] = useState(false);

  const { numeric, categorical } = state.derived;
  const defaultX = categorical[0] || '';
  const defaultY = numeric[0] || '';

  const [xKey, setXKey] = useState(defaultX);
  const [yKey, setYKey] = useState(defaultY);

  // reset selectors when data changes
  React.useEffect(() => {
    setXKey(categorical[0] || '');
    setYKey(numeric[0] || '');
  }, [categorical, numeric]);

  const rows = state.rawData || [];

  const summaries = useMemo(() => {
    return [
      { label: 'Records', value: rows.length },
      { label: 'Numeric Fields', value: numeric.length },
      { label: 'Categorical Fields', value: categorical.length },
    ];
  }, [rows.length, numeric.length, categorical.length]);

  return (
    <div className="grid" style={{gap:16}}>
      <div className="grid cols-3">
        {summaries.map((s) => (
          <div key={s.label} className="card" role="status">
            <div className="label">{s.label}</div>
            <div style={{fontSize:24, fontWeight:700}}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="row">
          <div style={{minWidth:200}}>
            <label className="label" htmlFor="xKey">X (category)</label>
            <select id="xKey" className="select" value={xKey} onChange={(e)=>setXKey(e.target.value)}>
              <option value="">Select…</option>
              {categorical.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div style={{minWidth:200}}>
            <label className="label" htmlFor="yKey">Y (numeric)</label>
            <select id="yKey" className="select" value={yKey} onChange={(e)=>setYKey(e.target.value)}>
              <option value="">Select…</option>
              {numeric.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <button className="btn primary" onClick={()=>setOpen(true)}>Load Data</button>
        </div>
      </div>

      {rows.length > 0 && xKey && yKey ? (
        <div className="grid cols-2">
          <BarChart data={rows} xKey={xKey} yKey={yKey} title="Bar" />
          <LineChart data={rows} xKey={xKey} yKey={yKey} title="Line" />
          <PieChart data={rows} xKey={xKey} yKey={yKey} title="Pie" />
        </div>
      ) : (
        <div className="card">
          <p>Load data and select fields to render charts.</p>
        </div>
      )}

      {open && <DataLoader onClose={()=>setOpen(false)} />}
    </div>
  );
}
