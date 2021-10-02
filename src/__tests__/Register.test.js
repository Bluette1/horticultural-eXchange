import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  within,
} from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import Register from '../components/Register';
import Profile from '../components/Profile';
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

test('renders the Register form and functions correctly', async () => {
  const email = 'email@example.com';
  const password = 'passwordNew123';
  const store = configureTestStore();
  const RegisterWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Register />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/users/`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<RegisterWithStore />);

  await waitFor(() => {
    const loginContainer = screen.getByTestId('register-container');
    const input = loginContainer.querySelectorAll('.form-control');
    input[0].value = email;
    ReactTestUtils.Simulate.change(input[0]);

    input[1].value = password;
    ReactTestUtils.Simulate.change(input[1]);
  });
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('submit-btn'));
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRegisterSuccess = {
      type: 'REGISTER_SUCCESS',
    };

    const actionSetMessage = {
      type: 'SET_MESSAGE',
      payload: 'You have successfully registered',
    };
    expect(dispatchSpy).toHaveBeenCalledWith(actionRegisterSuccess);
    expect(dispatchSpy).toHaveBeenCalledWith(actionSetMessage);
    expect(history.push).toHaveBeenCalledWith('/login');
  });
});

test('renders the Register form and functions correctly - Error scenario', async () => {
  const email = 'email@example.com';
  const password = 'passwordNew123';
  const store = configureTestStore();
  const RegisterWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Register />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );
  const message = 'An error occurred';
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/users/`:
        return Promise.reject(new Error(message));
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<RegisterWithStore />);

  const registerContainer = screen.getByTestId('register-container');
  const input = registerContainer.querySelectorAll('.form-control');
  input[0].value = email;
  ReactTestUtils.Simulate.change(input[0]);

  input[1].value = password;
  ReactTestUtils.Simulate.change(input[1]);

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('submit-btn'));
    const dispatchSpy = store.dispatch;
    expect(dispatchSpy).toHaveBeenCalled();
    const actionRegisterSuccess = {
      type: 'REGISTER_SUCCESS',
    };

    const actionSetMessage = {
      type: 'SET_MESSAGE',
      payload: message,
    };
    expect(dispatchSpy).not.toHaveBeenCalledWith(actionRegisterSuccess);
    expect(dispatchSpy).toHaveBeenCalledWith(actionSetMessage);
    expect(history.push).not.toHaveBeenCalledWith('/login');
    const registerContainer = screen.getByTestId('register-container');
    expect(registerContainer).toBeInTheDocument();
    const errorSection = registerContainer.querySelector('.alert');
    expect(errorSection).toBeDefined();
    expect(within(errorSection).getByText(message)).toBeInTheDocument();
  });
});

test('a user with supervisor role can register a user', async () => {
  const email = 'testname@example.email';
  const password = 'passwordNew123';
  const user = {
    id: 1,
    email: 'test@example.com',
    created_at: '2021-07-22 14:30:15.903533000 +0000',
    updated_at: '2021-07-22 14:30:15.903533000 +0000',
    superadmin_role: false,
    supervisor_role: true,
    user_role: true,
    accessToken: 'Bearer 345664456777777777',
  };
  const isLoggedIn = true;
  const store = configureTestStore({ auth: { isLoggedIn, user } });
  const RegisterWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Register />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/mod/users/`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<RegisterWithStore />);

  const registerContainer = screen.getByTestId('register-container');
  const input = registerContainer.querySelectorAll('.form-control');
  input[0].value = email;
  ReactTestUtils.Simulate.change(input[0]);

  input[1].value = password;
  ReactTestUtils.Simulate.change(input[1]);

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(history.push).toHaveBeenCalledWith('/mod');
  });
});

test('a user with superadmin role can register a user', async () => {
  const email = 'testname@example.email';
  const password = 'passwordNew123';
  const user = {
    id: 1,
    email: 'test@example.com',
    created_at: '2021-07-22 14:30:15.903533000 +0000',
    updated_at: '2021-07-22 14:30:15.903533000 +0000',
    superadmin_role: true,
    supervisor_role: false,
    user_role: true,
    accessToken: 'Bearer 345664456777777777',
  };
  const isLoggedIn = true;
  const store = configureTestStore({ auth: { isLoggedIn, user } });
  const RegisterWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Register />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );
  axios.post.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/admin/users/`:
        return Promise.resolve();
      default:
        return Promise.resolve({ data: {} });
    }
  });
  render(<RegisterWithStore />);

  const registerContainer = screen.getByTestId('register-container');
  const input = registerContainer.querySelectorAll('.form-control');
  input[0].value = email;
  ReactTestUtils.Simulate.change(input[0]);

  input[1].value = password;
  ReactTestUtils.Simulate.change(input[1]);

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(history.push).toHaveBeenCalledWith('/admin');
  });
});
