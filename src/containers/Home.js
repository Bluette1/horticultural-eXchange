import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import registerCategories from '../actions/category';
import registerProducts from '../actions/product';
import { registerWishlist } from '../actions/wishlist';
import { registerCartItems } from '../actions/cart';
import UserService from '../services/user.service';
import CategoryService from '../services/category.service';
import WishlistService from '../services/wishlist.service';
import CartItemsService from '../services/cartitem.service';
import Category from '../components/Category';
import Filter from '../components/CategoryFilter';

import isGuestUser from '../helpers/isGuestUser';

const Home = () => {
  const [errDisplay, setErrDisplay] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const categories = [...useSelector((state) => state.category), 'All Plants'];
  const { user: currentUser } = useSelector((state) => state.auth);

  const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const categoryPrdcts = (category) => products.filter(
    (prdct) => prdct.category.toLowerCase() === category.toLowerCase(),
  );
  const getCategoryPrdct = (category) => {
    const ctprdcts = category === 'All Plants' ? products : categoryPrdcts(category);
    const idx = randomInteger(0, ctprdcts.length - 1);
    return ctprdcts[idx];
  };
  const getCategories = (categories) => categories.map((item) => item.category);
  useEffect(() => {
    window.onload = async function () {
      try {
        if ((!currentUser) || (currentUser && isGuestUser(currentUser))) {
          const [productsResponse, categoriesResponse] = await Promise.all([
            UserService.getPublicContent(),
            CategoryService.getCategories(),
          ]);
          dispatch(registerProducts(productsResponse.data));
          dispatch(registerCategories(getCategories(categoriesResponse.data)));
        } else {
          const [
            productsResponse, categoriesResponse, wishlistResponse, cartResponse,
          ] = await Promise
            .all([
              UserService.getPublicContent(),
              CategoryService.getCategories(),
              WishlistService.getWishlist(),
              CartItemsService.getCartItems(),
            ]);
          dispatch(registerProducts(productsResponse.data));
          dispatch(registerCategories(getCategories(categoriesResponse.data)));
          dispatch(registerWishlist(wishlistResponse.data));
          dispatch(registerCartItems(cartResponse.data));
        }
      } catch (error) {
        const errorContent = (error.response && error.response.data)
        || error.message
        || error.toString();
        setErrDisplay(JSON.stringify(errorContent));
      }
    };
  }, []);

  if (errDisplay !== '') {
    return <p>{errDisplay}</p>;
  }

  return (
    <div className="container row d-flex">
      {categories && categories.length < 2 && (<h4>PRODUCT CATEGORIES:</h4>)}
      <Filter />
      <div className="col-md-9">
        {categories && categories.length > 0 ? (
          <div className="row d-flex">
            {' '}
            {categories.map((category) => (
              <Category
                key={`category-${uuid()}`}
                plant={getCategoryPrdct(category)}
                category={category}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
