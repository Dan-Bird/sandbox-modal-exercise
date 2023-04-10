export const Modal = ({ children }) => (
  <dialog data-testid="dialog" aria-modal="true">
    {children}
  </dialog>
);
