import { ADD_TO_WISHLIST, REGISTER_WISHLIST, REMOVE_FROM_WISHLIST } from './types';

export const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (product) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: product,
});

export const registerWishlist = (wishlist) => ({
  type: REGISTER_WISHLIST,
  payload: wishlist,
});
