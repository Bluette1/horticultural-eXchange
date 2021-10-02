import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import Profile from '../components/Profile';
import configureTestStore from '../testutils/ConfigureStore';

test('renders the Profile component - when a user is logged in', () => {
  const user = {
    id: 1,
    email: 'test@example.com',
    created_at: '2021-07-22 14:30:15.903533000 +0000',
    updated_at: '2021-07-22 14:30:15.903533000 +0000',
    superadmin_role: false,
    supervisor_role: false,
    user_role: true,
    accessToken: 'Bearer 345664456777777777',
  };
  const isLoggedIn = true;
  const store = configureTestStore({ auth: { user, isLoggedIn } });
  const ProfileWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Profile history={history} />
        </Router>
      </>
    </Provider>
  );
  render(<ProfileWithStore />);
  const profileContainer = screen.getByTestId('profile-container');
  const authoritiesUl = screen.getByTestId('authorities');
  expect(within(authoritiesUl).getByText(/user/i)).toBeDefined();
  expect(authoritiesUl).toContainHTML('<li>User</li>');

  expect(within(profileContainer).getByText(/Bearer 34/i)).toBeDefined();
});

test('renders the Profile component - when a user with supervisor role is logged in', () => {
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
  const ProfileWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Profile history={history} />
        </Router>
      </>
    </Provider>
  );
  render(<ProfileWithStore />);
  const profileContainer = screen.getByTestId('profile-container');
  const authoritiesUl = screen.getByTestId('authorities');
  expect(within(authoritiesUl).getByText(/user/i)).toBeDefined();
  expect(authoritiesUl).toContainHTML('<li>User</li>');
  expect(authoritiesUl).toContainHTML('<li>Moderator</li>');
  expect(within(profileContainer).getByText(/Bearer 34/i)).toBeDefined();
  expect(screen).toMatchSnapshot();
});

test('renders the Profile component - when a user with superadmin role is logged in', () => {
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
  const store = configureTestStore({ auth: { user, isLoggedIn } });
  const ProfileWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Profile history={history} />
        </Router>
      </>
    </Provider>
  );
  render(<ProfileWithStore />);
  const profileContainer = screen.getByTestId('profile-container');
  const authoritiesUl = screen.getByTestId('authorities');
  expect(within(authoritiesUl).getByText(/user/i)).toBeDefined();
  expect(authoritiesUl).toContainHTML('<li>User</li>');
  expect(authoritiesUl).toContainHTML('<li>Admin</li>');
  expect(within(profileContainer).getByText(/Bearer 34/i)).toBeDefined();
  expect(screen).toMatchSnapshot();
});

test('renders the Profile component - when a guest user is logged in', () => {
  const user = {
    id: 1,
    name: 'name',
  };
  const isLoggedIn = true;
  const store = configureTestStore({ auth: { user, isLoggedIn } });
  const ProfileWithStore = () => (
    <Provider store={store}>
      <>
        <Router history={history}>
          <Profile history={history} />
        </Router>
      </>
    </Provider>
  );
  render(<ProfileWithStore />);
  const profileContainer = screen.getByTestId('profile-container');
  expect(profileContainer).toBeInTheDocument();
  const authoritiesUl = screen.getByTestId('authorities');
  expect(within(authoritiesUl).getByText(/user/i)).toBeDefined();
  expect(authoritiesUl).toContainHTML('<li>Guest User</li>');
  expect(screen).toMatchSnapshot();
});
