import React from 'react';
import {
  render, within, waitFor, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import ProductList from '../containers/ProductList';
import configureTestStore from '../testutils/ConfigureStore';

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
    name: 'Another Plant',
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

const state = {
  filter: {
    filter: 'Clearance Sale',
  },
  product: plants,
};

const store = configureTestStore(state);
const ProductListWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <ProductList />
      </Router>
    </React.StrictMode>
  </Provider>
);
test('renders the app - navbar links are displayed correctly', async () => {
  const { container } = render(<ProductListWithStore />);
  await waitFor(() => {
    const productlistContainer = screen.getByTestId('productlist-container');
    expect(productlistContainer).toBeTruthy();
    const categoryFilter = screen.getByTestId('category-filter');
    expect(categoryFilter).toBeTruthy();
    expect(within(container).getByText(/Aloe Plant/i));
    expect(within(container).getByText(/70/i));
    expect(container).toMatchSnapshot();
  });
});
