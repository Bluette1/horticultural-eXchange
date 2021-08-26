import React from 'react';
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './store';
import { httpProtocol, host, port } from './env.variables';

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
    const iGrowTitle = screen.getByText(/iGrow/i);
    expect(iGrowTitle).toBeInTheDocument;
    expect(app).toMatchSnapshot();
  });
});
