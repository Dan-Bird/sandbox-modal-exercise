import { render, screen } from '@testing-library/react';

import { Modal } from './Modal';
import { axe } from 'jest-axe';

const MODAL_HEADING = 'React Modal';
const setup = ({ children = null, isOpen = true } = {}) =>
  render(<Modal title={MODAL_HEADING} children={children} isOpen={isOpen} />);

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

  it('renders a close button', () => {
    setup();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
