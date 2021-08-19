import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cart";
import { removeFromWishlist } from "../actions/wishlist";

const ToggleButton = ({ plant }) => {
  const { id } = plant;
  const cartItems = useSelector((state) => state.cart);
  const item = cartItems.filter((item) => item.id === id);
  const isInCart = item.length === 0 ? false : true;
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = (id) => {
   const product = wishlist.filter((item) => item.product.id === id)
   if (product.length > 0) {
     return product[0];
   }
   return false;
  }
  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(plant));
    } else {
      plant.quantity = 1;
      const product = isInWishlist(plant.id);
      if (product) {
        dispatch(removeFromWishlist(product));
      }
      dispatch(addToCart(plant));  
    }
  };
  return (
    <button
      className="toggle btn-primary"
      onClick={handleClick}
      data-testid={"action-button"}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
};

export default ToggleButton;
