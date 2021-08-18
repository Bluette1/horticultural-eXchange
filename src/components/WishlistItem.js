import React, {useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../actions/wishlist";
import WishlistService from "../services/wishlist.service";
import ToggleBtn from "./ToggleBtn";


const WishlistItem = ({ item }) => {
  const { name, image_url, price, in_stock, created_at } = item;
  const dispatch = useDispatch();
  const [errDisplay, setErrDisplay] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  const handleClickCancel = () => {
    WishlistService.removeFromWishlist(currentUser, item).then(
      (res) => {
        dispatch(removeFromWishlist(item));
      },
      (err) => {
        const _errContent =
          (err.response && err.response.data) || err.message || err.toString();

        setErrDisplay(_errContent);
      }
    );
    

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
        <img src={image_url} alt="image thumbnail" style={{
          width: "80px", height: "80px"
        }}/>
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{in_stock ? 'In Stock' : 'Out of Stock'}</td>
      {in_stock && (<td><ToggleBtn plant={item} /></td>)}
    </tr>
  );
};

export default WishlistItem;
