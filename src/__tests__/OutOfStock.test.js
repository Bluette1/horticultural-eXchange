import React from 'react';
import {
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OutOfStock from '../components/OutOfStock';

test('renders the app - navbar links are displayed correctly', async () => {
  const { container } = render(<OutOfStock />);
  const outOfStock = container.querySelector('.out-of-stock');
  expect(outOfStock).toContainHTML('<span>Out of<br />stock</span>');
});
