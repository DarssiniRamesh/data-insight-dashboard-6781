function normalizeToArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

/**
 * PUBLIC_INTERFACE
 * Safely parse JSON into an array of records; throws with helpful messages.
 */
export function safeParseJsonArray(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
  const arr = normalizeToArray(parsed);
  if (!Array.isArray(arr)) throw new Error('JSON root must be an array or contain an array under "data" or "items".');
  const coerced = arr.map((row) => (typeof row === 'object' && row !== null ? row : { value: row }));
  return coerced;
}

/**
 * PUBLIC_INTERFACE
 * Detect numeric and categorical fields by sampling the dataset.
 */
export function detectFieldTypes(rows) {
  const allKeys = new Set();
  rows.slice(0, 100).forEach(r => Object.keys(r || {}).forEach(k => allKeys.add(k)));
  const numeric = [];
  const categorical = [];
  for (const key of allKeys) {
    let n = 0, total = 0;
    for (const r of rows.slice(0, 200)) {
      const v = r?.[key];
      if (v == null) continue;
      total++;
      if (typeof v === 'number' || (!Number.isNaN(Number(v)) && v !== '')) n++;
    }
    if (total > 0 && n / total > 0.8) numeric.push(key);
    else categorical.push(key);
  }
  return { numeric, categorical };
}
