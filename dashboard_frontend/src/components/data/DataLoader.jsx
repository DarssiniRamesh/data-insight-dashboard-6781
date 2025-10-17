import React, { useState } from 'react';
import Modal from '../common/Modal';
import Spinner from '../common/Spinner';
import { useData } from './DataContext';

/**
 * PUBLIC_INTERFACE
 * DataLoader modal provides upload and URL fetch flows.
 */
export default function DataLoader({ id = 'data-loader', onClose }) {
  const { state, actions } = useData();
  const [url, setUrl] = useState('');
  const [localError, setLocalError] = useState('');

  const onFileChange = async (e) => {
    setLocalError('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.includes('json') && !file.name.toLowerCase().endsWith('.json')) {
      setLocalError('Please select a JSON file.');
      return;
    }
    await actions.loadFromUpload(file);
  };

  const onFetch = async () => {
    setLocalError('');
    try {
      if (!url || !/^https?:\/\//i.test(url)) {
        setLocalError('Enter a valid http(s) URL to a JSON resource.');
        return;
      }
      await actions.loadFromUrl(url);
    } catch (e) {
      setLocalError(e?.message || 'Failed to fetch.');
    }
  };

  const isBusy = state.status === 'loading';

  return (
    <Modal id={id} title="Load Data" onClose={onClose}>
      <div className="grid" style={{gap:12}}>
        <div className="card">
          <div className="label">Upload JSON file</div>
          <input
            aria-label="Upload JSON"
            className="input"
            type="file"
            accept="application/json,.json"
            onChange={onFileChange}
            disabled={isBusy}
          />
        </div>
        <div className="card">
          <div className="label">Fetch from URL</div>
          <div className="row">
            <input
              className="input"
              placeholder="https://example.com/data.json"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="Data URL"
              disabled={isBusy}
            />
            <button className="btn primary" onClick={onFetch} disabled={isBusy}>Fetch</button>
          </div>
          <div className="label">Note: The server must allow CORS for this origin.</div>
        </div>
        {isBusy && <Spinner label="Loading data…" />}
        {(state.error || localError) && (
          <div role="alert" className="card" style={{borderColor:'var(--error)'}}>
            <strong style={{color:'var(--error)'}}>Error: </strong>
            <span>{state.error || localError}</span>
          </div>
        )}
      </div>
      <div className="space" />
      <div className="row" style={{justifyContent:'flex-end'}}>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}
