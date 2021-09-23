import React from 'react';
import {
  render,
  within,
  cleanup,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import Home from '../containers/Home';
import configureStore from '../store';
import { httpProtocol, host, port } from '../env.variables';
jest.mock('axios');

afterEach(cleanup);

const HomeWithStore = () => (
  <Provider store={configureStore()}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </Provider>
);

const configuredStore = configureStore({
  user: {id: 1, email: "test@example.com", created_at: "2021-07-22 14:30:15.903533000 +0000", updated_at: "2021-07-22 14:30:15.903533000 +0000", superadmin_role: false, supervisor_role: false, user_role: true, accessToken: 'Bearer 345664456777777777'},
});
const HomeWithConfiguredStore = () => (
  <Provider store={configuredStore}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </Provider>
);

test('renders the categories and category filter - category options are displayed correctly', async () => {
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
  const categories = [];
  const plants = [];
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

  const { container } = render(<HomeWithConfiguredStore />);
  await waitFor(() => {
    expect(
      within(container).getAllByText(/product categories/i),
    ).toHaveLength(2);
  });
});

test('renders the categories and category filter - category options are displayed correctly', async () => {
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
