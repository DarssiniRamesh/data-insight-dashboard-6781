import React, { useState } from 'react';
import DataLoader from '../data/DataLoader';
import { useData } from '../data/DataContext';

/**
 * PUBLIC_INTERFACE
 * TopBar shows title, theme toggle, and data actions (upload/url).
 */
export default function TopBar({ onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const { state } = useData();

  return (
    <div className="topbar" role="region" aria-label="Top Bar">
      <div className="topbar-title">Data Insight Dashboard</div>
      <button
        className="btn"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
      >
        Toggle Theme
      </button>
      <button
        className="btn primary"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="data-loader-modal"
      >
        Load Data
      </button>
      <div aria-live="polite" className="label" style={{marginLeft: 8}}>
        {state.status === 'loading' ? 'Loading…' : state.rawData?.length ? `${state.rawData.length} records` : 'No data'}
      </div>
      {open && <DataLoader id="data-loader-modal" onClose={() => setOpen(false)} />}
    </div>
  );
}
