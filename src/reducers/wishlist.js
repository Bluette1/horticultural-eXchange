import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_WISHLIST:
      return [...state, payload];
    case REMOVE_FROM_WISHLIST:
      return state.filter((item) => item.id !== payload.id);
    default:
      return state;
  }
}
