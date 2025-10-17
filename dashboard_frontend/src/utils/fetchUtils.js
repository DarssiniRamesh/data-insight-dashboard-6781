const DEFAULT_TIMEOUT_MS = 15000;

/**
 * PUBLIC_INTERFACE
 * Fetch JSON with timeout and content-type validation; returns array of records.
 */
export async function fetchJsonWithTimeout(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(url, { signal: ctl.signal });
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Request timed out.');
    throw new Error('Network error: ' + e.message);
  } finally {
    clearTimeout(t);
  }

  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json') && !ct.includes('text/json')) {
    // still attempt to parse, but warn
  }
  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error('Failed to parse JSON: ' + e.message);
  }
  if (!Array.isArray(data)) {
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.items)) return data.items;
    return [];
  }
  return data;
}
