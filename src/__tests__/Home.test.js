import React from 'react';
import {
  render,
  within,
  waitFor,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import Home from '../containers/Home';
import configureTestStore from '../testutils/ConfigureStore';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

test('renders home: categories and category filter are displayed correctly', async () => {
  const store = configureTestStore();
  const HomeWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <Home />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  const categories = [
    {
      id: 1,
      category: 'Full Sun Plants',
      created_at: '2021-08-17 06:33:55.941308000 +0000',
      updated_at: '2021-08-17 06:33:55.941308000 +0000',
    },
    {
      id: 2,
      category: 'Clearance Sale',
      created_at: '2021-08-17 06:37:51.012692000 +0000',
      updated_at: '2021-08-17 06:37:51.012692000 +0000',
    },
    {
      id: 3,
      category: 'Fynbos',
      created_at: '2021-08-17 08:49:56.726058000 +0000',
      updated_at: '2021-08-17 08:49:56.726058000 +0000',
    },
    {
      id: 4,
      category: 'Outdoor Garden Plants',
      created_at: '2021-08-19 14:35:58.966103000 +0000',
      updated_at: '2021-08-19 14:35:58.966103000 +0000',
    },
    {
      id: 5,
      category: 'Coniferous Shrubs',
      created_at: '2021-08-19 15:19:51.580590000 +0000',
      updated_at: '2021-08-19 15:19:51.580590000 +0000',
    },
  ];
  const plants = [
    {
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
    },
    {
      id: 65,
      name: 'Protea',
      category: 'Fynbos',
      price: 72,
      care: '',
      created_at: '2021-08-25 17:06:06.393236000 +0000',
      updated_at: '2021-08-25 17:06:06.393236000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: true,
      common_name: '',
      description: '',
    },
    {
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
    {
      id: 44,
      name: 'Aloe Plant',
      category: 'Outdoor Garden Plants',
      price: 70,
      care: '',
      created_at: '2021-08-19 14:36:49.572585000 +0000',
      updated_at: '2021-08-19 14:36:49.572585000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: false,
      common_name: '',
      description: '',
    },
  ];
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/categories`:
        return Promise.resolve({ data: categories });
      case `${httpProtocol}://${host}:${port}/api/plants`:
        return Promise.resolve({ data: plants });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  const { container } = render(<HomeWithStore />);
  await waitFor(() => {
    expect(
      within(container).getByText(/product categories/i),
    ).toBeInTheDocument();
    expect(within(container).getAllByText(/clearance sale/i)).toHaveLength(2);
  });
});

test('when a user is logged in relevant information is displayed', async () => {
  const store = configureTestStore({
    auth: {
      id: 1,
      email: 'test@example.com',
      created_at: '2021-07-22 14:30:15.903533000 +0000',
      updated_at: '2021-07-22 14:30:15.903533000 +0000',
      superadmin_role: false,
      supervisor_role: false,
      user_role: true,
      accessToken: 'Bearer 345664456777777777',
    },
  });
  const HomeWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Home />
      </React.StrictMode>
    </Provider>
  );
  const categories = [
    {
      id: 1,
      category: 'Full Sun Plants',
      created_at: '2021-08-17 06:33:55.941308000 +0000',
      updated_at: '2021-08-17 06:33:55.941308000 +0000',
    },
    {
      id: 2,
      category: 'Clearance Sale',
      created_at: '2021-08-17 06:37:51.012692000 +0000',
      updated_at: '2021-08-17 06:37:51.012692000 +0000',
    },
    {
      id: 3,
      category: 'Fynbos',
      created_at: '2021-08-17 08:49:56.726058000 +0000',
      updated_at: '2021-08-17 08:49:56.726058000 +0000',
    },
    {
      id: 4,
      category: 'Outdoor Garden Plants',
      created_at: '2021-08-19 14:35:58.966103000 +0000',
      updated_at: '2021-08-19 14:35:58.966103000 +0000',
    },
    {
      id: 5,
      category: 'Coniferous Shrubs',
      created_at: '2021-08-19 15:19:51.580590000 +0000',
      updated_at: '2021-08-19 15:19:51.580590000 +0000',
    },
  ];
  const plants = [
    {
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
    },
    {
      id: 65,
      name: 'Protea',
      category: 'Fynbos',
      price: 72,
      care: '',
      created_at: '2021-08-25 17:06:06.393236000 +0000',
      updated_at: '2021-08-25 17:06:06.393236000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: true,
      common_name: '',
      description: '',
    },
    {
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
    {
      id: 44,
      name: 'Aloe Plant',
      category: 'Outdoor Garden Plants',
      price: 70,
      care: '',
      created_at: '2021-08-19 14:36:49.572585000 +0000',
      updated_at: '2021-08-19 14:36:49.572585000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: false,
      common_name: '',
      description: '',
    },
  ];
  const wishlist = [
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
  ];

  const cart = [
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
  ];
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/categories`:
        return Promise.resolve({ data: categories });
      case `${httpProtocol}://${host}:${port}/api/plants`:
        return Promise.resolve({ data: plants });
      case `${httpProtocol}://${host}:${port}/api/wishes`:
        return Promise.resolve({ data: wishlist });
      case `${httpProtocol}://${host}:${port}/api/cart_items`:
        return Promise.resolve({ data: cart });
      default:
        return Promise.resolve({ data: [] });
    }
  });

  const { container } = render(<HomeWithStore />);
  await waitFor(() => {
    expect(
      within(container).getByText(/product categories/i),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('category-container')).toHaveLength(5);
  });
});
