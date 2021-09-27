import React from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import configureTestStore from '../testutils/ConfigureStore';
import CartItem from '../components/CartItem';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

const cartItem = {
  created_at: '2021-08-31T15:57:32.574Z',
  id: 20,
  quantity: 2,
  product: {
    care: '',
    category: 'clearance sale',
    common_name: '',
    created_at: '2021-08-15T02:10:33.384Z',
    description: '',
    id: 36,
    image_url:
      'https://plant-xchange-app-dev.s3.amazonaws.com/development%2F1c4e59c5-60bf-497d-8c78-123f3831fae8%2Fgaura-pink-1-of-1-300x300.jpg',
    in_stock: true,
    name: 'Gaura Pink',
    price: 75,
    updated_at: '2021-08-15T02:10:33.384Z',
  },
};
const authState = {
  auth: {
    user: {
      id: 1,
      email: 'test@example.com',
      created_at: '2021-07-22 14:30:15.903533000 +0000',
      updated_at: '2021-07-22 14:30:15.903533000 +0000',
      superadmin_role: false,
      supervisor_role: false,
      user_role: true,
      accessToken: 'Bearer 345664456777777777',
    },
  },
};
const store = configureTestStore(authState);
const CartItemWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <table>
          <thead />
          <tbody>
            <CartItem cartItem={cartItem} />
          </tbody>
        </table>
      </Router>
    </React.StrictMode>
  </Provider>
);

test('`CartItem` component displays and functions correctly', async () => {
  render(<CartItemWithStore />);
  await waitFor(() => {
    expect(screen.getByText(/Gaura Pink/i)).toBeInTheDocument();
    expect(screen.getByText(/75/i)).toBeInTheDocument();
    expect(screen.getByText(/150/i)).toBeInTheDocument();

    expect(screen).toMatchSnapshot();
  });
});

test('`CartItem` component displays and cancel icon functions correctly', async () => {
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/cart_items/${cartItem.id}`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<CartItemWithStore />);
  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    fireEvent.click(screen.getByTestId('cancel-icon'));
    expect(dispatchSpy).toHaveBeenCalled();
    const action = {
      payload: cartItem,
      type: 'REMOVE_FROM_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});

test('`CartItem` component displays and remove icon functions correctly', async () => {
  axios.put.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/cart_items/${cartItem.id}`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<CartItemWithStore />);
  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    fireEvent.click(screen.getByTestId('remove-icon'));
    expect(dispatchSpy).toHaveBeenCalled();
    const action = {
      payload: cartItem,
      type: 'UPDATE_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});

test('`CartItem` component displays and add icon functions correctly', async () => {
  axios.put.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/cart_items/${cartItem.id}`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<CartItemWithStore />);
  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    fireEvent.click(screen.getByTestId('add-icon'));
    expect(dispatchSpy).toHaveBeenCalled();
    const action = {
      payload: cartItem,
      type: 'UPDATE_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});

test('`CartItem` component displays and remove icon functions correctly - `0` quantity is removed', async () => {
  const cartItem = {
    created_at: '2021-08-31T15:57:32.574Z',
    id: 20,
    quantity: 1,
    product: {
      care: '',
      category: 'clearance sale',
      common_name: '',
      created_at: '2021-08-15T02:10:33.384Z',
      description: '',
      id: 36,
      image_url:
        'https://plant-xchange-app-dev.s3.amazonaws.com/development%2F1c4e59c5-60bf-497d-8c78-123f3831fae8%2Fgaura-pink-1-of-1-300x300.jpg',
      in_stock: true,
      name: 'Gaura Pink',
      price: 75,
      updated_at: '2021-08-15T02:10:33.384Z',
    },
  };
  const CartItemWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <table>
            <thead />
            <tbody>
              <CartItem cartItem={cartItem} />
            </tbody>
          </table>
        </Router>
      </React.StrictMode>
    </Provider>
  );
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/cart_items/${cartItem.id}`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<CartItemWithStore />);
  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    fireEvent.click(screen.getByTestId('remove-icon'));
    expect(dispatchSpy).toHaveBeenCalled();
    const action = {
      payload: cartItem,
      type: 'REMOVE_FROM_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
