import { ADD_TO_WISHLIST, REGISTER_WISHLIST, REMOVE_FROM_WISHLIST } from '../actions/types';

const removeFromWishlist = (id, state) => {
  const itemsUpdated = state.filter((item) => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(itemsUpdated));
  return itemsUpdated;
};
const wishlist = JSON.parse(localStorage.getItem('wishlist'));

const initialState = wishlist || [];

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_WISHLIST:
      if (!payload.id) {
        payload.id = state.length;
      }
      localStorage.setItem('wishlist', JSON.stringify([...state, payload]));
      return [...state, payload];
    case REMOVE_FROM_WISHLIST:
      return removeFromWishlist(payload.id, state);
    case REGISTER_WISHLIST:
      return payload;
    default:
      return state;
  }
};

export default reducer;
