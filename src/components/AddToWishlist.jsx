import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../actions/wishlist';
import WishlistService from '../services/wishlist.service';
import isGuestUser from '../helpers/isGuestUser';

const AddToWishlist = ({ product }) => {
  const [errDisplay, setErrDisplay] = useState('');

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isGuestUser(currentUser)) {
      dispatch(addToWishlist({ product }));
    } else {
      WishlistService.addToWishlist(product.id).then(
        (res) => {
          dispatch(addToWishlist(res.data));
        },
        (err) => {
          const errContent = (err.response && err.response.data) || err.message || err.toString();

          setErrDisplay(JSON.stringify(errContent));
        },
      );
    }
  };
  if (errDisplay !== '') {
    return <p>{errDisplay}</p>;
  }
  return (
    <div className="pt-5 mt-5" style={{ cursor: 'pointer' }}>
      <i className="fa fa-heart-o" aria-hidden="true" />
      <span
        className="text-weight-bold pt-5"
        style={{ textTransform: 'uppercase', marginLeft: '3.5px' }}
        onClick={handleClick}
        role="presentation"
        onKeyDown={handleClick}
      >
        Add to your wish list
      </span>
    </div>
  );
};
AddToWishlist.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default AddToWishlist;
