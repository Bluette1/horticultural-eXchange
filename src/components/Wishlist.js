import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Items in Wishlist</h3>
        <table style={{ width: "100%" }}>
          <tr>
            <th class="product-remove">&nbsp;</th>
            <th class="product-thumbnail">&nbsp;</th>
            <th class="product-name">Product</th>
            <th class="product-price">Unit Price</th>
            <th class="product-quantity">Stock Status</th>
          </tr>
          <tbody>
            {wishlist.map((item) => {
              return <WishlistItem key={`item-${uuid()}`} item={item} />;
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default Wishlist;
