import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../actions/wishlist";
import WishlistService from "../services/wishlist.service";
import ToggleBtn from "./ToggleBtn";

const WishlistItem = ({ item }) => {
  const { product, id, created_at: createdAt } = item;
  const { name, image_url, price, in_stock } = product;
  const dispatch = useDispatch();
  const [errDisplay, setErrDisplay] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const isGuestUser = (user) => {
    if (user.created_at === null || user.id === null) {
      return true;
    }
    return false;
  };

  const handleClickCancel = () => {
    if (isGuestUser(currentUser)) {
      dispatch(removeFromWishlist(item));
    } else {
      WishlistService.removeFromWishlist(id).then(
        () => {
          dispatch(removeFromWishlist(item));
        },
        (err) => {
          const _errContent =
            (err.response && err.response.data) ||
            err.message ||
            err.toString();

          setErrDisplay(_errContent);
        }
      );
    }
  };
  if (errDisplay !== "") {
    return <p>{errDisplay}</p>;
  }

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
      <td>{in_stock ? "In Stock" : "Out of Stock"}</td>
      <td>
        {createdAt && (
          <span>Added on: {new Date(createdAt).toDateString()}</span>
        )}
        {in_stock && (
          <div style={{ width: "200px" }}>
            <ToggleBtn plant={product} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default WishlistItem;
