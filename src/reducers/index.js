import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import cart from "./cart";
import category from "./category";
import product from "./product";

export default combineReducers({
  auth,
  message,
  cart,
  category,
  product,
});