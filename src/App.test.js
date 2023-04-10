import { render, screen } from '@testing-library/react';
import App from './App';

it('should have NewDay as text', () => {
  render(<App />);

  expect(screen.getByText(/NewDay/)).toBeTruthy();
});
