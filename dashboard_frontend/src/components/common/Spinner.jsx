import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Spinner shows a simple accessible loading indicator.
 */
export default function Spinner({ label = 'Loading…' }) {
  return (
    <div role="status" aria-live="polite" className="row" style={{padding: 12}}>
      <span aria-hidden="true">⏳</span>
      <span>{label}</span>
    </div>
  );
}
