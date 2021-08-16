import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import CartItem from "./CartItem";

const Cart = () => {
  const crtItems = useSelector((state) => state.cart);
  const total = () => {
    let sum = 0;
    for (let index = 0; index < crtItems.length; index++) {
      const item = crtItems[index];
      sum += item.quantity * item.price;   
    }
    return sum;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Items in Cart</h3>
        <table style={{ width: "100%" }}>
          <tr>
            <th class="product-remove">&nbsp;</th>
            <th class="product-thumbnail">&nbsp;</th>
            <th class="product-name">Product</th>
            <th class="product-price">Price</th>
            <th class="product-quantity">Quantity</th>
            <th class="product-subtotal">Total</th>
          </tr>
          <tbody>
            {crtItems.map((item) => {
              return <CartItem key={`item-${uuid()}`} item={item} />;
            })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Sum</td>
              <td>{total()}</td>
            </tr>
          </tfoot>
        </table>
        <Link to={"/payment"}>Checkout</Link>
      </header>
    </div>
  );
};

export default Cart;
