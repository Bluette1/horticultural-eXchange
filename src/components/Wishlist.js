import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import uuid from "react-uuid";
import WishlistService from "../services/wishlist.service";
import { registerWishlist } from "../actions/wishlist";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
  const [errDisplay, setErrDisplay] = useState("");
  let wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const isGuestUser  = (user) => {
    if (user.created_at === null || user.id === null) {
      return true;
    }
    return false;
  } 

  useEffect(() => {
    if (!isGuestUser) {
      WishlistService.getWishlist().then(
        (res) => {
          dispatch(registerWishlist(res.data));
        },
        (err) => {
          const _errContent =
            (err.response && err.response.data) || err.message || err.toString();
  
          setErrDisplay(_errContent);
        }
      );
    }
  }, []);

  if (errDisplay !== "") {
    return <p>{errDisplay}</p>;
  }
  if (!currentUser) {
    return <Redirect to="/login" />;
  } 

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Items in Wishlist</h3>
        <table style={{ width: "100%" }}>
          <thead>
          <tr>
            <th class="product-remove">&nbsp;</th>
            <th class="product-thumbnail">&nbsp;</th>
            <th class="product-name">Product</th>
            <th class="product-price">Unit Price</th>
            <th class="product-quantity">Stock Status</th>
          </tr>
          </thead>
         
          <tbody>
            {wishlist && wishlist.length > 0 ? wishlist.map((item) => {
              return <WishlistItem key={`item-${uuid()}`} item={item} />;
            }) : null}
            
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default Wishlist;
