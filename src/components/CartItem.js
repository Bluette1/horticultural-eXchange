import React from "react";
import { useDispatch } from "react-redux";
import { updateCart, removeFromCart } from "../actions/cart";

const CartItem = ({ item }) => {
  const { name, image_url, price, quantity } = item;
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
          class="fa fa-times-circle"
          aria-hidden="true"
          onClick={handleClickCancel}
        ></i>
      </td>
      <td>
        <img
          src={image_url}
          alt="image thumbnail"
          style={{
            width: "80px",
            height: "80px",
          }}
        />
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <i
          class="fa fa-minus-circle"
          aria-hidden="true"
          onClick={handleClickRemove}
        ></i>
        {quantity}
        <i
          class="fa fa-plus-circle"
          aria-hidden="true"
          onClick={handleClickAdd}
        ></i>
      </td>
      <td>{quantity * price}</td>
    </tr>
  );
};

export default CartItem;
