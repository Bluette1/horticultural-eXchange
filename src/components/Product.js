import { Link, useLocation } from "react-router-dom";
import AddToWishlist from "./AddToWishlist";
import ToggleBtn from "./ToggleBtn";
import { useSelector } from "react-redux";

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
  const { plant } = location.state;
  const { name, image_url, price, category, care, in_stock, id } = plant;

  return (
    <div className="row d-md-flex">
      <div className="col-md-6">
        <img src={image_url} alt="plant image" />
      </div>
      <div className="col-md-6">
        <h4>{name.toUpperCase()}</h4>
        <h4>{care}</h4>
        <h4>R {price}</h4>
        <div style={{ width: "200px", paddingTop: "25px" }}>
          {currentUser && in_stock && <ToggleBtn plant={plant} />}
        </div>

        {currentUser && !isInWishlist(id) && <AddToWishlist product={plant} />}
        {currentUser && isInWishlist(id) && (
          <Link
            to="/wishlist"
            style={{textDecoration: "None"}}
          >
            <div style={{ marginTop: "80px"}}>
              <i class="fa fa-heart wish-icon" aria-hidden="true"></i>

              <span
                className="text-weight-bold pt-5"
                style={{ textTransform: "uppercase",  marginLeft: "3.5px" }}
              >
                Browse wishlist
              </span>
            </div>
          </Link>
        )}

        <h4 className="mt-5 pt-5">CATEGORY: &nbsp; {category}</h4>
      </div>
    </div>
  );
};

export default Product;
