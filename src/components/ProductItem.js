import { useHistory } from "react-router-dom";
import ToggleBtn from './ToggleBtn';
import { useSelector } from "react-redux";
import OutOfStock from "./OutOfStock";

const Plant = ({ plant }) => {
  const history = useHistory();
  const { name, image_url, price, in_stock } = plant;
  const { user: currentUser } = useSelector((state) => state.auth);
  const handleClick = () => {
    history.push({
      pathname: `/product/${name.toLowerCase().replace(/ /g, '-')}`,
      state: { plant }
    })
  }

  return (
    <div className="col-sm-6 col-md-4" onClick={handleClick}>
      <div className="plant d-flex justify-content center flex-column">
        {!in_stock && (<OutOfStock />)}
        {currentUser && in_stock && (<ToggleBtn plant={plant} />)}
        <img src={image_url} alt="plant image" />
      </div>
      <>
        <h4>{name.toUpperCase()}</h4>
        <h4>R {price}</h4>
      </>
    </div>
  );
};

export default Plant;
