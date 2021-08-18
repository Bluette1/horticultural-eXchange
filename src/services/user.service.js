import axios from "axios";
import authHeader from "./auth-header";
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/api/`;
const headers = authHeader();

const getPublicContent = () => {
  return axios.get(API_URL + "plants");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
