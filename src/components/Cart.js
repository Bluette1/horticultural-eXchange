import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import CartItem from "./CartItem";

const Cart = () => {
  const crtItems = useSelector((state) => state.cart);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Items in Cart</h3>
        <table style={{width:'100%'}}>
          <tr>
            <th class="product-remove">&nbsp;</th>
            <th class="product-thumbnail">&nbsp;</th>
            <th class="product-name">Product</th>
            <th class="product-price">Price</th>
            <th class="product-quantity">Quantity</th>
            <th class="product-subtotal">Total</th>
          </tr>
          {crtItems.map((item) => {
            return <CartItem key={`item-${uuid()}`} item={item} />;
          })}
        </table>
        <Link to={"/payment"}>Add a plant item</Link>
      </header>
    </div>
  );
};

export default Cart;
