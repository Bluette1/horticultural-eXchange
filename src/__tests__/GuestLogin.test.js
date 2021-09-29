import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import Profile from '../components/Profile';
import configureTestStore from '../testutils/ConfigureStore';
import GuestLogin from '../components/GuestLogin';

const realLocation = window.location;
beforeEach(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
  history.push = jest.fn();
});

afterEach(() => {
  window.location = realLocation;
  localStorage.clear();
  localStorage.setItem.mockClear();
});

test('renders the GuestLogin component - user can login', async () => {
  const store = configureTestStore();
  const GuestLoginWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <GuestLogin history={history} />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );

  render(<GuestLoginWithStore history={history} />);
  const guestLogin = screen.getByTestId('guestlogin-container');

  expect(guestLogin).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('submit-btn'));
  const dispatchSpy = store.dispatch;
  expect(dispatchSpy).toHaveBeenCalled();
  const action = {
    payload: { user: { name: '' } },
    type: 'LOGIN_SUCCESS',
  };
  expect(dispatchSpy).toHaveBeenCalledWith(action);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ name: '' }));
});

test('renders the GuestLogin component - user can login using their name', async () => {
  const store = configureTestStore();
  const GuestLoginWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <GuestLogin history={history} />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );

  render(<GuestLoginWithStore history={history} />);
  const guestLogin = screen.getByTestId('guestlogin-container');

  expect(guestLogin).toBeInTheDocument();
  const input = guestLogin.querySelector('.form-control');
  const name = 'guest user';
  input.value = name;
  ReactTestUtils.Simulate.change(input);

  fireEvent.click(screen.getByTestId('submit-btn'));
  const dispatchSpy = store.dispatch;
  expect(dispatchSpy).toHaveBeenCalled();
  const action = {
    payload: { user: { name } },
    type: 'LOGIN_SUCCESS',
  };
  expect(dispatchSpy).toHaveBeenCalledWith(action);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ name }));
});

test('renders the Profile page - when the user is logged in', () => {
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
  const store = configureTestStore({ auth: { user, isLoggedIn } });
  const GuestLoginWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <GuestLogin history={history} />
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </>
    </Provider>
  );

  render(<GuestLoginWithStore history={history} />);
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen).toMatchSnapshot();
});
