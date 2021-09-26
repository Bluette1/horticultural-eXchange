import React from 'react';
import {
  render,
  waitFor,
  screen,
  fireEvent
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import configureTestStore from '../testutils/ConfigureStore';
import AddToWishlist from '../components/AddToWishlist';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

const product = {
  id: 64,
  name: 'Aloe Plant',
  category: 'Clearance Sale',
  price: 70,
  care: '',
  created_at: '2021-08-25 17:06:06.393236000 +0000',
  updated_at: '2021-08-25 17:06:06.393236000 +0000',
  image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
  in_stock: true,
  common_name: '',
  description: '',
};
const wish = {
  created_at: '2021-08-31T15:56:57.182Z',
  id: 67,
  product
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
const AddToWishlistWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <AddToWishlist product={product} />
      </Router>
    </React.StrictMode>
  </Provider>
);
test('`addToWishlist` component displays and functions correctly', async () => {
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/plants/${product.id}/wishes`:
        return Promise.resolve({ data: wish });
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<AddToWishlistWithStore />);
  await waitFor(() => {
    const addToWishlistBtn = screen.getByText(/add to your wish list/i);
    expect(screen).toMatchSnapshot();
    expect(addToWishlistBtn).toBeInTheDocument();
    fireEvent.click(addToWishlistBtn);
  });
  await waitFor(() => {
    const dispatchSpy = store.dispatch;  
    fireEvent.click(screen.getByText(/add to your wish list/i));
    expect(dispatchSpy).toHaveBeenCalled();
    const action = {
      payload: wish,
      type: 'ADD_TO_WISHLIST',
    }
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
