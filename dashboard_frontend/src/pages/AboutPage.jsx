import React from 'react';

/**
 * PUBLIC_INTERFACE
 * AboutPage provides app information and usage notes.
 */
export default function AboutPage() {
  return (
    <div className="card">
      <h3>About</h3>
      <p>
        Data Insight Dashboard helps visualize JSON datasets. Load data via file upload or URL
        (ensure the remote server allows CORS), then explore charts and tables.
      </p>
      <ul>
        <li>Dashboard: Select X (categorical) and Y (numeric) fields to view bar/line/pie charts.</li>
        <li>Table: Filter, sort, paginate, and export filtered rows as JSON.</li>
        <li>Theme: Toggle between light/dark using the top bar.</li>
      </ul>
      <p>Data format: An array of objects, e.g. [ {"{"} "category": "A", "value": 10 {"}"} ]</p>
    </div>
  );
}
