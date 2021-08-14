import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
} from "../actions/types";

const cartItems = JSON.parse(localStorage.getItem("items"));

const initialState = cartItems
  ? cartItems
  : [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return [...state, payload]  
    case REMOVE_FROM_CART:
      return state.filter(item => item.name === payload.name);
    case RESET_CART:
      return [];
    default:
      return state;
  }
}