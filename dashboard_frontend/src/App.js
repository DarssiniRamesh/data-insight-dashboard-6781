import React, { Suspense } from 'react';
import './App.css';
import './theme/theme.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Spinner from './components/common/Spinner';
import { DataProvider } from './components/data/DataContext';
import { useTheme } from './theme/useTheme';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';

/**
 * Root application shell with layout, theme, router, and data provider.
 */
function AppShell() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar" aria-label="Primary">
        <Sidebar />
      </aside>
      <div className="main-area">
        <TopBar onToggleTheme={toggleTheme} />
        <main id="main-content" className="content" role="main" tabIndex="-1">
          <ErrorBoundary>
            <Suspense fallback={<Spinner label="Loading content..." />}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** App composed with BrowserRouter and DataProvider */
  return (
    <BrowserRouter>
      <DataProvider>
        <AppShell />
      </DataProvider>
    </BrowserRouter>
  );
}
