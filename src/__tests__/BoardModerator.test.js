import React from 'react';
import {
  render,
  within,
  waitFor,
  screen,
} from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import history from '../helpers/history';
import BoardModerator from '../components/BoardModerator';
import Login from '../components/Login';
import Profile from '../components/Profile';
import configureTestStore from '../testutils/ConfigureStore';

const realAlert = window.alert;
beforeAll(() => {
  delete window.alert;
  window.alert = jest.fn();
});

afterAll(() => {
  window.alert = realAlert;
});

test('renders the BoardModerator component - when the user is supervisor', async () => {
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
  const store = configureTestStore(authState);
  const BoardWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <BoardModerator />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<BoardWithStore />);
  await waitFor(() => {
    expect(screen.getByText(/moderator board/i)).toBeInTheDocument();
    const actionsContainer = screen.getByTestId('actions-container');
    expect(actionsContainer).toBeDefined();
    const { children } = actionsContainer;
    expect(children).toHaveLength(2);
    expect(within(children[0]).getByText('Add User')).toBeTruthy();
    expect(within(children[1]).getByText('Remove User')).toBeTruthy();
    expect(children[0].innerHTML).toBe('<i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i><a href=\"/register\">Add User</a><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i>');
    expect(children[1].innerHTML).toBe('<i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i><a href=\"/deregister\">Remove User</a><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i>');
    expect(screen).toMatchSnapshot();
  });
});

test('renders the BoardModerator component - when the user is superadmin', async () => {
  const authState = {
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
  };
  const store = configureTestStore(authState);
  const BoardWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <BoardModerator />
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<BoardWithStore />);
  await waitFor(() => {
    expect(screen.getByText(/moderator board/i)).toBeInTheDocument();
    const actionsContainer = screen.getByTestId('actions-container');
    expect(actionsContainer).toBeDefined();
    const { children } = actionsContainer;
    expect(children).toHaveLength(2);
    expect(within(children[0]).getByText('Add User')).toBeTruthy();
    expect(within(children[1]).getByText('Remove User')).toBeTruthy();
    expect(children[0].innerHTML).toBe('<i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i><a href=\"/register\">Add User</a><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i>');
    expect(children[1].innerHTML).toBe('<i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i><a href=\"/deregister\">Remove User</a><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i>');
    expect(screen).toMatchSnapshot();
  });
});

test('renders the BoardModerator component - when the user is neither superadmin nor supervisor', async () => {
  const authState = {
    auth: {
      user: {
        id: 1,
        email: 'test@example.com',
        created_at: '2021-07-22 14:30:15.903533000 +0000',
        updated_at: '2021-07-22 14:30:15.903533000 +0000',
        superadmin_role: false,
        supervisor_role: false,
        user_role: true,
        accessToken: 'Bearer 345664456777777777',
      },
    },
  };
  const store = configureTestStore(authState);
  const BoardWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <BoardModerator />
          <Switch>
            <Route path="/login">
              <Login history={history} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<BoardWithStore />);
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Unauthorized action! You need to be logged in as admin or supervisor.');
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});

test('renders the BoardModerator component - when the user is not logged in', async () => {
  const store = configureTestStore();
  const BoardWithStore = () => (
    <Provider store={store}>
      <React.StrictMode>
        <Router history={history}>
          <BoardModerator />
          <Switch>
            <Route path="/login">
              <Login history={history} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </Provider>
  );
  render(<BoardWithStore />);
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Unauthorized action! You need to be logged in as admin or supervisor.');
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
