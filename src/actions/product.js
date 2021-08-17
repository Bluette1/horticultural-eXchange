import { REGISTER_PRODUCTS } from "./types";

export const registerProducts = products => ({
  type: REGISTER_PRODUCTS,
  payload: products,
});