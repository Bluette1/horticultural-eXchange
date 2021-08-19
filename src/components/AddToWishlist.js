import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../actions/wishlist";
import WishlistService from "../services/wishlist.service";

const AddToWishlist = ({ product }) => {
  const [errDisplay, setErrDisplay] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isGuestUser  = (user) => {
    if (user.created_at === null || user.id === null) {
      return true;
    }
    return false;
  }

  const handleClick = () => {
    if (isGuestUser(currentUser)) {
      dispatch(addToWishlist({product}));
    } else {
      WishlistService.addToWishlist(currentUser, product).then(
        (res) => {
          dispatch(addToWishlist(res.data));
        },
        (err) => {
          const _errContent =
            (err.response && err.response.data) || err.message || err.toString();
  
          setErrDisplay(_errContent);
        }
      );
    }
  };
  if (errDisplay !== "") {
    return <p>{errDisplay}</p>;
  }
  return (
    <div className="pt-5 mt-5" style={{ cursor: "pointer" }}>
      <i class="fa fa-heart-o" aria-hidden="true"></i>

      <span
        className="text-weight-bold pt-5"
        style={{ textTransform: "uppercase", marginLeft: "3.5px" }}
        onClick={handleClick}
      >
        Add to your wish list
      </span>
    </div>
  );
};

export default AddToWishlist;
