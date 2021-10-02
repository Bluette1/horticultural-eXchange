import React from 'react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router,
} from '@reach/router';
import { Provider } from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';
import { render, waitFor, screen } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import ProductFilter from '../components/ProductFilter';
import configureTestStore from '../testutils/ConfigureStore';

afterEach(() => {
  jest.clearAllMocks();
});
const product = {
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
};
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

function renderWithRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  const store = configureTestStore({
    product: [product],
    auth: {
      user: {
        id: 1,
        email: 'test@example.com',
        created_at: '2021-07-22 14:30:15.903533000 +0000',
        updated_at: '2021-07-22 14:30:15.903533000 +0000',
        superadmin_role: true,
        supervisor_role: false,
        user_role: true,
        accessToken: 'Bearer 345664456777777777',
      },
    },
  });
  return {
    ...render(
      <LocationProvider history={history}>
        <Provider store={store}>
          <Router>{ui}</Router>
        </Provider>
      </LocationProvider>,
    ),
    history,
  };
}

test('renders the ProductFilter and functions correctly', async () => {
  renderWithRouter(<ProductFilter path="update-product/select" />, {
    route: 'update-product/select',
  });

  const productFilterContainer = screen.getByTestId('productfilter-container');

  await waitFor(() => {
    const select = productFilterContainer.querySelector('#product-select');
    select.value = JSON.stringify(product);
    ReactTestUtils.Simulate.change(select);
    const historySpy = useHistory().push;
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledWith({
      pathname: '/update-product/form',
      search: `?id=${product.id}`,
      state: product,
    });
    expect(screen).toMatchSnapshot();
  });
});
