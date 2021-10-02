import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCart, removeFromCart } from '../actions/cart';
import isGuestUser from '../helpers/isGuestUser';
import CartItemsService from '../services/cartitem.service';

const CartItem = ({ cartItem }) => {
  const item = cartItem;
  const { product, quantity } = item;
  const {
    name, image_url: imageUrl, price,
  } = product;

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [errDisplay, setErrDisplay] = useState('');
  const removeItem = () => {
    if (isGuestUser(currentUser)) {
      dispatch(removeFromCart(item));
    } else {
      CartItemsService.removeFromCartItems(item.id).then(
        () => {
          dispatch(removeFromCart(item));
        },
        (err) => {
          const errContent = (err.response && err.response.data)
            || err.message
            || err.toString();
          setErrDisplay(JSON.stringify(errContent));
        },
      );
    }
  };

  const updateItem = () => {
    if (isGuestUser(currentUser)) {
      dispatch(updateCart(item));
    } else {
      CartItemsService.updateCartItem(item.id, { quantity: item.quantity }).then(
        () => {
          dispatch(updateCart(item));
        },
        (err) => {
          const errContent = (err.response && err.response.data)
            || err.message
            || err.toString();
          setErrDisplay(JSON.stringify(errContent));
        },
      );
    }
  };

  const handleClickAdd = () => {
    item.quantity = quantity + 1;
    updateItem();
  };
  const handleClickRemove = () => {
    item.quantity = quantity - 1;
    if (item.quantity === 0) {
      removeItem();
    } else {
      updateItem();
    }
  };
  const handleClickCancel = () => {
    removeItem();
  };

  if (errDisplay !== '') {
    return <p>{errDisplay}</p>;
  }

  return (
    <tr>
      <td>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={handleClickCancel}
          data-testid="cancel-icon"
        />
      </td>
      <td>
        <img
          src={imageUrl}
          alt=""
          style={{
            width: '80px',
            height: '80px',
          }}
        />
      </td>
      <td>{name}</td>
      <td>{`R ${price}`}</td>
      <td>
        <i
          className="fa fa-minus-circle"
          aria-hidden="true"
          onClick={handleClickRemove}
          data-testid="remove-icon"
        />
        {quantity}
        <i
          className="fa fa-plus-circle"
          aria-hidden="true"
          onClick={handleClickAdd}
          data-testid="add-icon"
        />
      </td>
      <td>{quantity * price}</td>
    </tr>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CartItem;
