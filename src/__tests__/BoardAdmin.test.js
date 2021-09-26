import React from 'react';
import {
  render,
  within,
  waitFor,
  screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import history from '../helpers/history';
import BoardAdmin from '../components/BoardAdmin';
import configureTestStore from '../testutils/ConfigureStore';

jest.mock('axios');
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
        <BoardAdmin />
      </Router>
    </React.StrictMode>
  </Provider>
);
test('renders the BoardAdmin component - when the user is superadmin', async () => {
  render(<BoardWithStore />);
  await waitFor(() => {
    expect(screen.getByText(/admin board/i)).toBeInTheDocument();
    const actionsContainer = screen.getByTestId('actions-container');
    expect(actionsContainer).toBeDefined();
    const children = actionsContainer.children;
    expect(children).toHaveLength(5);
    expect(within(children[0]).getByText('Add User')).toBeTruthy();
    expect(within(children[1]).getByText('Remove User')).toBeTruthy();
    expect(within(children[2]).getByText('Add a product item')).toBeTruthy();
    expect(within(children[3]).getByText('Add a product category')).toBeTruthy();
    expect(within(children[4]).getByText('Update an existing product')).toBeTruthy();
    expect(actionsContainer.innerHTML).toBe('<span class=\"d-flex justify-content-between\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i><a href=\"/register\">Add User</a><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></span><span class=\"d-flex justify-content-between\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i><a href=\"/deregister\">Remove User</a><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></span><span class=\"d-flex justify-content-between\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i><a href=\"/new-plant\">Add a product item</a><i class=\"fa fa-leaf\" aria-hidden=\"true\"></i></span><span class=\"d-flex justify-content-between\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i><a href=\"/new-category\">Add a product category</a><i class=\"fa fa-object-group\" aria-hidden=\"true\"></i></span><span class=\"d-flex justify-content-between\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i><a href=\"/update-product/select\">Update an existing product</a><i class=\"fa fa-leaf\" aria-hidden=\"true\"></i></span>');
    expect(screen).toMatchSnapshot();
  });
});
