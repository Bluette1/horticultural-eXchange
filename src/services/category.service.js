import axios from "axios";
import authHeader from "./auth-header";
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/api/`;

const getCategories = () => {
  return axios.get(API_URL + "categories");
};

const createCategory = (category) => {
  return axios.post(API_URL + "categories", { category }, { headers: authHeader() });
};

export default {
  createCategory,
  getCategories,
};