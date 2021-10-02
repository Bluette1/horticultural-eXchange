import React from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import configureTestStore from '../testutils/ConfigureStore';
import Cart from '../containers/Cart';

const realLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
  history.push = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
  window.location = realLocation;
});

const state = {
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
    cart: [
      {
        created_at: '2021-08-31T15:57:32.574Z',
        id: 20,
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
      },
    ],
  },
};
const store = configureTestStore(state);
const CartWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <Cart />
      </Router>
    </React.StrictMode>
  </Provider>
);

test('`Cart` component displays and `Back` button functions correctly', async () => {
  render(<CartWithStore />);
  await waitFor(() => {
    const backBtn = screen.getByText(/Back/i);
    expect(screen).toMatchSnapshot();
    expect(backBtn).toBeInTheDocument();
  });
  await waitFor(() => {
    const historySpy = history.push;
    fireEvent.click(screen.getByText(/Back/i));
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith('/');
  });
});

test('`Cart` component displays and `Checkout` button functions correctly', async () => {
  render(<CartWithStore />);
  await waitFor(() => {
    const checkoutBtn = screen.getByText(/Checkout/i);
    expect(screen).toMatchSnapshot();
    expect(checkoutBtn).toBeInTheDocument();
  });
  await waitFor(() => {
    const historySpy = history.push;
    fireEvent.click(screen.getByText(/Checkout/i));
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith('/payment');
  });
});
