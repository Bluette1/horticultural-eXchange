import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { addToCart, removeFromCart } from '../actions/cart';
import { removeFromWishlist } from '../actions/wishlist';

const ToggleButton = ({ prdct }) => {
  const plant = prdct;
  const { id } = plant;
  const cartItems = useSelector((state) => state.cart);
  const item = cartItems.filter((item) => item.id === id);
  const isInCart = item.length !== 0;
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = (id) => {
    const product = wishlist.filter((item) => item.product.id === id);
    if (product.length > 0) {
      return product[0];
    }
    return false;
  };
  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(plant));
      swal('The item has been removed from the cart.');
    } else {
      plant.quantity = 1;
      const product = isInWishlist(plant.id);
      if (product) {
        dispatch(removeFromWishlist(product));
      }
      dispatch(addToCart(plant));
      swal('The item has been added to the cart.');
    }
  };
  return (
    <button
      className="toggle btn-primary"
      onClick={handleClick}
      data-testid="action-button"
      type="submit"
    >
      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
};
ToggleButton.propTypes = {
  prdct: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ToggleButton;
