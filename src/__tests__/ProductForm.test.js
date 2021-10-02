import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import ProductForm from '../components/ProductForm';

import configureTestStore from '../testutils/ConfigureStore';
import { httpProtocol, host, port } from '../env.variables';

const realLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
  history.push = jest.fn();
  delete window.alert;
  window.alert = jest.fn();
});

afterEach(() => {
  window.location = realLocation;
  jest.clearAllMocks();
});

const store = configureTestStore();
const ProductFormWithStore = () => (
  <Provider store={store}>
    <>
      <Router history={history}>
        <ProductForm history={history} />
      </Router>
    </>
  </Provider>
);
test('renders the ProductForm and functions correctly', async () => {
  global.fetch = jest.fn((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/plants`:
        return Promise.resolve({ status: 201 });
      default:
        return Promise.resolve({ status: 400 });
    }
  });

  render(<ProductFormWithStore />);
  await waitFor(() => {
    const ProductFormContainer = screen.getByTestId('productform-container');
    const input = ProductFormContainer.querySelectorAll('.form-control');
    expect(screen).toMatchSnapshot();
    input[0].value = 'Some New Product';
    ReactTestUtils.Simulate.change(input[0]);
    input[1].value = '40';
    ReactTestUtils.Simulate.change(input[1]);
    const select = ProductFormContainer.querySelector('#categories-select');
    select.value = 'Clearance Sale';
    fireEvent.click(screen.getByTestId('submit-btn'));
    const historySpy = history.push;
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledTimes(1);
    expect(historySpy).toHaveBeenCalledWith('/');
  });
});
