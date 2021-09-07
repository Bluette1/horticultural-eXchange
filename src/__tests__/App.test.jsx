import React from 'react';
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import axios from 'axios';
import App from '../App';
import store from '../store';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

afterEach(cleanup);

const AppWithStore = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
test('renders the app', async () => {
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
  const app = render(<AppWithStore />);
  await waitFor(() => {
    const navbar = document.querySelector('.navbar');
    expect(navbar).toBeTruthy();

    const navItems = document.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(3);
    
    const login = screen.getByText(/login/i);
    expect(login).toBeInTheDocument();

    const signUp = screen.getByText(/sign up/i);
    expect(signUp).toBeInTheDocument();

    const productCategories = screen.getAllByText(/product categories/i);
    expect(productCategories.length).toBe(2);

    const iGrowTitle = screen.getByText(/iGrow/i);
    expect(iGrowTitle).toBeInTheDocument();
    const img = screen.queryByAltText('logo');
    expect(img).toHaveAttribute('src', 'logo.png');

    expect(app).toMatchSnapshot();
  });
});
