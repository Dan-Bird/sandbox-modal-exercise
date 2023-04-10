import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

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
      className={styles.backdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-heading"
        className={styles.dialog}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <span className={styles.visuallyHidden}>Close</span>X
        </button>
        <h2 id="dialog-heading" className={styles.title}>
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};
