import axios from 'axios';
import authHeader from './auth-header';
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/api`;

const headers = authHeader();

const addToWishlist = (productId) => axios.post(`${API_URL}/plants/${productId}/wishes`, {}, { headers });

const getWishlist = () => axios.get(`${API_URL}/wishes`, { headers });

const removeFromWishlist = (id) => axios.delete(`${API_URL}/wishes/${id}`, { headers });

export default {
  addToWishlist, getWishlist, removeFromWishlist,
};
