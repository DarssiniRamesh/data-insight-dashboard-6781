import React, { useMemo, useState } from 'react';
import Modal from '../common/Modal';

/**
 * Sort helper
 */
function sortBy(data, key, dir) {
  return [...data].sort((a, b) => {
    const av = a[key], bv = b[key];
    if (av === bv) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av;
    return dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });
}

/**
 * PUBLIC_INTERFACE
 * DataTable renders data with auto columns, sorting, filters, pagination, row modal, and export.
 */
export default function DataTable({ data }) {
  const columns = useMemo(() => {
    const first = data[0] || {};
    return Object.keys(first);
  }, [data]);

  const [sort, setSort] = useState({ key: '', dir: 'asc' });
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let rows = data;
    for (const [k, v] of Object.entries(filters)) {
      if (v) rows = rows.filter(r => String(r[k] ?? '').toLowerCase().includes(String(v).toLowerCase()));
    }
    if (sort.key) rows = sortBy(rows, sort.key, sort.dir);
    return rows;
  }, [data, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const onSort = (key) => {
    setSort((s) => s.key !== key ? { key, dir: 'asc' } : { key, dir: s.dir === 'asc' ? 'desc' : 'asc' });
  };

  const onExport = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <div className="row">
          <strong>Rows: {filtered.length}</strong>
        </div>
        <div className="row">
          <button className="btn" onClick={() => setFilters({})}>Clear Filters</button>
          <button className="btn primary" onClick={onExport}>Export JSON</button>
        </div>
      </div>
      <div className="space" />
      <div className="grid" style={{gap:8}}>
        {columns.map((c) => (
          <div key={`filter-${c}`}>
            <label className="label" htmlFor={`filter-${c}`}>{c} filter</label>
            <input
              id={`filter-${c}`}
              className="input"
              placeholder={`Filter ${c}`}
              value={filters[c] || ''}
              onChange={(e) => setFilters(f => ({ ...f, [c]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <div className="space" />
      <div style={{overflowX:'auto'}}>
        <table className="table" role="table" aria-label="Data table">
          <thead>
            <tr>
              {columns.map(c => (
                <th key={c}>
                  <button className="btn" onClick={() => onSort(c)} aria-label={`Sort by ${c}`}>
                    {c} {sort.key === c ? (sort.dir === 'asc' ? '▲' : '▼') : ''}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => (
              <tr key={idx} tabIndex={0} onClick={() => setSelected(row)} onKeyDown={(e)=>{ if(e.key==='Enter') setSelected(row) }}>
                {columns.map(c => (
                  <td key={`${idx}-${c}`}>{String(row[c])}</td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr><td colSpan={columns.length}><em>No rows match filters.</em></td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="space" />
      <div className="row" style={{justifyContent:'space-between'}}>
        <button className="btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1}>Prev</button>
        <div className="label" aria-live="polite">Page {page} of {totalPages}</div>
        <button className="btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page>=totalPages}>Next</button>
      </div>

      {selected && (
        <Modal id="row-detail" title="Row Details" onClose={() => setSelected(null)}>
          <pre style={{maxHeight: '50vh', overflow:'auto'}}>{JSON.stringify(selected, null, 2)}</pre>
          <div className="row" style={{justifyContent:'flex-end'}}>
            <button className="btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
