import axios from "axios";
import authHeader from "./auth-header";
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/api/`;

const getPublicContent = () => {
  return axios.get(API_URL + "plants");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
