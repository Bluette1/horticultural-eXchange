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
import App from '../App';
import configureTestStore from '../testutils/ConfigureStore';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');
const store = configureTestStore();
const AppWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);
test('renders the app - navbar links are displayed correctly', async () => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/categories`:
        return Promise.resolve({ data: [] });
      case `${httpProtocol}://${host}:${port}/plants`:
        return Promise.resolve({ data: [] });
      default:
        return Promise.resolve({ data: [] });
    }
  });
  const { container } = render(<AppWithStore />);
  await waitFor(() => {
    expect(container.firstChild.children).toHaveLength(2);
    const navContainer = screen.getByTestId('nav-container');
    expect(container.firstChild).toContainElement(navContainer);
    const mainContainer = screen.getByTestId('main-container');
    expect(
      within(mainContainer).getAllByText(/product categories/i),
    ).toHaveLength(2);
    expect(container.firstChild).toContainElement(mainContainer);
    const navBar = navContainer.querySelector('.navbar');

    const logoImg = within(navBar).getByAltText('logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'logo.png');
    expect(within(navBar).getByText(/iGrow/)).toBeInTheDocument();

    expect(navBar).toBeTruthy();
    expect(navBar.children).toHaveLength(2);

    expect(container).toMatchSnapshot();

    const navItems = navBar.querySelectorAll('.nav-item');
    expect(navItems).toHaveLength(3);

    const home = navItems[0].firstChild;
    expect(within(home).getByText('Home')).toBeInTheDocument();
    expect(home).toContainHTML('<a class="nav-link" href="/home">Home</a>');

    const login = navItems[1].firstChild;
    expect(within(login).getByText('Login')).toBeInTheDocument();
    expect(login).toContainHTML('<a class="nav-link" href="/login">Login</a>');

    const signup = navItems[2].firstChild;
    expect(within(signup).getByText('Sign Up')).toBeInTheDocument();
    expect(signup).toContainHTML(
      '<a class="nav-link" href="/register">Sign Up</a>',
    );
  });
});
