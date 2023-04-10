import React from 'react';

export const Modal = ({ children, title, isOpen, onClose }) => {
  return isOpen ? (
    <div role="dialog" aria-modal="true" aria-labelledby="dialog-heading">
      <button onClick={onClose}>Close</button>
      <h2 id="dialog-heading">{title}</h2>
      {children}
    </div>
  ) : null;
};
