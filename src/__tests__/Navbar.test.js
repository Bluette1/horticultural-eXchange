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
import configureStore from '../store';
import { httpProtocol, host, port } from '../env.variables';

jest.mock('axios');

const AppWithStore = () => (
  <Provider store={configureStore()}>
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

test('when the user is logged in: renders the app - navbar links are displayed correctly', async () => {
  
const configuredStore = configureStore({
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
});
const AppWithStore = () => (
  <Provider store={configuredStore}>
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);
  const categories = [
    {
      id: 1,
      category: 'Full Sun Plants',
      created_at: '2021-08-17 06:33:55.941308000 +0000',
      updated_at: '2021-08-17 06:33:55.941308000 +0000',
    },
    {
      id: 2,
      category: 'Clearance Sale',
      created_at: '2021-08-17 06:37:51.012692000 +0000',
      updated_at: '2021-08-17 06:37:51.012692000 +0000',
    },
    {
      id: 3,
      category: 'Fynbos',
      created_at: '2021-08-17 08:49:56.726058000 +0000',
      updated_at: '2021-08-17 08:49:56.726058000 +0000',
    },
    {
      id: 4,
      category: 'Outdoor Garden Plants',
      created_at: '2021-08-19 14:35:58.966103000 +0000',
      updated_at: '2021-08-19 14:35:58.966103000 +0000',
    },
    {
      id: 5,
      category: 'Coniferous Shrubs',
      created_at: '2021-08-19 15:19:51.580590000 +0000',
      updated_at: '2021-08-19 15:19:51.580590000 +0000',
    },
  ];
  const plants = [
    {
      id: 64,
      name: 'Aloe Plant',
      category: 'Clearance Sale',
      price: 70,
      care: '',
      created_at: '2021-08-25 17:06:06.393236000 +0000',
      updated_at: '2021-08-25 17:06:06.393236000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: true,
      common_name: '',
      description: '',
    },
    {
      id: 65,
      name: 'Protea',
      category: 'Fynbos',
      price: 72,
      care: '',
      created_at: '2021-08-25 17:06:06.393236000 +0000',
      updated_at: '2021-08-25 17:06:06.393236000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: true,
      common_name: '',
      description: '',
    },
    {
      id: 35,
      name: 'Erica Tresco',
      category: 'Full Sun Plants',
      price: 65,
      care: '',
      created_at: '2021-08-15 02:08:51.169442000 +0000',
      updated_at: '2021-08-18 08:29:06.965483000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: false,
      common_name: '',
      description: '',
    },
    {
      id: 44,
      name: 'Aloe Plant',
      category: 'Outdoor Garden Plants',
      price: 70,
      care: '',
      created_at: '2021-08-19 14:36:49.572585000 +0000',
      updated_at: '2021-08-19 14:36:49.572585000 +0000',
      image_url: 'https://plant-xchange-app-dev.s3.amazonaws.com/dev...',
      in_stock: false,
      common_name: '',
      description: '',
    },
  ];
  const wishlist = [
    {
      created_at: '2021-08-31T15:56:57.182Z',
      id: 35,
      product: {
        care: '',
        category: 'Full Sun Plants',
        common_name: '',
        created_at: '2021-08-15T02:08:51.169Z',
        description: '',
        id: 35,
        image_url:
          'https://plant-xchange-app-dev.s3.amazonaws.com/development%2F070e6513-e6eb-4d4f-abb6-618e1f9c31e8%2FErica-tresco-400x400.jpg',
        in_stock: false,
        name: 'Erica Tresco',
        price: 65,
        updated_at: '2021-08-18T08:29:06.965Z',
      },
    },
  ];

  const cart = [
    {
      created_at: '2021-08-31T15:57:32.574Z',
      id: 20,
      product: {
        care: '',
        category: 'clearance sale',
        common_name: '',
        created_at: '2021-08-15T02:10:33.384Z',
        description: '',
        id: 36,
        image_url:
          'https://plant-xchange-app-dev.s3.amazonaws.com/development%2F1c4e59c5-60bf-497d-8c78-123f3831fae8%2Fgaura-pink-1-of-1-300x300.jpg',
        in_stock: true,
        name: 'Gaura Pink',
        price: 75,
        updated_at: '2021-08-15T02:10:33.384Z',
      },
    },
  ];
  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${httpProtocol}://${host}:${port}/api/categories`:
        return Promise.resolve({ data: categories });
      case `${httpProtocol}://${host}:${port}/api/plants`:
        return Promise.resolve({ data: plants });
      case `${httpProtocol}://${host}:${port}/api/wishes`:
        return Promise.resolve({ data: wishlist });
      case `${httpProtocol}://${host}:${port}/api/cart_items`:
        return Promise.resolve({ data: cart });
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
    ).toHaveLength(1);
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
    expect(navItems).toHaveLength(5);

    const home = navItems[0].firstChild;
    expect(within(home).getByText('Home')).toBeInTheDocument();
    expect(home).toContainHTML('<a class="nav-link" href="/home">Home</a>');

    const browse = navItems[1].firstChild;
    expect(within(browse).getByText('Browse Wishlist')).toBeInTheDocument();
    expect(browse).toContainHTML('<a class="nav-link" href="/wishlist">Browse Wishlist</a>');

    const profile = navItems[2].firstChild;
    expect(within(profile).getByText('test@example.com')).toBeInTheDocument();
    expect(profile).toContainHTML(
      '<a class="nav-link" href="/profile">test@example.com</a>',
    );
    const logout = navItems[3].firstChild;
    expect(within(logout).getByText('Logout')).toBeInTheDocument();
    expect(logout).toHaveAttribute('href', '/login');
    expect(logout).toHaveClass('nav-link');

    const cart = navItems[4].firstChild;

    expect(cart.firstChild).toContainHTML('<i aria-hidden="true" class="fa fa-shopping-cart" />');
    expect(cart).toHaveAttribute('href', '/cart');
    expect(cart).toHaveClass('nav-link');
    expect(cart.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(cart.firstChild).toHaveClass('fa fa-shopping-cart');
    expect(cart.children[1]).toContainHTML('<span style="border-radius: 45%; background-color: rgb(0, 128, 0); color: white; font-size: 8px; padding: 3px; margin-right: 3px;">1</span>');
  });
});
