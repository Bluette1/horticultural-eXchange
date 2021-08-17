import { useLocation } from "react-router-dom";
import ToggleBtn from './ToggleBtn';
import { useSelector } from "react-redux";

const Product = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const { plant } = location.state;
  const { name, image_url, price, category, care } = plant;

  return (
    <div className="row d-md-flex">
      <div className="col-md-6">
        <img src={image_url} alt="plant image" />
      </div>
      <div className="col-md-6">
        <h4>{name.toUpperCase()}</h4>
        <h4>{care}</h4>
        <h4>R {price}</h4>
        {currentUser && (<ToggleBtn className="col-6" plant={plant} />)}
        <h4 className="mt-5 pt-5">CATEGORY: &nbsp; {category}</h4>
      </div>
    </div>
  );
};

export default Product;
