import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cart";

const ToggleButton = ({ name }) => {
  const cartItems = useSelector(state => state.cart);
  const item = cartItems.filter(item => item.name === name);
  const isInCart = item.length === 0 ? false : true;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(name))
    } else {
      dispatch(addToCart(name));
    }
  }
  return (
      <button
        className="toggle btn-primary"
        onClick={handleClick}
        data-testid={'action-button'}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
  );
}

export default ToggleButton;