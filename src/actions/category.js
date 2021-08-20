import { REGISTER_CATEGORIES } from './types';

const registerCategories = (categories) => ({
  type: REGISTER_CATEGORIES,
  payload: categories,
});

export default registerCategories;
