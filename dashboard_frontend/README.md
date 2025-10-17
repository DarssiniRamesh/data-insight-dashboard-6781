# Data Insight Dashboard (React)

A classic, lightweight React dashboard that visualizes JSON data with charts and tables.

## Features

- Heritage Brown theme with classic layout (Sidebar, Top Bar)
- Routing: `/` Dashboard, `/table`, `/about`
- Data loading via JSON upload or URL (with robust errors and loading states)
- Charts (bar, line, pie) using Chart.js/react-chartjs-2, interactive tooltips/legend
- Data table with sorting, per-column filtering, pagination, row detail modal, and filtered JSON export
- Theme persistence via localStorage and `useTheme`
- Accessible controls, responsive layout

## Getting Started

1) Install dependencies
   npm install

2) Start the app
   npm start

Open http://localhost:3000

## Data Format

Provide an array of objects:
[
  { "category": "A", "value": 12, "date": "2024-01-01" },
  { "category": "B", "value": 5, "date": "2024-01-02" }
]

The app will attempt simple normalization if your JSON contains a top-level "data" or "items" array.

Fields are auto-classified as:
- numeric: mostly numeric values
- categorical: other fields

Use the Dashboard to pick X (categorical) and Y (numeric) fields for charts.

## Loading Data

- Upload: Use "Load Data" and select a .json file
- URL: Enter a full http(s) URL and click Fetch

CORS note: When fetching from a URL, the remote server must allow CORS from your development origin (http://localhost:3000). If not, the browser will block the request.

## Accessibility

- Keyboard focus outlines for interactive components
- ARIA labels for navigation and tables
- Live regions for loading/error status

## Tech

- React 18 + React Router v6
- Chart.js v4 + react-chartjs-2
- No heavy CSS frameworks; styles via CSS variables and classic layout

## Project Structure (key parts)

- src/theme: CSS variables and useTheme
- src/components/data: DataContext and DataLoader
- src/components/charts: Bar/Line/Pie charts
- src/components/tables: DataTable features
- src/pages: Dashboard, Table, About
- src/routes/Router.js: Routes

## Troubleshooting

- Blank charts? Ensure you've selected X and Y fields and loaded data.
- URL fetch fails? Check CORS on the target server and verify it returns valid JSON with proper content-type.
