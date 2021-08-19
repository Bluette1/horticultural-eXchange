import { ADD_TO_WISHLIST, REGISTER_WISHLIST, REMOVE_FROM_WISHLIST } from "../actions/types";
const wishlist = JSON.parse(localStorage.getItem("wishlist"));

const initialState = wishlist
  ? wishlist
  : [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_WISHLIST:
      if (!payload.id) {
        payload.id = state.length;
      }
      const items = [...state, payload]
      localStorage.setItem('wishlist', JSON.stringify(items));
      return items;
    case REMOVE_FROM_WISHLIST:
      const itemsUpdated =state.filter((item) => item.id !== payload.id);
      localStorage.setItem('wishlist', JSON.stringify(itemsUpdated));
      return itemsUpdated;    
    case REGISTER_WISHLIST:
      return payload; 
    default:
      return state;
  }
}
