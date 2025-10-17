import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));
const TablePage = lazy(() => import('../pages/TablePage.jsx'));
const AboutPage = lazy(() => import('../pages/AboutPage.jsx'));

/**
 * PUBLIC_INTERFACE
 * Router defines basic routes: / (Dashboard), /table, /about.
 */
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
