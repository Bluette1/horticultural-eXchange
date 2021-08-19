import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../actions/wishlist";
import WishlistService from "../services/wishlist.service";
import ToggleBtn from "./ToggleBtn";

const WishlistItem = ({ item }) => {
  const { product, id } = item;
  const { name, image_url, price, in_stock, created_at } = product;
  const dispatch = useDispatch();
  const [errDisplay, setErrDisplay] = useState("");

  const handleClickCancel = () => {
    WishlistService.removeFromWishlist(id).then(
      (res) => {
        dispatch(removeFromWishlist({ product, id }));
      },
      (err) => {
        const _errContent =
          (err.response && err.response.data) || err.message || err.toString();

        setErrDisplay(_errContent);
      }
    );
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
        Added on: {created_at}
        {in_stock && (
          <span>
            <ToggleBtn plant={item} />
          </span>
        )}
      </td>
    </tr>
  );
};

export default WishlistItem;
