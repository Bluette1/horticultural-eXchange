import { REGISTER_PRODUCTS } from './types';

const registerProducts = (products) => ({
  type: REGISTER_PRODUCTS,
  payload: products,
});

export default registerProducts;
