import axios from 'axios';
import authHeader from './auth-header';
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}`;
const headers = authHeader();

const register = (username, email, password) => axios.post(
  `${API_URL}/users/`, {
    username,
    email,
    password,
  },
);
const namespace = (currentUser) => (currentUser.supervisor_role ? 'mod' : 'admin');

const registerUser = (payload, currentUser) => axios
  .post(`${API_URL}/${namespace(currentUser)}/users/${currentUser.id}/create-user`, payload, { headers });

const deregister = (email, currentUser) => axios.post(
  `${API_URL}/${namespace(currentUser)}/users/${currentUser.id}/delete-user`, { user: { email } }, { headers },
);

const login = (email, password) => axios
  .post(`${API_URL}/users/sign_in`, {
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
  localStorage.removeItem('user');

  return axios
    .delete(`${API_URL}/users/sign_out`, { headers });
};

export default {
  register,
  registerUser,
  deregister,
  login,
  logout,
};
