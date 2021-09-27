import React from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import configureTestStore from '../testutils/ConfigureStore';
import Wishlist from '../containers/Wishlist';

beforeAll(() => {
  history.push = jest.fn(history.push);
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
  },
  wishlist: [
    {
      created_at: '2021-08-31T15:56:57.182Z',
      id: 35,
      product: {
        care: '',
        category: 'Full Sun Plants',
        common_name: '',
        created_at: '2021-08-15T02:08:51.169Z',
        description: '',
        id: 35,
        image_url:
          'https://plant-xchange-app-dev.s3.amazonaws.com/development%2F070e6513-e6eb-4d4f-abb6-618e1f9c31e8%2FErica-tresco-400x400.jpg',
        in_stock: false,
        name: 'Erica Tresco',
        price: 65,
        updated_at: '2021-08-18T08:29:06.965Z',
      },
    },
  ],
};
const store = configureTestStore(state);
const WishlistWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <Wishlist />
      </Router>
    </React.StrictMode>
  </Provider>
);

test('`Wishlist` component displays correctly', async () => {
  render(<WishlistWithStore />);
  await waitFor(() => {
    const wishlistContainer = screen.getByTestId('wishlist-container');
    expect(wishlistContainer).toBeInTheDocument();
    expect(screen.getByText('Erica Tresco')).toBeInTheDocument();
    expect(screen.getByText('R 65')).toBeInTheDocument();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});

test('`Wishlist` component displays and `Back` button functions correctly', async () => {
  render(<WishlistWithStore />);
  await waitFor(() => {
    const backBtn = screen.getByText(/Back/i);
    expect(backBtn).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
  await waitFor(() => {
    const historySpy = history.push;
    fireEvent.click(screen.getByText(/Back/i));
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith('/');
  });
});
