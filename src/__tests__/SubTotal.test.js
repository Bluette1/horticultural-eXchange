import React from 'react';
import {
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SubTotal from '../components/SubTotal';

test('renders the app - navbar links are displayed correctly', async () => {
  const { container } = render(<SubTotal price={40} quantity={3} />);
  expect(container).toContainHTML('<td>R 120</td>');
});
