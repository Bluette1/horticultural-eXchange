import axios from 'axios';
import authHeader from './auth-header';
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/api`;

const headers = authHeader();

const addToCartItems = (productId) => axios.post(`${API_URL}/plants/${productId}/cart_items`, {}, { headers });

const getCartItems = () => axios.get(`${API_URL}/cart_items`, { headers });

const removeFromCartItems = (id) => axios.delete(`${API_URL}/cart_items/${id}`, { headers });

const updateCartItem = (cartItemId, payload) => axios.put(`${API_URL}/cart_items/${cartItemId}`, payload, { headers });

const deleteCartItems = () => axios.delete(`${API_URL}/cart_items/`, { headers });

export default {
  addToCartItems, getCartItems, removeFromCartItems, updateCartItem, deleteCartItems,
};
