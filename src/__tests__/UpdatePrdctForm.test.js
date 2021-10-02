import React from 'react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { Provider } from 'react-redux';
import ReactTestUtils from 'react-dom/test-utils';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import UpdatePrdctForm from '../components/UpdatePrdctForm';

import configureTestStore from '../testutils/ConfigureStore';
import { httpProtocol, host, port } from '../env.variables';

const realLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
  window.history.push = jest.fn();
  delete window.alert;
  window.alert = jest.fn();
});

afterEach(() => {
  window.location = realLocation;
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
  useLocation: jest.fn().mockReturnValue({
    pathname: '/update-product/form',
    search: '?id=65',
    hash: '',
    state: product,
    key: '5nvxpbdafa',
  }),
}));

function renderWithRouter(
  ui,
  {
    route = '/update-product/form',
    history = createHistory(createMemorySource(route)),
  } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}

test('renders the UpdatePrdctForm and functions correctly', async () => {
  const store = configureTestStore({
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

  renderWithRouter(
    <Provider store={store}>
      <UpdatePrdctForm history={window.history} />
    </Provider>,
  );

  global.fetch = jest.fn((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/plants/${product.id}`:
        return Promise.resolve({ json: () => Promise.resolve({ status: 200 }) });
      default:
        return Promise.resolve({ status: 400 });
    }
  });

  await waitFor(() => {
    const UpdatePrdctFormContainer = screen.getByTestId(
      'updateprdctform-container',
    );
    const input = UpdatePrdctFormContainer.querySelectorAll('.form-control');
    input[0].value = 'some plant name';
    ReactTestUtils.Simulate.change(input[0]);
    input[1].value = true;
    ReactTestUtils.Simulate.change(input[1]);
    input[2].value = 'some common name';
    ReactTestUtils.Simulate.change(input[2]);
    input[3].value = '40';
    ReactTestUtils.Simulate.change(input[3]);
    const select = UpdatePrdctFormContainer.querySelector('#categories-select');
    select.value = 'Clearance Sale';
    ReactTestUtils.Simulate.change(select);
    const description = UpdatePrdctFormContainer.querySelector('#description');
    description.value = 'some description';
    ReactTestUtils.Simulate.change(description);
    const care = UpdatePrdctFormContainer.querySelector('#care');
    care.value = 'how to care for...';
    ReactTestUtils.Simulate.change(care);
    fireEvent.click(screen.getByTestId('submit-btn'));
    const historySpy = window.history.push;
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledTimes(1);
    expect(historySpy).toHaveBeenCalledWith('/');
    expect(screen).toMatchSnapshot();
  });
});
