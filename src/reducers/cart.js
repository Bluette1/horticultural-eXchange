import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  UPDATE_CART,
  REGISTER_CARTITEMS,
} from '../actions/types';

const removeFromCart = (id, state) => {
  const itemsUpdated = state.filter((item) => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(itemsUpdated));
  return itemsUpdated;
};
const cartItems = JSON.parse(localStorage.getItem('cartItems'));

const findAndUpdateItem = (crtItems, updatedItem) => {
  const index = crtItems.findIndex((item) => item.id === updatedItem.id);
  return [...crtItems.slice(0, index), updatedItem, ...crtItems.slice(index + 1)];
};

const updateCart = (state, payload) => {
  const updatedItems = findAndUpdateItem(state, payload);
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  return updatedItems;
};

const initialState = cartItems || [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      if (!payload.id) {
        payload.id = state.length;
      }
      localStorage.setItem('cartItems', JSON.stringify([...state, payload]));
      return [...state, payload];
    case REMOVE_FROM_CART:
      return removeFromCart(payload.id, state);
    case RESET_CART:
      localStorage.removeItem('cartItems');
      return [];
    case UPDATE_CART:
      return updateCart(state, payload);
    case REGISTER_CARTITEMS:
      return payload;
    default:
      return state;
  }
}
