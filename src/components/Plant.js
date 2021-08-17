import ToggleBtn from './ToggleBtn';
import { useSelector } from "react-redux";

const Plant = ({ plant }) => {
  const { name, image_url, price, category } = plant;
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <div className="col-sm-6 col-md-4">
      <div className="plant d-flex justify-content center flex-column">
        {currentUser && (<ToggleBtn plant={plant} />)}
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
