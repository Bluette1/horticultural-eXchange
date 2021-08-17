import { REGISTER_CATEGORIES } from "./types";

export const registerCategories = categories => ({
  type: REGISTER_CATEGORIES,
  payload: categories,
});