import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  UPDATE_CART
} from "../actions/types";

const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const findAndUpdateItem = (crtItems, updatedItem) => {
  const index = crtItems.findIndex(item => item.id === updatedItem.id);
  return [...crtItems.slice(0, index), updatedItem, ...crtItems.slice(index + 1)];
};

const initialState = cartItems
  ? cartItems
  : [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      const items = [...state, payload]
      localStorage.setItem('cartItems', JSON.stringify(items));
      return items; 
    case REMOVE_FROM_CART:
      const itemsUpdated = state.filter(item => item.id !== payload.id);
      localStorage.setItem('cartItems', JSON.stringify(itemsUpdated));
      return itemsUpdated; ;
    case RESET_CART:
      localStorage.removeItem('cartItems');
      return [];
    case UPDATE_CART:
      const updatedItems = findAndUpdateItem(state, payload);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    default:
      return state;
  }
}