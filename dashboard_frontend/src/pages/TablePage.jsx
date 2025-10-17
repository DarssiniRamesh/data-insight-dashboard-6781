import React from 'react';
import { useData } from '../components/data/DataContext';
import DataTable from '../components/tables/DataTable';

/**
 * PUBLIC_INTERFACE
 * TablePage shows the dataset with sorting/filtering/pagination and export.
 */
export default function TablePage() {
  const { state } = useData();
  const rows = state.rawData || [];

  return (
    <div className="grid" style={{gap:16}}>
      {rows.length ? (
        <DataTable data={rows} />
      ) : (
        <div className="card">
          <p>No data loaded. Use "Load Data" from the top bar to upload a file or fetch from a URL.</p>
        </div>
      )}
    </div>
  );
}
