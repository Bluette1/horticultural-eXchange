import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCart, removeFromCart } from '../actions/cart';

const CartItem = ({ cartItem }) => {
  const item = cartItem;
  const {
    name, image_url: imageUrl, price, quantity,
  } = item;
  const dispatch = useDispatch();
  const handleClickAdd = () => {
    item.quantity = quantity + 1;
    dispatch(updateCart(item));
  };
  const handleClickRemove = () => {
    item.quantity = quantity - 1;
    if (item.quantity === 0) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(updateCart(item));
    }
  };
  const handleClickCancel = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <tr>
      <td>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={handleClickCancel}
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
      <td>{price}</td>
      <td>
        <i
          className="fa fa-minus-circle"
          aria-hidden="true"
          onClick={handleClickRemove}
        />
        {quantity}
        <i
          className="fa fa-plus-circle"
          aria-hidden="true"
          onClick={handleClickAdd}
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
