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
import ToggleBtn from '../components/ToggleBtn';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

const realLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
  history.push = jest.fn();
});

afterEach(() => {
  window.location = realLocation;
  jest.clearAllMocks();
});

const product = {
  id: 35,
  name: 'Erica Tresco',
  category: 'Full Sun Plants',
  price: 65,
  care: '',
  created_at: '2021-08-15 02:08:51.169442000 +0000',
  updated_at: '2021-08-18 08:29:06.965483000 +0000',
  image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
  in_stock: true,
  common_name: '',
  description: '',
};

test('`ToggleBtn` component displays and functions correctly: current user scenario and item is not in cart', async () => {
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
        id: 25,
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
  };
  const { wishlist } = state;
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/wishes/${wishlist[0].id}`:
        return Promise.resolve();
      default:
        return {};
    }
  });
  const cartItem = {
    created_at: '2021-08-31T15:57:32.574Z',
    id: 20,
    product: {
      id: 35,
      name: 'Erica Tresco',
      category: 'Full Sun Plants',
      price: 65,
      care: '',
      created_at: '2021-08-15 02:08:51.169442000 +0000',
      updated_at: '2021-08-18 08:29:06.965483000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: false,
      common_name: '',
      description: '',
    },
  };

  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/plants/${product.id}/cart_items`:
        return Promise.resolve({ data: cartItem });
      default:
        return {};
    }
  });
  const store = configureTestStore(state);
  const ToggleBtnWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <ToggleBtn prdct={product} />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<ToggleBtnWithStore />);

  expect(screen.getByText(/Add To Cart/i)).toBeInTheDocument();
  const actionBtn = screen.getByTestId('action-button');
  expect(actionBtn).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
  fireEvent.click(actionBtn);

  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRemoveFromWishlist = {
      payload: wishlist[0],
      type: 'REMOVE_FROM_WISHLIST',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionRemoveFromWishlist);

    const actionAddToCart = {
      payload: cartItem,
      type: 'ADD_TO_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionAddToCart);
  });
});

test('`ToggleBtn` component displays and functions correctly: guest user scenario and item is not in cart', async () => {
  const state = {
    auth: {
      user: {
        name: '',
      },
    },
    wishlist: [
      {
        created_at: '2021-08-31T15:56:57.182Z',
        id: 25,
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
  };
  const { wishlist } = state;
  const cartItem = {
    id: 1,
    product,
    quantity: 1,
  };

  const store = configureTestStore(state);
  const ToggleBtnWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <ToggleBtn prdct={product} />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<ToggleBtnWithStore />);

  expect(screen.getByText(/Add To Cart/i)).toBeInTheDocument();
  const actionBtn = screen.getByTestId('action-button');
  expect(actionBtn).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
  fireEvent.click(actionBtn);

  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRemoveFromWishlist = {
      payload: wishlist[0],
      type: 'REMOVE_FROM_WISHLIST',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionRemoveFromWishlist);

    const actionAddToCart = {
      payload: cartItem,
      type: 'ADD_TO_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionAddToCart);
  });
});

test('`ToggleBtn` component displays and functions correctly: current user scenario and item is in cart', async () => {
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
    wishlist: [],
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
      {
        created_at: '2021-08-31T15:57:32.574Z',
        id: 20,
        product: {
          id: 35,
          name: 'Erica Tresco',
          category: 'Full Sun Plants',
          price: 65,
          care: '',
          created_at: '2021-08-15 02:08:51.169442000 +0000',
          updated_at: '2021-08-18 08:29:06.965483000 +0000',
          image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
          in_stock: true,
          common_name: '',
          description: '',
        },
      },
    ],
  };
  const { cart } = state;
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/cart_items/${cart[1].id}`:
        return Promise.resolve();
      default:
        return {};
    }
  });
  const store = configureTestStore(state);
  const ToggleBtnWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <ToggleBtn prdct={product} />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<ToggleBtnWithStore />);

  expect(screen.getByText(/Remove From Cart/i)).toBeInTheDocument();
  const actionBtn = screen.getByTestId('action-button');
  expect(actionBtn).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
  fireEvent.click(actionBtn);

  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRemoveFromCart = {
      payload: cart[1],
      type: 'REMOVE_FROM_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionRemoveFromCart);
  });
});

test('`ToggleBtn` component displays and functions correctly: guest user scenario and item is in cart', async () => {
  const state = {
    auth: {
      user: {
        name: '',
      },
    },
    wishlist: [],
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
      {
        created_at: '2021-08-31T15:57:32.574Z',
        id: 20,
        product: {
          id: 35,
          name: 'Erica Tresco',
          category: 'Full Sun Plants',
          price: 65,
          care: '',
          created_at: '2021-08-15 02:08:51.169442000 +0000',
          updated_at: '2021-08-18 08:29:06.965483000 +0000',
          image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
          in_stock: true,
          common_name: '',
          description: '',
        },
      },
    ],
  };
  const { cart } = state;
  // axios.delete.mockImplementation((url) => {
  //   switch (url) {
  //     case `${httpProtocol}://${host}:${port}/api/cart_items/${cart[1].id}`:
  //       return Promise.resolve();
  //     default:
  //       return {};
  //   }
  // });
  const store = configureTestStore(state);
  const ToggleBtnWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <ToggleBtn prdct={product} />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<ToggleBtnWithStore />);

  expect(screen.getByText(/Remove From Cart/i)).toBeInTheDocument();
  const actionBtn = screen.getByTestId('action-button');
  expect(actionBtn).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
  fireEvent.click(actionBtn);

  await waitFor(() => {
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRemoveFromCart = {
      payload: cart[1],
      type: 'REMOVE_FROM_CART',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionRemoveFromCart);
  });
});
