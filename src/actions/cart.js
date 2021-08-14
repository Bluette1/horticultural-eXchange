import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
} from "./types";

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

export const resetCart = (item) => ({
  type: RESET_CART,
});

