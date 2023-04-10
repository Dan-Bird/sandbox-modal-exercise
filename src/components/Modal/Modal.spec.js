import { render, screen } from '@testing-library/react';

import { Modal } from './Modal';
import { axe } from 'jest-axe';

describe('Modal', () => {
  describe('A11y', () => {
    it('should not have any a11y violationsq', async () => {
      const { container } = render(<Modal />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should contain the "aria-modal" attribute for WCAG compliance', () => {
      render(<Modal />);
      const modal = screen.getByTestId('dialog');

      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });

  it('renders the content passed to it', () => {
    const mockContent = <div>Mock Content</div>;

    render(<Modal>{mockContent}</Modal>);

    expect(screen.getByText(/mock content/i)).toBeInTheDocument();
  });
});
