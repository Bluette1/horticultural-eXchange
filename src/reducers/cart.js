import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
} from "../actions/types";

const cartItems = JSON.parse(localStorage.getItem("cartItems"));

const initialState = cartItems
  ? cartItems
  : [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      let items = [...state, payload]
      localStorage.setItem('cartItems', JSON.stringify(items));
      return items; 
    case REMOVE_FROM_CART:
      items = state.filter(item => item.name === payload.name);
      localStorage.setItem('cartItems', JSON.stringify(items));
      return items;
    case RESET_CART:
      localStorage.removeItem('cartItems');
      return [];
    default:
      return state;
  }
}