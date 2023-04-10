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
  });

  it('should render', () => {
    render(<Modal />);
    screen.getByTestId('dialog');
  });
});
