import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromWishlist } from '../actions/wishlist';
import WishlistService from '../services/wishlist.service';
import ToggleBtn from './ToggleBtn';
import isGuestUser from '../helpers/isGuestUser';

const WishlistItem = ({ item }) => {
  const { product, id, created_at: createdAt } = item;
  const {
    name, image_url: imageUrl, price, in_stock: inStock,
  } = product;
  const dispatch = useDispatch();
  const [errDisplay, setErrDisplay] = useState('');
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleClickCancel = () => {
    if (isGuestUser(currentUser)) {
      dispatch(removeFromWishlist(item));
    } else {
      WishlistService.removeFromWishlist(id).then(
        () => {
          dispatch(removeFromWishlist(item));
        },
        (err) => {
          const errContent = (err.response && err.response.data)
            || err.message
            || err.toString();

          setErrDisplay(errContent);
        },
      );
    }
  };
  if (errDisplay !== '') {
    return <p>{errDisplay}</p>;
  }

  return (
    <tr>
      <td>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={handleClickCancel}
        />
      </td>
      <td>
        <img
          src={imageUrl}
          alt="thumbnail"
          style={{
            width: '80px',
            height: '80px',
          }}
        />
      </td>
      <td>{name}</td>
      <td>{`R ${price}`}</td>
      <td>{inStock ? 'In Stock' : 'Out of Stock'}</td>
      <td>
        {createdAt && (
          <span>
            Added on:
            {new Date(createdAt).toDateString()}
          </span>
        )}
        {inStock && (
          <div data-testid='toggle-btn' style={{ width: '200px' }}>
            <ToggleBtn prdct={product} />
          </div>
        )}
      </td>
    </tr>
  );
};
WishlistItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default WishlistItem;
