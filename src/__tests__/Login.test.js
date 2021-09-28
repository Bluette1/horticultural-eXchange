import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import Login from '../components/Login';
import Profile from '../components/Profile';
import configureTestStore from '../testutils/ConfigureStore';
import { httpProtocol, host, port } from '../env.variables';

const realLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
  history.push = jest.fn();
});

afterAll(() => {
  window.location = realLocation;
});

jest.mock('axios');
const user = {
  id: 1,
  email: 'test@example.com',
  created_at: '2021-07-22 14:30:15.903533000 +0000',
  updated_at: '2021-07-22 14:30:15.903533000 +0000',
  superadmin_role: false,
  supervisor_role: true,
  user_role: true,
};

const email = 'email@example.com';
const password = 'passwordNew123';
const store = configureTestStore();
const LoginWithStore = () => (
  <Provider store={store}>
    <>
      <Router history={history}>
        <Login history={history} />
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  </Provider>
);
test.only('renders the Login form correctly', async () => {
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/users/sign_in`:
        return Promise.resolve({ data: user, headers: { authorization: '' } });
      default:
        return Promise.resolve({ data: {} });
    }
  });

  render(<LoginWithStore history={history} />);
  await waitFor(() => {
    const loginContainer = screen.getByTestId('login-container');
    const input = loginContainer.querySelectorAll('.form-control');
    input[0].value = email;
    ReactTestUtils.Simulate.change(input[0]);

    input[1].value = password;
    ReactTestUtils.Simulate.change(input[1]);

    fireEvent.click(screen.getByTestId('submit-btn'));
  });
});
