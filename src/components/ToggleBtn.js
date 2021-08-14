import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromcart } from "../actions/cart";

const ToggleButton = ({ name }) => {
  const cartItems = useSelector(state => state.cart);
  const item = cartItems.filter(item => item.name === name);
  const isInCart = item.length === 0 ? true : false;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromcart(name))
    } else {
      dispatch(addToCart(name));
    }
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        data-testid={'action-button'}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
    </div>
  );
}

export default ToggleButton;