import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddToWishlist from './AddToWishlist';
import ToggleBtn from './ToggleBtn';

const Product = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = (id) => {
    const product = wishlist.filter((item) => item.product.id === id);
    if (product.length > 0) {
      return true;
    }
    return false;
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/');
  };
  const { plant } = location.state;
  const {
    name, image_url: imageUrl, price, category, care, in_stock: inStock, id,
  } = plant;

  return (
    <div className="row d-md-flex">
      <div className="col-md-6">
        <img src={imageUrl} alt="plant" />
      </div>
      <div className="col-md-6">
        <h4>{name.toUpperCase()}</h4>
        <h4>{care}</h4>
        <h4>
          R
          {price}
        </h4>
        <div style={{ width: '200px', paddingTop: '25px' }}>
          {currentUser && inStock && <ToggleBtn prdct={plant} />}
          {!inStock && <p style={{ textDecoration: 'underline' }}>Out of stock</p>}
        </div>

        {currentUser && !isInWishlist(id) && <AddToWishlist product={plant} />}
        {currentUser && isInWishlist(id) && (
          <Link
            to="/wishlist"
            style={{ textDecoration: 'None' }}
          >
            <div style={{ marginTop: '80px' }}>
              <i className="fa fa-heart wish-icon" aria-hidden="true" />

              <span
                className="text-weight-bold pt-5"
                style={{ textTransform: 'uppercase', marginLeft: '3.5px' }}
              >
                Browse wishlist
              </span>
            </div>
          </Link>
        )}

        <h4 className="mt-5 pt-5">
          CATEGORY: &nbsp;
          {category}
        </h4>
      </div>
      <div className="col-md-6 pt-5 mt-5 pb-5 mb-5">
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-primary"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Product;
