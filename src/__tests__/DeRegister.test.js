import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import Deregister from '../components/Deregister';

import configureTestStore from '../testutils/ConfigureStore';
import { httpProtocol, host, port } from '../env.variables';

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

jest.mock('axios');
const authState = {
  auth: {
    user: {
      id: 1,
      email: 'test@example.com',
      created_at: '2021-07-22 14:30:15.903533000 +0000',
      updated_at: '2021-07-22 14:30:15.903533000 +0000',
      superadmin_role: false,
      supervisor_role: true,
      user_role: true,
      accessToken: 'Bearer 345664456777777777',
    },
  },
};
const email = 'email@example.com';
const store = configureTestStore(authState);
const DeregisterWithStore = () => (
  <Provider store={store}>
    <>
      <Router history={history}>
        <Deregister history={history} />
      </Router>
    </>
  </Provider>
);
test('renders the Deregister form correctly', async () => {
  const id = '1';
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/mod/users?email=${email}`:
        return Promise.resolve({ data: { id } });
      default:
        return Promise.resolve({ data: {} });
    }
  });
  axios.delete.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/mod/users/${id}`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<DeregisterWithStore />);
  await waitFor(() => {
    const deregisterContainer = screen.getByTestId('deregister-container');
    const input = deregisterContainer.querySelector('.form-control');
    input.value = email;
    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    const historySpy = history.push;
    expect(historySpy).toHaveBeenCalled();
    expect(historySpy).toHaveBeenCalledTimes(1);
    expect(historySpy).toHaveBeenCalledWith('/mod');
  });
});
