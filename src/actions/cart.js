import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  UPDATE_CART,
  REGISTER_CARTITEMS,
} from './types';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item,
});

export const resetCart = () => ({
  type: RESET_CART,
});

export const updateCart = (item) => ({
  type: UPDATE_CART,
  payload: item,
});

export const registerCartItems = (cartItems) => ({
  type: REGISTER_CARTITEMS,
  payload: cartItems,
});
