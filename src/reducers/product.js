import { REGISTER_PRODUCTS } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_PRODUCTS:
      return payload;
    default:
      return state;
  }
}