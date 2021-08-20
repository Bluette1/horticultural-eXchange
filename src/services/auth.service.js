import axios from 'axios';
import authHeader from './auth-header';
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/users/`;

const register = (username, email, password) => axios.post(API_URL, {
  username,
  email,
  password,
});

const deregister = (username, email, password) => axios.delete(API_URL, {
  username,
  email,
  password,
});
const login = (email, password) => axios
  .post(`${API_URL}sign_in`, {
    user: { email, password },
  })
  .then((response) => {
    const user = response.data;

    if (response.headers.authorization) {
      user.accessToken = response.headers.authorization;
    }

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });

const logout = () => {
  const headers = authHeader();
  localStorage.removeItem('user');

  return axios
    .delete(`${API_URL}sign_out`, { headers });
};

export default {
  register,
  deregister,
  login,
  logout,
};
