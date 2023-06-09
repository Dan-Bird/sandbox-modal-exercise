import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Modal } from './Modal';

const MODAL_HEADING = 'React Modal';
const setup = ({ children = null, isOpen = true, onClose } = {}) =>
  render(
    <Modal
      title={MODAL_HEADING}
      children={children}
      isOpen={isOpen}
      onClose={onClose}
    />
  );

describe('Modal', () => {
  describe('A11y', () => {
    it('should not have any a11y violations', async () => {
      const { container } = setup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should contain the "aria-modal" attribute for WCAG compliance', () => {
      setup({ isOpen: true });
      const modal = screen.getByRole('dialog');

      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });

  it('renders the content passed to it', () => {
    const mockContent = <div>Mock Content</div>;

    setup({ children: mockContent });

    expect(screen.getByText(/mock content/i)).toBeInTheDocument();
  });

  it('renders a given title', () => {
    setup();
    expect(
      screen.getByRole('heading', { name: MODAL_HEADING })
    ).toBeInTheDocument();
  });

  it('is not open by default', () => {
    setup({ isOpen: false });
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('offers a way to close through a close button', () => {
    const mockCloseFunction = jest.fn();

    setup({ onClose: mockCloseFunction });

    user.click(screen.getByRole('button', { name: /close/i }));

    expect(mockCloseFunction).toHaveBeenCalled();
    expect(mockCloseFunction).toHaveBeenCalledTimes(1);
  });

  it('offers a way to close through the Esc key', () => {
    const mockCloseFunction = jest.fn();

    setup({ onClose: mockCloseFunction });

    user.keyboard('{Escape}');

    expect(mockCloseFunction).toHaveBeenCalled();
    expect(mockCloseFunction).toHaveBeenCalledTimes(1);
  });

  it('offers a way to close through clicking outside the modal', () => {
    const mockCloseFunction = jest.fn();

    setup({ onClose: mockCloseFunction });

    user.click(screen.getByRole('heading'));
    expect(mockCloseFunction).not.toHaveBeenCalled();

    user.click(screen.getByTestId('dialog-backdrop'));
    expect(mockCloseFunction).toHaveBeenCalled();
    expect(mockCloseFunction).toHaveBeenCalledTimes(1);
  });
});
