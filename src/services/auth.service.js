import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/users/";

const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "sign_in", {
      user: { email, password },
    })
    .then((response) => {
      const user = response.data;

      if (response.headers.authorization) {
        user.accessToken = response.headers.authorization;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
};

const logout = () => {
  return axios
    .delete(API_URL + "sign_out", { headers: authHeader() })
    .then((response) => {
      localStorage.removeItem("user");
      return response;
    });
};

export default {
  register,
  login,
  logout,
};
