import { useEffect, useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * useTheme manages the app theme and persists preference to localStorage.
 * Sets data-theme attribute on the documentElement for CSS variable switching.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
