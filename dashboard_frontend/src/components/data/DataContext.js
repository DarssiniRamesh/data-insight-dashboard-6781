import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { safeParseJsonArray, detectFieldTypes } from '../../utils/jsonUtils';
import { fetchJsonWithTimeout } from '../../utils/fetchUtils';

const DataContext = createContext(null);

const initialState = {
  rawData: [],
  derived: { numeric: [], categorical: [] },
  status: 'idle', // 'idle' | 'loading' | 'ready' | 'error'
  error: null,
  filters: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, status: 'loading', error: null };
    case 'LOAD_SUCCESS': {
      const rawData = action.payload;
      const derived = detectFieldTypes(rawData);
      return { ...state, status: 'ready', error: null, rawData, derived };
    }
    case 'LOAD_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.key]: action.value } };
    case 'CLEAR':
      return { ...initialState };
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * DataProvider wraps app providing data state and actions.
 */
export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // PUBLIC_INTERFACE
  const loadFromUpload = async (file) => {
    dispatch({ type: 'LOAD_START' });
    try {
      const text = await file.text();
      const arr = safeParseJsonArray(text);
      dispatch({ type: 'LOAD_SUCCESS', payload: arr });
    } catch (e) {
      dispatch({ type: 'LOAD_ERROR', error: e?.message || 'Failed to parse file' });
    }
  };

  // PUBLIC_INTERFACE
  const loadFromUrl = async (url) => {
    dispatch({ type: 'LOAD_START' });
    try {
      const arr = await fetchJsonWithTimeout(url);
      dispatch({ type: 'LOAD_SUCCESS', payload: arr });
    } catch (e) {
      dispatch({ type: 'LOAD_ERROR', error: e?.message || 'Failed to fetch data' });
    }
  };

  // PUBLIC_INTERFACE
  const setFilter = (key, value) => dispatch({ type: 'SET_FILTER', key, value });

  // PUBLIC_INTERFACE
  const clearData = () => dispatch({ type: 'CLEAR' });

  const value = useMemo(() => ({
    state,
    actions: { loadFromUpload, loadFromUrl, setFilter, clearData }
  }), [state]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to access data state and actions.
 */
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
