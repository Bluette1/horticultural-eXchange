import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { addToCart, removeFromCart } from '../actions/cart';
import { removeFromWishlist } from '../actions/wishlist';
import WishlistService from '../services/wishlist.service';
import CartItemsService from '../services/cartitem.service';

import isGuestUser from '../helpers/isGuestUser';

const ToggleButton = ({ prdct }) => {
  const plant = prdct;
  const { id } = plant;
  const cartItems = useSelector((state) => state.cart);
  const isInCart = (id) => {
    const item = cartItems.filter((itm) => itm.product.id === id);
    const result = item.length > 0 ? item[0] : false;
    return result;
  };
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [errDisplay, setErrDisplay] = useState('');

  const { user: currentUser } = useSelector((state) => state.auth);
  const isInWishlist = (id) => {
    const product = wishlist.filter((item) => item.product.id === id);
    if (product.length > 0) {
      return product[0];
    }
    return false;
  };
  const handleClick = () => {
    const product = isInCart(id);
    if (product) {
      if (isGuestUser(currentUser)) {
        dispatch(removeFromCart(product));
      } else {
        CartItemsService.removeFromCartItems(product.id).then(
          () => {
            dispatch(removeFromCart(product));
          },
          (err) => {
            const errContent = (err.response && err.response.data)
              || err.message
              || err.toString();
            setErrDisplay(JSON.stringify(errContent));
          },
        );
      }
      swal('The item has been removed from the cart.');
    } else {
      const product = isInWishlist(id);
      if (product) {
        if (isGuestUser(currentUser)) {
          dispatch(removeFromWishlist(product));
          swal('The item has been removed from the wishlist.');
          dispatch(addToCart({ product: plant, quantity: 1 }));
          swal('The item has been added to the cart.');
        } else {
          WishlistService.removeFromWishlist(product.id).then(
            () => {
              dispatch(removeFromWishlist(product));
              CartItemsService.addToCartItems(plant.id).then(
                (resp) => {
                  const prodct = resp.data;
                  prodct.quantity = 1;
                  dispatch(addToCart(prodct));
                  console.log('resp.data: ', resp.data);
                  swal('The item has been added to the cart.');
                },
                (err) => {
                  const errContent = (err.response && err.response.data)
                    || err.message
                    || err.toString();
                  setErrDisplay(JSON.stringify(errContent));
                },
              );
              swal('The item has been removed from the wishlist.');
            },
            (err) => {
              const errContent = (err.response && err.response.data)
                || err.message
                || err.toString();
              setErrDisplay(JSON.stringify(errContent));
            },
          );
        }
      } else if (isGuestUser(currentUser)) {
        dispatch(addToCart({ product: plant, quantity: 1 }));
      } else {
        CartItemsService.addToCartItems(plant.id).then(
          (resp) => {
            const prodct = resp.data;
            prodct.quantity = 1;
            dispatch(addToCart(prodct));
            swal('The item has been added to the cart.');
          },
          (err) => {
            const errContent = (err.response && err.response.data)
              || err.message
              || err.toString();
            setErrDisplay(JSON.stringify(errContent));
          },
        );
      }
    }
  };

  if (errDisplay !== '') {
    return <p>{errDisplay}</p>;
  }
  return (
    <button
      className="toggle btn-primary"
      onClick={handleClick}
      data-testid="action-button"
      type="submit"
    >
      {isInCart(id) ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
};

ToggleButton.propTypes = {
  prdct: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ToggleButton;
