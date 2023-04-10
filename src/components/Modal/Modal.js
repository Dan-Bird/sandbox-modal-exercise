import React, { useEffect, useRef } from 'react';

export const Modal = ({ children, title, isOpen, onClose }) => {
  const backdropRef = useRef(null);

  const handleCloseFromBackdrop = e =>
    e.target === backdropRef.current && onClose();

  useEffect(() => {
    const handleClose = e => e.key === 'Escape' && onClose();

    window.addEventListener('keydown', handleClose);

    return () => window.removeEventListener('keydown', handleClose);
  }, [onClose]);

  return isOpen ? (
    <div
      ref={backdropRef}
      data-testid="dialog-backdrop"
      onClick={handleCloseFromBackdrop}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="dialog-heading">
        <button onClick={onClose}>Close</button>
        <h2 id="dialog-heading">{title}</h2>
        {children}
      </div>
    </div>
  ) : null;
};
