import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useAsync runs async function; provides status, value, error, and a run() trigger.
 */
export function useAsync(asyncFn, deps = []) {
  const mounted = useRef(true);
  const [state, setState] = useState({ status: 'idle', value: null, error: null });

  useEffect(() => () => { mounted.current = false; }, []);

  const run = useCallback(async (...args) => {
    setState({ status: 'loading', value: null, error: null });
    try {
      const value = await asyncFn(...args);
      if (mounted.current) setState({ status: 'success', value, error: null });
      return value;
    } catch (error) {
      if (mounted.current) setState({ status: 'error', value: null, error });
      throw error;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, run };
}
