import React, { useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal wraps content with backdrop. Traps initial focus and closes on ESC.
 */
export default function Modal({ id, title = 'Dialog', onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} id={id}>
      <div className="modal">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h3 id={`${id}-title`} className="topbar-title" style={{margin:0}}>{title}</h3>
          <button className="btn" onClick={onClose} aria-label="Close dialog" ref={ref}>✕</button>
        </div>
        <div className="space" />
        {children}
      </div>
    </div>
  );
}
