import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import WishlistItem from './WishlistItem';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Items in Wishlist</h3>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th className="product-remove">&nbsp;</th>
              <th className="product-thumbnail">&nbsp;</th>
              <th className="product-name">Product</th>
              <th className="product-price">Unit Price</th>
              <th className="product-quantity">Stock Status</th>
            </tr>
          </thead>

          <tbody>
            {wishlist && wishlist.length > 0
              ? wishlist.map((item) => <WishlistItem key={`item-${uuid()}`} item={item} />)
              : null}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default Wishlist;
