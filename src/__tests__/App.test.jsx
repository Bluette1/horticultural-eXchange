import React from 'react';
import {
  render, within, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from '../App';
import store from '../store';
import { httpProtocol, host, port } from '../env.variables';
import Login from '../components/Login';

jest.mock('axios');

afterEach(cleanup);

const AppWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App />
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
    // const navBar = container.querySelector('.navbar');
    const navBar = container.firstChild.firstChild;
    expect(navBar).toHaveClass('navbar navbar-expand-lg navbar-dark bg-navbar d-flex justify-content-around justify-content-lg-between');
    const logoImg = within(navBar).getByAltText("logo");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'logo.png');
    expect(within(navBar).getByText(/iGrow/)).toBeInTheDocument();

    expect(navBar).toBeTruthy();
    expect(navBar.children).toHaveLength(2);

    expect(container).toMatchSnapshot();

    const navItems = navBar.querySelectorAll('.nav-item');
    expect(navItems).toHaveLength(3);
    
    const home = navItems[0].firstChild;
    expect(within(home).getByText("Home")).toBeInTheDocument();
    expect(home).toContainHTML('<a class="nav-link" href="/home">Home</a>');

    const login = navItems[1].firstChild;
    expect(within(login).getByText("Login")).toBeInTheDocument();
    expect(login).toContainHTML('<a class="nav-link" href="/login">Login</a>');

    const signup = navItems[2].firstChild;
    expect(within(signup).getByText("Sign Up")).toBeInTheDocument();
    expect(signup).toContainHTML('<a class="nav-link" href="/register">Sign Up</a>');
  });
});