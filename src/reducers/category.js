import { REGISTER_CATEGORIES } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_CATEGORIES:
      return payload;
    default:
      return state;
  }
}