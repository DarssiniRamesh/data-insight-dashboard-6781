import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation following classic layout.
 */
export default function Sidebar() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="brand" aria-label="App brand">
        <div className="logo" aria-hidden="true" />
        <span>Data Insight</span>
      </div>
      <div className="menu" role="list">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : undefined}>
          <span aria-hidden="true">📊</span>
          <span className="menu-text">Dashboard</span>
        </NavLink>
        <NavLink to="/table" className={({isActive}) => isActive ? 'active' : undefined}>
          <span aria-hidden="true">🧾</span>
          <span className="menu-text">Table</span>
        </NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'active' : undefined}>
          <span aria-hidden="true">ℹ️</span>
          <span className="menu-text">About</span>
        </NavLink>
      </div>
    </nav>
  );
}
